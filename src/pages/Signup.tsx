import { useContext } from "react";

import Navbar from "../components/Navbar";
import styles from "../pages/Signup.module.css";
import Carousel from "react-bootstrap/Carousel";
import logo from "../assets/logo.png";

import facebookAuth from "../scripts/auth/facebook-auth";
import googleAuth from "../scripts/auth/google-auth";
import { AuthContext } from "../contexts/Auth";

export default function Signup() {
    const {user, setUser} = useContext<any>(AuthContext);
    const google = async() => {
        const temp_user = await googleAuth();
        setUser(temp_user);
        sessionStorage.setItem("user", JSON.stringify(temp_user));
        window.location.replace("/auth/post/provider");
    }

    const facebook = async() => {
        const temp_user = await facebookAuth();
        setUser(temp_user);
    }

    return (
        <>
            <Navbar />
            <div className={styles.content}>
                <div className={styles.leftContent}>
                    <p className={styles.heading}>Sign Up</p>
                    <br />
                    <br />
                    <button className={`${styles.signUpButton} ${styles.muzikaButton}`}>
                        <img src={logo} className={styles.muzikaLogo}></img>
                        Create an Account
                    </button>
                    <br />
                    <p className={styles.or}>or</p>

                    <button
                        className={`${styles.signUpButton} ${styles.googleButton}`}
                        onClick={() => google()}
                    >
                        <i className={`fab fa-google ${styles.googleLogo}`}></i>
                        Sign up With Google
                    </button>

                    <button
                        className={`${styles.signUpButton} ${styles.facebookButton}`}
                        onClick={() => facebook()}
                    >
                        <i className={`fab fa-facebook-f ${styles.facebookLogo}`}></i>
                        Sign up With Facebook
                    </button>
                </div>
                <div className={styles.rightContent}>
                    <div className={styles.carousel}>
                        <Carousel className={styles.carouselObject}>
                            <Carousel.Item interval={2000}>
                                <img
                                    className="d-block w-100"
                                    src="https://images.pexels.com/photos/2078071/pexels-photo-2078071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h2 className={styles.carouselHeading}>Awesome Audience</h2>
                                    <p className={styles.carouselCaption}>
                                        Make your Music Heard by thousands of aspiring musicians
                                        (like you). Find Artists <b>you</b> like, however small or
                                        big they might be
                                    </p>
                                </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item interval={2000}>
                                <img
                                    className="d-block w-100"
                                    src="https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                    alt="Second Slide"
                                />
                                <Carousel.Caption>
                                    <h2 className={styles.carouselHeading}>
                                        Truckloads of Talent
                                    </h2>
                                    <p className={styles.carouselCaption}>
                                        Get your talent noticed by our partner music companies, like
                                        <span style={{ fontFamily: "Oswald", fontWeight: 500 }}>
                                            {" "}
                                            vevo™
                                        </span>{" "}
                                        and
                                        <span style={{ letterSpacing: "1px" }}>
                                            {" "}
                                            <i className="fas fa-globe-americas"></i> UMG™
                                        </span>
                                        The Full List is <a>here</a>
                                    </p>
                                </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item interval={2000}>
                                <img
                                    className="d-block w-100"
                                    src="https://images.pexels.com/photos/733767/pexels-photo-733767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    alt="Third Slide"
                                />
                                <Carousel.Caption>
                                    <h2 className={styles.carouselHeading}>
                                        Easy-Going Earnings
                                    </h2>
                                    <p className={styles.carouselCaption}>
                                        Get Paid for your views with the Muzika{" "}
                                        <a>Ad-Sense Program</a>.
                                        <br />
                                        Your Fans can gift you tips and badges with our{" "}
                                        <a>Tipping Program</a>.
                                    </p>
                                </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item interval={2000}>
                                <img
                                    className="d-block w-100"
                                    src="https://images.pexels.com/photos/1494666/pexels-photo-1494666.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                    alt="Fourth Slide"
                                />
                                <Carousel.Caption>
                                    <h2 className={styles.carouselHeading}>Fabulous Fans</h2>
                                    <p className={styles.carouselCaption}>
                                        Host Live Concerts. Host Live Album Give-Aways. Host Live
                                        Fan-Interactions. Muzika gives a place to connect with your
                                        Fans.
                                    </p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </div>
        </>
    );
}
