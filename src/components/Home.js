import React from 'react';

import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';

import { PORT, getAccessToken, checkAuth, deleteCookie } from '../common';

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
        // fetch('http://localhost:' + PORT + '/api/lists', {
        //     method: 'GET'
        // })
        // .then(res => res.json())
        // .then(res => {
        //     //update state to have all lists
        //     this.setState(
        //         {
        //             items: res.List.map(list => {
        //                 return {
        //                     id: list._id,
        //                     name: list.name
        //                 }
        //             })
        //         }
        //     )
        // })

        fetch('http://localhost:' + PORT + '/api/users/' + this.props.match.params.userId, {
            headers: {
                authorization: "Bearer " + getAccessToken()
            }
        })
            .then(res => res.json())
            .then(res => {
                // reroute if not authorized
                if(checkAuth(res)){
                    //get all the lists' info
                    res.User.list_ids.forEach(list_id => {
                        fetch('http://localhost:' + PORT + '/api/lists/' + list_id, {
                            headers: {
                                authorization: "Bearer " + getAccessToken()
                            }
                        })
                            .then(response => response.json())
                            .then(
                                response => {
                                    if(checkAuth(response)){
                                        // update state with list
                                        this.setState({
                                            items: [
                                                ...this.state.items,
                                                response.List
                                            ]
                                        })
                                    }
                                }
                            )
                    })
                }
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
        fetch('http://localhost:' + PORT + '/api/lists/' + id, {
            headers: {
                authorization: "Bearer " + getAccessToken()
            }
        })
            .then(res => res.json())
            .then(
                res => {
                    // reroute if not authorized
                    if(checkAuth(res)){
                        if(res.List !== undefined){
                            //remove all items
                            res.List.item_ids.forEach(item_id => {
                                fetch('http://localhost:' + PORT + '/api/items/' + item_id,
                                {
                                    method: 'DELETE',
                                    headers: {
                                        authorization: "Bearer " + getAccessToken()
                                    }
                                })
                            })
    
                            //remove ref from user
                            fetch('http://localhost:' + PORT + '/api/users/' + this.props.match.params.userId,
                            {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    authorization: "Bearer " + getAccessToken()
                                },
                                body: JSON.stringify({
                                    remove_list: id
                                })
                            }).then(res => res.json())
    
                            //remove the list
                            fetch('http://localhost:' + PORT + '/api/lists/' + id,
                            {
                                method: 'DELETE',
                                headers: {
                                    authorization: "Bearer " + getAccessToken()
                                },
                            }).then(res => res.json())
                            .then(
                                res => {
                                    if(res.status === "success"){
                                        //update state
                                        this.setState({
                                            items: [
                                                ...this.state.items.filter(item => {
                                                    return item._id !== id;
                                                })
                                            ]
                                        });
                                    }
                                }
                            )
                        }
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
            fetch('http://localhost:' + PORT + '/api/lists',
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    authorization: "Bearer " + getAccessToken()
                },
                body: JSON.stringify({
                    name: newItemName,
                    user_id: this.props.match.params.userId
                })
            }).then(res => res.json())
            .then(
                res => {
                    // reroute if not authorized
                    if(checkAuth(res)){
                        // Add the item
                        if(res.status === "success"){
                            // Ref this list to the user
                            fetch('http://localhost:' + PORT + '/api/users/' + this.props.match.params.userId,
                            {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    authorization: "Bearer " + getAccessToken()
                                },
                                body: JSON.stringify({
                                    new_list: res.list._id
                                })
                            }).then(response => response.json())
                            .then(
                                response => {
                                    //check if authorized
                                    if(checkAuth(response)){
                                        this.setState(
                                            {
                                                items: [
                                                    res.list,
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
                }
            )
        }
    }

    // logout
    logout() {
        // remove the access token
        deleteCookie("token");
        deleteCookie("user_id");

        //route to login
        window.location.href = "/Login";
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
                <Bottom
                    home
                    logoutHandler={this.logout}
                />
            </div>
        )
    }
}

export default Home;