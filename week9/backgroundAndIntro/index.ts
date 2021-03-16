import express = require('express');
const app = express();

import { calculateBmi } from './bmiCalculator'

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
    res.send({error: e.message})
  }
})


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`)
})
