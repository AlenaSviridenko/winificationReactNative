import React, { Component } from 'react';
import {
    Text,
    View,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Animated,
    TextInput,
    UIManager,
    Dimensions
} from 'react-native';
const { State: TextInputState } = TextInput;
import { connect } from 'react-redux';
import { CardItem, Button, Container, Card } from 'native-base';

import { validate, validateEqual } from '../helpers/Validator';
import { FloatingLabelInput } from './common';
import {
    registrationPropChanged,
    emailChanged,
    passwordChanged,
    confirmNewPasswordChanged,
    register
} from '../actions';
import PageHeader from './PageHeader';
import { Common } from '../styles/Styles';

class RegisterScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            passwordError: '',
            confPasswordError: '',
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            shift: new Animated.Value(0)
        };

        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);

    }

    componentWillUnmount() {
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
    }

    handleKeyboardDidShow = (event) => {
        const { height: windowHeight } = Dimensions.get('window');
        const keyboardHeight = event.endCoordinates.height;
        const currentlyFocusedField = TextInputState.currentlyFocusedField();
        UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
            const fieldHeight = height;
            const fieldTop = pageY;
            const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
            if (gap >= 0) {
                return;
            }
            Animated.timing(
                this.state.shift,
                {
                    toValue: gap,
                    duration: 1000,
                    useNativeDriver: true,
                }
            ).start();
        });
    };

    handleKeyboardDidHide = () => {
        Animated.timing(
            this.state.shift,
            {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }
        ).start();
    };

    onRegisterPress() {
        Keyboard.dismiss();
        const passwordError = validate('password', this.props.password);
        const confPasswordError = validateEqual({setPassword: this.props.password, confirmPassword: this.props.confirmNewPassword});
        const firstNameError = validate('firstName', this.props.user.firstName);
        const lastNameError = validate('lastName', this.props.user.lastName);
        const emailError = validate('email', this.props.email);

        this.setState({
            passwordError,
            confPasswordError,
            firstNameError,
            lastNameError,
            emailError
        });

        if (passwordError || confPasswordError || firstNameError || lastNameError || emailError) {
            return;
        }

        this.props.register({
            email: this.props.email,
            username: this.props.email,
            password: this.props.password,
            confirmNewPassword: this.props.confirmNewPassword,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName
        })
    }

    renderButton() {
        const buttonContent = this.props.loading ? <ActivityIndicator size='large'/> : <Text>REGISTER</Text>;

        return (
            <Button block light style={Common.button} onPress={this.onRegisterPress.bind(this)}>
                {buttonContent}
            </Button>
        )
    }

    render() {
        return (
            <Container>
                <PageHeader headerText='Register' drawerOpen={() => this.props.navigation.openDrawer()}/>
                <Animated.View style={{ transform: [{translateY: this.state.shift}] }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Card>
                        <CardItem style={Common.card}>
                            <FloatingLabelInput
                                value={this.props.user.firstName}
                                onChangeText={value => this.props.registrationPropChanged({ prop: 'firstName', value })}
                                text='FIRST NAME*'
                                onBlur={() => this.setState({ firstNameError: validate('firstName', this.props.user.firstName) })}
                                error={this.state.firstNameError}
                            />
                            <FloatingLabelInput
                                value={this.props.user.lastName}
                                onChangeText={value => this.props.registrationPropChanged({ prop: 'lastName', value })}
                                text='LAST NAME*'
                                onBlur={() => this.setState({ lastNameError: validate('lastName', this.props.user.lastName) })}
                                error={this.state.lastNameError}
                            />
                            <FloatingLabelInput
                                value={this.props.email}
                                onChangeText={this.props.emailChanged.bind(this)}
                                text='EMAIL (will be your username to login)*'
                                onBlur={() => this.setState({ emailError: validate('email', this.props.email) })}
                                error={this.state.emailError}
                            />
                            <FloatingLabelInput
                                value={this.props.password}
                                onChangeText={this.props.passwordChanged.bind(this)}
                                text='PASSWORD*'
                                onBlur={() => this.setState({ passwordError: validate('setPassword', this.props.password) })}
                                error={this.state.passwordError}
                            />
                            <FloatingLabelInput
                                value={this.props.confirmNewPassword}
                                onChangeText={this.props.confirmNewPasswordChanged.bind(this)}
                                text='CONFIRM PASSWORD*'
                                onBlur={() => this.setState({
                                    confPasswordError: validateEqual({
                                        setPassword: this.props.password,
                                        confirmPassword: this.props.confirmNewPassword
                                    })
                                })}
                                error={this.state.confPasswordError}
                            />

                            <Text style={Common.errorText}>
                                {this.props.error}
                            </Text>
                            {this.renderButton()}
                        </CardItem>
                    </Card>
                </TouchableWithoutFeedback>
                </Animated.View>
            </Container>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0
    }
};

const mapsStateToProps = ({auth}) => {
    const { password, confirmNewPassword, email, user, error, message, loading } = auth;
    return { password, confirmNewPassword, user, email, loading, error, message };
};

export default connect(mapsStateToProps,{
    registrationPropChanged,
    emailChanged,
    passwordChanged,
    confirmNewPasswordChanged,
    register
})(RegisterScreen);