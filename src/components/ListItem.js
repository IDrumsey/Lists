import React from 'react';

import Text from './Text';
import DeleteButton from './DeleteButton';

class ListItem extends React.Component {

    render() {
        return (
            <div key={this.props.item.id} className="list-item">
                <Text text={this.props.item.name}/>
                <DeleteButton itemId={this.props.item.id} size="30px" ml="auto" mr="5px" icon="check" color="#75ffa5" clickHandler={this.props.deleteItemProps}/>
            </div>
        );
    }
}

export default ListItem;