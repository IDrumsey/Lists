import ButtonGroup from './ButtonGroup';

function Bottom(props) {
    // Btns for the welcome page
    let btns = [];
    
    // Welcome page btns
    if(props.welcome){
        btns = [
            {
                size: "75px",
                color: "#000",
                icon: "user",
                bgColor: "#fff",
                glow: "#fff"
            },
    
            {
                size: "75px",
                color: "#000",
                icon: "sign-in",
                bgColor: "#fff",
                glow: "#fff"
            }
        ];
    }
    
    return (
        <div className="bottom">
            {/* <Button size="75px" color="#000" icon="user" bgColor="#fff" glow="#fff"/>
            <Button size="75px" color="#000" icon="sign-in" bgColor="#fff" glow="#fff"/> */}
            <ButtonGroup btns={btns}/>
        </div>
    );
}

export default Bottom;