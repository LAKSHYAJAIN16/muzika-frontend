export interface BroadcastPayload{
    username:string,
    profilePic:string,
    title:string,
    desc:string,
}

export default interface Broadcast{
    username:string,
    profilePic:string,
    title:string,
    desc:string,
    serverID:string,
    serverBucket:string,
    timestamp:number
}
