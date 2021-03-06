import './App.css';
import ReactDOM from 'react-dom';
import React, { useState, useEffect, useCallback } from 'react';
import Counter from './components/Counter'
import Timer from './components/Timer'

const App = () => {
  const [isStart, setIsStart] = useState(false)
  const [min, setMin] = useState(0)

  const startHandler = () => {
    if(min === 0) return
    setIsStart(!isStart)
  }

  const increaseHandler = useCallback(
  () => {
    setMin(prev => prev + 1)
  },[setMin])

  const decreaseHandler = useCallback(
  () => {
    setMin(prev => {
      if(prev === 0) return prev
      return prev - 1
    })
  }, [setMin])


  return (
    <div className="container">
      { !isStart && <Counter min={min} increaseHandler={increaseHandler} decreaseHandler={decreaseHandler}/>}
      { isStart && <Timer min={min} isStart={isStart} setIsStart={setIsStart}/>}
      <div className='start'>
        <button className='startBtn' onClick={startHandler}>{isStart? 'Clear' : 'Start'}</button>
      </div>
    </div>
  )
};

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );


export default App;
