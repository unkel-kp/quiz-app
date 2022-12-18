import { useRouter } from 'next/router';
import Head from "next/head";
import React from 'react';
import { useEffect } from 'react';
import styles from '../styles/CreateQuiz.module.css'

export default function createQuiz() {
    const [steps, setSteps] = React.useState(0);
    const [quiz, setQuiz] = React.useState({});
    const router = useRouter();
    
    function onQuizDetailsSubmit(event) {
        event.preventDefault();
        setQuiz({
            "quizName": event.target.elements.quizName.value,
            "quizDescription": event.target.elements.description.value,
            "totalMarks": 0,
            "questions": []
        })
        setSteps(steps + 1);
        console.log(quiz);
    }
    
    function onQuizQuestionSubmit(event) {

        event.preventDefault();

        var checkedCount = 0;
        if(event.target.elements.optionachecked.checked) {
            checkedCount += 1;
        }
        if(event.target.elements.optionbchecked.checked) {
            checkedCount += 1;
        }
        if(event.target.elements.optioncchecked.checked) {
            checkedCount += 1;
        }
        if(event.target.elements.optiondchecked.checked) {
            checkedCount += 1;
        }

        if(checkedCount == 0){
            window.alert("Please select the correct answers!");
            return;
        }

        if(event.target.elements.type.value == "SINGLE_CORRECT" && checkedCount != 1){
            window.alert("Question Type incompatible with the selected Correct Options!");
            return;   
        }

        if(event.target.elements.type.value == "MULTI_CORRECT" && checkedCount == 1){
            window.alert("Question Type incompatible with the selected Correct Options!");
            return;   
        }

        var options = [
            {
                "optionStatement": event.target.elements.optiona.value,
                "correct": event.target.elements.optionachecked.checked
            },
            {
                "optionStatement": event.target.elements.optionb.value,
                "correct": event.target.elements.optionbchecked.checked
            },
            {
                "optionStatement": event.target.elements.optionc.value,
                "correct": event.target.elements.optioncchecked.checked
            },
            {
                "optionStatement": event.target.elements.optiond.value,
                "correct": event.target.elements.optiondchecked.checked
            }
        ]

        var question = {
            "questionStatement": event.target.elements.statement.value,
            "difficulty": event.target.elements.difficulty.value,
            "type": event.target.elements.type.value,
            "marks": parseInt(event.target.elements.marks.value),
            "negativeMarks": parseInt(event.target.elements.negative.value),
            "options": options
        }

        var temp = quiz;
        temp.totalMarks += parseInt(event.target.elements.marks.value);
        temp.questions.push(question);
        setQuiz(temp)
        setSteps(steps + 1);
        clearForm();
        console.log(quiz);
    }

    function onQuizSubmission(event) {
        onQuizQuestionSubmit(event);
        window.alert("Quiz created successfully!");
        router.push("/");
        //API Call

    }

    function clearForm() {
        document.getElementById("statement").value = '';
        document.getElementById("optiona").value = '';
        document.getElementById("optionb").value = '';
        document.getElementById("optionc").value = '';
        document.getElementById("optiond").value = '';
        document.getElementById("optionachecked").checked = false;
        document.getElementById("optionbchecked").checked = false;
        document.getElementById("optioncchecked").checked = false;
        document.getElementById("optiondchecked").checked = false;

    }

    const quizDetailsForm = <form onSubmit={onQuizDetailsSubmit}>
                                <div className={styles.formBody}>

                                    <div>
                                        <label for="quiz"><b>Quiz Name </b></label><span>*</span>
                                        <input type="text" placeholder="Enter Quiz Name" name="quizName" required />
                                    </div>

                                    <div>
                                        <label for="description"><b>Description </b></label><span>*</span>
                                        <input type="text" placeholder="Description Goes Here ..." name="description" />
                                    </div>

                                </div>

                                <div></div>

                                <button type="submit" class={styles.nextbtn}>Next</button>

                            </form>

    const quizDetailsHeader = <div className={styles.formHeader}>
                                    <h1>Quiz Details</h1>
                                    <h4>Please enter quiz details!</h4>
                                </div>
    
    const quizQuestionHeader = <div className={styles.formHeader}>
                                    <h1>Question No. {steps}</h1>
                                </div>

    const quizQuestionForm = <form onSubmit={steps == 10 ? onQuizSubmission : onQuizQuestionSubmit}>
                                <div className={styles.formBody}>

                                    <div>
                                        <label for="difficulty"><b>Difficulty </b></label><span>*</span>
                                        <input type="number" name="difficulty" placeholder="Difficulty" value={steps} disabled="disabled" required />
                                    </div>

                                    <div>
                                        <label for="type"><b>Type </b></label><span>*</span>
                                        <select name="type" id="type">
                                            <option value="SINGLE_CORRECT">Single Correct</option>
                                            <option value="MULTI_CORRECT">Multi Correct</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label for="marks"><b>Marks </b></label><span>*</span>
                                        <input type="number" name="marks" placeholder="Marks" value={5} disabled="disabled" required />
                                    </div>

                                    <div>
                                        <label for="negative"><b>Negative Marking (if any) </b></label><span>*</span>
                                        <input type="number" name="negative" placeholder="Negative Marking" value={-2} disabled="disabled" required />
                                    </div>

                                </div>


                                <div className={styles.questionFormBody}>
                                    <div>
                                        <label for="statement"><b>Question Statement </b></label><span>*</span>
                                        <input type="text" name="statement" id="statement" placeholder="Please enter the question statement ..." required />
                                    </div>
                                </div>

                                <div className={styles.formBody}>
                                    <label for="nothing"><b>Options </b></label>
                                    <label for="nothing2"style={{"text-align": "center"}}><b>Correct Options </b></label>

                                    <input type="text" name="optiona" id="optiona" placeholder="Option A" required />
                                    <input type="checkbox" name="optionachecked" id="optionachecked" />

                                    <input type="text" name="optionb" id="optionb" placeholder="Option B" required />
                                    <input type="checkbox" name="optionbchecked" id="optionbchecked" />

                                    <input type="text" name="optionc" id="optionc" placeholder="Option C" required />
                                    <input type="checkbox" name="optioncchecked" id="optioncchecked" />

                                    <input type="text" name="optiond" id="optiond" placeholder="Option D" required />
                                    <input type="checkbox" name="optiondchecked" id="optiondchecked" />
                                    <></>
                                    <button type="submit" class={styles.nextbtn}>{steps == 10 ? "Create Quiz" : "Next"}</button>
                                </div>
                            </form>
    
    return (
        <>
            <Head>
                <title>Create Quiz</title>
                <meta name="description" content="Create Quiz Page for admin." />
            </Head>

            <div className={styles.login}>

                <div></div>

                <div className={styles.modal}>
                    <div className={styles.leftContainer}>

                    </div>

                    <div className={styles.rightContainer}>

                        {steps == 0 ? quizDetailsHeader : quizQuestionHeader}

                        <div>
                            {steps == 0 ? quizDetailsForm : quizQuestionForm}
                        </div>



                    </div>

                </div>

                <div></div>
            </div>

        </>
    );
}