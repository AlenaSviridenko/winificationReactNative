import React, { Component } from 'react';
import {
    Text,
    View,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import {CardItem, Button, Container, Card } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { validate } from '../helpers/Validator';
import { FloatingLabelInput } from './common';
import { updateUser, saveUser } from '../actions';
import { Common, Screens } from '../styles/Styles';

const { AddressBook } = Screens;


class AddressBookScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            streetError: '',
            cityError: '',
            countryError: '',
            postalError: ''
        }
    }

    doActualSave() {
        Keyboard.dismiss();
        const streetError = validate('street', this.props.user.street);
        const cityError = validate('city', this.props.user.city);
        const countryError = validate('deliveryCountry', this.props.user.country);
        const postalError = validate('zip', this.props.user.zip);

        this.setState({ streetError, cityError, countryError, postalError });

        if (streetError || cityError || postalError || countryError) {
            return;
        }

        if (this.props.user._id) {
            this.props.saveUser({user: this.props.user, userId: this.props.user._id})
        } else {
            Actions.pop();
        }
    }

    renderButton() {
        const buttonContent = this.props.loading ? <ActivityIndicator size='large'/> : <Text>SAVE</Text>;

        return (
            <Button block light style={Common.button} onPress={this.doActualSave.bind(this)}>
                {buttonContent}
            </Button>
        )
    }

    render() {

        return (
            <Container>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Card>
                        <CardItem style={Common.card}>
                            <View style={Common.inputView}>
                                <FloatingLabelInput
                                    value={this.props.user.street}
                                    onChangeText={value => this.props.updateUser({ prop: 'street', value })}
                                    text='STREET*'
                                    onBlur={() => this.setState({ streetError: validate('address', this.props.user.street) })}
                                    error={this.state.streetError}
                                />
                            </View>
                            <View style={Common.inputView}>
                                <FloatingLabelInput
                                    value={this.props.user.city}
                                    onChangeText={value => this.props.updateUser({ prop: 'city', value })}
                                    text='CITY*'
                                    onBlur={() => this.setState({ cityError: validate('city', this.props.user.city) })}
                                    error={this.state.cityError}
                                />
                            </View>
                            <View style={Common.inputView}>
                                <FloatingLabelInput
                                    value={this.props.user.country}
                                    onChangeText={value => this.props.updateUser({ prop: 'country', value })}
                                    text='COUNTRY*'
                                    onBlur={() => this.setState({ countryError: validate('deliveryCountry', this.props.user.country) })}
                                    error={this.state.countryError}
                                />
                            </View>
                            <View style={Common.inputView}>
                                <FloatingLabelInput
                                    value={this.props.user.zip}
                                    onChangeText={value => this.props.updateUser({ prop: 'zip', value })}
                                    text='POSTCODE*'
                                    onBlur={() => this.setState({ postalError: validate('zip', this.props.user.zip) })}
                                    error={this.state.postalError}
                                />
                            </View>

                            <Text style={Common.errorText}>
                                {this.props.error}
                            </Text>
                            <Text style={Common.successText}>
                                {this.props.message}
                            </Text>
                            {this.renderButton()}
                        </CardItem>
                    </Card>
                </TouchableWithoutFeedback>
            </Container>
        );
    }
}

const styles = {
    container: Common.Container
};

const mapsStateToProps = (state) => {
    const { user, loading } = state;
    const { error, message } = state.user;
    const loggedInUser = state.auth.user;

    return { user, loggedInUser, loading, error, message };
};

export default connect(mapsStateToProps,{
    updateUser,
    saveUser
})(AddressBookScreen);