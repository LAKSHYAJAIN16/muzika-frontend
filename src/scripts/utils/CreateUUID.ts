export default function createUUID(){
    const length = 10;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
    let final = "";
    for (let i = 0; i < length; i++) {
        final += chars[Math.floor(chars.length * Math.random())]
    }
    return final;
}