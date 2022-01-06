import UserSchema from "../scripts/database/models/User-Schema";

interface CommentSectionProps {
    user? : UserSchema,
    userID : string,
    videoID : string
}

export default CommentSectionProps;