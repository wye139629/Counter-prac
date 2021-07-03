import { useState, useEffect } from 'react';

function formateToSec(time){
  return time * 60
}

function formateToStr(time){
  const min = Math.floor(time / 60)
  const sec = time - (min * 60)
  return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`
}

function Timer({ min, isStart, setIsStart }){
  const [time, setTime] = useState(()=> formateToSec(min))
  const stringTime = formateToStr(time)

  useEffect(()=>{
    if(!isStart) return

    if(time === 0){
      setIsStart(false)
    }

    const id = setTimeout(()=>{
        setTime(prev => {
          if(prev === 0){
            return 0
          }
          return  prev - 1
        })

      },1000)

    return ()=>{
      clearInterval(id)
    }
  },[isStart, setIsStart, time])


  return(
      <div className='timer'>{stringTime}</div>
  )
}

export default Timer
