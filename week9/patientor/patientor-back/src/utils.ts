import { Gender, NewPatientEntry, Entry } from './types'

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: Array<Entry> };

export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: entries
  }
  return newEntry
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
}

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
}

const parseSSN = (ssn: unknown) => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
}

const parseGender = (gender: unknown) => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender
}

const parseOccupation = (occupation: unknown) => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
}

const isString = (a: unknown): a is string => {
  return typeof a === 'string' || a instanceof String;
}

const isDate = (d: string): boolean => {
  return Boolean(Date.parse(d));
}

const isGender = (g: any): g is Gender => {
  return Object.values(Gender).includes(g)
}
