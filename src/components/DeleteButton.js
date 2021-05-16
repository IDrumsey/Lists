import Button from './Button';

class DeleteButton extends Button {
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
            <div className="btn" style={this.btn_styles} onClick={() => this.props.clickHandler(this.props.itemId)}>
                <i className={classname} style={this.icon_styles}></i>
            </div>
        );
    }
}

export default DeleteButton;