import axios from "axios";
import config from "../../config";

export default async function fetchVideo(id: string) {
    const url: string = `${config.backend}/api/songs/specific/id/${id}`;
    const res = await axios.get(url);
    return res;
}