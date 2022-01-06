import axios from "axios";

import config from "../../config";
import UserSchema from "./models/User-Schema";

export default async function fetchFollowedUsers(user: UserSchema) {
    const endpoint: string = `${config.backend}/api/graph/followers/followed-accounts/${user.email}?return_compound=true`;
    const res = await axios.get(endpoint);
    return res;
}