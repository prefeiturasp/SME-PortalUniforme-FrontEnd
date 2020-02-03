export default class CorreiosService {
    cache = {}
    filtraLogradouro(logradouro) {
        // Remove acentos...
        return logradouro.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
            // ... pontuação ...
            .replace(/[^\w\s]+/g, " ")
            // ... e espaços extras
            .replace(/\s+/g, " ")
            .trim()
    }
    async obtemDadosApi(logradouro) {
        let param = this.filtraLogradouro(logradouro)
        param = param.replace(/\s/g, '+')
        if (param in this.cache){
            return this.cache[param]
        }
        let response = await fetch(
            `https://viacep.com.br/ws/SP/Sao%20Paulo/${param}/json/`
        )
        const resp = await response.json()
        this.cache[param] = resp
        return resp
    }
    async buscaInfo(logradouro, numero=undefined) {
        const dadosApi = await this.obtemDadosApi(logradouro)
        if (dadosApi.length === 1 || numero === undefined) {
            return dadosApi[0]
        }
        const resultadosNumerosFixos = [], resultadosFaixa = [];
        for (let resultado of dadosApi){
            if (/^\d+$/.exec(resultado.complemento)){
                resultadosNumerosFixos.push(resultado)
            }
            else{
                resultadosFaixa.push(resultado)
            }
        }
        for (let resultado of resultadosNumerosFixos.concat(resultadosFaixa)){
            if (this.numeroEstaNoComplemento(numero, resultado.complemento))
                return resultado;
        }
    }
    filtraNumeroDaFaixa(numeroDaFaixa) {
        const execResp = /(\d+)\/(\d+)/.exec(numeroDaFaixa)
        if (execResp){
            return [parseInt(execResp[1]), parseInt(execResp[2])]
        }
        else {
            return [parseInt(numeroDaFaixa)]
        }
    }
    filtraFaixaDoComplemento(textoFaixa) {
        if (textoFaixa === ""){
            return [0, Infinity]
        }
        let execResp = /^até (.+)$/.exec(textoFaixa)
        if (execResp) {
            const filtrado = this.filtraNumeroDaFaixa(execResp[1])
            return [0, Math.max(...filtrado)]
        }
        execResp = /^de (.+) a (.+)$/.exec(textoFaixa)
        if (execResp) {
            const filtradoMenor = this.filtraNumeroDaFaixa(execResp[1])
            const filtradoMaior = this.filtraNumeroDaFaixa(execResp[2])
            return [Math.min(...filtradoMenor), Math.max(...filtradoMaior)]
        }
        execResp = /^de (.+) ao fim$/.exec(textoFaixa)
        if (execResp) {
            const filtrado = this.filtraNumeroDaFaixa(execResp[1])
            return [Math.min(...filtrado), Infinity]
        }
    }
    filtraComplemento(complemento) {
        let faixa, parOuImpar;
        let execResp = /^lado (par|ímpar)$/.exec(complemento)
        if (execResp) {
            return { faixa, parOuImpar: execResp[1] }
        }
        execResp = /^(.+)( - lado (par|ímpar))$/.exec(complemento)
        if (execResp) {
            faixa = execResp[1]
            parOuImpar = execResp[3]
        }
        else {
            const ehFaixa = /^(de|até) \d+(\/\d+)?( (a \d+(\/\d+)?|ao fim))?$/.exec(complemento)
            if (ehFaixa) {
                faixa = complemento
            }
            else {
                throw new Error("Faixa inválida: " + complemento)
            }
        }
        return { faixa, parOuImpar }
    }
    numeroEstaNoComplemento(numero, complemento) {
        if (complemento === '') return true;
        let execResp = /^\d+$/.exec(complemento);
        if (execResp) {
            return parseInt(execResp[0]) === numero
        }
        const complementoFiltrado = this.filtraComplemento(complemento)
        if (complementoFiltrado.faixa) {
            const faixa = this.filtraFaixaDoComplemento(complementoFiltrado.faixa)
            const estaNaFaixa = numero >= faixa[0] && numero <= faixa[1]
            if (!estaNaFaixa) return false
        }
        switch (complementoFiltrado.parOuImpar){
            case undefined:
                return true
            case "par":
                return (numero % 2) === 0
            case "ímpar":
                return (numero % 2) === 1
            default:
                throw new Error("Valor inválido para parOuImpar: " + complementoFiltrado.parOuImpar)
        }
    }
    limpaCache(){
        this.cache = {}
    }
}