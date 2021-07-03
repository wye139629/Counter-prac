import './App.css';
import ReactDOM from 'react-dom';
import React, { useEffect, useCallback } from 'react';
import Counter from './components/Counter'
import Timer from './components/Timer'
const states = []
let calls = - 1

const useState = (defaultValue) => {
  const callId = ++calls

  if(states[callId]){
    return states[callId]
  }

  const setValue = (newValue) => {
    let nextValue
    typeof newValue === 'function' ?  nextValue = newValue(states[callId][0]) : nextValue = newValue
    states[callId][0] = nextValue
    callRender()
  }

  const stateArray = [defaultValue, setValue]
  states[callId] = stateArray
  return stateArray
}
// const useLocalStorage = (key, value) => {
//   const [state, setState] = useState(()=>{
//     return window.localStorage.getItem(key) || value
//   })

//   useEffect(() => {
//     window.localStorage.setItem(key, state)
//   }, [state, key])

//   return [state, setState]
// }

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

function callRender(){
  calls = -1
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}
callRender()


export default App;
