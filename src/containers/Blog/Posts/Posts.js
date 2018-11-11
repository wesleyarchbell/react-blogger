import React, {Component} from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';

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
                this.setState({posts: posts});
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
            return <Post
                key={post.id}
                title={post.title.substring(0, 20)}
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)}
            />;
        });

        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default Posts;
