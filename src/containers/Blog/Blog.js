import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
                const posts = response.data.slice(0, 4);
                axios.get('https://jsonplaceholder.typicode.com/users').then(users => {
                    posts.forEach(post => {
                        const foundUser = users.data.filter(user => user.id === post.id);
                        if (foundUser.length > 0) {
                            post.author = foundUser[0].name;
                        }
                    });
                    this.setState({posts: posts});
                });
            });
    }

    postSelectedHandler = (id) => {
        this.setState({
            selectedPostId: id
        });
    }

    render () {


        const posts = this.state.posts.map(post => {
            return <Post
                key={post.id}
                title={post.title.substring(0, 20)}
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)}
            />;
        });

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost selectedPostId={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;