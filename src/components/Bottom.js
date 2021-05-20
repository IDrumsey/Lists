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
                glow: "#fff",
                to: "/Register"
            },
    
            {
                size: "75px",
                color: "#000",
                icon: "sign-in",
                bgColor: "#fff",
                glow: "#fff",
                to: "Login"
            }
        ];
    }

    if(props.list){
        btns = [
            {
                size: "75px",
                color: "#000",
                icon: "sign-out",
                bgColor: "#fff",
                glow: "#fff"
            },
    
            {
                size: "75px",
                color: "#000",
                icon: "home",
                bgColor: "#fff",
                glow: "#fff",
                to: "/Home"
            }
        ]
    }

    if(props.home){
        btns = [
            {
                size: "75px",
                color: "#000",
                icon: "sign-out",
                bgColor: "#fff",
                glow: "#fff",
                to: "/Login"
            }
        ]
    }

    if(props.login){
        btns = [
            {
                size: "75px",
                color: "#000",
                icon: "user-plus",
                bgColor: "#fff",
                glow: "#fff",
                to: '/Register'
            },
            {
                size: "75px",
                color: "#000",
                icon: "sign-in",
                bgColor: "#fff",
                glow: "#fff",
                clickEvent: props.signInHandler
            }
        ]
    }

    if(props.register){
        btns = [
            {
                size: "75px",
                color: "#000",
                icon: "sign-in",
                bgColor: "#fff",
                glow: "#fff",
                to: '/Login'
            },
            {
                size: "75px",
                color: "#000",
                icon: "user-plus",
                bgColor: "#fff",
                glow: "#fff",
                clickEvent: props.registerHandler
            }
        ]
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