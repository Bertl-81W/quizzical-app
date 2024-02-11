import {useState} from "react"

export default function Start(props) {

  return (        
     <div className="start-page"> 

       
       
    <h1 className="title">Animation & Cartoon Quiz</h1>
    <p className="info">A Scrimba Labz Solo Challenge</p>
    <h3 className="subtitle">Test Your Might!</h3>
    <button onClick={props.handleStart} className="start-btn">Enter</button>  
    </div> 
    
    ) 
    
}
    
    