import fetchMock from 'fetch-mock'

import CorreiosService from './Correios.service'
import * as retornoApiCorreiosBorgesLagoaJson from './retorno.api.correios.borges.lagoa.json'
import * as retornoApiCorreiosDiogoDeFariaJson from './retorno.api.correios.diogo.de.faria.json'
import * as retornoApiCorreiosQuaiquicaJson from './retorno.api.correios.guaiquica.json'

const retornoApiCorreiosBorgesLagoa = retornoApiCorreiosBorgesLagoaJson.default
const retornoApiCorreiosDiogoDeFaria = retornoApiCorreiosDiogoDeFariaJson.default
const retornoApiCorreiosGuaiquica = retornoApiCorreiosQuaiquicaJson.default
fetchMock.get(
    'https://viacep.com.br/ws/SP/Sao%20Paulo/Rua+Borges+Lagoa/json/', 
    retornoApiCorreiosBorgesLagoa
)
fetchMock.get(
    'https://viacep.com.br/ws/SP/Sao%20Paulo/Rua+Doutor+Diogo+De+Faria/json/', 
    retornoApiCorreiosDiogoDeFaria
)
fetchMock.get(
    'https://viacep.com.br/ws/SP/Sao%20Paulo/Rua+Guaiquica/json/', 
    retornoApiCorreiosGuaiquica
)

const cs = new CorreiosService();

describe("test buscaInfo", () => {
    it("funfa com 1 resultado", async () => {
        const logradouro = "Rua Guaiquiçá"
        const resultado = await cs.buscaInfo(logradouro)
        expect(resultado).toEqual(retornoApiCorreiosGuaiquica[0])
    })
    it("se não é fornecido um número, retorna o primeiro resultado", async () => {
        const logradouro = "Rua Doutor Diogo De Faria"
        const resultado = await cs.buscaInfo(logradouro)
        expect(resultado).toEqual(retornoApiCorreiosDiogoDeFaria[0])
    })
    it("verificar primeiro se bate com um número fixo", async () => {
        const logradouro = "Rua Borges Lagoa"
        const resultado = await cs.buscaInfo(logradouro, 1450)
        const resultadoExperado = retornoApiCorreiosBorgesLagoa.filter(
            (r) => r.complemento === "1450"
        )
        expect(resultado).toEqual(resultadoExperado[0])
    })
    it("funciona com faixa e par/ímpar", async () => {
        const logradouro = "Rua Borges Lagoa"
        const resultado = await cs.buscaInfo(logradouro, 937)
        const resultadoExperado = retornoApiCorreiosBorgesLagoa.filter(
            (r) => r.complemento === "de 853 a 1091 - lado ímpar"
        )
        expect(resultado).toEqual(resultadoExperado[0])
    })
})

describe("test filtraLogradouro", () => {
    it("remove acentos", () => {
        const frase = "ÀàÊéÍíÓõÚü";
        const retorno = "AaEeIiOoUu";
        expect(cs.filtraLogradouro(frase)).toBe(retorno);
    })
    it("remove pontuação", () => {
        const frase = "  Abobrinha,maçã     abacaxi.{} ";
        const retorno = "Abobrinha maca abacaxi";
        expect(cs.filtraLogradouro(frase)).toBe(retorno);
    })
})

describe("test obtemDadosApi", () => {
    beforeEach(() => {
        cs.limpaCache()
        fetchMock.resetHistory()
    })
    it("funfa", async () => {
        const endereco = "Rua,Doutor Diogo De Faria,"
        const response = await cs.obtemDadosApi(endereco)
        expect(response).toEqual(retornoApiCorreiosDiogoDeFaria)
    })
    it("usa cache", async () => {
        const endereco = "Rua,Doutor Diogo De Faria,"
        let response = await cs.obtemDadosApi(endereco)
        expect(response).toEqual(retornoApiCorreiosDiogoDeFaria)
        response = await cs.obtemDadosApi(endereco)
        expect(response).toEqual(retornoApiCorreiosDiogoDeFaria)
        expect(fetchMock.calls().length).toEqual(1)
    })
})

describe("test filtraNumeroDaFaixa", () => {
    it("X", async () => {
        const numeroDoComplemento = "315"
        let numero = cs.filtraNumeroDaFaixa(numeroDoComplemento)
        expect(numero).toEqual([315])
    })
    it("X/X", async () => {
        const numeroDoComplemento = "315/316"
        let faixa = cs.filtraNumeroDaFaixa(numeroDoComplemento)
        expect(faixa).toEqual([315, 316])
    })
})

describe("test filtraFaixaDoComplemento", () => {
    it("vazio vale tudo", async () => {
        const complemento = ""
        let faixa = cs.filtraFaixaDoComplemento(complemento)
        expect(faixa).toEqual([0, Infinity])
    })
    it("até X", async () => {
        const complemento = "até 580"
        let faixa = cs.filtraFaixaDoComplemento(complemento)
        expect(faixa).toEqual([0, 580])
    })
    it("até X/X", async () => {
        const complemento = "até 315/316"
        let faixa = cs.filtraFaixaDoComplemento(complemento)
        expect(faixa).toEqual([0, 316])
    })
    // it("até X - lado par/ímpar", async () => {
    //     const complemento = "até 580 - lado par"
    //     let faixa = cs.filtraFaixaDoComplemento(complemento)
    //     expect(faixa).toEqual([0, 316])
    // })
    it("de X/X a X/X", async () => {
        const complemento = "de 841/842 a 1115/1116"
        let faixa = cs.filtraFaixaDoComplemento(complemento)
        expect(faixa).toEqual([841, 1116])
    })
    it("de X a X", async () => {
        const complemento = "de 1093 a 1231"
        let faixa = cs.filtraFaixaDoComplemento(complemento)
        expect(faixa).toEqual([1093, 1231])
    })
    it("de X ao fim", async () => {
        const complemento = "de 1233 ao fim"
        let faixa = cs.filtraFaixaDoComplemento(complemento)
        expect(faixa).toEqual([1233, Infinity])
    })
    it("de X/X ao fim", async () => {
        const complemento = "de 1251/1252 ao fim"
        let faixa = cs.filtraFaixaDoComplemento(complemento)
        expect(faixa).toEqual([1251, Infinity])
    })
})

