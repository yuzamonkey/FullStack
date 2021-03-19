import React from 'react'

interface Total {
  allExerciseCounts: Array<number>
}

const Total = ({allExerciseCounts}: Total): JSX.Element => {
  const total = allExerciseCounts.reduce((sum, count) => sum += count, 0)
  return (
    <p>Number of exercises {total}</p>
  )
}

export default Total