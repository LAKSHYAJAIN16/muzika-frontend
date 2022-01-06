import axios from 'axios';
import config from '../../config';

export default async function fetchViewsOnVideo(id: string) {
    const url: string = `${config.backend}/api/graph/views/views-on-video/${id}`;
    const res = await axios.get(url);
    return res;
}