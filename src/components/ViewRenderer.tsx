import { useState, useEffect, FC } from "react"
import UserSchema from "../scripts/database/models/User-Schema";
import viewLevelOne from "../scripts/database/view-level-1";
import viewLevelTwo from "../scripts/database/view-level-2";

const ViewRenderer: FC<ViewRendererProps> = (props) => {
    const [internetSpeed, setInternetSpeed] = useState<number>(0);

    useEffect(() => {
        const internet = async () => {
            if (internetSpeed === 0) {
                //Image Address
                const imageAddr: string = "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200714180638/CIP_Launch-banner.png";
                const downloadSize: number = 5616998;

                //Times
                let startTime: number, endTime: number;

                //Actual Download
                let download = new Image();

                //Set Start Time
                startTime = (new Date()).getTime();

                //Set Image URL
                const cacheBuster = "?nnn=" + startTime;
                const addr = imageAddr + cacheBuster;
                download.src = addr;

                //Register Callback
                download.onload = async function () {
                    //Register end time
                    endTime = (new Date()).getTime();

                    //Get Speed
                    const duration: number = (endTime - startTime) / 1000;
                    const bitsLoaded: number = downloadSize * 8;
                    const speedBps: number = (bitsLoaded / duration) / 124;
                    const speedKbps: number = (speedBps / 1024);
                    setInternetSpeed(speedKbps);

                    //Less than 1 MBPS : don't record the view, add it to pending
                    if (speedKbps <= 1000) {
                        const pending: number = 1 + JSON.parse(localStorage.getItem("pending_views") || "0");
                        localStorage.setItem("pending_views", JSON.stringify(pending));
                        return;
                    }

                    //More than 1 MBPS but less than 5 MBPS : send level one view request.
                    if (speedKbps <= 4000 && speedKbps > 1000) {
                        const res = await viewLevelOne(props.id);
                        // console.log(res);
                    }

                    //More than 5 MBPS, finish all pending requests and send level two view requests.
                    if(speedKbps > 4000){
                        const pending: number = 1 + JSON.parse(localStorage.getItem("pending_views") || "0");
                        for (let i = 0; i < pending; i++) {
                            const res = await viewLevelTwo(props.id, props.userID, props.user?.name || "anonymous");
                            // console.log(res);
                        }
                        localStorage.setItem("pending_views", JSON.stringify(0));
                    }
                }
            }
        }
        internet();
    }, [])

    return (
        <>
            {/* Nothing bcuz this is a purely functionaly component */}
        </>
    )
}

export interface ViewRendererProps {
    id: string,
    user?: UserSchema,
    userID: string
}

export default ViewRenderer;
