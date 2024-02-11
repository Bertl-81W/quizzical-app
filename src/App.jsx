import React from 'react'
import Start from "./components/Start"
import Quiz from "./components/Quiz"


export default function App() {
  const [quiz, setQuiz] = React.useState(false)
    
    function startQuiz() { 
        setQuiz(prev => !prev)
    }    
        
    return (    
        <div>            
            {quiz ? <Quiz playAgain={startQuiz} /> : <Start handleStart={startQuiz} />}
        </div> 
    ) 
}