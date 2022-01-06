import { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { Object } from "../components/Object";
import { AuthContext } from "../contexts/Auth";
import styles from "../pages/Provider-PA.module.css";
import sendSignUpRequest from "../scripts/database/signup";
import User from "../interfaces/User";
import UserSchema from "../scripts/database/models/User-Schema";

export default function ProviderPostAuth() {
    //User Data
    const { user, setUser } = useContext<any>(AuthContext);
    const [provider, setProvider] = useState<string>("");
    const [displayName, setDisplayName] = useState<string>("");
    const [photo, setPhoto] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [rendered, setRendered] = useState<boolean>(true);
    const [intent, setIntent] = useState<string>("Fan");
    const [likedArtists, setLikedArtists] = useState<Array<string>>([]);
    const [instruments, setInstruments] = useState<Array<string>>([]);
    const [uid, setUid] = useState<string>("");

    //UI Data
    const [ui, setUi] = useState<Number>(0);

    useEffect(() => {
        const our_user: string = sessionStorage.getItem("user") || "";
        const temp_user: User = JSON.parse(our_user);
        setUser(temp_user);

        //Set Data
        setProvider(temp_user.providerData[0].providerId);
        setPhoto(temp_user.providerData[0].photoURL);
        setDisplayName(temp_user.providerData[0].displayName);
        setEmail(temp_user.providerData[0].email);
        setUid(temp_user.providerData[0].uid);
    }, []);

    const intentCallback = (intent: string) => {
        setIntent(intent);
        setUi(1);
    };

    const likedArtistCallbackPlus = (artist: string) => {
        let shallowBuffer: Array<string> = likedArtists;
        shallowBuffer.push(artist);
        setLikedArtists(shallowBuffer);
    };

    const likedArtistCallbackMinus = (artist: string) => {
        let shallowBuffer: Array<string> = likedArtists;
        shallowBuffer.splice(shallowBuffer.indexOf(artist), 1);
        setLikedArtists(shallowBuffer);
    };

    const likedInstrumentCallbackPlus = (artist: string) => {
        let shallowBuffer: Array<string> = instruments;
        let new_artist = artist
            .replaceAll("I'm a", "")
            .replaceAll("ist", "")
            .replaceAll(" ", "");

        //Fail Safe for AudioEngineer and Ukulele
        if (new_artist === "nAudioEngineer") {
            new_artist = "AudioEngineer";
        }
        if (new_artist == "nUkulel") {
            new_artist = "Ukulelist";
        }

        console.log(new_artist);

        shallowBuffer.push(new_artist);
        setInstruments(shallowBuffer);
    };

    const likedInstrumentCallbackMinus = (artist: string) => {
        let shallowBuffer: Array<string> = instruments;
        shallowBuffer.splice(shallowBuffer.indexOf(artist), 1);
        setInstruments(shallowBuffer);
    };

    const submit = async () => {
        //Send A Message to our Database using axios
        const data: UserSchema = {
            name: displayName,
            email: email,
            provider: provider,
            intent: intent,
            password: uid,
            photo: photo,
            country: "unknown",
            gender: "unknown",
            likedArtists: likedArtists,
            instruments: instruments,
            songs: [],
            isLive: false,
            live: {}
        }
        setRendered(false);
        const res = await sendSignUpRequest(data);
        sessionStorage.setItem("cached_user", JSON.stringify(res.data));
        localStorage.setItem("cached_user", JSON.stringify(res.data));
        setRendered(true);
        window.location.replace("/dashboard");
    };

    return (
        <div className={styles.main}>
            {!rendered && (
                <div className={styles.spinner}>
                    <Spinner animation="border" variant="info" style={{ zoom: 5 }} />
                    <br />
                    <p>Creating your Profile....</p>
                </div>
            )}
            {rendered && (
                <>
                    {ui === 0 && (
                        <>
                            <p className={styles.welcome}>{`Welcome ${displayName} !`}</p>
                            <p className={styles.subWelcome}>You're almost there!</p>
                            <p className={styles.question}>Who Are You ?</p>
                            <div className={styles.cardWrapper}>
                                <Card
                                    className={styles.card}
                                    bg={"dark"}
                                    style={{ marginLeft: "0px" }}
                                    onClick={() => intentCallback("Fan")}
                                >
                                    <Card.Img
                                        variant="top"
                                        src="https://media.istockphoto.com/vectors/people-icon-in-flat-style-group-of-people-symbol-for-your-web-site-vector-id1136653100?k=20&m=1136653100&s=170667a&w=0&h=ExivHgBvO-2xTO10MaXx7gP7mqEBNUpa-ov9hN_nBaY="
                                        style={{ height: "270px" }}
                                    />
                                    <Card.Body>
                                        <Card.Title style={{ textAlign: "center" }}>
                                            I'm A Fan
                                        </Card.Title>
                                    </Card.Body>
                                </Card>

                                <Card
                                    className={styles.card}
                                    bg={"dark"}
                                    onClick={() => intentCallback("Artist")}
                                >
                                    <Card.Img
                                        variant="top"
                                        src="https://static.thenounproject.com/png/1506969-200.png"
                                        style={{ height: "270px", backgroundColor: "white" }}
                                    />
                                    <Card.Body>
                                        <Card.Title style={{ textAlign: "center" }}>
                                            I'm An Artist
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </div>
                            <p className={styles.uid}>
                                {provider}:{uid}
                            </p>
                        </>
                    )}
                    {ui === 1 && (
                        <>
                            {intent === "Fan" && (
                                <>
                                    <div className={styles.main}>
                                        <p className={styles.fQuestion}>What Music Do you Like?</p>
                                        <p className={styles.fDesc}>
                                            This helps us personalize your Muzika experience and
                                            recommend you awesome music
                                        </p>
                                        <div className={styles.artists}>
                                            <Object
                                                artistName="BTS"
                                                image="https://pyxis.nymag.com/v1/imgs/c10/524/1853b57c011cf5fd8ebc8f4b149345d5d3-BTS-JOIN-LOUIS-VUITTON-AS-HOUSE-AMBASSAD.rsquare.w1200.jpg"
                                                plusCB={likedArtistCallbackPlus}
                                                minusCB={likedArtistCallbackMinus}
                                            />
                                            <Object
                                                artistName="Justin Bieber"
                                                image="https://lh3.googleusercontent.com/pW7Jv2o8g0bkXFi11hrumm_N0e7KAf5pc5bawoSdD44uTLAYQi-Eeh1t1HileeiMx-9pXN6hQROW-OBEzWQWcEs2"
                                                plusCB={likedArtistCallbackPlus}
                                                minusCB={likedArtistCallbackMinus}
                                            />
                                            <Object
                                                artistName="Ariana Grande"
                                                image="https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952"
                                                plusCB={likedArtistCallbackPlus}
                                                minusCB={likedArtistCallbackMinus}
                                            />
                                            <Object
                                                artistName="Taylor Swift"
                                                image="https://media1.popsugar-assets.com/files/thumbor/0ebv7kCHr0T-_O3RfQuBoYmUg1k/475x60:1974x1559/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2019/09/09/023/n/1922398/9f849ffa5d76e13d154137.01128738_/i/Taylor-Swift.jpg"
                                                plusCB={likedArtistCallbackPlus}
                                                minusCB={likedArtistCallbackMinus}
                                            />
                                            <Object
                                                artistName="Shawn Mendes"
                                                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJayYFh0jomkWZXBIBKO9kQ_0543DY2mp3GA&usqp=CAU"
                                                plusCB={likedArtistCallbackPlus}
                                                minusCB={likedArtistCallbackMinus}
                                            />
                                            <Object
                                                artistName="BLACKPINK"
                                                image="https://yt3.ggpht.com/ytc/AKedOLR7WD6GEAITUOiWtiSVSdUjdrF-cRGym9I4Vp3H=s900-c-k-c0x00ffffff-no-rj"
                                                plusCB={likedArtistCallbackPlus}
                                                minusCB={likedArtistCallbackMinus}
                                            />
                                            <Object
                                                artistName="Zayn Malik"
                                                image="https://pbs.twimg.com/profile_images/1308525962859098114/SFa770Jq_400x400.jpg"
                                                plusCB={likedArtistCallbackPlus}
                                                minusCB={likedArtistCallbackMinus}
                                            />
                                            <Object
                                                artistName="Roomie Official"
                                                image="https://i1.sndcdn.com/avatars-000295683542-lrdg87-t500x500.jpg"
                                                plusCB={likedArtistCallbackPlus}
                                                minusCB={likedArtistCallbackMinus}
                                            />
                                            <Object
                                                artistName="Lady Gaga"
                                                image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lady-gaga-attends-the-61st-annual-grammy-awards-at-staples-news-photo-1128906543-1549915376.jpg?crop=0.883xw:0.547xh;0.0657xw,0.0397xh&resize=640:*"
                                                plusCB={likedArtistCallbackPlus}
                                                minusCB={likedArtistCallbackMinus}
                                            />
                                            <Object
                                                artistName="Bruno Mars"
                                                image="https://i.iheart.com/v3/surl/aHR0cDovL2ltYWdlLmloZWFydC5jb20vaW1hZ2VzL3JvdmkvNTAwLzAwMDMvNzAxL01JMDAwMzcwMTM5MC5qcGc=?ops=fit%28720%2C720%29&sn=eGtleWJhc2UyMDIxMTExMDrRLsoGlwwEl-CiX--wJk_XJQ8oMlgSEwNtM0HmV3_xFw%3D%3D&surrogate=1cOXl179JY-syhxYSCX6Q1a_Mcu6UO8d-F4oJzpZf1hcUbJr4aImx9YMFk_7jx8DiouwKFlEbLnMQeZjtu9Ce1k9K-d_KKmAuGdsUAjREBW1ZuJmr9xN5JnJ880NEaAWjkF6CDu9N1XYIjt_f8n0xXao9iO5_GMGfg9VDQjCILYJmu4QsjCc0xowZOsktv1kJg_NbIoMeg3xPdUV-s0ar5Kt2kN-ow%3D%3D"
                                                plusCB={likedArtistCallbackPlus}
                                                minusCB={likedArtistCallbackMinus}
                                            />
                                            <Object
                                                artistName="IU"
                                                image="https://i.scdn.co/image/ab6761610000e5eb006ff3c0136a71bfb9928d34"
                                                plusCB={likedArtistCallbackPlus}
                                                minusCB={likedArtistCallbackMinus}
                                            />
                                            <Object
                                                artistName="Ludwig Beethoven"
                                                image="https://upload.wikimedia.org/wikipedia/commons/6/6f/Beethoven.jpg"
                                                plusCB={likedArtistCallbackPlus}
                                                minusCB={likedArtistCallbackMinus}
                                            />
                                            <Object
                                                artistName="Rag'n'Bone Man"
                                                image="https://upload.wikimedia.org/wikipedia/commons/0/02/2017_RiP_-_Rag_n_Bone_Man_-_by_2eight_-_8SC1877.jpg"
                                                plusCB={likedArtistCallbackPlus}
                                                minusCB={likedArtistCallbackMinus}
                                            />
                                            <Object
                                                artistName="NCT Dream"
                                                image="https://6.viki.io/image/7950d4fc74324055bdfd04f8618e2c3a.jpeg?s=900x600&e=t"
                                                plusCB={likedArtistCallbackPlus}
                                                minusCB={likedArtistCallbackMinus}
                                            />
                                        </div>

                                        <br />
                                        <br />
                                        <div className={`${styles.main} ${styles.buttonWrapper}`}>
                                            <Button
                                                variant="success"
                                                size="lg"
                                                type="submit"
                                                onClick={() => submit()}
                                            >
                                                Procceed
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="lg"
                                                type="submit"
                                                onClick={() => window.location.reload()}
                                                style={{ marginLeft: "10%" }}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {intent === "Artist" && (
                                <>
                                    <div className={styles.main}>
                                        <p className={styles.fQuestion}>
                                            What instruments do you play?
                                        </p>
                                        <p className={styles.fDesc}>
                                            This helps us personalize your Muzika experience and
                                            recommend you awesome music.
                                        </p>
                                        <div className={styles.artists}>
                                            <Object
                                                artistName="I'm a Pianist"
                                                image="https://www.johnsmusic.in/uploads/johns-music/products/clp765gp-448455_l.jpg?param=1"
                                                plusCB={likedInstrumentCallbackPlus}
                                                minusCB={likedInstrumentCallbackMinus}
                                            />
                                            <Object
                                                artistName="I'm a Guitarist"
                                                image="https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                                plusCB={likedInstrumentCallbackPlus}
                                                minusCB={likedInstrumentCallbackMinus}
                                            />
                                            <Object
                                                artistName="I'm a Vocalist"
                                                image="https://media.istockphoto.com/photos/studio-microphone-and-pop-shield-on-mic-in-the-empty-recording-studio-picture-id1279654034?b=1&k=20&m=1279654034&s=170667a&w=0&h=jebzMhp_tlJi-3fLn3Ig8cYWG_JaF-vjt4SWLAI9o9Q="
                                                plusCB={likedInstrumentCallbackPlus}
                                                minusCB={likedInstrumentCallbackMinus}
                                            />
                                            <Object
                                                artistName="I'm a Drummer"
                                                image="https://images.pexels.com/photos/5045881/pexels-photo-5045881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                                plusCB={likedInstrumentCallbackPlus}
                                                minusCB={likedInstrumentCallbackMinus}
                                            />
                                            <Object
                                                artistName="I'm a Violinist"
                                                image="https://www.superprof.com/blog/wp-content/uploads/2018/02/buying-a-violin-online-700x467.jpeg"
                                                plusCB={likedInstrumentCallbackPlus}
                                                minusCB={likedInstrumentCallbackMinus}
                                            />
                                            <Object
                                                artistName="I'm a Saxophonist"
                                                image="https://images.pexels.com/photos/164936/pexels-photo-164936.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                                plusCB={likedInstrumentCallbackPlus}
                                                minusCB={likedInstrumentCallbackMinus}
                                            />
                                            <Object
                                                artistName="I'm a Flutist"
                                                image="https://images.pexels.com/photos/2254140/pexels-photo-2254140.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                                plusCB={likedInstrumentCallbackPlus}
                                                minusCB={likedInstrumentCallbackMinus}
                                            />
                                            <Object
                                                artistName="I'm a Bassist"
                                                image="https://images.pexels.com/photos/243988/pexels-photo-243988.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                                plusCB={likedInstrumentCallbackPlus}
                                                minusCB={likedInstrumentCallbackMinus}
                                            />
                                            <Object
                                                artistName="I'm an Ukulelist"
                                                image="https://images.pexels.com/photos/346709/pexels-photo-346709.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                                plusCB={likedInstrumentCallbackPlus}
                                                minusCB={likedInstrumentCallbackMinus}
                                            />
                                            <Object
                                                artistName="I'm a Brass Player"
                                                image="https://images.pexels.com/photos/3684446/pexels-photo-3684446.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                                plusCB={likedInstrumentCallbackPlus}
                                                minusCB={likedInstrumentCallbackMinus}
                                            />
                                            <Object
                                                artistName="I'm an Audio Engineer"
                                                image="https://images.pexels.com/photos/5696401/pexels-photo-5696401.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                                plusCB={likedInstrumentCallbackPlus}
                                                minusCB={likedInstrumentCallbackMinus}
                                            />
                                        </div>

                                        <br />
                                        <br />
                                        <div className={`${styles.main} ${styles.buttonWrapper}`}>
                                            <Button
                                                variant="success"
                                                size="lg"
                                                type="submit"
                                                onClick={() => submit()}
                                            >
                                                Procceed
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="lg"
                                                type="submit"
                                                onClick={() => window.location.reload()}
                                                style={{ marginLeft: "10%" }}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}
