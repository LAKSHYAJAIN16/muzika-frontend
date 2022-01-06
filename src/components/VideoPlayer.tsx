import { FC, useRef, useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";

import styles from './VideoPlayer.module.css';
import formatDate from "../scripts/utils/DateFormat";
import sleep from "../scripts/utils/Sleep";
import VideoPlayerProps from "../interfaces/VideoPlayer-Props";
import UserSchema from "../scripts/database/models/User-Schema";
import HeartSchema from "../scripts/database/models/Heart-Schema";
import UnHeartSchema from "../scripts/database/models/UnHeart-Schema";
import heartVideo from "../scripts/database/heart-video";
import unHeartVideo from "../scripts/database/unheart-video";
import fetchVideoHearts from "../scripts/database/fetch-video-hearts";
import { UserInfo } from "./UserInfo";
import { CommentSection } from "./CommentSection";
import ViewRenderer from "./ViewRenderer";
import fetchViewsOnVideo from "../scripts/database/fetch-views-video";

export const VideoPlayer: FC<VideoPlayerProps> = (props) => {
    const player = useRef<HTMLVideoElement | null>(null);
    const [match, setMatch] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<UserSchema>();
    const [currentUserRef, setCurrentUserRef] = useState<string>("");
    const [heartAmount, setHeartAmount] = useState<number>(0);
    const [viewCount, setViewCount] = useState<number>(0);

    //UI
    const [heartState, setHeartState] = useState<number>(0);
    const [animatingHeart, setAnimationHeart] = useState<boolean>(false);
    const [retrieved, setRetrieved] = useState<boolean>(false);
    const [retrievedViewCount, setRetrievedViewCount] = useState<boolean>(false);

    useEffect(() => {
        //Retrieve user
        const actualData: string = localStorage.getItem("cached_user") || "";
        const data: any = JSON.parse(actualData);
        const user: UserSchema = data.data;
        const userRef: string = data.ref["@ref"].id;
        setCurrentUser(user);
        setCurrentUserRef(userRef);

        //Check so that you can't follow yourself.
        const current_user_name: string = user.email;
        const video_user_name: string = props.video?.user?.email || "";
        const match = current_user_name === video_user_name;
        setMatch(match);

        //Retrieve the likes on our post
        const sendLikeRequest = async () => {
            const res = await fetchVideoHearts(props.id, "1");
            const temp_heart_count = res.data.ids.length;
            const users = res.data.data;
            setHeartAmount(temp_heart_count);

            //Check if our user is in the liked list
            users.map((user: any) => {
                if (user.userID === userRef) {
                    setHeartState(1);
                }
            })
            setRetrieved(true);
        }

        //Retieve the views on our post
        const sendViewRequest = async() =>{
            const res = await fetchViewsOnVideo(props.id);
            setViewCount(res.data.viewCount);
            setRetrievedViewCount(true);
        }

        sendLikeRequest();
        sendViewRequest();
    }, [])

    const heart = async (target: number) => {
        setHeartState(target);

        if (target === 1) {
            //Create Payload
            const payload: HeartSchema = {
                videoID: props.id,
                userID: currentUserRef
            }

            const res = await heartVideo(payload);
            setHeartAmount(heartAmount + 1);

            //Play Animation
            setAnimationHeart(true);
            await sleep(1000);
            setAnimationHeart(false);
        }

        else if (target == 0) {
            //Create Payload
            const payload: UnHeartSchema = {
                videoID: props.id,
                userID: currentUserRef,
                authorizeDelete: true
            }

            const res = await unHeartVideo(payload);
            setHeartAmount(heartAmount - 1);

            //Play Animation
            setAnimationHeart(false);
        }
    }

    return (
        <div className={styles.main}>
            <video controls={true} ref={player} preload="metadata" className={styles.video} autoPlay>
                <source src={props.src} type="video/mp4" />
            </video>
            <p className={styles.title}>{props.video?.title}</p>

            <p className={styles.views}>
                {retrievedViewCount
                    ? <>
                        {viewCount.toLocaleString()} hits ◉ {formatDate(props.ts)}
                    </>
                    : <>
                        <Spinner animation="border" />
                    </>}

                {/* Likes */}
                <span>
                    {retrieved
                        ? (
                            <>
                                {heartState === 0
                                    ? (
                                        <span>
                                            <i
                                                className={`far fa-heart ${styles.heartIcon}`}
                                                onClick={() => heart(1)}
                                            />
                                            <span className={styles.likes}>
                                                {heartAmount}
                                            </span>
                                        </span>
                                    )

                                    : (
                                        <span>
                                            <i
                                                className={`fas fa-heart ${styles.heartIcon}`}
                                                onClick={() => heart(0)}
                                            />
                                            <span className={styles.likes}>
                                                {heartAmount}
                                            </span>
                                        </span>
                                    )}

                                {animatingHeart && (
                                    <div className={styles.hearts}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            className={styles.heartAnimation}
                                            style={{ animationDelay: "0s", marginLeft: "245px" }}
                                            viewBox="0 0 24 24">
                                            <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
                                        </svg>

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            className={styles.heartAnimation}
                                            style={{ animationDelay: "0.1s", marginLeft: "40px" }}
                                            viewBox="0 0 24 24">
                                            <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
                                        </svg>

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            className={styles.heartAnimation}
                                            style={{ animationDelay: "0.2s", marginLeft: "40px" }}
                                            viewBox="0 0 24 24">
                                            <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
                                        </svg>
                                    </div>
                                )}
                            </>
                        )
                        : (
                            <>
                                <Spinner animation="border" />
                            </>
                        )
                    }
                </span>

                {/* Share */}
                <span>
                    <i className={`fas fa-share-alt ${styles.shareIcon}`}></i>
                    <span className={styles.shares}>
                        Share
                    </span>
                </span>
            </p>

            <hr style={{ marginTop: "20px" }} />

            <UserInfo
                video={props.video}
                user={currentUser}
                match={match}
                userID={props.userID}
            />

            <p className={styles.desc}>{props.video?.desc}</p>
            <hr style={{ marginTop: "30px" }} />

            {currentUser && (
                <>
                    <CommentSection user={currentUser} userID={currentUserRef} videoID={props.id} />
                    <ViewRenderer user={currentUser} userID={currentUserRef} id={props.id} />
                </>
            )}
        </div>
    )
}
