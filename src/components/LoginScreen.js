import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    View,
    Image,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardItem, Button, Container } from 'native-base';
import { GoogleSignin } from 'react-native-google-signin';

import { validate } from '../helpers/Validator';
import PageHeader from './PageHeader';
import { Divider } from './common';
import {
    passwordChanged,
    emailChanged,
    loginUser,
    loginWithFb,
    loginWithGoogle,
    forgotPassword
} from '../actions';
import { FloatingLabelInput, Confirm } from './common';
import { Common, Screens } from '../styles/Styles';

const { Login } = Screens;

class LoginScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            email: '',
            emailError: '',
            passwordError: ''
        }
    }

    componentDidMount() {
        // mandatory Google Sign In preparations
        this.setupGoogleSignIn();
    }

    setupGoogleSignIn() {
        GoogleSignin.hasPlayServices({ autoResolve: true, showPlayServicesUpdateDialog: true })
            .then(() =>{
                GoogleSignin.configure({
                    webClientId: '986042481334-245rgt4qc8vbee0n26v8dt5rah4rteqq.apps.googleusercontent.com',
                    offlineAccess: false
                }).then(() => { /* Nothing to do here*/ });
            }, (error) => {
                    console.log('Error signing in with Google',error.code, error.message);
                });
    }

    onButtonPress() {
        const { email, password } = this.props;
        Keyboard.dismiss();

        const emailError = validate('email', email);
        const passwordError = validate('password', password);

        this.setState({
            emailError,
            passwordError
        });

        if (emailError || passwordError) {
            return;
        }

        this.props.loginUser({ email, password });
    }

    renderButton() {
        const buttonContent = this.props.loading ? <ActivityIndicator size='large'/> : <Text>SIGN IN</Text>;

        return (
            <Button block light style={Login.button} onPress={this.onButtonPress.bind(this)}>
                {buttonContent}
            </Button>
        )
    }

    onEmailBlur() {
        this.setState({
            emailError: validate('email', this.props.email)
        });
    }

    onPasswordBlur() {
        this.setState({
            passwordError: validate('password', this.props.password)
        });
    }

    renderModal() {
        return (
            <Confirm
                visible={this.state.modalVisible}
                onAcceptText='SEND PASSWORD RECOVERY EMAIL'
                onAccept={() => this.props.forgotPassword({email: this.state.email})}
                onDecline={() => {
                    this.setState({modalVisible: false})
                }}
            >
                <View style={Login.input}>
                    <Text style={Login.modalText}>Enter email your account is linked with</Text>
                    <FloatingLabelInput
                        value={this.state.email}
                        onChangeText={value =>this.setState({email: value})}
                        text='EMAIL ADDRESS'
                    />
                    <Text style={Common.errorText}>{this.props.modalError}</Text>
                    <Text style={Common.successText}>{this.props.modalMessage}</Text>
                </View>
            </Confirm>
        )
    }

    render() {
        return (
            <Container>
                <PageHeader headerText="Login" drawerOpen={() => this.props.navigation.openDrawer()}/>
                {this.renderModal()}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Card>
                        <CardItem style={Common.card}>
                            <Text>Sign in with social account</Text>
                            <View style={Common.priceSection}>
                                <TouchableWithoutFeedback onPress={this.props.loginWithGoogle.bind(this)}>
                                    <Image style={Common.roundImage} source={require('../images/g-logo.png')}/>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={this.props.loginWithFb.bind(this)}>
                                    <Image style={Common.roundImage} source={require('../images/flog.png')}/>
                                </TouchableWithoutFeedback>
                            </View>
                        </CardItem>
                        <Divider >
                            <Text style={Login.textDivider}>OR</Text>
                        </Divider>
                        <KeyboardAvoidingView enabled>
                            <CardItem bordered style={Common.card}>
                                <Text>Log in using your account</Text>
                                    <FloatingLabelInput
                                        value={this.props.email}
                                        onChangeText={this.props.emailChanged.bind(this)}
                                        text='EMAIL ADDRESS'
                                        onBlur={this.onEmailBlur.bind(this)}
                                        error={this.state.emailError}
                                    />
                                    <FloatingLabelInput
                                        value={this.props.password}
                                        onChangeText={this.props.passwordChanged.bind(this)}
                                        text='PASSWORD'
                                        secureTextEntry
                                        onBlur={this.onPasswordBlur.bind(this)}
                                        error={this.state.passwordError}
                                    />
                                    <Text style={Common.errorText}>
                                        {this.props.error}
                                    </Text>
                                    {this.renderButton()}
                                <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
                                    <Text>Forgot password?</Text>
                                </TouchableOpacity>
                            </CardItem>
                        </KeyboardAvoidingView>
                        <CardItem style={Common.card}>
                                <Text>Don't have an account?</Text>
                                <TouchableOpacity onPress={() => Actions.register()}>
                                    <Text style={Common.boldLabel}>Sign up today.</Text>
                                </TouchableOpacity>
                        </CardItem>
                    </Card>
                </TouchableWithoutFeedback>
            </Container>
        )
    }
}

const styles = {
    container: Common.container
};

const mapStateToProps = (state) => {
    const { email, password, error, loading, modalError, modalMessage } = state.auth;

    return { email, password, error, loading, modalError, modalMessage };
};

export default connect(mapStateToProps, {
    passwordChanged,
    emailChanged,
    loginUser,
    loginWithFb,
    loginWithGoogle,
    forgotPassword
})(LoginScreen)