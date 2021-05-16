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
        backgroundColor: this.props.bgColor
    }

    icon_styles = {
        fontSize: (parseInt(this.props.size) / 1.75) + "px",
        color: this.props.color
    }

    // Events

    render() {
        //check for centering
        if(this.props.centered){
            this.btn_styles.display = "block";
            this.btn_styles.margin = "auto";
        }

        //check for margin
        if(this.props.ml){
            this.btn_styles.marginLeft = this.props.ml;
        }
        if(this.props.mr){
            this.btn_styles.marginRight = this.props.mr;
        }
        if(this.props.mt){
            this.btn_styles.marginTop = this.props.mt;
        }
        if(this.props.mb){
            this.btn_styles.marginBottom = this.props.mb;
        }

        let classname = "fa fa-" + this.props.icon + " btn-icon";
        return (
            <div className="btn" style={this.btn_styles} onClick={() => this.props.clickHandler(this.props)}>
                <i className={classname} style={this.icon_styles}></i>
            </div>
        );
    }
}

Button.defaultProps = {
    icon: "user"
}

export default Button;