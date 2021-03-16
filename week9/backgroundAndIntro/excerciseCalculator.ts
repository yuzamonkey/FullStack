
/*
the number of days
the number of training days
the original target value
the calculated average time
boolean value describing if the target was reached
a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
a text value explaining the rating
*/
interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculate = (hoursTrainedDuringWeek: Array<number>, target: number): Result => {
  const periodLength = hoursTrainedDuringWeek.length;
  const trainingDays = hoursTrainedDuringWeek.filter(h => h != 0).length;
  const average = hoursTrainedDuringWeek.reduce((sum, number) => sum += number, 0) / periodLength;
  const resultObject = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: true,
    rating: -1,
    ratingDescription: "",
    target: target,
    average: average
  }
  if (average >= target) {
    resultObject.rating = 3;
    resultObject.ratingDescription = "Well done"
  } else {
    resultObject.success = false;
    if (target - average < 0.5) {
      resultObject.rating = 2;
      resultObject.ratingDescription = "Still left something on the table"
    } else {
      resultObject.rating = 1;
      resultObject.ratingDescription = "Target was not reached"
    }
  }
  return resultObject
}

try {
  const target: number = Number(process.argv[2])
  if (isNaN(target)) {
    throw new Error("First value was not a number")
  }
  let hours: Array<number> = []
  let index = 3
  while (process.argv[index]) {
    const value: number = Number(process.argv[index])
    if (isNaN(value)) {
      throw new Error("At least one of the given values was not a number")
    } else {
      hours.push(value)
      index++
    }
  }
  console.log(calculate(hours, target));
} catch (e) {
  console.log("ERROR:", e.message)
}
