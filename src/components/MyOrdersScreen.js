import React, { Component } from 'react';
import { Text, View, ToastAndroid, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { CardItem, Button, Container, Accordion, Icon, Content, Left, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { fetchOrders, addItem } from '../actions';
import CartItem from './CartItem';
import { Common, Screens } from '../styles/Styles';

const { Orders } = Screens;

class MyOrders extends Component {

    constructor(props) {
        super(props);

        this.props.fetchOrders({userId: this.props.user._id || this.props.user.id});
    }

    repeatOrder(order) {
        order.content.items.forEach((item) => {
            this.props.addItem({ item: item.item, quantity: item.quantity });
        });
        ToastAndroid.show('Items added to cart', ToastAndroid.SHORT);
    }

    renderEmptyOrders() {
        if (!this.props.mappedOrders.length) {
            return (
                <Content contentContainerStyle={Orders.content}>
                    <Text style={Orders.text}>You have no orders.</Text>
                    <Button block light onPress={() => Actions.catalog()}>
                        <Text style={Orders.headerText}>Start shopping</Text>
                    </Button>
                </Content>
            )
        }
    }

    renderHeader(card, expanded) {
        return (
            <View style={Orders.header}>
                <Text style={Orders.headerText}>
                    #{card.title}
                </Text>
                { expanded
                    ? <Icon style={Common.greyIcon} name='chevron-down'  type='MaterialCommunityIcons'/>
                    : <Icon style={Common.greyIcon} name='chevron-up' type='MaterialCommunityIcons'/>}
            </View>
        )
    }

    renderRow({ item }) {
        return <CartItem card={item} onRowDeletePress={() => {}} noEditMode='true'/>;
    }

    renderContent(card) {
        return (
            <View>
                <FlatList
                    data={card.content.items}
                    keyExtractor={(item) => {return item.item._id}}
                    renderItem={this.renderRow.bind(this)}
                />
                <CardItem>
                    <Left>
                        <Text>Total: ${card.content.totalSum}</Text>
                    </Left>
                    <Right>
                        <Button style={Orders.button} onPress={() => this.repeatOrder(card)}>
                            <Text>Repeat</Text>
                        </Button>
                    </Right>
                </CardItem>
            </View>
        );
    }

    render() {
        return (
            <Container>
                {this.renderEmptyOrders()}
                <Content padder>
                    <Accordion
                        dataArray={this.props.mappedOrders}
                        renderHeader={this.renderHeader.bind(this)}
                        renderContent={this.renderContent.bind(this)}
                    />
                </Content>
            </Container>
        );
    }
}

const styles = {
    container: Common.container
};

const mapsStateToProps = (state) => {
    const { user } = state.auth;
    const { orders, loading, error } = state.orders;

    const mappedOrders = orders.map(order => {
        order.items.forEach((item, index) => {
            item.item = item.details;
        });

        return {
            title: order._id,
            content: order
        }
    });

    return { user, mappedOrders, loading, error };
};

export default connect(mapsStateToProps, {
    fetchOrders,
    addItem
})(MyOrders);