import { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from './CreateCompetiton.module.css'

export default function CreateCompetiton() {
    const [ui, setUi] = useState<number>(0);
    return (
        <>
            <Navbar />
            <div>
                {ui === 0 && (
                    <div className={styles.main}>
                        <p className={styles.header}>Create A Competiton</p>
                        <p className={styles.subHeader}>Competitons are a great way to increase your fanbase, and give back to the music community</p>
                        <br />
                        <br />
                        <br />
                        <button
                            className={styles.button}
                            onClick={() => setUi(1)}
                        >
                            Create a Competiton
                        </button>
                    </div>
                )}
                {ui === 1 && (
                    <>
                        <p className={styles.inputHead}>Edit Details</p>
                        <div className="inputMain">
                            <br />
                            <div>
                                <span className={styles.inputName}>
                                    Enter Competiton Name <span style={{ color: "red" }}>*</span>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Enter Competiton Name"
                                    className={styles.actualInput}
                                    style={{ marginLeft: "30px" }}
                                />
                            </div>
                            <br />
                            <div>
                                <span className={styles.inputName}>Enter Competiton Description</span>
                                <input
                                    type="text"
                                    placeholder="Enter Competiton Description"
                                    className={styles.actualInput}
                                />
                            </div>
                            <br />
                            <div>
                                <span className={styles.inputName}>
                                    Enter Competiton Start Date <span style={{ color: "red" }}>*</span>
                                </span>
                                <input
                                    type="date"
                                    defaultValue={new Date(Date.now()).toISOString().substr(0, 10)}
                                    placeholder="Enter Competiton Description"
                                    className={styles.actualInput}
                                    style={{marginLeft:"-2px"}}
                                />
                            </div>
                            <br />
                            <div>
                                <span className={styles.inputName}>
                                    Enter Competiton End Date <span style={{ color: "red" }}>*</span>
                                </span>
                                <input
                                    type="date"
                                    placeholder="Enter Competiton Description"
                                    className={styles.actualInput}
                                    style={{marginLeft:"6px"}}
                                />
                            </div>

                            <br />
                            <div>
                                <span className={styles.inputName}>
                                    Max Participants 
                                </span>
                                <input
                                    type="number"
                                    defaultValue={1000}
                                    className={styles.actualInput}
                                    style={{marginLeft:"100px"}}
                                />
                            </div>

                            <br />
                            <div>
                                <span className={styles.inputName}>
                                    Prized Competiton <span style={{ color: "red" }}>*</span>
                                </span>
                                <input
                                    type="checkbox"
                                    defaultValue={1000}
                                    className={styles.actualInput}
                                    style={{marginLeft:"72px"}}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
