import express from 'express';
const app = express();
const cors = require('cors');
app.use(cors)
app.use(express.json());

import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const PORT = 3001;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});