import axios from 'axios'

export const getProducts = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        console.log(response.data)
        return response;
    } catch (error) {
        console.log(error);
    }
}
