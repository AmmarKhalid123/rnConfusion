import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList,Button, Modal, StyleSheet } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

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
    
    render (){
        const dish = this.props.dish;
    if (dish != null ) {
        return(
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
        <Card title='Comments'>
            <FlatList data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}/>
        </Card>
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