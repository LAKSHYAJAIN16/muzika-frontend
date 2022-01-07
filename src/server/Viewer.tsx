import Navbar from "../components/Navbar";
import styles from './Viewer.module.css';

export default function Broadcaster() {
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