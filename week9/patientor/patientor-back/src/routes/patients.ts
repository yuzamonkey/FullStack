import express from 'express';
import patientService from '../services/patientService'
import { toNewPatientEntry } from '../utils'

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

patientRouter.post('/', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient)
    res.json(addedPatient)
  } catch (e) {
    res.status(400).send(e.message);
  }
})

patientRouter.get('/:id', (req, res) => {
  const patient = patientService.findById(String(req.params.id));
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

patientRouter.post('/:id/entries', (req, res) => {
  console.log("ADD ENTRY CALLED IN BACKEND", req.body)
  try {
    const newEntry = req.body;
    console.log("NEW ENTRY", newEntry)
    res.json(newEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});


export default patientRouter;