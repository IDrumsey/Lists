import React from 'react';
import Text from './Text';

class Middle extends React.Component {
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

        return this.content;
    }
}

export default Middle;