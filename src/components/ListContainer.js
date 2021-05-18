import React from 'react';

import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';

class ListContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "Grocery List",
            items: [],
            addNewItemTemplate: false
        }
    }

    // Load data on mount
    componentDidMount() {
        console.log("Fetching list data")

        fetch("http://localhost:8000/api/lists/" + this.props.match.params.listId)
        .then(res => res.json())
        .then(
            result => {
                this.setState(
                    {
                        items: result.items
                    }
                )
            }
        )
    }

    find_available_id = () => {
        let id = 1;
        let available;

        do{
            available = true;
            for(let i = 0; i < this.state.items.length; i++){
                let item = this.state.items[i];

                if(item.id === id){
                    available = false;
                    id++;
                    break;
                }
            }
        }while(!available)

        return id;
    }

    // Events

    // https://ibaslogic.com/react-form-handling/

    // Remove an item
    delete_list_item = id => {
        this.setState({
            items: [
                ...this.state.items.filter(item => {
                    return item.id !== id;
                })
            ]
        });
    }

    // Show the new item template
    show_new_item_template = () => {
        this.setState(
            {
                addNewItemTemplate: true
            }
        )
    }

    remove_new_item_template = () => {
        this.setState(
            {
                addNewItemTemplate: false
            }
        )
    }

    // Add an item
    add_item = () => {
        let newItemName = document.getElementById("new-item-name").value;

        if(newItemName.length !== 0){
            // Add the item
            this.setState(
                {
                    items: [
                        {
                            id: this.find_available_id(),
                            name: newItemName
                        },
                        ...this.state.items
                    ],
                    addNewItemTemplate: false
                }
            )

            console.log("updating db")
            console.log(sessionStorage.getItem("API_Token"))
            //add the item to db
            const push_settings = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newItemName,
                    user_id: 1,
                    list_id: this.props.match.params.listId
                })
            }

            const req_config = {
                headers: { Authorization: 'Bearer ' + sessionStorage.getItem("API_Token")}
            }

            fetch("http://localhost:8000/api/items", push_settings, req_config)
            .then(
                res => res.json()
            )
            .then(
                result => {
                    console.log(result)
                }
            )
        }
    }

    render() {
        return (
            <div id="container">
                <Top title={this.state.name}/>
                <Middle
                    list
                    items={this.state.items}
                    deleteItemProps={this.delete_list_item}
                    addItemProps={this.add_item}
                    showingNewItemTemplate={this.state.addNewItemTemplate}
                    showNewItemTemplateHandler = {this.show_new_item_template}
                    removeNewItemTemplateHandler = {this.remove_new_item_template}
                />
                <Bottom list/>
            </div>
        )
    }
}

export default ListContainer;