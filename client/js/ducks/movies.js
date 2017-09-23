import { combineReducers } from 'redux';
import firebase from '../config';

const initialState = {
    movies: [],
    todos: [],
};

const movies = (state = initialState.movies, action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return {
                ...state,
                movies: action.moviesList,
            };
        default:
            return state;
    }
};

const todos = (state = initialState.todos, action) => {
    switch (action.type) {
        case 'SET_TODOS':
            return {
                ...state,
                todos: action.todosList,
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    movies,
    todos,
});

// action creators
const setError = (statusCode, message) => ({ type: 'SET_ERROR', statusCode, message });
const setLoading = status => ({ type: 'SET_LOADING', status });
const setMovies = moviesList => ({ type: 'SET_MOVIES', moviesList });
const setTodos = todosList => ({ type: 'SET_TODOS', todosList });

export const fetchMovies = () => (dispatch) => {
    dispatch(setMovies(['1', '2', '3']));
};

export const fetchTodos = () => async (dispatch) => {

    try {
        const response =
            await firebase.database()
                .ref('todos')
                .orderByKey()
                .limitToLast(20)
                .on('value', (snapshot) => {
                    dispatch(setTodos([snapshot.val()]));
                });
        dispatch(setTodos([response]));
    } catch (err) {
        console.log(err);
    }
};

export const addTodo = (first, last) => async (dispatch, getState) => {
    try {
        const todo = await firebase.database().ref('todos').set({
            name: {
                first,
                last,
            },
        });
        dispatch(setTodos(...getState().data, ...todo));
    } catch (err) {
        console.log(err);
    }
};

export const login = () => {
    firebase.auth()
        .signInAnonymously();
};

export default rootReducer;
