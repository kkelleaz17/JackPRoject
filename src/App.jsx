import { useMemo, useState,Fragment, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AnswerKey from './AnswerKey.json'
import getRandomArray from './util/getRandomArray'
import shuffleArray from './util/shuffle'
import Card from './Card'
import hexCodes from './util/randomColors'
const maxGuess = 300
function App() {
  const [difficulty,setDifficuly] = useState('');
  const [selected,SetSelected] = useState([-1,-1]);
  const [correctIndex,setcorrect] = useState([]);
  const [numberOfTrys,setNumberOfTrys] = useState(maxGuess);
  const boardQuestions = useMemo(()=>{
    if(difficulty === '') return [];
    const questions = AnswerKey.filter(e=>e.difficulty == difficulty || difficulty === 'mixed')
    const random = getRandomArray(8,1,questions.length-1);
    const randomMap = random.map((e)=>questions[e]);
    var result = [];
    for(let e of  randomMap){
      result.push({Text:`X: ${e.answer.x} Y: ${e.answer.y}`,Answer:e.question})
      result.push({Text:e.question,Answer:e.question})
    }
    return shuffleArray(result)
  },[difficulty]);
  

  const action = useCallback((num,answer)=>{
    if(selected[0] == -1){
      SetSelected([num,-1]);
    }else if(selected[0] === num){
      SetSelected([-1,-1]);
    } else if(selected[0] != -1 && selected[1]==-1){
      if(answer === boardQuestions[selected[0]]?.Answer){
        setcorrect(prev=>[...prev,selected[0],num])
      }else{
        setNumberOfTrys(prev=>{
          var newNum = prev -1
          if(newNum === 0){
            setDifficuly('')
          }
          return newNum
        })
      }
      SetSelected([-1,-1]);
    }
  },[selected,boardQuestions])
  
  if(!difficulty || numberOfTrys <= 0 || correctIndex.length >= 16){
    return <>
      {}
      <h1>{numberOfTrys <= 0 ? 'You lost try again!' : (correctIndex.length >= 16) ? "You Won try again!":'Welcome to Equation Matcher: Solve & Match, '}</h1>
      <h2>Select a difficulty!</h2>
      {(correctIndex.length >= 16) && <h3>strikes used: {(maxGuess-numberOfTrys)}</h3>}
      <div className='buttonHolder'>
        <button onClick={()=>{setDifficuly('easy');setNumberOfTrys(maxGuess)}}>Easy</button>
        <button onClick={()=>{setDifficuly('medium');setNumberOfTrys(maxGuess)}}>Medium</button>
        <button onClick={()=>{setDifficuly('hard');setNumberOfTrys(maxGuess)}}>Hard</button>
        <button onClick={()=>{setDifficuly('mixed');setNumberOfTrys(maxGuess)}}>Mixed</button>
      </div>
    </>
  }

  return (
    <>
      <h1>Equation Matcher: Solve & Match</h1>
      <h3>Difficulty is set to {difficulty}</h3>
      <h3>{numberOfTrys} strikes left </h3>
      <div className='card-container'>

            {boardQuestions.map((e,i)=>{
              const isSelected = selected.includes(i);
              const isFound = correctIndex.includes(i);
              return <Card 
                 e={e.Text} 
                 key={i+'Question'} 
                 isFound={isFound}
                 color={isFound ? hexCodes[correctIndex.indexOf(i)]:'#ddd8d8'}
                 isSelected={isSelected} 
                 press={()=>{action(i,e.Answer)}}
              />
            })}
      </div>
    </>
  )
}

export default App
