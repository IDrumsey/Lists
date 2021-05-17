import React from 'react';

import ListItem from './ListItem';
import NewListItem from './NewListItem';

class List extends React.Component {
    state = {
        newItemShowing: false
    }
    wrapper_styles = {
        width: this.props.w,
        margin: this.props.centered ? "auto" : "none"
    }

    componentDidUpdate(prevProps){
        if(prevProps.showingNewItemTemplate !== this.props.showingNewItemTemplate){
            console.log("updated list show")
            this.setState(
                {
                    newItemShowing: this.props.showingNewItemTemplate
                }
            )
        }
    }

    render() {
        console.log("rendering list component : ", this.state.newItemShowing)

        let content;

        if(!this.state.newItemShowing){
            content = (
                <div style={this.wrapper_styles} className="list">
                    {
                        this.props.items.map(item => (
                            <ListItem key={item.id} item={item} deleteItemProps={this.props.deleteItemProps}/>
                        ))
                    }
                </div>
            );
        }
        else{
            content = (
                <div style={this.wrapper_styles} className="list">
                    <NewListItem
                        addItemProps = {this.props.addItemProps}
                        removeNewItemTemplateHandler = {this.props.removeNewItemTemplateHandler}
                    />
                    {
                        this.props.items.map(item => (
                            <ListItem key={item.id} item={item} deleteItemProps={this.props.deleteItemProps}/>
                        ))
                    }
                </div>
            );
        }

        return content;
    }
}

export default List;