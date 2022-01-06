import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import Navbar from '../components/Navbar';
import Followers from '../components/Followers';
import fetchUser from '../scripts/database/fetch-user';
import UserSchema from '../scripts/database/models/User-Schema';
import styles from './Profile.module.css';

export default function Profile() {
    //UI States
    const [retrievedUserData, setRetrievedUserData] = useState<boolean>(false);

    //Data States
    const [id, setId] = useState<string>("");
    const [user, setUser] = useState<UserSchema>();

    useEffect(() => {
        const fetch = async () => {
            if (!retrievedUserData) {
                //Parse ID
                const url: URL = new URL(window.location.href);
                const result: string = url.searchParams.get("id") || "";
                setId(result);

                //Retrieve User Data from backend
                const res = await fetchUser(result);
                const userData: UserSchema = res.data.data.data;
                setUser(userData);

                setRetrievedUserData(true);
            }
        }
        fetch();
    }, []);

    return (
        <>
            <Navbar />
            <div className={styles.main}>
                {retrievedUserData
                    ? <>
                        <div className={styles.top}>
                            <img
                                src={user?.photo}
                                alt="profile_pic"
                                className={styles.profilePic}
                            />
                            <p className={styles.username}>
                                {user?.name || ""}
                            </p>
                            <Followers userID={id}/>
                        </div>
                    </>
                    : <>
                        <Spinner animation="border" />
                    </>
                }
            </div>
        </>
    )
}
