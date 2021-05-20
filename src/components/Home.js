import React from 'react';

import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            addNewItemTemplate: false
        }
    }

    // Load data on mount
    componentDidMount() {
        //get all lists
        fetch('http://localhost:3000/api/lists', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
            //update state to have all lists
            this.setState(
                {
                    items: res.List.map(list => {
                        return {
                            id: list._id,
                            name: list.name
                        }
                    })
                }
            )
        })
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
        // remove all items -> get list items
        fetch('http://localhost:3000/api/lists/' + id)
            .then(res => res.json())
            .then(
                res => {
                    if(res.List !== undefined){
                        //remove all items
                        res.List.item_ids.forEach(item_id => {
                            fetch('http://localhost:3000/api/items/' + item_id,
                            {
                                method: 'DELETE',
                            })
                        });

                        //remove the list
                        fetch('http://localhost:3000/api/lists/' + id,
                        {
                            method: 'DELETE'
                        }).then(res => res.json())
                        .then(
                            res => {
                                if(res.status === "success"){
                                    //update state
                                    this.setState({
                                        items: [
                                            ...this.state.items.filter(item => {
                                                return item.id !== id;
                                            })
                                        ]
                                    });
                                }
                            }
                        )
                    }
                }
            )
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
            // add list to db
            fetch('http://localhost:3000/api/lists',
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: newItemName
                })
            }).then(res => res.json())
            .then(
                res => {
                    // Add the item
                    if(res.status === "success")
                    this.setState(
                        {
                            items: [
                                {
                                    id: res.list._id,
                                    name: newItemName
                                },
                                ...this.state.items
                            ],
                            addNewItemTemplate: false
                        }
                    )
                }
            )
        }
    }

    render() {
        return (
            <div id="container">
                <Top title="Your Lists"/>
                <Middle
                    home
                    items={this.state.items}
                    deleteItemProps={this.delete_list_item}
                    addItemProps={this.add_item}
                    showingNewItemTemplate={this.state.addNewItemTemplate}
                    showNewItemTemplateHandler = {this.show_new_item_template}
                    removeNewItemTemplateHandler = {this.remove_new_item_template}
                />
                <Bottom home/>
            </div>
        )
    }
}

export default Home;