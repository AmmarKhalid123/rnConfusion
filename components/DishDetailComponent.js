import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList,Button, Modal, StyleSheet, Alert, PanResponder, Share } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStatetoProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
};

const mapDispatchtoProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});

class RenderDish extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            author: '',
            rating: 5,
            comment: ''
        };
    }
    

    toggleModal(){
        this.setState({showModal: !this.state.showModal});
        this.resetForm();
    }
    setRating(newRating){
        this.setState({rating: newRating});
    }
    setAuthor(text){
        this.setState({author: text});
    }
    
    setComment(text){
        this.setState({comment: text});
    }
    resetForm(){
        this.setState({
        author: '',
        rating: 5,
        comment: ''
        });
    }
    handleViewRef = ref => this.view = ref;
    
    render (){
        const dish = this.props.dish;
        const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
            if (dx < -200){
                return true;
            }
            else {
                return false;
            }
        };
        const recognizeComment = ({ moveX, moveY, dx, dy }) => {
            if (dx > 200){
                return true;
            }
            else {
                return false;
            }
        }
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => {
                return true;
            },
            onPanResponderGrant: () => {
                this.view.rubberBand(1000)
                .then(endState => console.log(endState.finished ? 'finished' : 'not finished'))
            },
            onPanResponderEnd: (e, gestureState) => {
                if (recognizeDrag(gestureState)){
                    Alert.alert(
                        'Add to Favorites?',
                        'Are you sure you wish to add to add ' + dish.name + ' to your favorites?',
                        [
                            {text: 'cancel', onPress: () => console.log('Cancel Pressed!'), style: 'cancel'},
                            {text: 'OK', onPress: () => this.props.favorite ? console.log('Already Favorite') : this.props.onPress()}

                        ],
                        { cancelable: false }
                    )
                }
                if (recognizeComment(gestureState)){
                    this.toggleModal();
                }
                return true;
            }
        })
        
        const shareDish = (title, message, url) => {
            Share.share({
                title: title,
                message: title + ': ' + message + ' ' + url,
                url: url
            },{
                dialogTitle: 'Share ' + title
            })
        }


        if (dish != null ) {
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                ref={this.handleViewRef}
                {...panResponder.panHandlers}
                >
                <Card
                    
                    featuredTitle={dish.name}
                    image={{uri: baseUrl+dish.image}}
                    >
                    <Text style={{
                        margin: 10
                    }}>{dish.description}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>

                    <Icon 
                        raised 
                        reverse
                        name={this.props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => this.props.favorite ? console.log('Already Favorite') : this.props.onPress()}
                        />
                    <Icon
                        raised
                        reverse
                        name='pencil'
                        type='font-awesome'
                        color='#f50'
                        onPress={() => this.toggleModal()}
                        />
                        <Icon 
                        raised
                        reverse
                        name='share'
                        type='font-awesome'
                        color='#51D2A8'
                        onPress={()=>shareDish(dish.name, dish.description, baseUrl + dish.image)}
                        />
                        </View>                
                    <Modal
                        animationType={'slide'}
                        transparent={false}
                        visible={this.state.showModal}
                        onDismiss={() => {this.toggleModal(); this.resetForm()}}
                        onRequestClose={() => {this.toggleModal(); this.resetForm()}}
                        >
                            <View style={styles.modalItem}>
                            <Rating
                            showRating
                            onFinishRating={(value) => this.setRating(value)}
                            />
                            </View>
                            <View style={styles.modalItem}>
                            <Input
                                placeholder=' Author'
                                onChangeText={text => this.setAuthor(text)}
                                defaultValue={this.state.author}
                                leftIcon={
                                    <Icon
                                    name='user-o'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                    />
                                }
                                />
                            </View>
                            <View style={styles.modalItem}>
                            <Input
                                placeholder=' Comment'
                                onChangeText={text => this.setComment(text)}
                                defaultValue={this.state.comment}
                                leftIcon={
                                    <Icon
                                    name='comment-o'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                    />
                                }
                                />
                            </View>                        
                            <View style={styles.modalItem}>
                            
                                <Button
                                    onPress={() => {this.props.postComment(dish.id, this.state.rating, this.state.author, this.state.comment);
                                                    this.toggleModal()}}
                                    color='#512DA8'
                                    title='Submit' />
                            </View>
                                
                            <View style={styles.modalItem}>
                            
                                <Button
                                    onPress={() => {this.toggleModal(); this.resetForm()}}
                                    color='grey'
                                    title='Close' />
                            </View>  
                                                
                        </Modal>
                </Card>
                </Animatable.View>
            );
    }
    else {
        return(
            <View></View>
        );
    }
    }


    
}

function RenderComment(props){
    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {
        return(
        <View key={index} style={{margin: 10}}>
            <Text style={{fontSize: 14}}>{item.description}</Text>
            <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
            <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
        </View>
        );
    }
    return(
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title='Comments'>
                <FlatList data={comments}
                        renderItem={renderCommentItem}
                        keyExtractor={item => item.id.toString()}/>
            </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component {

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
    
    static navigationOptions = {
        title: 'Dish Detail'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId')
    return(
        <ScrollView>
            <RenderDish dish={this.props.dishes.dishes.filter((dish) => dishId === dish.id)[0]}
                        favorite={this.props.favorites.some(el => el === dishId)}
                        onPress={() => this.markFavorite(dishId)}
                        postComment={this.props.postComment}/>
            <RenderComment comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)}/> 
        </ScrollView>
    );}
}


const styles = StyleSheet.create({
    modalItem: {
        marginBottom:20
    }
})

export default connect(mapStatetoProps, mapDispatchtoProps)(Dishdetail);