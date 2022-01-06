import { FC, useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import followUser from '../scripts/database/follow-user';
import unfollowUser from '../scripts/database/unfollow-user';
import fetchFollowedUsers from "../scripts/database/fetch-followed-users";
import UserInfoProps from '../interfaces/UserInfo-Props';
import styles from './UserInfo.module.css';
import FollowSchema from '../scripts/database/models/Follow-Schema';
import UnFollowSchema from '../scripts/database/models/UnFollow-Schema';
import UserSchema from '../scripts/database/models/User-Schema';
import { Link } from 'react-router-dom';

export const UserInfo: FC<UserInfoProps> = (props) => {
    const [followUI, setFollowUI] = useState<string>(styles.followButtonNormal);
    const [following, setFollowing] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [sentRequest, setSentRequest] = useState<boolean>(false);

    useEffect(() => {
        //Check if we've already followed to the person
        if (!props.match) {
            //Get the current user
            const actualData: string = localStorage.getItem("cached_user") || "";
            const currentUser: UserSchema = JSON.parse(actualData).data;

            const sendRequest = async () => {
                //Get the Followed Users by the current user
                const followerData: any = await fetchFollowedUsers(currentUser);
                const temp_followed_users: Array<UserSchema> = followerData.data.data.users;
                const video_user: string = props.video?.user?.email || "";
                setSentRequest(true);
                for (let i = 0; i < temp_followed_users.length; i++) {
                    const user: string = temp_followed_users[i].email;
                    if (video_user === user) {
                        setFollowUI(styles.followButtonGray);
                        setFollowing(true);
                        break;
                    }
                }
                setSentRequest(true);
            }

            if (currentUser.email === props.video?.user?.email) {
                setSentRequest(true);
                return;
            }
            else {
                sendRequest();
            }
        }
        else {
            setSentRequest(true);
        }
    }, [])

    const follow = async () => {
        const temp_following: boolean = !following;

        if (!props.match) {
            if (temp_following === true) {
                //Set UI
                setFollowUI(styles.followButtonGray)

                //Create Follow Payload
                const payload: FollowSchema = {
                    followee: props.video?.user?.email || "",
                    follower: props.user?.email || ""
                }

                //Send Request
                const res = await followUser(payload);
                console.log(res);
            }
            else if (temp_following === false) {
                setFollowUI(styles.followButtonNormal)

                //Create UnFollow Payload
                const payload: UnFollowSchema = {
                    followee: props.video?.user?.email || "",
                    follower: props.user?.email || "",
                    authorizeDelete: true
                }

                //Send Request
                const res = await unfollowUser(payload);
                console.log(res);
            }

            setFollowing(temp_following);
        }

        else if (props.match) {
            setShowAlert(true);
        }

    }

    return (
        <>
            <div className={styles.alert}>
                {showAlert && (
                    <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                        <Alert.Heading>You Cannot Follow yourself!</Alert.Heading>
                        <p>dude man wat u doin yuo can't follow yourself</p>
                    </Alert>
                )}
            </div>

            <div className={styles.main}>
                <Link to={`/profile?id=${props.userID}`}>
                    <img
                        className={styles.userProfilePic}
                        src={props.video?.user?.photo}
                    ></img>
                </Link>
                <div className={styles.usernameAFans}>
                    <p className={styles.username}>{props.video?.user?.name}</p>
                    <p className={styles.fans}>100k fans</p>
                </div>
                {sentRequest
                    ? <button className={props.match ? styles.followButtonDisabled : followUI} onClick={() => follow()}>
                        {following ? "Following" : "Follow"}
                    </button>
                    : (
                        // <button className={styles.followButtonDisabled} disabled>
                        //     Follow
                        // </button>
                        <>
                            <Spinner animation="border" />
                        </>
                    )
                }
            </div>
        </>
    )
}
