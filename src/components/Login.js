import React from 'react';

import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';

class Login extends React.Component {

    check_creds(){
        console.log("checking creds")
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