import React from "react"
import { nanoid } from "nanoid"
import Question from "./Questions"
import "../confetti.css"


export default function Quiz(props) {
    const [quizData, setQuizData] = React.useState([])
    const [showWarning, setShowWarning] = React.useState(false)
    const [numCorrectAnswers, setNumCorrectAnswers] = React.useState(0)
    const [showResult, setShowResult] = React.useState(false)
    const [ showConfetti, setShowConfetti] = React.useState(false)

    function getRandomColor() {
        const colors = ['#ff0000', '#ffffff', '#0000ff'];
    return colors[Math.floor(Math.random() * colors.length)];
    }
        
    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&category=32&difficulty=easy&type=multiple')  
            .then(res => res.json())
            .then(data => {
                let resultArray = []
                data.results.map((result) => {
                    return resultArray.push({
                        id: nanoid(),
                        question: result.question,
                        correctAnswer: result.correct_answer,
                        answers: result.incorrect_answers
                            .concat(result.correct_answer)
                            .sort(
                                () => Math.random() - 0.5
                            ),
                        selectedAnswer: ""
                    })
                })
                setQuizData(resultArray)
            })
    }, [])
    
    function updateAnswer(currentQuestion, answer) {
        setQuizData(
            quizData.map((result) => {
                return result.question === currentQuestion 
                ? {...result, selectedAnswer: answer}
                : result
            })
        )
    }
    
    function checkAnswers() {
        const notAllAnswered = quizData.some(
            (result) => result.selectedAnswer === ""
        )
        
        setShowWarning(notAllAnswered)
        
        if (!notAllAnswered) {
            let correctCount = 0;
            quizData.forEach((result) => {
                if(result.selectedAnswer === result.correctAnswer) {
                    correctCount++;
                    if (correctCount === 5) { 
                        setShowConfetti(true);                          
                  }    
                }
            });
            setNumCorrectAnswers(correctCount)
            setShowResult(true)

            if (correctCount === quizData.length) {                 
                setShowConfetti(true);             
            }
        }             
    }
    
    const quizElements = quizData.map((result, index) => {
        return (
            <Question 
                key={index}
                question={result.question}
                answers={result.answers}
                selectedAnswer={result.selectedAnswer}
                correctAnswer={result.correctAnswer}
                updateAnswer={updateAnswer}
                showResult={showResult}
            /> 
        )
    })
    console.log("Show result:", showResult)
    
    return (
        <div className="quiz-container">
            <div className="quiz-page">{quizElements}</div>
            <div className="check-answers">
                {showWarning && (
                    <p className="warning-message">
                         Please answer all questions
                    </p>
                )}
                {quizData.length > 0 && !showResult ? (
                    <button className="check-btn" onClick={checkAnswers}>
                        Check Answers
                    </button> 
                ) : null }
                {showResult && (
                    <div className="results-container">
                        <p className="results-text">
                            You scored {numCorrectAnswers} out of 5 correct answers
                        </p>                      

                        <button className="play-again-btn" onClick={props.playAgain}>
                            Play again
                        </button>
                    </div>
                )}
                              
               
            {showConfetti && (         
          <div className="confetti-container" >
            {[...Array(50)].map((_, index) => (
              <div 
              key={nanoid()} 
              className="confetti" 
              style={{ 
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`, 
                backgroundColor: getRandomColor()  }} >
                </div>
              ))}
          </div>
        )}
          
       
            </div>
        </div>
    ) 
}


