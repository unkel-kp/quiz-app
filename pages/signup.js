import { useRouter } from 'next/router';
import Head from "next/head";
import styles from '../styles/Signup.module.css';
import axios from 'axios';

export default function SignUp() {
    const router = useRouter()

    function onSubmit(event) {
        event.preventDefault();
        const email = event.target.elements.email.value;
        const myObj = {
            "firstName": event.target.elements.first_name.value,
            "lastName": event.target.elements.last_name.value,
            "email": event.target.elements.email.value,
            "mobileNumber": event.target.elements.mobile.value,
            "gender": event.target.elements.gender.value,
            "dateOfBirth": event.target.elements.dob.value,
            "password": event.target.elements.password.value,
            "psw_repeat": event.target.elements.pswrepeat.value,
            "notifications": event.target.elements.notifications.value,
        };
        if (myObj.psw_repeat != myObj.password) {
            window.alert("Passwords didn't match");
            return;
        }

        let url = "https://b1aa-103-212-147-171.in.ngrok.io/api/v1/users/signup";

        axios.post(
            url,
            myObj
        )
        .then((res) => {
            window.alert("User Sign Up Successful! Please login to proceed!");
            router.push("/");
            console.log(res) 
        })
        .catch((error) => {
            console.log(error)
            window.alert("Sign Up Failed!");
            router.push("/");
        })
    }

    function onCancel(event) {
        router.push('/');
    }

    return (
        <>
            <Head>
                <title>User Sign Up</title>
                <meta name="description" content="Sign Up Page for new users." />
            </Head>

            <div className={styles.signup}>

                <div></div>

                <div className={styles.modal}>
                    <div className={styles.leftContainer}>

                    </div>

                    <div className={styles.rightContainer}>

                        <div className={styles.formHeader}>
                            <h1>Register</h1>
                            <h4>Become a QuizApp member today!</h4>
                            <p>Let's get you all set up so you can take quiz and enhance your skills.</p>
                        </div>

                        <div>
                            <form onSubmit={onSubmit}>
                                <div className={styles.formBody}>
                                    <div>
                                        <label for="first_name"><b>First Name </b></label><span>*</span>
                                        <input type="text" name="first_name" placeholder="Enter First Name" required />
                                    </div>

                                    <div>
                                        <label for="last_name"><b>Last Name </b></label><span>*</span>
                                        <input type="text" name="last_name" placeholder="Enter Last Name" required />
                                    </div>

                                    <div>
                                        <label for="email"><b>Email </b></label><span>*</span>
                                        <input type="email" placeholder="Enter Email Address" name="email" required />
                                    </div>

                                    <div>
                                        <label for="mobile"><b>Mobile </b></label><span>*</span>
                                        <input type="number" name="mobile" placeholder="Enter Mobile No." required />
                                    </div>

                                    <div>
                                        {/* <label for="gender"><b>Gender </b></label><span>*</span>
                                    <input name="gender" placeholder="Gender" required/> */}

                                        <label for="gender"><b>Gender </b></label><span>*</span>
                                        <select name="gender" id="gender">
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="OTHERS">Others</option>
                                            <option value="NOT_DISCLOSE">Don't want to share</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label for="dob"><b>Date of Birth </b></label><span>*</span>
                                        <input type="date" name="dob" placeholder="Date of Birth" required />
                                    </div>

                                    <div>
                                        <label for="password"><b>Choose a password </b></label><span>*</span>
                                        <input type="password" placeholder="Enter Password" name="password" required />
                                    </div>

                                    <div>
                                        <label for="pswrepeat"><b>Confirm the password </b></label><span>*</span>
                                        <input type="password" placeholder="Repeat Password" name="pswrepeat" required />
                                    </div>
                                </div>


                                <div className={styles.termsBox}>
                                    <label><input type="checkbox" name="notifications" /> Yes, I want to receive quiz related mails.</label> <br />
                                    <label><input type="checkbox" checked="checked" name="terms" /> I agree to all the <a href="#" style={{ color: "#0668E1" }}>Terms</a> and <a href="#" style={{ color: "#0668E1" }}>Privacy Policy</a>.</label>
                                </div>
                                <div></div>

                                <button type="submit" class={styles.signupbtn}>Create Account</button>

                            </form>
                        </div>

                        <div>
                            <p>Already have an account? <a href='/login' style={{ color: "#0668E1" }}><b>Login</b></a></p>
                        </div>



                    </div>

                </div>

                <div></div>
            </div>

        </>
    );
}