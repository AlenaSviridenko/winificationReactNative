import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Text, ScrollView, Image, Dimensions, ToastAndroid } from 'react-native';
import {Icon, Left, Button, Card, CardItem, Thumbnail, Body, Container} from 'native-base';

import { QuantitySelector } from './common';
import { addItem, increaseQuantity, decreaseQuantity, updateQuantity, updateItem } from '../actions';
import { Common, Pages } from '../styles/Styles';

const { Item } = Pages;
const { width } = Dimensions.get('window');
const height = width * 0.8;

class ItemPage extends Component {

    renderButton() {
        if (this.props.user && this.props.user.isAdmin) {
            return (
                <Button style={Item.button} onPress={() => {Actions.editItem({model: this.props.card})} }>
                    <Text>EDIT</Text>
                </Button>
            )
        }

        return (
            <Button style={Item.button} onPress={this.onItemAddPress.bind(this)}>
                <Text>ADD TO BAG</Text>
            </Button>
        )
    }

    onIncrease() {
        if (this.props.item.quantity < 10) {
            this.props.increaseQuantity();
            return;
        }
        ToastAndroid.show('No more items available', ToastAndroid.SHORT);
    }

    onDecrease() {
        if (this.props.item.quantity > 0) {
            this.props.decreaseQuantity()
        }
    }

    onQuantitySet(value) {
        if (value > 10) {
            ToastAndroid.show('No more items available. Max possible value: ' + 10, ToastAndroid.SHORT);
            return;
        }

        this.props.updateQuantity(value)
    }

    onItemAddPress() {

        let updated = false;
        if (this.props.cart.cart.length) {
            this.props.cart.cart.forEach(item => {
                if (item.item._id === this.props.card._id) {
                    this.props.updateItem({ item: this.props.card, quantity: this.props.item.quantity });
                    ToastAndroid.show('Added another one', ToastAndroid.SHORT);
                    updated = true;
                }
            })
        }

        if (!updated) {
            this.props.addItem({ item: this.props.card, quantity: this.props.item.quantity });
            ToastAndroid.show('Item Added', ToastAndroid.SHORT);
        }
    }

    render() {
        const { card } = this.props;
        const { image } = styles;

        return (
            <Container>
            <ScrollView>
                <Card>
                    <CardItem bordered>
                        <Left>
                            <Thumbnail source={card.thumbnail} />
                            <Body>
                            <Text style={Item.title}>{card.name}</Text>
                            <Text note>{card.type}, {card.country}, {card.year}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody bordered>
                        <Image style={image} source={card.image} resizeMode='contain'/>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Text>{card.desc}</Text>
                        </Left>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Icon name='pricetag' style={Common.defaultColorIcon}/>
                            <Text>${card.price}</Text>
                        </Left>
                        <QuantitySelector
                            onDecrease={this.onDecrease.bind(this)}
                            onIncrease={this.onIncrease.bind(this)}
                            value={this.props.item.quantity}
                            onChangeText={this.onQuantitySet.bind(this)}
                        />
                        {this.renderButton()}
                    </CardItem>
                </Card>
            </ScrollView>
            </Container>
        );
    }
}

const styles = {
    image: {
        width,
        height
    }
};

const mapStateToProps = (state) => {
    const { item, cart } = state;
    const { user } = state.auth;
    return { item, user, cart };
};

export default connect(mapStateToProps, {
    addItem,
    updateItem,
    decreaseQuantity,
    increaseQuantity,
    updateQuantity
})(ItemPage);

