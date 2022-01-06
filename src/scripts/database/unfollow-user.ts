import axios from "axios";

import UnFollowSchema from "./models/UnFollow-Schema";
import config from "../../config";

export default async function unfollowUser(payload: UnFollowSchema) {
    const url: string = `${config.backend}/api/graph/followers/unfollow`;
    const res = await axios.post(url, payload);
    return res;
}