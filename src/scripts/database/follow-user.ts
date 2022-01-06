import axios from "axios";

import FollowSchema from "./models/Follow-Schema";
import config from "../../config";

export default async function followUser(payload: FollowSchema) {
    const url: string = `${config.backend}/api/graph/followers/follow`;
    const res = await axios.post(url, payload);
    return res;
}