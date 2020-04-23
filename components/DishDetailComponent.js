import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';

function RenderDish (props){

    const dish = props.dish;
    if (dish != null ) {
        return(
            <Card
                featuredTitle={dish.name}
                image={require('./images/uthappizza.png')}
                >
                <Text style={{
                    margin: 10
                }}>{dish.description}</Text>
                <Icon 
                    raised 
                    reverse
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already Favorite') : props.onPress()}
                    />
            </Card>
        );
    }
    else {
        return(
            <View></View>
        );
    }
}

function RenderComment(props){
    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {
        return(
        <View key={index} style={{margin: 10}}>
            <Text style={{fontSize: 14}}>{item.description}</Text>
            <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
            <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`} Stars</Text>
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

export default class Dishdetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            favorites: []
        }
    }

    markFavorite(dishId) {
        this.setState({favorites: this.state.favorites.concat(dishId)})
    }
    
    static navigationOptions = {
        title: 'Dish Detail'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId')
    return(
        <ScrollView>
            <RenderDish dish={this.state.dishes.filter((dish) => dishId === dish.id)[0]}
                        favorite={this.state.favorites.some(el => el === dishId)}
                        onPress={() => this.markFavorite(dishId)}/>
            <RenderComment comments={this.state.comments.filter((comment) => comment.dishId === dishId)}/> 
        </ScrollView>
    );}
}