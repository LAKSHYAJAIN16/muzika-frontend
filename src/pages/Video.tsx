import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import fetchVideo from "../scripts/database/fetch-video";
import { VideoSchema } from "../scripts/database/models/Video-Schema";
import { VideoPlayer } from "../components/VideoPlayer";
import styles from './Video.module.css'

export default function Video() {
    //Video Player Attributes
    const [id, setId] = useState<string>("");
    const [postUserID, setPostUserID] = useState<string>("");
    const [postVideo, setPostVideo] = useState<VideoSchema>();
    const [postID, setPostID] = useState<string>("");
    const [timestamp, setTimestamp] = useState<number>(0);

    useEffect(() => {
        const retrieveData = async () => {
            //First, get URL
            const url: URL = new URL(window.location.href);
            const result: string | null = url.searchParams.get("id");

            if (result && id === "") {
                //Set the ID
                setId(result);

                //Fetch the video data
                const data: any = await fetchVideo(result);
                const id: string = data.data.video.ref["@ref"].id;
                const temp_timestamp: number = data.data.video.ts;
                const temp_user_id: string = data.data.video.data.userRef.ref["@ref"].id;
                const temp_video: VideoSchema = data.data.video.data.information;
                setPostUserID(temp_user_id);
                setTimestamp(temp_timestamp);
                setPostVideo(temp_video);
                setPostID(id);

                //Update Title
                document.title = `${temp_video.title} - By ${temp_video.user?.name} : Muzika`;
            }
        }
        retrieveData();
    }, [])

    return (
        <>
            <Navbar />
            <div className={styles.main}>
                {postVideo && (
                    <>
                        <div className={styles.videoWrapper}>
                            <VideoPlayer
                                src={postVideo.fileData.secure_url}
                                ads={false}
                                video={postVideo}
                                ts={timestamp}
                                id={id}
                                userID={postUserID}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
