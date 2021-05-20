import React from 'react';
import Button from './Button';

class ButtonGroup extends React.Component {
    generate_Buttons() {
        let btn_components = [];

        //For each btn obj => create a component instance
        if(this.props.btns !== undefined){
            this.props.btns.forEach((btn, i) => {
                btn_components.push(<Button size={btn.size} color={btn.color} icon={btn.icon} bgColor={btn.bgColor} glow={btn.glow} key={i} to={btn.to} clickHandler={btn.clickEvent}/>);
            });
            return btn_components;
        }
        else{
            return null;
        }
    }

    render() {
        //generate all the btn components
        let btns = this.generate_Buttons();

        if(btns !== null){
            return (
                <div className="btn-group">
                    {btns}
                </div>
            );
        }
        else{
            return <div className="btn-group"></div>
        }
    }
}

export default ButtonGroup;