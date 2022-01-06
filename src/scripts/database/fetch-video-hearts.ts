import axios from "axios";
import config from "../../config";

export default async function fetchVideoHearts(id: string, level: string) {
    const url: string = `${config.backend}/api/graph/hearts/hearts-on-video/${id}?return_compound=true&level=${level}`;
    const res = await axios.get(url);
    return res;
}