import axios from 'axios';
import config from '../../config';

export default async function fetchFollowerCount(id: string) {
    const url: string = `${config.backend}/api/graph/users/follower-count/${id}`;
    const res = await axios.get(url);
    return res;
}