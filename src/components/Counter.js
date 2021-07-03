function Counter({min, increaseHandler, decreaseHandler}){
  const unit = min === 1 ? ' minute' : ' minutes'

  return(
    <div className="setter">
        <button className="minus" onClick={decreaseHandler}></button>
        <span className="number">{ `${min} ${unit}` }</span>
        <button className="plus" onClick={increaseHandler}></button>
     </div>
  )
}

export default Counter
