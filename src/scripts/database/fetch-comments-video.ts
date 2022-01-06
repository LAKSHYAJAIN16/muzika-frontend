import axios from 'axios';
import config from '../../config';

export default async function fetchCommentsOnVideo(videoID: string) {
    const url: string = `${config.backend}/api/graph/comments/comments-by-video/${videoID}`;
    const res = await axios.get(url);
    return res;
}