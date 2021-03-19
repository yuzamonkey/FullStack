import React from 'react'
import { CoursePart } from '../types'

interface CourseProp {
  course: CoursePart;
}

const Part = (courseObject: CourseProp): JSX.Element => {
  const course = courseObject.course;
  switch (course.type) {
    case "normal":
      return (
        <div>
          <p><b>{course.name} {course.exerciseCount}</b><br></br>
          <i>{course.description}</i></p>
        </div>
      )
    case "submission":
      return (
        <div>
          <p><b>{course.name} {course.exerciseCount}</b><br></br>
          <i>{course.description}</i><br></br>
          submit to {course.exerciseSubmissionLink}</p>
        </div>
      )
    case "groupProject":
      return (
        <div>
          <p><b>{course.name} {course.exerciseCount}</b><br></br>
          project exercises {course.exerciseCount}</p>
        </div>
      )
    case "special":
      return (
        <div>
          <p><b>{course.name} {course.exerciseCount}</b><br></br>
          <i>{course.description}</i><br></br>
          required skills: {course.requirements.join(", ")}</p>
        </div>
      )
    default:
      return <span></span>
  }
}

export default Part