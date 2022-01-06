import { useState, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import FormCheck from "react-bootstrap/FormCheck";

import Navbar from "../components/Navbar";
import uploadToCloudinary from "../scripts/database/upload-cloudinary";
import styles from "./Create.module.css";
import UserSchema from "../scripts/database/models/User-Schema";
import { FileData, VideoSchema } from "../scripts/database/models/Video-Schema";
import { createVideo } from "../scripts/database/create-video";

export default function Create() {
    const [user, setUser] = useState<UserSchema>();
    const [videoURL, setVideoURL] = useState<string>("");
    const [video, setVideo] = useState<File | null>(null);
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");

    //UI States
    const [ui, setUI] = useState<Number>(0);
    const [nested, setNested] = useState<Number>(0);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("cached_user") || "").data);
    }, [])

    const submit = async () => {
        const cloud = await uploadToCloudinary(video, videoURL);
        const fileData: FileData = {
            asset_id: cloud.asset_id,
            secure_url: cloud.secure_url,
            isAudio: cloud.is_audio
        }
        console.log("File uploaded. Initiating FaunaDB");

        const finalData: VideoSchema = {
            fileData: fileData,
            title: title,
            desc: desc,
            user: user,
        }

        try {
            const res = await createVideo(finalData);
            const id = res.data.videoCreated.ref["@ref"].id;
            window.location.replace("/videos/specific?id=" + id);
            console.log(res);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Navbar />
            <div className={styles.main}>
                <Modal show={true} size="lg" centered contentClassName={styles.videoModal}>
                    {ui === 0 && (
                        <>
                            <h1 className={styles.videoHeader}>Upload Video/Audio</h1>
                            <label htmlFor="fileInput" className={styles.videoUpload}>
                                <i className={`fas fa-upload ${styles.videoUploadIcon}`}></i>
                                <span className={styles.videoUploadText}>Upload Here</span>
                            </label>
                            <input
                                id="fileInput"
                                type="file"
                                style={{ display: "none" }}
                                onChange={(object) => {
                                    if (object.target.files != null) {
                                        setVideo(object.target.files[0]);
                                        setVideoURL(URL.createObjectURL(object.target.files[0]));
                                        setTitle(object.target.files[0].name);
                                        setUI(1);
                                    }
                                }}
                            />
                        </>
                    )}

                    {ui === 1 && (
                        <div className={styles.nMain}>
                            <div className={styles.main}>
                                {nested === 0 && (
                                    <>
                                        <Pagination style={{ paddingLeft: "10px" }} className={styles.pagination}>
                                            <Pagination.Item active style={{ zoom: 0.7 }}>
                                                Set Title
                                            </Pagination.Item>
                                            <Pagination.Item style={{ zoom: 0.7 }}>
                                                Set Description
                                            </Pagination.Item>
                                            <Pagination.Item style={{ zoom: 0.7 }}>
                                                Set Other Details
                                            </Pagination.Item>
                                            <Pagination.Item style={{ zoom: 0.7 }}>
                                                Finalize
                                            </Pagination.Item>
                                        </Pagination>
                                        <br />
                                        <br />
                                        <h1 className={styles.videoHeader} style={{ fontSize: "2em" }}>Title</h1>
                                        <br />
                                        <input
                                            type="text"
                                            defaultValue={title}
                                            className={styles.titleInput}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                        <Button
                                            style={{ marginLeft: "105px", width: "130px", marginTop: "50px" }}
                                            onClick={() => setNested(1)}
                                        >
                                            Next
                                        </Button>
                                    </>
                                )}

                                {nested === 1 && (
                                    <>
                                        <Pagination style={{ paddingLeft: "10px" }} className={styles.pagination}>
                                            <Pagination.Item style={{ zoom: 0.7 }}>
                                                Set Title
                                            </Pagination.Item>
                                            <Pagination.Item active style={{ zoom: 0.7 }}>
                                                Set Description
                                            </Pagination.Item>
                                            <Pagination.Item style={{ zoom: 0.7 }}>
                                                Set Other Details
                                            </Pagination.Item>
                                            <Pagination.Item style={{ zoom: 0.7 }}>
                                                Finalize
                                            </Pagination.Item>
                                        </Pagination>
                                        <br />
                                        <br />
                                        <h1 className={styles.videoHeader} style={{ fontSize: "2em" }}>Description</h1>
                                        <br />
                                        <textarea
                                            className={styles.descInput}
                                            defaultValue={`This is a Song I wrote, called ${title}`}
                                            onChange={(e) => setDesc(e.target.value)}
                                        />
                                        <div className={styles.buttonWrapper}>
                                            <Button
                                                style={{ width: "130px", marginTop: "50px", marginRight: "10px" }}
                                                onClick={() => setNested(0)}
                                                variant="danger"
                                            >
                                                Previous
                                            </Button>
                                            <Button
                                                style={{ width: "130px", marginTop: "50px" }}
                                                onClick={() => setNested(2)}
                                            >
                                                Next
                                            </Button>
                                        </div>
                                    </>
                                )}

                                {nested === 2 && (
                                    <>
                                        <Pagination style={{ paddingLeft: "10px" }} className={styles.pagination}>
                                            <Pagination.Item style={{ zoom: 0.7 }}>
                                                Set Title
                                            </Pagination.Item>
                                            <Pagination.Item style={{ zoom: 0.7 }}>
                                                Set Description
                                            </Pagination.Item>
                                            <Pagination.Item active style={{ zoom: 0.7 }}>
                                                Set Other Details
                                            </Pagination.Item>
                                            <Pagination.Item style={{ zoom: 0.7 }}>
                                                Finalize
                                            </Pagination.Item>
                                        </Pagination>
                                        <br />
                                        <br />
                                        <h1 className={styles.videoHeader} style={{ fontSize: "2em" }}>Other Details</h1>
                                        <br />
                                        <br />
                                        <div className={styles.otherOptionWrapper}>
                                            <p>Explict</p>
                                            <FormCheck style={{ marginTop: "-13px", marginLeft: "10px" }} />
                                        </div>
                                        <div className={styles.otherOptionWrapper}>
                                            <p>License</p>
                                            <select style={{ marginTop: "-13px", marginLeft: "10px", width: "100px", height: "30px" }}>
                                                <option>MIT</option>
                                                <option>C.C</option>
                                            </select>
                                        </div>
                                        <br />

                                        <div className={styles.buttonWrapper} style={{ marginLeft: "10px" }}>
                                            <Button
                                                style={{ width: "130px", marginTop: "50px", marginRight: "10px" }}
                                                onClick={() => setNested(1)}
                                                variant="danger"
                                            >
                                                Previous
                                            </Button>
                                            <Button
                                                style={{ width: "130px", marginTop: "50px" }}
                                                onClick={() => setNested(3)}
                                            >
                                                Next
                                            </Button>
                                        </div>
                                    </>
                                )}

                                {nested === 3 && (
                                    <>
                                        <Pagination style={{ paddingLeft: "10px" }} className={styles.pagination}>
                                            <Pagination.Item style={{ zoom: 0.7 }}>
                                                Set Title
                                            </Pagination.Item>
                                            <Pagination.Item style={{ zoom: 0.7 }}>
                                                Set Description
                                            </Pagination.Item>
                                            <Pagination.Item style={{ zoom: 0.7 }}>
                                                Set Other Details
                                            </Pagination.Item>
                                            <Pagination.Item active style={{ zoom: 0.7 }}>
                                                Finalize
                                            </Pagination.Item>
                                        </Pagination>
                                        <br />
                                        <br />
                                        <h1 className={styles.videoHeader} style={{ fontSize: "2em" }}>Finalize</h1>
                                        <br />
                                        <p className={styles.finalTitle}>{title}</p>
                                        <p className={styles.finalAuthor}>By {user?.name}</p>
                                        <p className={styles.finalDesc}>{desc}</p>
                                        <div className={styles.buttonWrapper} style={{ marginLeft: "10px" }}>
                                            <Button
                                                style={{ width: "130px", marginTop: "50px", marginRight: "10px" }}
                                                onClick={() => setNested(2)}
                                                variant="danger"
                                            >
                                                Previous
                                            </Button>
                                            <Button
                                                style={{ width: "130px", marginTop: "50px" }}
                                                onClick={() => submit()}
                                            >
                                                Next
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                            <iframe src={videoURL} className={styles.videoPreview} />
                        </div>
                    )}
                </Modal>
            </div>
        </>
    )
}
