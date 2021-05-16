export function classArrayToString(arr){
    let final = "";

    arr.forEach((classname, i) => {
        if(i !== 0){
            final = final.concat(' ', classname);
        }
        else{
            final = final.concat(classname);
        }
    });

    return final;
}