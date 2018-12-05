import React, { Component } from 'react';
import {Scene, Router, Actions, Stack, Drawer} from 'react-native-router-flux';

import CatalogueScreen from './components/CatalogueScreen';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import CartScreen from './components/CartScreen';
import ItemPage from './components/ItemPage';
import AccountScreen from './components/AccountScreen';
import RegisterScreen from './components/RegisterScreen';
import Menu from './components/Menu';
import ChangePassword from './components/ChangePassword';
import MyOrdersScreen from './components/MyOrdersScreen';
import MyDetailsScreen from './components/MyDetailsScreen';
import AddressBookScreen from './components/AddressBookScreen';
import DeliveryConfirmationScreen from './components/DeliveryConfirmationScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import AddItemScreen from './components/AddItemScreen';
import UpdateItemScreen from './components/UpdateItemScreen';

class RouterComponent extends Component {

    render() {
        const { navBar } = styles;
        return (
            <Router>
                <Scene key='root' navigationBarStyle={navBar} headerTintColor='#FFFFFF'>
                    <Scene key='menu' contentComponent={Menu} drawer hideNavBar headerMode='none'>
                        <Scene key='items'>
                            <Scene key='home' component={HomeScreen} initial />
                            <Scene key='catalog' component={CatalogueScreen}/>
                            <Scene key='cart' component={CartScreen}/>
                            <Scene key='confirmation' component={ConfirmationScreen}/>
                        </Scene>
                        <Scene key="auth">
                            <Scene key='login' component={LoginScreen}/>
                            <Scene key='register' component={RegisterScreen}/>
                            <Scene key='account' component={AccountScreen}/>
                        </Scene>
                    </Scene>
                    <Scene key='viewItem' component={ItemPage}/>
                    <Scene key='changePassword' component={ChangePassword} title='Change Password'/>
                    <Scene key='orders' component={MyOrdersScreen} title='Orders'/>
                    <Scene key='details' component={MyDetailsScreen} title='Details'/>
                    <Scene key='addressBook' component={AddressBookScreen} title='Address Book'/>
                    <Scene key='deliveryConfirmation' component={DeliveryConfirmationScreen} title='Checkout'/>
                    <Scene key='addItem' component={AddItemScreen} title='Add Item'/>
                    <Scene key='editItem' component={UpdateItemScreen} title='Edit Item'/>
                </Scene>
            </Router>
        );
    }
};

const styles = {
    navBar: {
        backgroundColor:'#770513',
    }
};

export default RouterComponent;
