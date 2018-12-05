import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Button, Container, Content } from 'native-base';
import PageHeader from './PageHeader';
import { connect } from 'react-redux';
import { Image, Text } from 'react-native';

import { Common, Screens } from '../styles/Styles';

const { Confirmation } = Screens;

class ConfirmationScreen extends Component {
    render() {
        return (
            <Container>
                <PageHeader headerText='Confirmation' drawerOpen={() => this.props.navigation.openDrawer()}/>
                <Content contentContainerStyle={Confirmation.content}>
                    <Image
                        source={{uri:'https://media.giphy.com/media/sjAWhlbYoLnMY/giphy.gif'}}
                        style={Common.squareImage2x}/>
                    <Text style={Confirmation.text}>Your order was successfully placed! Thank you!</Text>
                    <Button block light onPress={() => Actions.catalog()}>
                        <Text style={Confirmation.button}>Start shopping</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
};

const mapStateToProps = () => {
    return {};
};

export default connect(mapStateToProps)(ConfirmationScreen);