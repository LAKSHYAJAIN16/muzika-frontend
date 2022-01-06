import axios from "axios";

import config from "../../config";
import UserSchema from "./models/User-Schema";

export default async function sendSignUpRequest(data: UserSchema) {
    const endpoint: string = `${config.backend}/api/user/signup`;
    const res = await axios.post(endpoint, data);
    return res;
}