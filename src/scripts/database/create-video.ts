import axios from "axios";
import config from "../../config";
import { VideoSchema } from "./models/Video-Schema";

export async function createVideo(video: VideoSchema) {
    const url: string = `${config.backend}/api/songs/create`;
    const res = await axios.post(url, video);
    return res;
}