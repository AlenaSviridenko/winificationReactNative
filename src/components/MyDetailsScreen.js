import React, { Component } from 'react';
import {
    Text,
    View,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { CardItem, Button, Container, Card, DatePicker} from 'native-base';

import { validate } from '../helpers/Validator';
import { RadioButton, FloatingLabelInput} from './common';
import { updateUser, saveUser } from '../actions';
import { Common, Screens } from '../styles/Styles';

const { MyDetails } = Screens;

class MyDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.props.user = Object.assign(this.props.user, this.props.loggedInUser);

        this.state = {
            male: this.props.user.gender === 'male',
            female: this.props.user.gender === 'female',
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            phoneError: ''
        }
    }

    onGenderChange(male, value) {
        this.props.updateUser({ prop: 'gender', value });
        this.setState({male, female: !male})
    }

    onSavePress() {
        Keyboard.dismiss();

        const firstNameError = validate('firstName', this.props.user.firstName);
        const lastNameError = validate('lastName', this.props.user.lastName);
        const emailError = validate('email', this.props.user.email);

        this.setState({ firstNameError, lastNameError, emailError });

        if (firstNameError || lastNameError || emailError) {
            return;
        }

        this.props.saveUser({user: this.props.user, userId: this.props.user._id});
    }

    renderButton() {
        const buttonContent = this.props.loading ? <ActivityIndicator size='large'/> : <Text>UPDATE</Text>;

        return (
            <Button block light style={Common.button} onPress={this.onSavePress.bind(this)}>
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
                            <FloatingLabelInput
                                value={this.props.user.firstName}
                                onChangeText={value => this.props.updateUser({ prop: 'firstName', value })}
                                onBlur={() => this.setState({ firstNameError: validate('firstName', this.props.user.firstName) })}
                                error={this.state.firstNameError}
                                text='FIRST NAME*'
                            />
                            <FloatingLabelInput
                                value={this.props.user.lastName}
                                onChangeText={value => this.props.updateUser({ prop: 'lastName', value })}
                                text='LAST NAME*'
                                onBlur={() => this.setState({ lastNameError: validate('lastName', this.props.user.lastName) })}
                                error={this.state.lastNameError}
                            />
                            <View style={MyDetails.dobView}>
                                <Text style={Common.boldLabel}>DATE OF BIRTH</Text>
                                <DatePicker
                                    defaultDate={new Date(this.props.user.dob) || ''}
                                    minimumDate={new Date(1900, 1, 1)}
                                    maximumDate={new Date()}
                                    locale={'en'}
                                    modalTransparent={false}
                                    animationType={'fade'}
                                    androidMode={'default'}
                                    onDateChange={value => this.props.updateUser({ prop: 'dob', value })}
                                />
                            </View>
                            <FloatingLabelInput
                                value={this.props.user.email}
                                onChangeText={value => this.props.updateUser({ prop: 'email', value })}
                                text='EMAIL ADDRESS*'
                                onBlur={() => this.setState({ emailError: validate('email', this.props.user.email) })}
                                error={this.state.emailError}
                            />
                            <FloatingLabelInput
                                value={this.props.user.phone}
                                onChangeText={value => this.props.updateUser({ prop: 'phone', value })}
                                text='PHONE'
                                onBlur={() => this.setState({ phoneError: validate('phone', this.props.user.phone) })}
                                error={this.state.phoneError}
                            />
                            <View style={Common.inputView}>
                                <Text style={Common.boldLabel}>GENDER</Text>
                                <View style={MyDetails.radioSection}>
                                    <TouchableWithoutFeedback onPress={() => this.onGenderChange(true, 'male')}>
                                        <View>
                                            <RadioButton
                                                label='MALE'
                                                selected={this.state.male}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <View style={MyDetails.divider}/>
                                    <TouchableWithoutFeedback onPress={() => this.onGenderChange(false, 'female')}>
                                        <View>
                                            <RadioButton
                                                label='FEMALE'
                                                selected={this.state.female}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
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
    container: Common.container
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
})(MyDetailsScreen);