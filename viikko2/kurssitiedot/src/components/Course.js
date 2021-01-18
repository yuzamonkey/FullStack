import React from 'react'

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
            {courses.map(course => <div key={course.id}><CourseView course={course} /></div>)}
        </div>
    )
}

const CourseView = ({ course }) => {
    return (
        <div>
            <Header text={course.name} />
            {course.parts.map(part => <p key={part.id}> {part.name} {part.exercises}</p>)}
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

export default Course