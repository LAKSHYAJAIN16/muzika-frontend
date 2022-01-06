import { FC, useState, useEffect } from "react";
import DropDown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";

import CommentSchema from "../scripts/database/models/Comment-Schema";
import createComment from "../scripts/database/create-comment";
import updateComment from "../scripts/database/update-comment";
import deleteComment from "../scripts/database/delete-comment";
import fetchCommentsOnVideo from "../scripts/database/fetch-comments-video";
import CommentSectionProps from "../interfaces/CommentSection-Props";
import styles from './CommentSection.module.css';

export const CommentSection: FC<CommentSectionProps> = (props) => {
    //States
    const [comment, setComment] = useState<string>("");
    const [loadingCreate, setLoadingCreate] = useState<boolean>(false);
    const [loadingComments, setLoadingComments] = useState<boolean>(true);
    const [comments, setComments] = useState<Array<any>>([]);
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const sendRequest = async () => {
            if (loadingComments) {
                //Send Request to get all comments on video
                const res = await fetchCommentsOnVideo(props.videoID);
                setComments(res.data.data);
                setUsername(props.user?.name || "");
                setLoadingComments(false);
            }
        }
        sendRequest();
    }, [])

    //Submit Method
    const submit = async () => {
        //Create Payload
        const payload: CommentSchema = {
            userID: props.userID,
            videoID: props.videoID,
            username: props.user?.name || "",
            profilePic: props.user?.photo || "",
            timestamp: Date.now(),
            commentText: comment
        }

        //Query
        setLoadingCreate(true);
        const res = await createComment(payload);
        const temp_comments = comments;
        temp_comments.push(res.data.data);
        setComments(temp_comments);
        setLoadingCreate(false);
        setComment("");
        sort("newest");
    }

    //Sort Method
    const sort = (method: string) => {
        if (method == "oldest") {
            setLoadingComments(true);
            let final: Array<any> = [];
            let aux = comments;
            comments.map((e) => {
                let max: number = -10;
                let maxElement = null;
                aux.map((f) => {
                    if (f.data.timestamp > max) {
                        max = f.data.timestamp
                        maxElement = f;
                    }
                })

                //Remove it from the aux array
                aux.splice(aux.indexOf(maxElement), 1);

                //Push it to the final array
                final.push(maxElement);
            })
            final.push(aux[0]);

            final = final.reverse();
            setComments(final);
            setLoadingComments(false);
        }

        if (method == "newest") {
            setLoadingComments(true);
            let final: Array<any> = [];
            let aux = comments;
            comments.map((e) => {
                let max = -10;
                let maxElement = null;
                aux.map((f) => {
                    if (f.data.timestamp > max) {
                        max = f.data.timestamp
                        maxElement = f;
                    }
                })

                //Remove it from the aux array
                aux.splice(aux.indexOf(maxElement), 1);

                //Push it to the final array
                final.push(maxElement);
            })
            final.push(aux[0]);

            setComments(final);
            setLoadingComments(false);
        }

        if (method == "shuffle") {
            setLoadingComments(true);
            const temp_comments: Array<any> = comments;
            let currentIndex: number = temp_comments.length, randomIndex: number;

            // While there remain elements to shuffle...
            while (currentIndex != 0) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [temp_comments[currentIndex], temp_comments[randomIndex]] = [
                    temp_comments[randomIndex], temp_comments[currentIndex]];
            }
            setComments(temp_comments);
            setLoadingComments(false);
        }
    }

    //Delete Comment Method
    const deleteCommentMethod = async (id: string, actualComment: any) => {
        setLoadingComments(true);
        const res = await deleteComment(id);
        const temp_comments = comments;
        temp_comments.splice(temp_comments.indexOf(actualComment), 1);
        setLoadingComments(false);
        setComments(temp_comments);
        sort("newest");
    }

    //Update Comment Method
    const updateCommentMethod = async (id: string, text: string, actualComment: any, timeStamp: number) => {
        setLoadingComments(true);
        //Create Payload
        const payload = {
            commentText: text,
            timestamp: timeStamp
        }

        //Send Request to database
        const res = await updateComment(id, payload);

        //Now, Update array
        const temp_comments = comments;
        const newComment = actualComment;
        newComment.data.commentText = text;
        newComment.data.timeStamp = timeStamp;
        temp_comments[temp_comments.indexOf(actualComment)] = newComment;
        setComments(temp_comments);
        setLoadingComments(false);
        sort("newest");
    }

    //Single Comment Component
    const SingleComment: FC<SingleCommentProps> = (props: SingleCommentProps) => {
        const [editing, setEditing] = useState<boolean>(false);
        const [text, setText] = useState<string>(props.text);
        return (
            <>
                <div className={styles.commentInput} style={{ marginBottom: "20px" }}>
                    {editing
                        ? <>
                            <img
                                src={props.photo}
                                className={styles.currentUserProfilePic}
                            >
                            </img>
                            <div className={styles.commentBodyWrapper}>
                                <p className={styles.commentBody}>
                                    <input
                                        type="text"
                                        defaultValue={props.text}
                                        value={text}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                updateCommentMethod(props.id, text, props.actualComment, Date.now());
                                            }
                                        }}
                                        onChange={(e) => setText(e.target.value)}
                                        className={`${styles.commentInputField} ${styles.editInputField}`}
                                    >
                                    </input>
                                </p>
                                <div className={`${styles.buttons} ${styles.editButtons}`}>
                                    <button
                                        onClick={() => setEditing(false)}
                                        className={styles.cancelButton}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className={styles.submitButton}
                                        onClick={() => updateCommentMethod(props.id, text, props.actualComment, Date.now())}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </>
                        : <>
                            <img
                                src={props.photo}
                                className={styles.currentUserProfilePic}
                            >
                            </img>
                            <div className={styles.commentBodyWrapper}>
                                <p style={{ marginTop: "10px" }}>
                                    <span className={styles.commentUserName}>{props.userName}</span>
                                    <span className={styles.commentTimeAgo}>{props.timeAgo}</span>
                                </p>
                                <p className={styles.commentBody}>
                                    <span>
                                        {props.text}
                                    </span>
                                </p>
                                <div className={styles.commentOptions}>
                                    <DropDown className={styles.sortDropdown}>
                                        <DropDown.Toggle className={`${styles.sortDropdown} ${styles.optionDropdown}`} variant="secondary">
                                            <i
                                                className={`${styles.commentOptionIcon} fas fa-ellipsis-v`}
                                            />
                                        </DropDown.Toggle>
                                        <DropDown.Menu variant="dark" style={{ zIndex: 169 }}>
                                            {props.userName !== username
                                                ? <>
                                                    <DropDown.Item className={styles.sortOption}>
                                                        <i className="fas fa-flag" style={{ marginRight: "10px" }}></i>
                                                        Flag Comment
                                                    </DropDown.Item>
                                                </>
                                                : <>
                                                    <DropDown.Item
                                                        className={styles.sortOption}
                                                        onClick={() => setEditing(true)}
                                                    >
                                                        Edit
                                                    </DropDown.Item>
                                                    <DropDown.Item
                                                        className={styles.sortOption}
                                                        onClick={() => deleteCommentMethod(props.id, props.actualComment)}
                                                    >
                                                        Delete
                                                    </DropDown.Item>
                                                </>
                                            }
                                        </DropDown.Menu>
                                    </DropDown>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </>
        )
    }

    //Single Comment Props
    interface SingleCommentProps {
        photo: string,
        userName: string,
        timeAgo: string
        text: string,
        id: string,
        actualComment: any
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.commentHeaders}>
                    <p className={styles.commentAmount}>{comments.length} Comments</p>

                    <div className={styles.sortBy}>
                        <DropDown className={styles.sortDropdown}>
                            <DropDown.Toggle className={styles.sortDropdown} variant="secondary">
                                <i className={`fas fa-sort ${styles.sortIcon}`}></i>
                                <span>Sort By</span>
                            </DropDown.Toggle>
                            <DropDown.Menu variant="dark">
                                <DropDown.Item className={styles.sortOption} onClick={() => sort("newest")}>Newest First</DropDown.Item>
                                <DropDown.Item className={styles.sortOption} onClick={() => sort("oldest")}>Oldest First</DropDown.Item>
                                <DropDown.Item className={styles.sortOption} onClick={() => sort("shuffle")}>Shuffle Comments</DropDown.Item>
                            </DropDown.Menu>
                        </DropDown>
                    </div>
                </div>

                <div className={styles.commentInput}>
                    <img
                        src={props.user?.photo}
                        className={styles.currentUserProfilePic}
                    >
                    </img>

                    <input
                        placeholder="Add a Comment..."
                        className={styles.commentInputField}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                submit();
                            }
                        }}
                    />
                    <div className={styles.buttons}>
                        <button
                            type="reset"
                            onClick={() => setComment("")}
                            className={styles.cancelButton}
                            style={{ marginLeft: "10px" }}
                        >
                            Cancel
                        </button>
                        {loadingCreate
                            ? <button
                                type="submit"
                                className={styles.submitButton}
                                disabled
                            >
                                <Spinner animation="border" />
                            </button>
                            : <button
                                type="submit"
                                onClick={() => submit()}
                                className={styles.submitButton}
                            >
                                Comment
                            </button>
                        }
                    </div>
                </div>

                <div className={styles.comments}>
                    {loadingComments
                        ? <Spinner animation="border" />
                        : (
                            <>
                                {comments.map((comment, index) => (
                                    <>
                                        <SingleComment
                                            photo={comment.data.profilePic}
                                            userName={comment.data.username}
                                            timeAgo={moment(comment.data.timestamp).fromNow()}
                                            text={comment.data.commentText}
                                            id={comment.ref["@ref"].id}
                                            key={comment.ref["@ref"].id}
                                            actualComment={comment}
                                        />
                                    </>
                                ))}
                            </>
                        )}
                </div>
            </div>
        </>
    )
}
