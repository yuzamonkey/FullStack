
import patientData from '../../data/patients.json';

import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import {v1 as uuid} from 'uuid'

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation, entries: []
  }));
};

const findById = (id: string): NonSensitivePatientEntry | undefined => {
  const entry = patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation, entries: []
  })).find(p => p.id === id);
  return entry;
}

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  }
  patientData.concat(newPatientEntry);
  return newPatientEntry;
}

export default {
  getNonSensitiveEntries,
  findById,
  addPatient
};