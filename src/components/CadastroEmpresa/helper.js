export const validaPayload = values => {
    let errors = 0;
    for(const key in values){
        if(key === "complemento") continue;
        console.log(key, values[key].length)
        if(values[key].length === 0){
            errors += 1;
        }
    }
    console.log("-----")
}