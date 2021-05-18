import React from 'react';

/**
 * Props
 * ==============
 * size: defines the width and height of this btn
 * bgColor: defines the background color of the btn wrapper
 * glow: defines the shadow color of the btn wrapper
 * icon: the font awesome unique name ('user')
 */
class Button extends React.Component {
    btn_styles = {
        width: this.props.size,
        height: this.props.size,
        boxShadow: "0 0 5px " + this.props.glow,
        backgroundColor: this.props.bgColor,
        display: this.props.centered ? "block" : "auto",
        margin: this.props.centered ? "auto" : "none",
        marginLeft: this.props.ml ? this.props.ml : "none",
        marginRight: this.props.mr ? this.props.mr : "none",
        marginTop: this.props.mt ? this.props.mt : "none",
        marginBottom: this.props.mb ? this.props.mb : "none",
    }

    icon_styles = {
        fontSize: (parseInt(this.props.size) / 1.75) + "px",
        color: this.props.color
    }

    render() {
        let classname = "fa fa-" + this.props.icon + " btn-icon";
        
        let content;
        if(this.props.to){
            content = (
                <a href={this.props.to}>
                    <div className="btn" style={this.btn_styles} onClick={this.props.clickHandler ? () => this.props.clickHandler() : undefined}>
                        <i className={classname} style={this.icon_styles}></i>
                    </div>
                </a>
            );
        }
        else{
            content = (
                <div className="btn" style={this.btn_styles} onClick={this.props.clickHandler ? () => this.props.clickHandler() : undefined}>
                    <i className={classname} style={this.icon_styles}></i>
                </div>
            )
        }

        return content;
    }
}

Button.defaultProps = {
    icon: "user"
}

export default Button;