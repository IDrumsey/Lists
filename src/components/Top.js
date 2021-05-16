import Text from './Text';

function Top(props) {
    return (
        <div className="top">
            <Text text={props.title} styles={{fontSize: "50px", color: "#fff"}} xCentered/>
        </div>
    );
}

export default Top;