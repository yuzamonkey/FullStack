import React from 'react'
import Part from './Part'
import { CoursePart } from '../types'

interface ContentProps {
  courses: CoursePart[];
}

const Content = ({ courses }: ContentProps): JSX.Element => {
  return (
    <div>
      {courses.map(course => <Part key={course.name} course={course}/>)}
    </div>
  )
}

export default Content