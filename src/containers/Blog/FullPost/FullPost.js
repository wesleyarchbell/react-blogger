import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    state = {
        selectedPost: null,
    }

    componentDidMount() {
        var selectedId = this.props.match.params.id;
        if (selectedId) {
            if (!this.state.selectedPost || (this.state.selectedPost && this.state.selectedPost.id !== this.props.selectedPostId)) {
                axios.get('/posts/' + selectedId).then(response => {
                    this.setState({
                        selectedPost: response.data
                    })
                });
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.state.selectedPost.id).then(response => {
            this.setState({
                selectedPost: null
            });
        });
    }

    render() {
        let post = <p style={{ textAlign: 'center' }}>Loading...</p>;
        if (this.state.selectedPost) {

            const selectedPost = this.state.selectedPost;
            post = (
                <div className="FullPost">
                    <h1>{selectedPost.title}</h1>
                    <p>{selectedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;