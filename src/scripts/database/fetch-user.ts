import axios from 'axios';
import config from '../../config';

export default async function fetchUser(id: string) {
    const url: string = `${config.backend}/api/graph/users/specific/by-id/${id}`;
    const res = await axios.get(url);
    return res;
}