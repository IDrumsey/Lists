import React from 'react';
import Text from './Text';
import Button from './Button';
import List from './List';

class Middle extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showingNewItemTemplate: false
        }
    }

    componentDidUpdate(){
        if(this.state.showingNewItemTemplate !== this.props.showingNewItemTemplate){
            this.setState(
                {
                    showingNewItemTemplate: this.props.showingNewItemTemplate
                }
            )
        }
    }

    content = <div className="middle"></div>;
    

    render() {
        // Welcome page
        if(this.props.welcome){
            this.content = 
                (<div className="middle">
                    <Text text="Create lists and share with your family!" textCentered styles={{fontSize: "25px", width: "80%", margin: "auto", fontStyle: "italic", marginBottom: "50px"}}/>
                    <img src="imgs/welcome.png" id="welcome-image" alt="welcome"></img>
                </div>);
        }
        
        //Single List Page
        
        if(this.props.list){
            this.content = (
                <div className="middle">
                    <Button mb="50px" mt="20px" size="50px" icon="plus" glow="#34eb77" centered clickHandler={this.props.showNewItemTemplateHandler}/>
                    <List
                        list
                        items={this.props.items}
                        w="80%"
                        centered
                        deleteItemProps={this.props.deleteItemProps}
                        showingNewItemTemplate = {this.state.showingNewItemTemplate}
                        addItemProps = {this.props.addItemProps}
                        removeNewItemTemplateHandler = {this.props.removeNewItemTemplateHandler}
                    />
                </div>
            );
        }

        if(this.props.home){
            this.content = (
                <div className="middle">
                    <Button mb="50px" mt="20px" size="50px" icon="plus" glow="#34eb77" centered clickHandler={this.props.showNewItemTemplateHandler}/>
                    <List
                        key={this.props._id}
                        home
                        items={this.props.items}
                        w="80%"
                        centered
                        deleteItemProps={this.props.deleteItemProps}
                        showingNewItemTemplate = {this.state.showingNewItemTemplate}
                        addItemProps = {this.props.addItemProps}
                        removeNewItemTemplateHandler = {this.props.removeNewItemTemplateHandler}
                    />
                </div>
            );
        }

        if(this.props.login){
            if(this.props.error){
                this.content = (
                    <div className="middle">
                        <input className="login-input" id="email-input" type="text" name="email" placeholder="Email"/>
                        <input className="login-input" id="password-input" type="password" name="password" placeholder="Password"/>
                        <Text styles={{color: "#f24965", fontSize: "35px"}} text="Invalid Credentials" textCentered/>
                    </div>
                )
            }
            else{
                this.content = (
                    <div className="middle">
                        <input className="login-input" id="email-input" type="text" name="email" placeholder="Email"/>
                        <input className="login-input" id="password-input" type="password" name="password" placeholder="Password"/>
                    </div>
                )
            }
        }

        if(this.props.register){
            this.content = (
                <div className="middle">
                    <input className="login-input" id="email-input" type="email" name="email" placeholder="Email"/>
                    <input className="login-input" id="first-name-input" type="text" name="first-name" placeholder="First Name"/>
                    <input className="login-input" id="last-name-input" type="text" name="last-name" placeholder="Last Name"/>
                    <input className="login-input" id="password-input" type="password" name="password" placeholder="Password"/>
                    <input className="login-input" id="password-confirmation-input" type="password" name="password-confirmation" placeholder="Confirm Password"/>
                </div>
            )
        }

        return this.content;
    }
}

export default Middle;