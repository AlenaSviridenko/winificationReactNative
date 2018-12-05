import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Image, ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Icon, Left, Right, Card, CardItem, Body, Button } from 'native-base';

import { addItem } from '../actions';
import { Common, Items } from '../styles/Styles';

const { CartList, Cart } = Items;

class CartListItem extends Component {
    onRowPress() {
        Actions.viewItem({ title: this.props.card.name, card: this.props.card });
    }

    onItemAddPress() {
        this.props.addItem({ item: this.props.card, quantity: 1 });
        ToastAndroid.show('Item Added', ToastAndroid.SHORT);
    }

    render() {
        const { card } = this.props;

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <Card>
                        <CardItem bordered style={Cart.cardItem}>
                            <Left>
                                <Image source={card.image} style={Common.standardImage} resizeMode="contain"/>
                            </Left>
                            <Body>
                            <Text style={Common.title}>{card.name}</Text>
                            </Body>
                            <Right>

                            </Right>
                        </CardItem>
                        <CardItem footer bordered>
                            <Left style={Common.priceSection}>
                                <Icon name='pricetag' style={Common.lightGreyIcon} />
                                <Text>${card.price}</Text>
                            </Left>
                            <Button style={CartList.button}  onPress={this.onItemAddPress.bind(this)}>
                                <Text>Add to cart</Text>
                            </Button>
                        </CardItem>
                    </Card>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const mapStateToProps = state => {
    const { item } = state;
    return { item };
};

export default connect(mapStateToProps, {
    addItem
})(CartListItem);
