
type bmiResult = "Underweight" | "Normal (healthy weight)" | "Overweight"

const calculateBmi = (height: number, weight: number): bmiResult => {
  const result = weight / (height / 100 * height / 100);
  if (result < 18.5) {
    return "Underweight";
  } else if (result > 25) {
    return "Overweight";
  } else {
    return "Normal (healthy weight)";
  }
}

console.log(calculateBmi(178, 71));