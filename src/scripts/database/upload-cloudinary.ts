import axios from "axios";

export default async function uploadToCloudinary(video: File | null, videoURL: string) {
    // const endpoint: string = `${config.backend}/api/songs/create`;
    // const data = {
    //     video :videoURL
    // }
    // const res = await axios.post(endpoint, data);
    // console.log(res);
    if(video != null){
        const formData: FormData = new FormData();
        formData.append("file", video);
        formData.append("upload_preset", "cdkq7wce");

        const res = await axios.post("https://api.cloudinary.com/v1_1/everything-limited/auto/upload", formData);
        return res.data;
    }
}