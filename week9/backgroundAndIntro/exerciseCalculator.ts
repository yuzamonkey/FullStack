interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculate = (hoursTrainedDuringWeek: Array<number>, target: number): Result => {
  const periodLength = hoursTrainedDuringWeek.length;
  const trainingDays = hoursTrainedDuringWeek.filter(h => h != 0).length;
  const average = hoursTrainedDuringWeek.reduce((sum, number) => sum += Number(number), 0) / periodLength;
  const resultObject = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: true,
    rating: -1,
    ratingDescription: "",
    target: target,
    average: average
  };
  if (average >= target) {
    resultObject.rating = 3;
    resultObject.ratingDescription = "Well done";
  } else {
    resultObject.success = false;
    if (target - average < 0.5) {
      resultObject.rating = 2;
      resultObject.ratingDescription = "Still left something on the table";
    } else {
      resultObject.rating = 1;
      resultObject.ratingDescription = "Target was not reached";
    }
  }
  return resultObject;
};

try {
  const target = Number(process.argv[2]);
  if (isNaN(target)) {
    throw new Error("First value was not a number");
  }
  const hours: Array<number> = [];
  let index = 3;
  while (process.argv[index]) {
    const value = Number(process.argv[index]);
    if (isNaN(value)) {
      throw new Error("At least one of the given values was not a number");
    } else {
      hours.push(value);
      index++;
    }
  }
  console.log(calculate(hours, target));
} catch (e) {
  console.log("ERROR:", e.message);
}
