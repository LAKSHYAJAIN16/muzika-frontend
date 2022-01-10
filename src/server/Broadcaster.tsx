import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import createUUID from "../scripts/utils/CreateUUID";
import styles from './Broadcaster.module.css';
import io, { Socket } from 'socket.io-client';

export default function Broadcaster() {
    const [called, setCalled] = useState<boolean>(false);
    const [socket, setSocket] = useState<Socket>();
    useEffect(() => {
        const code = async () => {
            if (!called) {
                //Create Socket
                const temp_socket = io("http://localhost:1414");
                console.log(temp_socket);

                //Get Room ID
                const id = new URL(window.location.href).searchParams.get("id");

                //Create User ID
                const userID = createUUID();

                //Emit Message, that we've joined the room
                temp_socket.emit("join-room", id, userID);

                //Listen for user connected event
                temp_socket.on("user-connected", (payload) => {
                    const data = JSON.parse(payload);
                    if (data.roomID == id) {
                        console.log(data.userID + " joined");
                    }
                })

                //Get Media
                navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((media) => {
                    console.log(media);
                    temp_socket.emit("broadcast-media", media);
                    setSocket(temp_socket);
                });
            }
        }

        code();

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
            </>
        </div>
    )
}
