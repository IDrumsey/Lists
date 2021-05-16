import React from 'react';

import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';

class ListContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "Grocery List",
            test: 1,
            items: [
                {
                    id: 1,
                    name: "Spinach"
                },
                {
                    id: 2,
                    name: "Salad Dressing"
                },
                {
                    id: 3,
                    name: "Tomatoes"
                },
                {
                    id: 4,
                    name: "Milk"
                },
                {
                    id: 5,
                    name: "Milk"
                },
                {
                    id: 6,
                    name: "Milk"
                },
                {
                    id: 7,
                    name: "Milk"
                },
                {
                    id: 8,
                    name: "Milk"
                }
            ]
        }
    }

    // Events

    delete_list_item = id => {
        console.log("deleting : ", id);
        console.log("before : ", this.state)
        this.setState({
            test: 2
        }, ()=>{
            console.log("after : ", this.state)
        })
    }

    render() {
        return (
            <div id="container">
                <Top title={this.state.name}/>
                <Middle
                    list
                    items={this.state.items}
                    deleteItemProps={this.delete_list_item}
                />
            </div>
        )
    }
}

export default ListContainer;