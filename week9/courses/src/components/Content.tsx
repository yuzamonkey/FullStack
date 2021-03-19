import React from 'react'

interface Course {
  name: string,
  exerciseCount: number
}
interface ContentProps {
  courses: Array<Course>;
}
const Content = ({ courses }: ContentProps): JSX.Element => {
  return (
    <div>
      {courses.map(c => <p key={c.name}>{c.name} {c.exerciseCount}</p>)}
    </div>
  )
}

export default Content