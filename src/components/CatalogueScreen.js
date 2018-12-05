import React, { Component } from 'react';
import { Text, FlatList, View, Animated, Keyboard, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Left, Right, Container, CardItem, Content } from 'native-base';
import { SearchBar, Icon } from 'react-native-elements';

import PageHeader from './PageHeader';
import ListItem from './ListItem';
import GridItem from './GridItem';
import { searchItems, catalogFetch } from '../actions';
import { Screens, Colors } from '../styles/Styles';

const { Catalogue } = Screens;

class CatalogueScreen extends Component {
    state = {
        gridView: false,
        searchRequested: false,
        searchBarVisible: false,
        searchTerm: ''
    };

    constructor(props) {
        super(props);

        this.state = {
            gridView: false,
            searchBarVisible: false,
            searchRequested: false,
            refreshing: false
        };

        if (!this.props.cards.cards.length) {
            this.props.catalogFetch();
        }
    }

    renderRow(card) {
        if (!this.state.gridView) {
            return <ListItem card={card.item}/>

        }

        return <GridItem card={card.item}/>;
    }

    renderListHeader() {
        return (
            <View>
                <SearchBar
                    placeholder='Search'
                    lightTheme
                    clearIcon={{ color: Colors.white }}
                    onClearText={this.searchCancelled.bind(this)}
                    onChangeText={(text) => this.setState({ searchTerm: text})}
                    onSubmitEditing={() => { this.props.searchItems(this.state.searchTerm) }}
                />
                <CardItem bordered>
                    <Left>
                        <Text>Found {this.props.cards.searchCards.length || this.props.cards.cards.length} items</Text>
                    </Left>
                    <Right style={Catalogue.switchSection}>
                        {this.renderIcon()}
                    </Right>
                </CardItem>
            </View>
        )
    }

    renderIcon() {
        const name = this.state.gridView ? 'view-list' : 'view-module';

        return <Icon name={name} color={Colors.grey} style={Catalogue.switchIcon} onPress={() => this.setState({gridView: !this.state.gridView})}/>
    }

    renderView() {
        if (this.props.cards.loading) {
            return (
                <Content contentContainerStyle={Catalogue.indicatorPage}>
                    <ActivityIndicator size='large' color={Colors.grey}/>
                </Content>
            )
        }

        if (!this.state.gridView) {
            return (
                <FlatList
                    data={this.props.cards.searchCards.length ? this.props.cards.searchCards : this.props.cards.cards}
                    renderItem={this.renderRow.bind(this)}
                />
            );
        }

        return (
            <FlatList
                numColumns={2}
                key={2}
                data={this.props.cards.searchCards.length ? this.props.cards.searchCards : this.props.cards.cards}
                renderItem={this.renderRow.bind(this)}
            />
        );
    }

    searchCancelled() {
        this.props.cards.searchCards = [];
        Keyboard.dismiss();
    }

    render() {
        return (
            <Container>
                <PageHeader headerText='Catalogue' drawerOpen={() => this.props.navigation.openDrawer()}/>
                {this.renderListHeader()}
                {this.renderView()}
            </Container>
        )
    }
}

const mapStateToProps = state => {
    const { cards } = state;
    return { cards };
};

export default connect(mapStateToProps, { searchItems, catalogFetch })(CatalogueScreen);