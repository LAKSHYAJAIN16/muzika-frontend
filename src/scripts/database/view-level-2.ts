import axios from 'axios';
import config from '../../config';

export default async function viewLevelTwo(id: string, userID: string, userName: string) {
    const url: string = `${config.backend}/api/graph/views/view/level-2/${id}`;
    const payload = {
        userID: userID,
        username: userName
    }
    const res = await axios.post(url, payload);
    return res;
}