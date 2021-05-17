import React from 'react';

import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';

class ListContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "Grocery List",
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
                }
            ],
            addNewItemTemplate: false
        }
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
        console.log("showing new item template")
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

        if(newItemName.length != 0){
            // Add the item
            this.setState(
                {
                    items: [
                        ...this.state.items,
                        {
                            id: this.find_available_id(),
                            name: newItemName
                        }
                    ],
                    addNewItemTemplate: false
                },
                ()=>{
                    console.log(this.state)
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
            </div>
        )
    }
}

export default ListContainer;