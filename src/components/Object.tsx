import { useState } from "react";

import styles from "../components/Object.module.css";
import ObjectProps from '../interfaces/Object-Props';

export const Object = (props: ObjectProps) => {
    const [enabled, setEnabled] = useState<Boolean>(false);

    const clickCB = () =>{
        let state:Boolean = enabled;
        let newState:Boolean = !state;

        if(newState === true){
            props.plusCB(props.artistName);
        }
        else if(newState === false){
            props.minusCB(props.artistName);
        }

        setEnabled(newState);
    }
    return (
        <div className={styles.main} onClick={() => clickCB()}>
            {enabled && (
                <i className={`fas fa-check-circle ${styles.check}`}></i>
            )}
            <img src={props.image} className={styles.image} />
            <p className={styles.name}>{props.artistName}</p>
        </div>
    )
}

