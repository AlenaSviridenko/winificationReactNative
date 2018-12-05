import React, { Component } from 'react';
import { Text, View,ActivityIndicator, FlatList, Image } from 'react-native';
import { connect } from 'react-redux';
import { CardItem, Button, Container, Left, Right, Card } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { placeOrder  } from '../actions';
import { Common, Screens, Colors } from '../styles/Styles';

const { DeliveryConfirmation } = Screens;

class DeliveryConfirmationScreen extends Component {
    getName() {
        return this.props.user.firstName
            ? this.props.user.firstName + this.props.user.lastName
            : this.props.user.name;
    }

    onPlaceOrderPress() {
        const { street, city, country, zip, phone, email } = this.props.user;
        const items = this.props.cart.map(item => {
            return {
                itemId: item.item._id,
                quantity: item.quantity
            }
        });

        this.props.placeOrder({
            items: items,
            totalSum: this.props.totalAmount,
            userId: this.props.user._id || this.props.user.id,
            address: { street, city, country, zip, phone, email }
        });
    }

    renderButton() {
        const buttonContent = this.props.loading ? <ActivityIndicator size='large'/> : <Text>PLACE ORDER</Text>;

        return (
            <Button block light style={DeliveryConfirmation.button} onPress={this.onPlaceOrderPress.bind(this)}>
                {buttonContent}
            </Button>
        )
    }

    render() {
        return (
            <Container>
                <Card style={DeliveryConfirmation.card}>
                    <CardItem header>
                        <Left>
                            <Text style={DeliveryConfirmation.header}>MY BAG</Text>
                        </Left>
                        <Right>
                            <Button light style={[DeliveryConfirmation.button, { backgroundColor: Colors.almostWhite}]} onPress={Actions.cart}>
                                <Text>VIEW</Text>
                            </Button>
                        </Right>
                    </CardItem>
                    <CardItem>
                        <FlatList
                            data={this.props.cart}
                            numColumns={2}
                            keyExtractor={(item, index) => {return item.item._id || item._id}}
                            renderItem={({item}) => {
                                return <Image
                                    source={item.item.image} style={Common.standardImage}
                                />
                            }}
                        />
                    </CardItem>
                </Card>
                <Card style={DeliveryConfirmation.card}>
                    <CardItem>
                        <Left>
                            <Text style={DeliveryConfirmation.header}>DELIVERY ADDRESS</Text>
                        </Left>
                        <Right>
                            <Button light style={DeliveryConfirmation.button} onPress={() => Actions.addressBook()}>
                                <Text>CHANGE</Text>
                            </Button>
                        </Right>
                    </CardItem>
                    <CardItem>
                        <View style={DeliveryConfirmation.deliveryCard}>
                            <Text>{this.getName()}</Text>
                            <Text>{this.props.user.street}</Text>
                            <Text>{this.props.user.city}</Text>
                            <Text>{this.props.user.country}</Text>
                            <Text>{this.props.user.zip}</Text>
                            <Text>{this.props.user.phone}</Text>
                        </View>
                    </CardItem>
                </Card>
                <Card style={DeliveryConfirmation.card}>
                    <CardItem style={DeliveryConfirmation.total}>
                        <Left>
                            <Text style={DeliveryConfirmation.header}>TOTAL TO PAY:</Text>
                        </Left>
                        <Right>
                            <Text style={DeliveryConfirmation.header}>${this.props.totalAmount}</Text>
                        </Right>
                    </CardItem>
                    <CardItem body>
                        {this.renderButton()}
                    </CardItem>
                    <CardItem>
                        <Text style={Common.errorText}>{this.props.error}</Text>
                        <Text>{this.props.message}</Text>
                    </CardItem>
                </Card>
            </Container>
        );
    }
}

const styles = {
    container: Common.Container
};

const mapsStateToProps = (state) => {
    console.log(state);

    const { user } = state;
    const { cart, totalAmount, error, message, loading } = state.cart;

    return { user, cart, totalAmount, error, message, loading };
};

export default connect(mapsStateToProps,{
    placeOrder
})(DeliveryConfirmationScreen);