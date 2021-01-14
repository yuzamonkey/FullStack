import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const CreateArray = (length) => {
  const array = []
  for (let i = 0; i < length; i++) {
    array[i] = 0
  }
  console.log('array = ', array)
  return array
}

const getBiggest = (array) => {
  let biggestIndex = 0
  for (let i = 0; i < array.length; i++) {
    if (array[i] > array[biggestIndex]) {
      biggestIndex = i
    }
  }
  return biggestIndex
}

const Title = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Button = ({ text, action }) => {
  return (
    <button onClick={action}>{text}</button>

  )
}

const Text = ({ text }) => {
  return (
    <p>{text}</p>
  )
}

const App = (props) => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(CreateArray(anecdotes.length))
  const [most, setMost] = useState(0)

  const vote = () => {
    const updatedVotes = votes.concat()
    updatedVotes[selected] += 1
    setMost(getBiggest(updatedVotes))
    setVotes(updatedVotes)
  }
  const update = () => {
    let random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  return (
    <div>
      <Title text="Anecdote of the day" />
      <Text text={anecdotes[selected]} />
      <p>has {votes[selected]} votes</p>
      <Button text="vote" action={vote} />
      <Button text="Random anecdote" action={update} />

      <Title text="Anecdote with most votes" />
      <Text text={anecdotes[most]} />
      <p>has {votes[most]} votes</p>
    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


