import axios from "axios";

import UnHeartSchema from "./models/UnHeart-Schema";
import config from "../../config";

export default async function unHeartVideo(payload: UnHeartSchema) {
    const url: string = `${config.backend}/api/graph/hearts/un-heart`;
    const res = await axios.post(url, payload);
    return res;
}