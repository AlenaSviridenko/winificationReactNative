import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Dimensions, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon, Left, Card, CardItem, Body } from 'native-base';

import { Common, Items } from '../styles/Styles';

const { Grid } = Items;
const { width } = Dimensions.get('window') / 2;
const height = width * 0.8;

class GridItem extends Component {
    onRowPress() {
        Actions.viewItem({ title: this.props.card.name, card: this.props.card });
    }

    render() {
        const { card } = this.props;

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View style={styles.view}>
                    <Card style={Grid.cardHeight}>
                        <CardItem>
                            <Left>
                            <Image source={card.image} style={Common.standardImage} resizeMode="contain"/>
                            </Left>
                            <Body>
                                <Text style={Common.title} numberOfLines={2}>{card.name}</Text>
                                <Text style={Common.note}>{card.type}</Text>
                                <Text>{card.country}, {card.year}</Text>
                                <View style={Grid.priceSection}>
                                    <Icon name='pricetag' style={Common.lightGreyIcon}/>
                                    <Text>${card.price}</Text>
                                </View>
                            </Body>
                        </CardItem>
                    </Card>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    view: {
        flex: 0.5,
        height
    }
};

export default GridItem;
