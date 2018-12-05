import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Image, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Icon, Left, Right, Card, CardItem,  Body, Button } from 'native-base';

import { updateItem } from '../actions';
import { Common, Items } from '../styles/Styles';

const { Cart } = Items;

class CartItem extends Component {
    state = {
        inEditMode: false
    };

    onRowPress() {
        Actions.viewItem({ title: this.props.card.item.name, card: this.props.card.item });
    }

    onQuantityChange(quantity) {
        const diff = parseInt(quantity) - this.props.card.quantity;
        this.props.updateItem({ item: this.props.card.item, quantity: diff });
    }

    renderEditButton() {
        if (!this.props.noEditMode) {
            return (
                <Right>
                    <Button transparent dark onPress={()=> this.setState({ inEditMode: true })}>
                        <Icon name="options"/>
                    </Button>
                    <Button transparent danger onPress={this.props.onRowDeletePress}>
                        <Icon name="trash"/>
                    </Button>
                </Right>
            );
        }
    }

    renderCardView() {
        const { card } = this.props;

        if (this.state.inEditMode) {
            return (
                <Card>
                    <CardItem bordered>
                        <Left>
                            <Image source={card.item.image} style={Common.standardImage}/>
                        </Left>
                        <Body>
                        <Text style={Common.title}>{card.item.name}</Text>
                        <Text style={Common.note}>{card.item.type}, {card.item.country}, {card.item.year}, ${card.item.price}</Text>
                        <Picker
                            style={Cart.picker}
                            selectedValue={card.quantity.toString()}
                            onValueChange={this.onQuantityChange.bind(this)}
                        >
                            <Picker.Item label="Qty: 1" value="1" />
                            <Picker.Item label="Qty: 2" value="2" />
                            <Picker.Item label="Qty: 3" value="3" />
                            <Picker.Item label="Qty: 4" value="4" />
                            <Picker.Item label="Qty: 5" value="5" />
                            <Picker.Item label="Qty: 6" value="6" />
                            <Picker.Item label="Qty: 7" value="7" />
                            <Picker.Item label="Qty: 8" value="8" />
                            <Picker.Item label="Qty: 9" value="9" />
                            <Picker.Item label="Qty: 10" value="10" />
                        </Picker>
                        </Body>
                        <Right>
                            <Button transparent success onPress={()=> this.setState({ inEditMode: false })}>
                                <Icon name="md-checkmark"/>
                            </Button>
                        </Right>
                    </CardItem>
                </Card>
            )
        }

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <Card>
                    <CardItem bordered style={Cart.cardItem}>
                        <Left>
                            <Image source={card.item.image} style={Common.standardImage}/>
                        </Left>
                        <Body>
                        <Text style={Common.title}>{card.item.name}</Text>
                        <Text style={Common.note}>{card.item.type}, {card.item.country}, {card.item.year}</Text>
                        <Text numberOfLines={3}>{card.item.desc}</Text>
                        <Text style={Cart.priceQuantity}>${card.item.price} / Qty: {card.quantity}</Text>
                        </Body>
                        {this.renderEditButton()}
                    </CardItem>
                </Card>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        return (
            <View>
                {this.renderCardView()}
            </View>
        );
    }
};

const mapStateToProps = () => {
    return {};
};

export default connect(mapStateToProps, { updateItem })(CartItem);
