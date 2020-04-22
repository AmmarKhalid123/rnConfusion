import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import { View, Platform } from 'react-native';
import {createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const MenuNavigator = createStackNavigator({ 
    Menu: { screen: Menu },
    Dishdetail: { screen: Dishdetail } 
}, {
    initialRouteName: 'Menu',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
});

const MenuNavigatorApp = createAppContainer(MenuNavigator);

class Main extends Component {

    render() {
        return(
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
            <MenuNavigatorApp />
             </View>
        );
    }
}

export default Main;