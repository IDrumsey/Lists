import React from 'react';

import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [
                {
                    id: 1,
                    name: "Grocery List"
                }
            ],
            addNewItemTemplate: false
        }
    }

    // Load data on mount
    componentDidMount() {
        let csrfToken = document.getElementsByName('csrf-token')[0].getAttribute("content");
        console.log("csrf token : ", csrfToken);
        const test_user_creds = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({
                email: "testEmail2@email",
                password: "testP@ssword2"
            })
        }

        //get the user token
        console.log("Fetching user data")
        fetch("http://localhost:8000/api/login", test_user_creds)
        .then(res => res.json())
        .then(
            result => {
                console.log(result)
                //set the session token to the user's token
                sessionStorage.setItem("API_Token", result.token);
            }
        )

        console.log("Fetching home data")

        fetch("http://localhost:8000/api/lists")
        .then(res => res.json())
        .then(
            result => {
                this.setState(
                    {
                        items: result
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