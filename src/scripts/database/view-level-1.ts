import axios from 'axios';
import config from '../../config';

export default async function viewLevelOne(id: string) {
    const url: string = `${config.backend}/api/graph/views/view/level-1/${id}`;
    const res = await axios.post(url);
    return res;
}