describe("test filtraComplemento", () => {
    it("funciona sem par/ímpar", () => {
        expect(cs.filtraComplemento("até 315/316")).toEqual(
            { faixa: "até 315/316", parOuImpar: undefined})
        expect(cs.filtraComplemento("de 841/842 a 1115/1116")).toEqual(
            { faixa: "de 841/842 a 1115/1116", parOuImpar: undefined})
        expect(cs.filtraComplemento("de 1251/1252 ao fim")).toEqual(
            { faixa: "de 1251/1252 ao fim", parOuImpar: undefined})
    })

    it("funciona com par/ímpar", () => {
        expect(cs.filtraComplemento("até 580 - lado par")).toEqual(
            { faixa: "até 580", parOuImpar: "par"})
        expect(cs.filtraComplemento("de 1093 a 1231 - lado ímpar")).toEqual(
            { faixa: "de 1093 a 1231", parOuImpar: "ímpar"})
        expect(cs.filtraComplemento("de 1233 ao fim - lado ímpar")).toEqual(
            { faixa: "de 1233 ao fim", parOuImpar: "ímpar"})
    })

    it("funciona com apenas par/ímpar, se faixa", () => {
        expect(cs.filtraComplemento("lado par")).toEqual(
            { faixa: undefined, parOuImpar: "par"})
        expect(cs.filtraComplemento("lado ímpar")).toEqual(
            { faixa: undefined, parOuImpar: "ímpar"})
    })
})

describe("test numeroEstaNoComplemento", () => {
    it("número sempre está num complemento vazio", () => {
        const complemento = ""
        expect(cs.numeroEstaNoComplemento(451, complemento)).toBeTruthy()
        expect(cs.numeroEstaNoComplemento(154, complemento)).toBeTruthy()
    })
    it("funfa com número fixo", () => {
        const complemento = "451"
        expect(cs.numeroEstaNoComplemento(451, complemento)).toBeTruthy()
        expect(cs.numeroEstaNoComplemento(154, complemento)).toBeFalsy()
    })
    it("funfa com faixa sem par/ímpar - até X", () => {
        const complemento = "até 315/316"
        expect(cs.numeroEstaNoComplemento(200, complemento)).toBeTruthy()
        expect(cs.numeroEstaNoComplemento(600, complemento)).toBeFalsy()
    })
    it("funfa com faixa sem par/ímpar - de X a X", () => {
        const complemento = "de 841/842 a 1115/1116"
        expect(cs.numeroEstaNoComplemento(900, complemento)).toBeTruthy()
        expect(cs.numeroEstaNoComplemento(600, complemento)).toBeFalsy()
    })
    it("funfa com faixa sem par/ímpar - de X ao fim", () => {
        const complemento = "de 1251/1252 ao fim"
        expect(cs.numeroEstaNoComplemento(1500, complemento)).toBeTruthy()
        expect(cs.numeroEstaNoComplemento(999999, complemento)).toBeTruthy()
        expect(cs.numeroEstaNoComplemento(600, complemento)).toBeFalsy()
    })
    it("funfa com faixa com par/ímpar - até X", () => {
        const complemento = "até 571 - lado ímpar"
        expect(cs.numeroEstaNoComplemento(301, complemento)).toBeTruthy()
        expect(cs.numeroEstaNoComplemento(320, complemento)).toBeFalsy()
        expect(cs.numeroEstaNoComplemento(701, complemento)).toBeFalsy()
        expect(cs.numeroEstaNoComplemento(700, complemento)).toBeFalsy()
    })
    it("funfa com faixa com par/ímpar - de X a X", () => {
        const complemento = "de 573 a 851 - lado ímpar"
        expect(cs.numeroEstaNoComplemento(601, complemento)).toBeTruthy()
        expect(cs.numeroEstaNoComplemento(600, complemento)).toBeFalsy()
        expect(cs.numeroEstaNoComplemento(401, complemento)).toBeFalsy()
    })
    it("funfa com faixa com par/ímpar - de X ao fim", () => {
        const complemento = "de 1252 ao fim - lado par"
        expect(cs.numeroEstaNoComplemento(1500, complemento)).toBeTruthy()
        expect(cs.numeroEstaNoComplemento(999998, complemento)).toBeTruthy()
        expect(cs.numeroEstaNoComplemento(999999, complemento)).toBeFalsy()
        expect(cs.numeroEstaNoComplemento(600, complemento)).toBeFalsy()
    })
    it("funfa sem faixa com par/ímpar - lado par", () => {
        const complemento = "lado par"
        expect(cs.numeroEstaNoComplemento(1500, complemento)).toBeTruthy()
        expect(cs.numeroEstaNoComplemento(999, complemento)).toBeFalsy()
    })
    it("funfa sem faixa com par/ímpar - lado ímpar", () => {
        const complemento = "lado ímpar"
        expect(cs.numeroEstaNoComplemento(1501, complemento)).toBeTruthy()
        expect(cs.numeroEstaNoComplemento(998, complemento)).toBeFalsy()
    })
})