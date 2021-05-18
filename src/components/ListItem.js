import React from 'react';

import Text from './Text';
import DeleteButton from './DeleteButton';

class ListItem extends React.Component {

    render() {
        let content;
        if(this.props.list){
            content = (
                <div key={this.props.item.id} className="list-item">
                <Text text={this.props.item.name}/>
                <DeleteButton
                    itemId={this.props.item.id}
                    size="30px" ml="auto" mr="5px"
                    icon="check" color="#75ffa5"
                    clickHandler={this.props.deleteItemProps}
                />
                </div>
            )
        }

        if(this.props.home){
            content = (
                    <div key={this.props.item.id} className="list-item">
                        <a href={"/List/" + this.props.item.id}>
                            <Text text={this.props.item.name}/>
                        </a>
                    <DeleteButton
                        itemId={this.props.item.id}
                        size="30px" ml="auto" mr="5px"
                        icon="check" color="#75ffa5"
                        clickHandler={this.props.deleteItemProps}
                    />
                    </div>
            )
        }

        return content;
    }
}

export default ListItem;