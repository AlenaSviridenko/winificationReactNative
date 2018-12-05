import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity  } from 'react-native';
import { connect } from 'react-redux';
import { Content, Card, CardItem, Left, Container, Right, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

import PageHeader from './PageHeader';
import CartItem from './CartItem';
import { removeItem } from '../actions';
import { Common, Screens } from '../styles/Styles';

const { Cart } = Screens;

class CartScreen extends Component {

    renderRow({ item, index }) {
        return <CartItem card={item} onRowDeletePress={() => this.deleteRow({ item, index })}/>;
    }

    deleteRow({ item, index }) {
        this.props.removeItem({index, quantity: item.quantity, price: item.item.price})
    }

    onOrderButtonPress() {
        if (this.props.auth.user && (this.props.auth.user.id || this.props.auth.user._id)) {
            Actions.deliveryConfirmation();
        } else {
            Actions.login();
        }
    }

    renderEmptyCart () {
        if (!this.props.cart.cart.length) {
            return (
                <Content contentContainerStyle={Common.container}>
                    <Text style={Cart.text}>Your cart is empty!</Text>
                    <TouchableOpacity style={Cart.button} onPress={() => Actions.catalog()}>
                        <Text>Start shopping</Text>
                    </TouchableOpacity>
                </Content>
            );
        }
    }

    render() {
        return (
            <Container>
                <PageHeader headerText="Cart" drawerOpen={() => this.props.navigation.openDrawer()}/>
                {this.renderEmptyCart()}
                <FlatList
                    data={this.props.cart.cart}
                    keyExtractor={(item, index) => {return item.item._id || item._id}}
                    renderItem={this.renderRow.bind(this)}
                />
                <Card transparent style={Cart.totalPriceSection}>
                    <CardItem>
                        <Left>
                            <Text>Total: ${this.props.cart.totalAmount}</Text>
                        </Left>
                        <Right>
                            <Button style={Cart.orderButton} onPress={this.onOrderButtonPress.bind(this)}>
                                <Text>Checkout</Text>
                            </Button>
                        </Right>
                    </CardItem>
                </Card>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    const { cart, count, totalAmount, auth } = state;
    return { cart, count, totalAmount, auth };
};

export default connect(mapStateToProps, { removeItem })(CartScreen);