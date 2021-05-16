import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';
import React from 'react';

class Welcome extends React.Component {

    render() {
        return (
            <div id="container">
                <Top title="Lists"/>
                <Middle welcome/>
                <Bottom welcome/>
            </div>
        )
    }
}

export default Welcome;