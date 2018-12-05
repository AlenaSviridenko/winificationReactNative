import React, { Component } from 'react';
import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Container, List, ListItem } from 'native-base';
import { Actions } from 'react-native-router-flux';

import PageHeader from './PageHeader';
import { Divider } from './common';
import { logoutUser } from '../actions';
import { Common, Screens } from '../styles/Styles';

const { Account } = Screens;

class AccountScreen extends Component {

    renderMyDetails() {
        if (this.props.user && this.props.user._id) {
            return (
                <View>
                    <ListItem>
                        <TouchableWithoutFeedback onPress={() => Actions.details()}>
                            <View style={Common.priceSection}>
                                <Icon name='account-card-details' type='MaterialCommunityIcons' style={Common.defaultColorIcon}/>
                                <Text>My details</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </ListItem>
                    <ListItem>
                        <TouchableWithoutFeedback onPress={() => Actions.changePassword()}>
                            <View style={Common.priceSection}>
                                <Icon name='lock-outline' type='MaterialCommunityIcons' style={Common.defaultColorIcon}/>
                                <Text>Change Password</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </ListItem>
                    </View>
            )
        }
    }

    getNamePrefix() {
        const { firstName, lastName } = this.props.user;
        const { name } = this.props.user;
        if (firstName && lastName) {
            return firstName.substring(0, 1) + lastName.substring(0, 1);
        }

        if (name) {
            const parts = name.split(' ');
            return parts[0].substring(0, 1) + parts[parts.length - 1].substring(0, 1);
        }
    }

    render() {
        return (
            <Container>
                <PageHeader headerText="Account" drawerOpen={() => this.props.navigation.openDrawer()}/>
                <ScrollView>
                    <View containerContentStyle={Account.content}>
                        <Divider>
                                <View style={Account.image}>
                                    <Text style={Account.text}>{this.getNamePrefix()}</Text>
                                </View>
                        </Divider>

                    </View>
                    <List>
                        <ListItem>
                            <TouchableWithoutFeedback onPress={() => Actions.orders()}>
                                <View style={Common.priceSection}>
                                    <Icon name='archive' type='MaterialCommunityIcons' style={Common.defaultColorIcon}/>
                                    <Text>My Orders</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </ListItem>
                        <ListItem>
                            <TouchableWithoutFeedback onPress={() => Actions.addressBook()}>
                                <View style={Common.priceSection}>
                                    <Icon name='home' style={Common.defaultColorIcon}/>
                                    <Text>Address Book</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </ListItem>
                        {this.renderMyDetails()}
                        <ListItem>
                            <TouchableWithoutFeedback onPress={this.props.logoutUser.bind(this)}>
                                <View style={Common.priceSection}>
                                    <Icon name='sign-out' type='FontAwesome' style={Common.defaultColorIcon}/>
                                    <Text>Sign Out</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </ListItem>
                    </List>
                </ScrollView>
            </Container>
        )
    }
};

const mapStateToProps = ({auth}) => {
    const { user } = auth;
    return { user }
};

export default connect(mapStateToProps, {
    logoutUser
})(AccountScreen);