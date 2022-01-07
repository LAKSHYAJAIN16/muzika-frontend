import { FC, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import UserSchema from "../scripts/database/models/User-Schema";
import { BroadcastPayload } from "../scripts/server/Broadcast";
import createBroadcast from "../scripts/server/createBroadcast";
import styles from './Broadcast.module.css';

export default function Broadcast() {
    //Intent States
    const [intent, setIntent] = useState<string>("");
    const [retrievedIntent, setRetrievedIntent] = useState<boolean>(false);

    useEffect(() => {
        if (!retrievedIntent) {
            const url: URL = new URL(window.location.href);
            const temp_intent: string = url.searchParams.get("intent") || "nan";

            //If it is nothing, rerender
            if (temp_intent === "nan") {
                window.location.replace("/broadcast?intent=browsing");
            }

            //Set States
            setIntent(temp_intent);
            setRetrievedIntent(true);

            //Set Title
            document.title = "Broadcast on Muzika";
        }
    }, [])

    //Permission Prompt Component
    interface PermissionProps {
        askedCallback: Function
    }
    const PermissionPrompt: FC<PermissionProps> = (props) => {
        useEffect(() => {
            const req = async () => {
                let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                props.askedCallback(stream);
            }
            req();
        }, [])

        return (
            <div className={styles.waitForAccept}>
                Give Us Permission to use the Webcam and Microphone
            </div>
        )
    }

    //Video Preview Component
    interface VideoPreviewProps {
        stream?: MediaStream
    }
    const VideoPreview: FC<VideoPreviewProps> = (props) => {
        const videoRef = useRef<HTMLVideoElement>(null);
        const [title, setTitle] = useState<string>("");
        const [desc, setDesc] = useState<string>("");
        const [user, setUser] = useState<UserSchema>();

        useEffect(() => {
            if (props.stream && videoRef.current) {
                videoRef.current.srcObject = props.stream;
                videoRef.current.addEventListener("loadedmetadata", () => {
                    videoRef.current?.play();
                })
            }

            //Get User
            const actualData: string = localStorage.getItem("cached_user") || "";
            const data: any = JSON.parse(actualData);
            const user: UserSchema = data.data;
            setUser(user);
        }, [])

        const broadcast = async () => {
            //Create Payload
            const payload: BroadcastPayload = {
                username: user?.name || "",
                profilePic: user?.photo || "",
                title: title,
                desc: desc
            }

            //Send Request
            const res = await createBroadcast(payload);
            console.log(res);

            //Redirect
            window.location.replace("/broadcaster?id=" + res.data.data.serverID);
        }

        return (
            <div className="nflex">
                <div className={styles.videoPreview}>
                    <video
                        ref={videoRef}
                        style={{ height: "100%", width: "100%" }}
                    />
                </div>
                <div className="flex" style={{ marginTop: "-400px", color: "white" }}>
                    <br />
                    <p>Name of Broadcast</p>
                    <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
                    <br />
                    <p>Description of Broadcast</p>
                    <input value={desc} onChange={(e) => setDesc(e.target.value)}></input>
                    <br />
                    <button onClick={() => broadcast()}>Submit</button>
                </div>
            </div>
        )
    }

    //Main Component
    const MainCreateComponent: FC = () => {
        const [askedForPermission, setAskedForPermission] = useState<boolean>(false);
        const [media, setMedia] = useState<MediaStream>();

        const permissionCallback = (stream: MediaStream) => {
            setMedia(stream);
            setAskedForPermission(true);
        }

        return (
            <>
                {askedForPermission
                    ? <>
                        <VideoPreview stream={media} />
                    </>
                    : <>
                        <PermissionPrompt askedCallback={permissionCallback} />
                    </>
                }
            </>
        )
    }

    return (
        <>
            <Navbar />
            {retrievedIntent && (
                <>
                    {intent === "browsing" && (
                        <div className={styles.main}>
                            <div className={styles.head}>
                                <p className={styles.heading}>Broadcast</p>
                                <p className={styles.subHeading}>Host Live Concerts. Host Live Album Giveaways. Host Live Announcements.</p>
                                <p className={styles.subHeading}>Communicate with your fans in a way never seen before</p>
                                <br />
                                <br />
                                <br />
                                <br />
                                <Link to="/broadcast?intent=create">
                                    <button
                                        className={styles.startButton}
                                        onClick={() => {
                                            setRetrievedIntent(false);
                                            setIntent("create");
                                            setRetrievedIntent(true);
                                        }}
                                    >
                                        Start Now
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                    {intent === "create" && (
                        <>
                            <MainCreateComponent />
                        </>
                    )}
                </>
            )}
        </>
    )
}