import Navbar from "../components/Navbar";

import styles from "../pages/Home.module.css";

import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div style={{ overflowX: "hidden", maxWidth: "100%" }}>
            <Navbar />
            <div className={styles.content}>
                <p className={`${styles.heading} twinkle`}>Muzika</p>
                <p className={styles.subHeading}>A Musician's Heaven</p>
                <div className={styles.buttonWrapper}>
                    <Link to="/signup">
                        <button className={`${styles.button} ${styles.signUp}`}>Sign Up</button>
                    </Link>
                    <Link to="/login">
                        <button className={`${styles.button} ${styles.login}`}>Login</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
