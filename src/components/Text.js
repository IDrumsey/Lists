import React from 'react';

import {classArrayToString as ClassCombine} from '../common';

class Text extends React.Component {
    classes = ['text'];

    render() {
        //check for horizontal centering
        if(this.props.xCentered){
            this.classes.push('text-centered-x');
        }

        let final_classes = ClassCombine(this.classes);

        return <h1 style={this.props.styles} className={final_classes}>{this.props.text}</h1>
    }
}

Text.defaultProps = {
    text: 'test text'
}

export default Text;