import React from 'react';

import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';

import { PORT, decodeToken } from'../common';

class Login extends React.Component {

    check_creds(){
        // authenticate in backend
        fetch('http://localhost:' + PORT + '/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: document.getElementById('email-input').value,
                password: document.getElementById('password-input').value
            })
        }).then(res => res.json())
        .then(res => {
            //if good -> route to home page
            if(res.auth === true){
                // decode the token to get the user id
                let userId = decodeToken(res.token).id;

                // set the token cookie
                document.cookie = "token=" + res.token;
                //set user id cookie
                document.cookie = "user_id=" + userId;


                window.location.href = "/Home/" + userId;
            }
        })
    }


    render() {
        return (
            <div id="container">
                <Top title="Login"/>
                <Middle login/>
                <Bottom login signInHandler={this.check_creds}/>
            </div>
        )
    }
}

export default Login;