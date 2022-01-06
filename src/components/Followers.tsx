import { FC, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import fetchFollowerCount from "../scripts/database/fetch-follower-count";

const Followers: FC<FollowerProps> = (props) => {
    const [followers, setFollowers] = useState<number>(0);
    const [retrieved, setRetrieved] = useState<boolean>(false);

    useEffect(() => {
        const fetch = async () => {
            if (!retrieved) {
                //Send Request
                const res = await fetchFollowerCount(props.userID);
                setFollowers(res.data.followerCount);
                setRetrieved(true);
            }
        }
        fetch();
    }, [])

    return (
        <div>
            {retrieved
                ? <>
                    <p style={{ fontSize: "1.4em" }}>
                        {followers} Follower{followers === 0 || followers > 1 ? "s" : ""}
                    </p>
                </>
                : <>
                    <Spinner animation="border" />
                </>
            }
        </div>
    )
}

export interface FollowerProps {
    userID: string
}

export default Followers;