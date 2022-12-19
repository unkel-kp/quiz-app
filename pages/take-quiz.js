import { useRouter } from 'next/router';
import Head from "next/head";
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from '../styles/TakeQuiz.module.css'
import axios from 'axios';

export default function takeQuiz() {

    const [hasQuizBegin, setHasQuizBegin] = React.useState(false);
    const [quiz, setQuiz] = React.useState({});
    const [question, setQuestion] = React.useState({});
    const [answers, setAnswers] = React.useState([]);
    const [message, setMessage] = React.useState({});
    const [isLoading, setLoading] = useState(false)
    const router = useRouter();
    

    useEffect(() => {
        setLoading(true)
        let url = "https://dd5c-103-212-147-171.in.ngrok.io/api/v1/quiz/details";
        let config = {
            headers: {
                "auth-token": localStorage.getItem("auth-token")
            }
        }
        let myObj = {
            "quizId": window.location.search.split("=")[1]
        }
        axios.post(
            url,
            myObj,
            config
        )
        .then((res) => {
            console.log(res)
            setQuiz({
                "quizId": window.location.search.split("=")[1],
                "quizName": res.data.quizName,
                "description": res.data.description,
                "totalMarks": res.data.totalMarks,
                "totalQuestions": res.data.totalQuestions
            })
            setLoading(false);
            console.log(res) 
        })
        .catch((error) => {
            window.alert("Quiz Not Found!");
            setLoading(false)
            // router.push("/");
        })
    }, [])

    
    function onStartQuiz(event) {
        event.preventDefault();
        setLoading(true)

        let url = "https://dd5c-103-212-147-171.in.ngrok.io/api/v1/quiz/start";
        var myObj={
            "quizId": quiz.quizId,
            "email": "pawankm97@gmail.com"
        }

        axios.post(
            url,
            myObj
        )
        .then((res) => {
            setHasQuizBegin(true);
            setQuestion({
                "questionId": res.data.difficulty,
                "statement": res.data.questionStatement,
                "difficulty": res.data.difficulty,
                "type": res.data.questionType,
                "marks": 5,
                "negativeMarks": -2,
                "options" : res.data.options
            })
            setLoading(false);
            
        })
        .catch((error) => {
            console.log(error)
            window.alert("Unable to start quiz! Please try again later.");
            setLoading(false)
        })
        
    }
    
    function onQuizQuestionSubmit(event) {

        event.preventDefault();
        console.log(event.target.elements)
        setAnswers([]);
        setLoading(true);
        let url = "https://dd5c-103-212-147-171.in.ngrok.io/api/v1/quiz/next-question";
        var myObj={
            "quizId": quiz.quizId,
            "questionNumber": question.difficulty,
            "email": "pawankm97@gmail.com",
            "response": answers
        }

        axios.post(
            url,
            myObj
        )
        .then((res) => {
            if(res.data.result || res.data.message){
                var mess = res.data.result == "pass" ? "Congratulations! You've passed!" : "Sorry! You've failed this one. Better luck next time"
                window.alert(mess);
                router.push("/");
            }
            if(question.difficulty > res.data.difficulty){
                setMessage({
                    "str": "You've been downgraded!",
                    "success": false
                })
            } else {
                setMessage({
                    "str": "You've been upgraded!",
                    "success": true
                })
            }
            setQuestion({
                "questionId": res.data.difficulty,
                "statement": res.data.questionStatement,
                "difficulty": res.data.difficulty,
                "type": res.data.questionType,
                "marks": 5,
                "negativeMarks": -2,
                "options" : res.data.options
            })
            setLoading(false);
            
        })
        .catch((error) => {
            console.log(error)
            window.alert("Unable to proceed quiz! Please try again later.");
            setMessage({});
            setLoading(false)
        })
    }

    const handleAnswerSelection = (x) => {
        var temp = answers;
        if(temp.includes(x)){
             for( var i = 0; i < temp.length; i++){ 
                    if ( temp[i] === x) { 
                
                        temp.splice(i, 1); 
                    }
                
                }
                document.getElementById(x).checked = false;
        } else {
            temp.push(x);
            document.getElementById(x).checked = true;
        }
        setAnswers(temp);
        console.log(answers);
    }

    if (isLoading) return <p>Loading...</p>


    const quizDetailsForm = <form onSubmit={onStartQuiz}>
                                <div className={styles.formBody}>

                                    <div>
                                        <label for="quiz"><b>Quiz Name </b></label>
                                        <input type="text" placeholder="Quiz Name" value={quiz.quizName} name="quizName" disabled = "disabled" />
                                    </div>

                                    <div>
                                        <label for="description"><b>Description </b></label>
                                        <input type="text" placeholder="Description Goes Here ..." name="description" value={quiz.description} disabled = "disabled" />
                                    </div>

                                    <div>
                                        <label for="total"><b>Total Marks </b></label>
                                        <input type="number" placeholder="Total Marks" name="total" value={quiz.totalMarks} disabled = "disabled" />
                                    </div>

                                    <div>
                                        <label for="negative"><b>Total Question </b></label>
                                        <input type="number" placeholder="Total Questions" name="totalQuestions" value={quiz.totalQuestions} disabled = "disabled" />
                                    </div>

                                </div>

                                <div></div>

                                <button type="submit" class={styles.nextbtn}>Start Quiz</button>

                            </form>

    const quizDetailsHeader = <div className={styles.formHeader}>
                                    <h1>Quiz Details</h1>
                                    <h4>Please check the quiz details before you proceed!</h4>
                                </div>
    
    const quizQuestionHeader = <div className={styles.formHeader}>
                                    {
                                        message.str ? <div className={message.success ? styles.successBox : styles.failureBox}>{message.str}</div> : null 
                                    }
                                    <h1>Question No. {question.difficulty}</h1>
                                </div>

    const quizQuestionForm = <form onSubmit={onQuizQuestionSubmit}>
                                <div className={styles.formBody}>

                                    <div>
                                        <label for="difficulty"><b>Difficulty </b></label>
                                        <input type="number" name="difficulty" placeholder="Difficulty" value={question.difficulty} disabled="disabled" />
                                    </div>

                                    <div>
                                        <label for="type"><b>Type </b></label>
                                        <input type="text" name="type" placeholder="Type" value={(question.type == "SINGLE_CORRECT") ? "Single Correct" : "Multiple Correct"} disabled="disabled" />
                                    </div>

                                    <div>
                                        <label for="marks"><b>Marks </b></label>
                                        <input type="number" name="marks" placeholder="Marks" value={question.marks} disabled="disabled" />
                                    </div>

                                    <div>
                                        <label for="negative"><b>Negative Marking </b></label>
                                        <input type="number" name="negative" placeholder="Negative Marking" value={question.negativeMarks} disabled="disabled" />
                                    </div>

                                </div>


                                <div className={styles.questionFormBody}>
                                    <div>
                                        <label for="statement"><b>Question Statement </b></label>
                                        <input type="text" name="statement" id="statement" placeholder="Please enter the question statement ..." value={question.statement} disabled="disabled" />
                                    </div>
                                </div>
                                
                                <div className={styles.questionFormOptions}>
                                {
                                    question.options ? question.options.map(x => {
                                        return (
                                            <div>
                                                <input type="checkbox" name={x} id={x} value={x} key={Math.random()} onChange={() => handleAnswerSelection(x)} /> <label for={x}><b> {x}</b></label>
                                            </div>
                                        )
                                    
                                    }) : null
                                }
                                </div>
                                

                                <div className={styles.formBody}>
                                
                                    <></>
                                    <button type="submit" class={styles.nextbtn}>{"Next"}</button>
                                </div>
                            </form>
    
    return (
        <>
            <Head>
                <title>Take Quiz</title>
                <meta name="description" content="Take Quiz Page for members." />
            </Head>

            <div className={styles.login}>

                <div></div>

                <div className={styles.modal}>
                    <div className={styles.leftContainer}>

                    </div>

                    <div className={styles.rightContainer}>

                        {!hasQuizBegin ? quizDetailsHeader : quizQuestionHeader}

                        <div>
                            {!hasQuizBegin ? quizDetailsForm : quizQuestionForm}
                        </div>

                    </div>

                </div>

                <div></div>
            </div>

        </>
    );
}