import React from 'react';
import Button from './Button';

class DeleteButton extends Button {
    render() {

        let classname = "fa fa-" + this.props.icon + " btn-icon";
        return (
            <div className="btn" style={this.btn_styles} onClick={() => this.props.clickHandler(this.props.itemId)}>
                <i className={classname} style={this.icon_styles}></i>
            </div>
        );
    }
}

export default DeleteButton;