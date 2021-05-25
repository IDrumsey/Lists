import React from 'react'

class Spinner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showing: false,
            spin: false,
            styles: {
                color: "#fff",
                size: "50px",
                display: "none"
            }
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log(prevProps, prevState)
    }

    componentDidUpdate(){
        this.getSnapshotBeforeUpdate()
    }

    start = () => {
        this.setState({
            showing: true,
            spin: true,
            styles: {
                display: "block"
            }
        })
    }

    stop = () => {
        this.setState({
            showing: false,
            spin: false,
            styles: {
                display: "none"
            }
        })
    }

    render() {
        let classNames = "fa fa-spinner spinner";
        if(this.state.spin){
            classNames += " spinning"
        }

        let content = (
            <i key={1} style={{color: this.state.styles.color, fontSize: this.state.styles.size, display: this.state.styles.display}} className={classNames}></i>
        );

        return content;
    }
}

export default Spinner;