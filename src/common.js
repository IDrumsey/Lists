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

// https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library

export function decodeToken (token) {
    // get the payload section
    var base64Url = token.split('.')[1];

    // replace the a '-' symbols with '+' symbols and '_' symbols with '/' symbols
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    // Don't know
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export function getAccessToken(){
    return document.cookie.split('=')[1];
}

export let PORT = 8000;