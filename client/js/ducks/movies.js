import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';

const initialState = {
    movies: [],
};

const movies = (state = initialState, action) => {
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

const rootReducer = combineReducers({
    movies,
    firebaseStateReducer,
});

// action creators
const setError = (statusCode, message) => ({ type: 'SET_ERROR', statusCode, message });
const setLoading = status => ({ type: 'SET_LOADING', status });
const setMovies = moviesList => ({ type: 'SET_MOVIES', moviesList });

export const fetchMovies = () => (dispatch) => {
    dispatch(setMovies(['1', '2', '3']));
};

export default rootReducer;
