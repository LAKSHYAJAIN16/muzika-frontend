import { VideoSchema } from "../scripts/database/models/Video-Schema";

interface VideoPlayerProps {
    src: string,
    ads: boolean,
    video?: VideoSchema,
    userID: string,
    ts: number,
    id: string
}

export default VideoPlayerProps;