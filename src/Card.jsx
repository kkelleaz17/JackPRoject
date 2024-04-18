import React from 'react'

export default function Card({e,isSelected,press,isFound,color}) {
 
    const isQuestion = e.includes('\t');
    var StringSplit = String(e).split('\t');

    var Class = `${isSelected ? 'selected ' : ''}${isFound ? 'found ' : ''}card`
    // console.log(Class)

    return <>
      <div className={Class} onClick={press} style={{borderColor: color}}>
        <div>
        {isQuestion ? <>
          {StringSplit[0]}
          <br></br>
          {StringSplit[1]}
        </> : e}
        </div>
      </div>
    </>
}
