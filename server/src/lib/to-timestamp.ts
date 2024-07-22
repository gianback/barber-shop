function toTimestamp(strDate:string){
    let datum = Date.parse(strDate);
    return datum/1000;
 }