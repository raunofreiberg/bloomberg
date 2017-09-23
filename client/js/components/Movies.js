import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchMovies, fetchTodos, addTodo} from '../ducks/movies';

class Movies extends React.Component {

    componentDidMount() {
        this.props.onLoad();
        this.props.onDoShit();
    }

    handleAdd = (first, last) => {
        this.props.addTodo(first, last);
    };

    render() {
        return (
            <div>
                wassup
                <button onClick={() => this.handleAdd('suh', 'dude')}>Add TODO</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    movies: state.movies,
    todos: state.todos.todosList,
});

const mapDispatchToProps = dispatch => ({
    onLoad: () => dispatch(fetchMovies()),
    onDoShit: () => dispatch(fetchTodos()),
    addTodo: (first, last) => dispatch(addTodo(first, last)),
});

const MoviesConnector = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Movies);

export default MoviesConnector;
