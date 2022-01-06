interface CommentSchema{
   userID:string,
   videoID:string,
   timestamp:number,
   commentText:string,
   profilePic:string,
   username:string
}

export default CommentSchema;