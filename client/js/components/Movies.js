import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    firebaseConnect,
    isLoaded,
    isEmpty,
    dataToJS
} from 'react-redux-firebase';

import {fetchMovies} from '../ducks/movies';

@firebaseConnect()
@connect(({firebase}) => ({
    todos: dataToJS(firebase, 'todos'),
}))
class Movies extends React.Component {


    componentDidMount() {
        this.props.onLoad();
        this.props.firebase.login({
            email: 'fluffykins@fluffy.com',
            password: 'poopfoobar',
        });
    };

    handleAdd = () => {
        // const {newTodo} = this.refs;
        const { firebase } = this.props;

        firebase.push('/todos', {text: 'asd', done: false});
    };

    render() {
        return (
            <div>
                wassup
                <button onClick={this.handleAdd}>Add TODO</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    movies: state.movies.moviesList,
});

const mapDispatchToProps = dispatch => ({
    onLoad: () => dispatch(fetchMovies()),
});

const MoviesConnector = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Movies);

export default MoviesConnector;
