import axios from 'axios';
import config from '../../config';

export default async function deleteComment(id: string) {
    const url: string = `${config.backend}/api/graph/comments/delete/${id}?authorizeDelete=true`;
    const res = await axios.delete(url);
    return res;
}