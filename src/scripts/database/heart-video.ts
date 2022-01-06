import axios from "axios";

import HeartSchema from "./models/Heart-Schema";
import config from "../../config";

export default async function heartVideo(payload: HeartSchema) {
    const url: string = `${config.backend}/api/graph/hearts/heart`;
    const res = await axios.post(url, payload);
    return res;
}