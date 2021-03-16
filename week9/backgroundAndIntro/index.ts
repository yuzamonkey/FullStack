import express = require('express');
const app = express();
app.use(express.json())
import { calculateBmi } from './bmiCalculator'
import { calculate } from './exerciseCalculator'

app.get('/', (_req, res) => {
  res.send('Hello Full Stack')
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
      throw new Error("malformatted parameters")
    }
    const responseObject = {
      weight: weight,
      height: height,
      bmi: calculateBmi(height, weight)
    }
    res.send(responseObject)
  } catch (e) {
    res.send({ error: e.message })
  }
})

app.post('/exercise', (req, res) => {
  try {
    const { daily_exercises, target } = req.body
    if (!daily_exercises || !target || isNaN(target)) {
      throw new Error("parameters missing or invalid")
    }
    for (let item of daily_exercises) {
      if (isNaN(Number(item)) || Number(item) > 24) {
        throw new Error("invalid parameters in daily_exercises")
      }
    }
    res.send(calculate(daily_exercises, target))
  } catch (e) {
    res.send({ error: e.message })
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`)
})
