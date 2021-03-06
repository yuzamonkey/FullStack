
import patientData from '../../data/patients';

import { PatientEntry, NewPatientEntry, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid'

const getNonSensitiveEntries = (): PublicPatient[] => {
  //console.log("PATIENT DATA", patientData)
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }: PublicPatient) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const findById = (id: string): PatientEntry => {
  //console.log("PATIENT DATA", patientData)
  const entry = patientData.map(({ id, name, ssn, dateOfBirth, gender, occupation, entries }: PatientEntry) => ({
    id, name, ssn, dateOfBirth, gender, occupation, entries
  }));
  const patient = entry.find((p: PatientEntry) => p.id === id);
  //console.log("PATIENT BY ID", patient)
  if (patient) {
    return patient;
  } else {
    return {id: "unknown", name: "unknown", ssn: "unknown", dateOfBirth: "unknown", gender: "unknown", occupation: "unknown", entries: []}
  }
}

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  }
  patientData.push(newPatientEntry);
  return newPatientEntry;
}

export default {
  getNonSensitiveEntries,
  findById,
  addPatient
};