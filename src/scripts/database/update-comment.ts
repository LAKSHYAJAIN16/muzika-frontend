import axios from 'axios';
import config from '../../config';

export default async function updateComment(id:string, payload:any) { 
    const url: string = `${config.backend}/api/graph/comments/update/${id}`;
    const res = await axios.put(url, payload);
    return res;
}