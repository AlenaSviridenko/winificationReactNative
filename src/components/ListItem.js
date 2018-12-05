import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Image, ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Icon, Left, Card, CardItem, Body, Button } from 'native-base';

import { addItem, updateItem } from '../actions';
import { Common, Items } from '../styles/Styles';

const { List } = Items;

class ListItem extends Component {
    onRowPress() {
        Actions.viewItem({ title: this.props.card.name, card: this.props.card });
    }

    onItemAddPress() {
        let updated = false;
        if (this.props.cart.cart.length) {
            this.props.cart.cart.forEach(item => {
                if (item.item._id === this.props.card._id) {
                    this.props.updateItem({ item: this.props.card, quantity: 1 });
                    ToastAndroid.show('Added another one', ToastAndroid.SHORT);
                    updated = true;
                }
            })
        }

        if (!updated) {
            this.props.addItem({ item: this.props.card, quantity: 1 });
            ToastAndroid.show('Item Added', ToastAndroid.SHORT);
        }
    }

    renderButton() {

        if (this.props.user && this.props.user.isAdmin) {
            return (
                <Button style={List.button} onPress={() => {Actions.editItem({model: this.props.card})} }>
                    <Text>EDIT</Text>
                </Button>
            )
        }

        return (
            <Button style={List.button}  onPress={this.onItemAddPress.bind(this)}>
                <Text>ADD TO CART</Text>
            </Button>
        )
    }

    render() {
        const { card } = this.props;

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <Card>
                        <CardItem bordered style={{ flex: 2 }}>
                            <Left>
                                <Image source={card.image} style={Common.standardImage}/>
                            </Left>
                            <Body>
                                <Text style={Common.title}>{card.name}</Text>
                                <Text style={Common.note}>{card.type}, {card.country}, {card.year}</Text>
                                <Text numberOfLines={4}>{card.desc}</Text>
                            </Body>
                        </CardItem>
                        <CardItem footer bordered>
                            <Left style={Common.priceSection}>
                                <Icon name='pricetag' style={Common.defaultColorIcon} />
                                <Text>${card.price}</Text>
                            </Left>
                            {this.renderButton()}
                        </CardItem>
                    </Card>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const mapStateToProps = state => {
    const { item, cart } = state;
    const { user } = state.auth;
    return { item, cart, user };
};

export default connect(mapStateToProps, {
    addItem,
    updateItem
})(ListItem);
