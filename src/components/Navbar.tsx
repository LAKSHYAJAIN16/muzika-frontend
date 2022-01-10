import { useEffect, useState } from "react";

import styles from "../components/Navbar.module.css";
import logo from "../assets/logo.png";
import UserSchema from "../scripts/database/models/User-Schema";

export default function Navbar() {
    const [profilePic, setProfilePic] = useState<string>();
    useEffect(() => {
        try {
            const actualData: string = localStorage.getItem("cached_user") || "";
            const user: UserSchema = JSON.parse(actualData).data;
            setProfilePic(user.photo || "");
        }
        catch {
            setProfilePic("https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png");
        }
    }, [])
    return (
        <div className={styles.main}>
            <div className={styles.logoWrapper}>
                <img
                    src={logo}
                    className={styles.logo}
                    alt="logo_muzika"
                >
                </img>
                <p className={`${styles.logoName} twinkle`}>Muzika</p>
            </div>
            <div className={styles.searchWrapper}>
                <i className={`fas fa-search ${styles.searchIcon}`} />
                <input className={`${styles.searchInput} poppins`}></input>
            </div>
            <div className={styles.optionsWrapper}>
                <p className={`${styles.option} poppins`} onClick={() => window.location.replace("/create")}>Create</p>
                <p className={`${styles.option} poppins`}>Discover</p>
            </div>
            <img
                src={profilePic}
                className={styles.profilePic}
            ></img>
        </div>
    )
}
