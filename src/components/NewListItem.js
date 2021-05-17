import React from 'react';

import Button from './Button';

class NewListItem extends React.Component {
    input_styles = {
        backgroundColor: "rgba(0,0,0,0)",
        fontSize: "25px",
        color: "#fff",
        border: "none",
        fontFamily: "Rockwell"
    }

    wrapper_styles = {
        display: "grid",
        gridTemplateColumns: "70% 30%"
    }

    btn_group_styles = {
        display: "grid",
        gridTemplateColumns: "50% 50%"
    }

    render() {
        return (
            <div className="new-list-item list-item" style={this.wrapper_styles}>
                <input id="new-item-name" type="text" style={this.input_styles}></input>
                <div style={this.btn_group_styles}>
                    <Button
                        size="30px"
                        ml="auto"
                        mr="5px"
                        icon="check"
                        color="#75ffa5"
                        clickHandler = {this.props.addItemProps}
                    />
                    <Button
                        size="30px"
                        ml="auto"
                        mr="5px"
                        icon="times"
                        color="#a8323e"
                        clickHandler={this.props.removeNewItemTemplateHandler}
                    />
                </div>
            </div>
        );
    }
}

export default NewListItem;