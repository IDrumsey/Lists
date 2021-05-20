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
        let list_id = this.props.match.params.listId;

        fetch(
            'http://localhost:3000/api/lists/' + list_id, 
            {
                method: 'GET'
            }
        )
        .then(res => res.json())
        .then(
            res => {
                //set list name
                this.setState(
                    {
                        name: res.List.name
                    }
                )
                //for each item id -> fetch the item
                res.List.item_ids.forEach(item_id => {
                    fetch('http://localhost:3000/api/items/' + item_id)
                    .then(res => res.json())
                    .then(
                        res => {
                            // update the state
                            this.setState(
                                {
                                    items: this.state.items.concat(
                                        {
                                            id: res.Item._id,
                                            name: res.Item.name
                                        }
                                    )
                                }
                            )
                        }
                    )
                })
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
        // delete from lists db
        fetch('http://localhost:3000/api/lists/' + this.props.match.params.listId,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                remove_item: id
            })
        }).then(res => res.json())
        .then(
            res => {
                // check if successful -> remove from items db
                fetch('http://localhost:3000/api/items/' + id,
                {
                    method: 'DELETE'
                }).then(res => res.json())
                .then(
                    res => {
                        //check if successful -> update state
                        this.setState({
                            items: [
                                ...this.state.items.filter(item => {
                                    return item.id !== id;
                                })
                            ]
                        });
                    }
                )
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

        let data = {
            name: newItemName
        }

        if(newItemName.length !== 0){
            //add to items db
            fetch('http://localhost:3000/api/items/',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(
                res => {
                    //check for success -> add to lists db
                    if(res.status === "New item created successfully!"){
                        fetch('http://localhost:3000/api/lists/' + this.props.match.params.listId,
                        {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                new_item: res.item._id
                            })
                        })
                        .then(res => res.json())
                        .then(
                            res => {
                                //check if successful -> update state
                                if(res.status === 'list updated'){
                                    //add to state
                                    this.setState(
                                        {
                                            items: [
                                                //new item
                                                {
                                                    id: this.find_available_id(),
                                                    name: newItemName
                                                },
                                                ...this.state.items
                                            ],
                                            addNewItemTemplate: false
                                        }
                                    )
                                }
                            }
                        )
                    }
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