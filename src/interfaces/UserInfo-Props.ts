import UserSchema from "../scripts/database/models/User-Schema";
import { VideoSchema } from "../scripts/database/models/Video-Schema";

interface UserInfoProps {
    video?: VideoSchema,
    user? : UserSchema,
    match : boolean,
    userID:string,
}

export default UserInfoProps;