import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({ courses }) => {
  return (
    <div>
      <MainHeader text="Web development curriculum" />
      <Content courses={courses} />
    </div>
  )
}

const MainHeader = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Content = ({ courses }) => {
  return (
    <div>
      {courses.map(course => <div><CourseView course={course} /></div>)}
    </div>
  )
}

const CourseView = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      {course.parts.map(part => <p> {part.name} {part.exercises}</p>)}
      <Total total={course.parts.map(part => part.exercises)} />
    </div>
  )
}
const Header = (props) => {
  return (
    <h2>{props.text}</h2>
  )
}

const Total = ({ total }) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  let sum = total.reduce(reducer)
  return (
    <p><b>total of {sum} exercises</b></p>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Course courses={courses} />
    </div >
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

