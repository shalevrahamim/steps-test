import axios from 'axios';
export let limit = 20;

export const getComments = async (page) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${limit}`)
    return response.data;
}

export const sendComment = async (comment) => {
    try {
        const response = await axios.post('http://test.steps.me/test/testAssignComment', comment);
        return response.data;
    }
    catch (error) {
        console.log('error', error.message);
        return comment;
    }
}