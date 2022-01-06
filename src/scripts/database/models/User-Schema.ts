interface UserSchema{
    name:string,
    email:string,
    provider:string,
    intent:string,
    password:string,
    photo:string,
    country:string,
    gender:string,
    likedArtists:Array<string>,
    instruments:Array<string>,
    songs:Array<string>,
    isLive:Boolean,
    live:Object,
}

export default UserSchema;