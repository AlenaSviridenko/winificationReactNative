import React, { Component } from 'react';
import { Header, Left, Right, Body, Icon, Badge, Button  } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Text, Image } from 'react-native';

import { Common, Items } from '../styles/Styles';

const { PageCustomHeader } = Items;

class PageHeader extends Component {

    onCartPress() {
        Actions.cart();
    }

    onAddItemPress() {
        Actions.addItem();
    }

    renderCartIcon() {
        if (this.props.cart && this.props.cart.cart.length > 0) {
            return (
                <Button transparent style={PageCustomHeader.button} onPress={() => this.onCartPress()}>
                    <Badge style={PageCustomHeader.badge}>
                        <Text>{this.props.cart.count}</Text>
                    </Badge>
                    <Icon name='cart' style={PageCustomHeader.cartIcon} />
                </Button>
            );
        }
    }

    renderAddIcon() {
        if (this.props.user && this.props.user.isAdmin) {
            return (
                <Button transparent style={PageCustomHeader.button} onPress={() => this.onAddItemPress()}>
                    <Icon name='plus' type='MaterialCommunityIcons' style={PageCustomHeader.cartIcon} />
                </Button>
            );
        }
    }

    render() {
        return (
            <Header style={Common.header}>
                <Left>
                    <Icon name='menu' style={PageCustomHeader.iconStyle} onPress={() => this.props.drawerOpen()}/>
                </Left>
                <Body style={Common.priceSection}>
                    <Image source={require('../images/logo.png')} style={PageCustomHeader.logo} />
                    <Text style={Common.headerTextStyle}>{this.props.headerText}</Text>
                </Body>
                <Right>
                    {this.renderCartIcon()}
                    {this.renderAddIcon()}
                </Right>
            </Header>
        );
    }
}

const mapStateToProps = state => {
    const { cart, totalAmount, count } = state;
    const { user } = state.auth;
    return { cart, count, totalAmount, user };
};

export default connect(mapStateToProps)(PageHeader);
