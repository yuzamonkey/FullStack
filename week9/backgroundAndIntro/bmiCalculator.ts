type bmiResult = "Underweight" | "Normal (healthy weight)" | "Overweight";

export const calculateBmi = (height: number, weight: number): bmiResult => {
  const result = weight / (height / 100 * height / 100);
  if (result < 18.5) {
    return "Underweight";
  } else if (result > 25) {
    return "Overweight";
  } else {
    return "Normal (healthy weight)";
  }
};

try {
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);
  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Height or weight was not given or not a number");
  }
  console.log(calculateBmi(height, weight));
} catch (e: unknown) {
  console.log({ error: (e as Error).message });
}

