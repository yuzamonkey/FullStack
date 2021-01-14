import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Title = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <Title title={'Give feedback'} />
      <Button handleClick={increaseGood} text={'good'} />
      <Button handleClick={increaseNeutral} text={'neutral'} />
      <Button handleClick={increaseBad} text={'bad'} />
      <Title title={'Statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
