import React from 'react';

import ListItem from './ListItem';

class List extends React.Component {
    wrapper_styles = {
        width: this.props.w
    }

    render() {
        //check for centering
        if(this.props.centered){
            this.wrapper_styles.margin = "auto";
        }


        return (
            <div style={this.wrapper_styles} className="list">
                {
                    this.props.items.map(item => (
                        <ListItem key={item.id} item={item} deleteItemProps={this.props.deleteItemProps}/>
                    ))
                }
            </div>
        );
    }
}

export default List;