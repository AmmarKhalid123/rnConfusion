import React, { Component } from 'react';
import { Text, View, ScrollView, Picker, Switch, Button, StyleSheet, Modal, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            showModal: false,
            date: ''
        }
    }
    handleReservation() {
        const message = `Number of Guests: ${this.state.guests}\nSmoking? ${this.state.smoking}\nDate and Time: ${this.state.date}`
        Alert.alert(
            'Your Reservation OK?',
            message,
            [
                {text: 'Cancel', onPress: () => this.resetForm(), style: 'cancel'},
                {text: 'OK', onPress: () => {
                    this.presentLocalNotification(this.state.date);
                    this.resetForm();
                }}
            ],
            { cancelable: false }
        )
    }
    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        });
    }
    toggleModal() {
        this.setState({showModal: !this.state.showModal})
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }
    async obtainNotificationPermission(){
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if ( permission.status !== 'granted'){
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted'){
                Alert.alert('Permission not granted')
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested.',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }

        });
    }
    render() {
        return(
            <ScrollView>
                <Animatable.View animation="zoomInUp" duration={2000} delay={1000} >
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}
                        >
                        <Picker.Item label='1' value='1'/>
                        <Picker.Item label='2' value='2'/>
                        <Picker.Item label='3' value='3'/>
                        <Picker.Item label='4' value='4'/>
                        <Picker.Item label='5' value='5'/>
                        <Picker.Item label='6' value='6'/>
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        trackColor='#512DA8'
                        onValueChange={(value) => this.setState({smoking: value})}
                        >
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <DatePicker
                        date={this.state.date}
                        format=''
                        mode='datetime'
                        minDate='2017-01-01'
                        confirmBtnTxt='Confirm'
                        cancelBtnTxt='Cancel'
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                        />
                </View>
                <View style={styles.formRow}>
                    <Button
                        title='Reserve'
                        color='#512DA8'
                        onPress={() => this.handleReservation()}
                        accessibilityLabel='Learn more about this purple button'/>
                </View>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => {this.toggleModal(); this.resetForm();}}
                    onRequestClose={() => {this.toggleModal(); this.resetForm();}}
                    >
                        <View style={styles.modal}>
                            <Text style={styles.modalTitle}>Your Reservation</Text>
                            <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
                            <Text style={styles.modalText}>Smoking? : {this.state.smoking.toString()}</Text>
                            <Text style={styles.modalText}>Date and Time: {this.state.date}</Text>
                            <Button
                                onPress={() => {this.toggleModal(); this.resetForm()}}
                                color='#512DA8'
                                title='Close' />
                        </View>
                    </Modal>
                    </Animatable.View>
            </ScrollView>
        ) ;
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: "center",
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})

export default Reservation;