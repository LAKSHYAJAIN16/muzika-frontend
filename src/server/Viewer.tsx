import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import createUUID from "../scripts/utils/CreateUUID";
import styles from './Viewer.module.css';
import io, { Socket } from 'socket.io-client';

export default function Broadcaster() {
    const video = useRef<HTMLVideoElement>(null);
    const [called, setCalled] = useState<boolean>(false);
    const [socket, setSocket] = useState<Socket>();
    useEffect(() => {
        if (!called) {
            //Create Socket
            const temp_socket = io("http://localhost:1414");
            console.log(temp_socket);

            //Get Room ID
            const id = new URL(window.location.href).searchParams.get("id");

            //Create User ID
            const userID = createUUID();

            //Emit Message
            temp_socket.emit("join-room", id, userID);

            //Listen for user connected event
            temp_socket.on("user-connected", (payload) => {
                const data = JSON.parse(payload);
                if (data.roomID == id) {
                    console.log(data.userID + " joined");
                }
            })

            //Listen for media
            temp_socket.on("broadcast", (media) => {
                console.log(media);
                if(video.current){
                    video.current.srcObject = media;
                }
            })

            setSocket(temp_socket);
        }
        return () => {
            if (socket) {
                socket.close();
            }
        }
    }, [])

    return (
        <div>
            <>
                <Navbar />
                <div className={styles.main}>
                    Hello World!
                </div>
                <video autoPlay ref={video}></video>
            </>
        </div>
    )
}