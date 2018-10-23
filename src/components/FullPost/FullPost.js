import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    state = {
        selectedPost: null,
    }

    componentDidUpdate() {
        if (this.props.selectedPostId !== null) {
            axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.selectedPostId).then(response => {
                this.setState({
                    selectedPost: response.data
                })
            });
        }
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.state.selectedPost) {
            const selectedPost = this.state.selectedPost;
            post = (
                <div className="FullPost">
                    <h1>{selectedPost.title}</h1>
                    <p>{selectedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;