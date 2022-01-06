import axios from 'axios';
import config from '../../config';
import CommentSchema from './models/Comment-Schema';

export default async function createComment(payload: CommentSchema) { 
    const url: string = `${config.backend}/api/graph/comments/create`;
    const res = await axios.post(url, payload);
    return res;
}