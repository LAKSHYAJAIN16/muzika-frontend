import axios from 'axios';
import config from '../../config';
import { BroadcastPayload } from './Broadcast';

export default async function createBroadcast(payload: BroadcastPayload) { 
    const url: string = `${config.server}/api/servers/create`;
    const res = await axios.post(url, payload);
    return res;
}