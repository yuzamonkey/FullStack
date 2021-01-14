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

const Statistics = ({ good, neutral, bad, all, average, percentage }) => {
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="percentage" value={percentage} />
    </div>
  )
}

const StatisticLine = ({ text, value }) => {
  if (text === 'percentage') {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const CountAverage = (array) => {
  let sum = 0
  for (let value of array) {
    sum = sum + value
  }
  return sum / array.length
}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])
  const [average, setAverage] = useState(0)
  const [percentage, setPercentage] = useState(0)



  const increaseGood = () => {
    const newGood = good + 1
    const newAll = all.concat(1)
    setAverage(CountAverage(newAll))
    setPercentage(newGood / newAll.length)
    setGood(good + 1)
    setAll(newAll)
  }
  const increaseNeutral = () => {
    const newNeutral = neutral + 1
    const newAll = all.concat(0)
    setAverage(CountAverage(newAll))
    setPercentage(good / newAll.length)
    setNeutral(newNeutral)
    setAll(newAll)
  }
  const increaseBad = () => {
    const newBad = bad + 1
    const newAll = all.concat(-1)
    setAverage(CountAverage(newAll))
    setPercentage(good / newAll.length)
    setBad(newBad)
    setAll(newAll)
  }

  return (
    <div>
      <Title title={'Give feedback'} />
      <Button handleClick={increaseGood} text={'good'} />
      <Button handleClick={increaseNeutral} text={'neutral'} />
      <Button handleClick={increaseBad} text={'bad'} />
      <Title title={'Statistics'} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all.length}
        average={average}
        percentage={percentage} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
