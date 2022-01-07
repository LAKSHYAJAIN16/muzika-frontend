import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from './Broadcaster.module.css';
import io, { Socket } from 'socket.io-client';

export default function Broadcaster() {
    const [called, setCalled] = useState<boolean>(false);
    const [socket, setSocket] = useState<Socket>();
    useEffect(() => {
        if(!called){
            //Create Socket
            const socket = io(`http://localhost:1414/`);
            console.log(socket);
            setSocket(socket);
        }
        return () => {
            if(socket){
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
