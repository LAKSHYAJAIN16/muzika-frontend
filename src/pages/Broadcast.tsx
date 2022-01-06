import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
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

            setIntent(temp_intent);
            setRetrievedIntent(true);
        }
    }, [])

    //Permission Prompt Component
    const PermissionPrompt: FC = () => {
        useEffect(() => {
            const req = async () => {
                let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                console.log(stream);
            }
            req();
        }, [])
        return (
            <div className={styles.waitForAccept}>
                Give Us Permission to use the Webcam and Microphone
            </div>
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
                            <PermissionPrompt />
                        </>
                    )}
                </>
            )}
        </>
    )
}
