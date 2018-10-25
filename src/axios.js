import axios from 'axios';

const jsonPlaceholder = axios.create({
    baseUrl: 'https://jsonplaceholder.typicode.com'
});

jsonPlaceholder.defaults.headers.common['Authorization'] = 'AUTH TOKEN';

export default axios;