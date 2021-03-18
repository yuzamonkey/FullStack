import patientData from '../../data/patients.json';

import { NonSensitivePatientEntry } from '../types';

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const findById = (id: string): NonSensitivePatientEntry | undefined => {
  const entry = patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  })).find(p => p.id === id);
  return entry;
}

export default {
  getNonSensitiveEntries,
  findById
};