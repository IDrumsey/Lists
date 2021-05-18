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
            this.setState(
                {
                    newItemShowing: this.props.showingNewItemTemplate
                }
            )
        }
    }

    render() {

        let content;

        if(this.props.list){
            if(!this.state.newItemShowing){
                content = (
                    <div style={this.wrapper_styles} className="list">
                        {
                            this.props.items.map(item => (
                                <ListItem list key={item.id} item={item} deleteItemProps={this.props.deleteItemProps}/>
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
                                <ListItem list key={item.id} item={item} deleteItemProps={this.props.deleteItemProps}/>
                            ))
                        }
                    </div>
                );
            }
        }

        if(this.props.home){
            if(!this.state.newItemShowing){
                content = (
                    <div style={this.wrapper_styles} className="list">
                        {
                            this.props.items.map(item => (
                                <ListItem home key={item.id} item={item} deleteItemProps={this.props.deleteItemProps}/>
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
                                <ListItem home key={item.id} item={item} deleteItemProps={this.props.deleteItemProps}/>
                            ))
                        }
                    </div>
                );
            }
        }

        return content;
    }
}

export default List;