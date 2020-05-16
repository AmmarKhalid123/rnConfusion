import * as ActionTypes from './ActionTypes';

export const comments = (state = {
        errMess: null,
        comments: []
    }, action) => {
        switch(action.type) {

            case ActionTypes.ADD_COMMENTS:
                return {...state, errMess: null, comments: action.payload};

            case ActionTypes.COMMENTS_FAILED:
                return {...state, errMess: action.payload, comments: []};
            
            case ActionTypes.ADD_COMMENT:
                comment = action.payload;
                comment.id = state.comments.length;
                const newComments = state.comments.concat(comment);
                return {...state, errMess: null,comments: newComments};   
            
            default: 
                return state;
        }
    };