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
    // get raw string
    let cookie = getCookie("token");

    if(cookie === undefined){
        return "random"
    }

    return cookie.value;
}

export function checkAuth(res){
    if(res.auth === undefined){
        return true;
    }
    if(!res.auth) {
        window.location.href = "/Login";
    }
    else{
        return true;
    }
}

export function getCookie(name){
    let fields = document.cookie.split(';');

    fields = fields.map(field => {
        field = field.trim();
        let temp = field.split('=');
        return {
            key: temp[0],
            value: temp[1]
        }
    })

    let cookie = fields.find(field => field.key === name);

    return cookie;
}

export function deleteCookie(name){
    // https://stackoverflow.com/questions/10593013/delete-cookie-by-name
    
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export let PORT = 8000;