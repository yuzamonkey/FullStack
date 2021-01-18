import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Content = ({ parts }) => {
  console.log("Content props ", parts)
  return (
    <div>
      {parts.map(part => <p> {part.name} {part.exercises}</p>)}
      <Total total={parts.map(part=>part.exercises)} />
    </div>
  )
}

const Total = ({total}) => {
  let sum = 0
  for (let i = 0; i < total.length; i++) {
    sum += total[i]
  }
  return (
    <p><b>total of {sum} exercises</b></p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
      {
        name: 'Redux',
        exercises: 11
      }
    ]
  }

  return (
    <div>
      <Course course={course} />

    </div >
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

