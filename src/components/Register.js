import React from 'react';
import Bcrypt from 'bcryptjs';

import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';

import { PORT } from '../common';

class Register extends React.Component {

    register(){
        // validate fields
        let field_errors = {
            email: [],
            password: [],
            passwordConfirmation: [],
            firstName: [],
            lastName: [],
        }

            // validate email
            let email_val = document.getElementById("email-input").value;

                // https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
                let email_regex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$");

                if(!email_regex.test(email_val)){
                    field_errors.email.push({
                        id: 1,
                        desc: "Not a valid email format"
                    })
                }

            
            // validate password

                let password_val = document.getElementById("password-input").value;
                //check requirements -> add regex when learned

                // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
                let password_regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");

                if(!password_regex.test(password_val)){
                    field_errors.password.push({
                        id: 1,
                        desc: "Not a valid password format"
                    })
                }

            //validate password confirmation

                let password_confirmation = document.getElementById("password-confirmation-input").value;

                if(password_confirmation !== password_val){
                    field_errors.passwordConfirmation.push({
                        id: 1,
                        desc: "Passwords don't match"
                    })
                }

            // validate first and last names -> can't be empty

                //check first name
                let first_name = document.getElementById("first-name-input").value;

                if(first_name.length === 0){
                    field_errors.firstName.push({
                        id: 1,
                        desc: "First name is required"
                    });
                }

                //check last name
                let last_name = document.getElementById("last-name-input").value;

                if(last_name.length === 0){
                    field_errors.lastName.push({
                        id: 1,
                        desc: "Last name is required"
                    });
                }
                
        // Process the errors obj and check if there are any errors
        let foundErr = false;

        //get elements
        let email = document.getElementById('email-input');
        let firstName = document.getElementById('first-name-input');
        let lastName = document.getElementById('last-name-input');
        let password = document.getElementById('password-input');
        let passwordConfirmation = document.getElementById('password-confirmation-input');

        // set no-error styles
        email.style.border = "none";
        firstName.style.border = "none";
        lastName.style.border = "none";
        password.style.border = "none";
        passwordConfirmation.style.border = "none";

        // reset placeholders
        email.placeholder = "Username";
        firstName.placeholder = "First Name";
        lastName.placeholder = "Last name";
        password.placeholder = "Password";
        passwordConfirmation.placeholder = "Confirm Password";

        //go through each element and its errors

            // Email
            if(field_errors.email.length !== 0){
                foundErr = true;
                //mark red
                email.style.border = "2px solid #c92843";

                //remove input
                email.value = "";

                //display first error
                email.placeholder = field_errors.email[0].desc;
            }

            // First name
            if(field_errors.firstName.length !== 0){
                foundErr = true;
                //mark red
                firstName.style.border = "2px solid #c92843";

                //remove input
                firstName.value = "";

                //display first error
                firstName.placeholder = field_errors.firstName[0].desc;
            }

            // Last name
            if(field_errors.lastName.length !== 0){
                foundErr = true;
                //mark red
                lastName.style.border = "2px solid #c92843";

                //remove input
                lastName.value = "";

                //display first error
                lastName.placeholder = field_errors.lastName[0].desc;
            }

            // Password
            if(field_errors.password.length !== 0){
                foundErr = true;
                //mark red
                password.style.border = "2px solid #c92843";

                //remove input
                password.value = "";

                //display first error
                password.placeholder = field_errors.password[0].desc;
            }

            // Password confirmation
            if(field_errors.passwordConfirmation.length !== 0){
                foundErr = true;
                //mark red
                passwordConfirmation.style.border = "2px solid #c92843";

                //remove input
                passwordConfirmation.value = "";

                //display first error
                passwordConfirmation.placeholder = field_errors.passwordConfirmation[0].desc;
            }

        if(!foundErr){
            console.log("registering")

            //create new user
            fetch('http://localhost:' + PORT + '/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: first_name,
                    lastName: last_name,
                    email: email_val,
                    password: password_val
                })
            }).then(res => res.json())
            .then(
                res => {
                    console.log(res);

                    //route to home page if good register
                }
            )
        }
    }

    componentDidMount() {
        //listen for enter key press
        document.addEventListener('keyup', e => {
            if(e.key === "Enter"){
                this.register();
            }
        });
    }

    render() {
        return (
            <div id="container">
                <Top title="Register"/>
                <Middle register/>
                <Bottom register registerHandler={this.register}/>
            </div>
        )
    }
}

export default Register;