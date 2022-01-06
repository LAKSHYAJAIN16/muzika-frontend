import Navbar from "../components/Navbar";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
    return (
        <>
        <Navbar />
            <div className={styles.main}>
                <p>Dawg</p>
            </div>
        </>
    )
}
