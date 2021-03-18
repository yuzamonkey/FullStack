import express from 'express';
import patientService from '../services/patientService'

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

patientRouter.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatientEntry = {
    name, dateOfBirth, ssn, gender, occupation
  };
  res.json(newPatientEntry)
})

patientRouter.get('/:id', (req, res) => {
  const patient = patientService.findById(String(req.params.id));
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});


export default patientRouter;