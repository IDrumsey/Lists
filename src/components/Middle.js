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
            console.log("middle update show")
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
                    <Text text="Create lists and share with your family!" styles={{width: "80%", margin: "auto", fontStyle: "italic", marginBottom: "50px"}}/>
                    <img src="imgs/welcome.png" id="welcome-image" alt="welcome"></img>
                </div>);
        }
        
        //Single List Page
        
        if(this.props.list){
            console.log("rendering list page middle : ", this.state.showingNewItemTemplate)
            this.content = (
                <div className="middle">
                    <Button mb="50px" size="50px" icon="plus" glow="#34eb77" centered clickHandler={this.props.showNewItemTemplateHandler}/>
                    <List
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

        return this.content;
    }
}

export default Middle;