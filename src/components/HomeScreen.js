import React, { Component } from 'react';
import { Text, Image, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {Icon, Left, Button, Container, Card, CardItem, Thumbnail, Body, Content} from 'native-base';

import PageHeader from './PageHeader';
import { catalogFetch } from '../actions';
import { Common, Screens, Colors } from '../styles/Styles';

const { Home } = Screens;

const { width } = Dimensions.get('window');
const height = width * 0.8;

class HomeScreen extends Component {

    constructor(props) {
        super(props);

        if (!this.props.cards.length) {
            this.props.catalogFetch();
        }
    }

    componentDidMount() {
        SplashScreen.hide();
    }

    onItemPress(card) {
        Actions.viewItem({ title: card.name, card });
    }

    renderView() {

        if (this.props.loading) {
            return (
                <Content contentContainerStyle={Home.indicatorPage}>
                    <ActivityIndicator size='large' color={Colors.grey}/>
                </Content>
            )
        }

        if (this.props.timeIsOver) {
            return (
                <Content contentContainerStyle={Common.container}>
                    <View style={{alignItems: 'center'}}>
                        <Text>{this.props.error}</Text>
                        <Button light onPress={this.props.catalogFetch} style={Home.reloadButton}>
                            <Text>Reload</Text>
                        </Button>
                    </View>
                </Content>
            );
        }

        return (
            <View>
                <View>
                    <View>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={true}>
                            {this.getCards()}
                        </ScrollView>
                    </View>
                </View>
                <View>
                    <Button full style={Home.button} onPress={() => Actions.catalog()}>
                        <Text>View full catalog</Text>
                    </Button>
                </View>
            </View>
        )
    }

    getCards() {
        return this.props.cards.map((item, i) => (
            <Card key={i}>
                <CardItem bordered button onPress={() => this.onItemPress(item)}>
                    <Left>
                        <Thumbnail source={item.thumbnail} />
                        <Body>
                            <Text>{item.name}</Text>
                            <Text note>{item.type}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody bordered>
                    <Image style={styles.image} source={item.image} resizeMode='contain'/>
                </CardItem>
                <CardItem bordered>
                    <Left>
                        <Icon name='pricetag' style={Common.defaultColorIcon}/>
                        <Text>${item.price}</Text>
                    </Left>
                </CardItem>
            </Card>
        ));
    }

    render() {
        return (
            <Container>
                <PageHeader headerText='Home' drawerOpen={() => this.props.navigation.openDrawer()}  {...this.props} />
                {this.renderView()}
            </Container>
        )
    }
}

const styles = {
    image: {
        width,
        height
    }
};

const mapStateToProps = state => {
    const { cards, loading, error, timeIsOver } = state.cards;
    return { cards, loading, error, timeIsOver };
};

export default connect(mapStateToProps, { catalogFetch })(HomeScreen);