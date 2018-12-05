import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Content, List, ListItem, Header, Icon, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';

import { Common } from '../styles/Styles';

class Menu extends Component {

    logout() {
        this.props.logoutUser();
        this.props.navigation.closeDrawer();
    }

    renderSignedInMenu() {
        if (this.props.user && (this.props.user.id || this.props.user._id)) {
            return (
                <View>
                    <ListItem  onPress={() => Actions.account()}>
                        <Icon name='person' style={Common.defaultColorIcon} />
                        <Text>Account</Text>
                    </ListItem>
                    <ListItem  onPress={this.logout.bind(this)}>
                        <Icon name='log-out' style={Common.defaultColorIcon} />
                        <Text>Logout</Text>
                    </ListItem>
                </View>
            );
        }
    }

    renderNotSignedInMenu() {
        if (!this.props.user || (!this.props.user._id && !this.props.user.id) ) {
            return (
                <View>
                    <ListItem  onPress={() => Actions.login()}>
                        <Icon name='log-in' style={Common.defaultColorIcon} />
                        <Text>Login</Text>
                    </ListItem>
                    <ListItem  onPress={() => Actions.register()}>
                        <Icon name='person-add' style={Common.defaultColorIcon} />
                        <Text>Register</Text>
                    </ListItem>
                </View>
            );
        }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <View>
                    <Header style={ Common.header }>
                        <Body>
                        <Text style={ Common.headerTextStyle }>Winification</Text>
                        </Body>
                    </Header>
                </View>

                <View style={{ flex:2 }}>
                    <Content>
                        <List>
                            <ListItem onPress={() => Actions.home()}>
                                <Icon name='home' style={Common.defaultColorIcon} />
                                <Text>Home</Text>
                            </ListItem>
                            <ListItem  onPress={() => Actions.catalog()}>
                                <Icon name='book' style={Common.defaultColorIcon} />
                                <Text>Catalog</Text>
                            </ListItem>
                            {this.renderNotSignedInMenu()}
                            <ListItem  onPress={() => Actions.cart()}>
                                <Icon name='cart' style={Common.defaultColorIcon} />
                                <Text>Cart</Text>
                            </ListItem>
                            {this.renderSignedInMenu()}
                        </List>
                    </Content>
                </View>
            </View>
        );
    }
};

const mapStateToProps = ({auth}) => {
    const { user } = auth;
    return { user } ;
};

export default connect(mapStateToProps,{ logoutUser })(Menu)