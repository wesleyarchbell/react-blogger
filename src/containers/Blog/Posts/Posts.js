import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

import { Link, Route } from 'react-router-dom';

import './Posts.css';

class Posts extends Component {

    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('/posts').then(response => {
            const posts = response.data.slice(0, 4);
            axios.get('/users').then(users => {
                posts.forEach(post => {
                    const foundUser = users.data.filter(user => user.id === post.id);
                    if (foundUser.length > 0) {
                        post.author = foundUser[0].name;
                    }
                });
                this.setState({ posts: posts });
            });
        });
    }
    
    postSelectedHandler = (id) => {
        this.setState({
            selectedPostId: id
        });
    }

    render() {

        const posts = this.state.posts.map(post => {
            return <Link to={'/posts/' + post.id} key={post.id}>
                <Post
                    title={post.title.substring(0, 20)}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)}
                />
            </Link>;
        });

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id' } exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;
