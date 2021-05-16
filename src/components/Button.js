import React from 'react';

class Button extends React.Component {
    btn_styles = {
        width: this.props.size,
        height: this.props.size,
        boxShadow: "0 0 5px " + this.props.glow,
        backgroundColor: this.props.bgColor
    }

    icon_styles = {
        fontSize: (parseInt(this.props.size) / 1.75) + "px",
        color: this.props.color
    }

    render() {
        let classname = "fa fa-" + this.props.icon + " btn-icon";
        return (
            <div className="btn" style={this.btn_styles}>
                <i className={classname} style={this.icon_styles}></i>
            </div>
        );
    }
}

Button.defaultProps = {
    icon: "user"
}

export default Button;