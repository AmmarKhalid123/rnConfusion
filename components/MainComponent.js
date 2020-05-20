import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Dishdetail from './DishDetailComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import { View, Platform, Image, StyleSheet, ScrollView, Text, ToastAndroid } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {createAppContainer, SafeAreaView } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStatetoProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
};

const mapDispatchtoProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders())
})

const MenuNavigator = createStackNavigator({ 
    Menu: { screen: Menu,
            navigationOptions: ({ navigation }) => ({
                headerLeft: () => <MenuIcon navigation={navigation} />
            }) },
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

function MenuIcon({navigation}){
    return(
        <View style={{marginLeft:10}}>
            <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()}/>
        </View>
    );
}

const HomeNavigator = createStackNavigator({ 
    Home: { screen: Home },
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: () =>  <MenuIcon navigation={navigation} />
    }
)});

const AboutNavigator = createStackNavigator({
    About: {screen: About},
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        heaederTitleStyle: {
            color: '#fff'
        },
        headerLeft: () => <MenuIcon navigation={navigation} />
    }
)});


const ContactNavigator = createStackNavigator({
    Contact: {screen: Contact},
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        heaederTitleStyle: {
            color: '#fff'
        },
        headerLeft: () => <MenuIcon navigation={navigation} />
    }
)});


const ReservationNavigator = createStackNavigator({
    Reservation: {screen: Reservation},
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        heaederTitleStyle: {
            color: '#fff'
        },
        headerLeft: () => <MenuIcon navigation={navigation} />
    }
)});

const FavoritesNavigator = createStackNavigator({
    Favorites: {screen: Favorites},
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        heaederTitleStyle: {
            color: '#fff'
        },
        headerLeft: () => <MenuIcon navigation={navigation} />
    }
)});
const LoginNavigator = createStackNavigator({
    Login: {screen: Login},
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        heaederTitleStyle: {
            color: '#fff'
        },
        headerLeft: () => <MenuIcon navigation={navigation} />
    }
)});
const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}>
                <View style={styles.drawerHeader}>
                    <View style={{flex: 1}}>
                        <Image source={require('./images/logo.png')}
                        style={styles.drawerImage}/>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                    </View>
                </View>
                <DrawerItems {...props}/>
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    
    Login: {
        screen: LoginNavigator,
        navigationOptions: {
            title: 'Login',
            drawerLabel: 'Login',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='sign-in'
                    type='font-awesome'
                    size={24}
                    color={tintColor}/>
            )
        }
    },
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}/>
            )
        }
    },
    
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='info-circle'
                    type='font-awesome'
                    size={24}
                    color={tintColor}/>
            )
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='list'
                    type='font-awesome'
                    size={24}
                    color={tintColor}/>
            )
        }
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact Us',
            drawerLabel: 'Contact Us',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='address-card'
                    type='font-awesome'
                    size={22}
                    color={tintColor}/>
            )
        }
    },
    Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
            title: 'My Favorites',
            drawerLabel: 'My Favorites',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='heart'
                    type='font-awesome'
                    size={24}
                    color={tintColor}/>
            )
        }
    },
    
    Reservation: {
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve a Table',
            drawerLabel: 'Reserve a Table',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='cutlery'
                    type='font-awesome'
                    size={24}
                    color={tintColor}/>
            )
        }
    }
}, {
    initialRouteName: 'Home',
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent,
    unmountInactiveRoutes: true
});

const MainNavigatorApp = createAppContainer(MainNavigator);

class Main extends Component {

    componentDidMount() {

        this.props.fetchDishes();
        this.props.fetchPromos();
        this.props.fetchLeaders();
        this.props.fetchComments();
        NetInfo.fetch().then((connectionInfo) => {
            ToastAndroid.show('Initial Network Connectivity Type: '
                + connectionInfo.type, ToastAndroid.LONG)
        });
        
        NetInfo.addEventListener(connectionChange => this.handleConnectivityChange(connectionChange))
    }

    componentWillUnMount() {
        NetInfo.removeEventListener(connectionChange => this.handleConnectivityChange(connectionChange))
    }
    handleConnectivityChange = (connectionInfo) => {
        switch (connectionInfo.type) {
            case 'none': 
                ToastAndroid.show ('You are now offline', ToastAndroid.LONG);
                break;
            case 'wifi':
                ToastAndroid.show ('You are now on WiFi', ToastAndroid.LONG);
                break;
            case 'cellular':
                ToastAndroid.show ('You are now on Cellular', ToastAndroid.LONG);
                break;
            case 'unknown' :
                ToastAndroid.show ('You are now have an Unknown connection', ToastAndroid.LONG);
                break;
            default: 
        }
    }
    render() {
        return(
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight}}>
            <MainNavigatorApp />
             </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: "center",
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold' 
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Main);