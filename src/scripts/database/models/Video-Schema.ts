import UserSchema from "./User-Schema";

export interface FileData {
    asset_id: string,
    secure_url: string,
    isAudio: Boolean
}

export interface VideoSchema {
    fileData: FileData,
    title: string,
    desc: string,
    user: UserSchema | undefined,
}