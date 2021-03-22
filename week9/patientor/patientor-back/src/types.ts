export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface DiagnoseEntry {
  code: string,
  name: string,
  latin?: string
}

//Health entries
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string,
    endDate: string
  }
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string,
    criteria: string
  }
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type HealthEntry = UnionOmit<Entry, ''>;

//Patient entries
export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Array<HealthEntry>;
}

// Define Entry without the 'id' property
export type SinglePatientEntry = UnionOmit<PatientEntry, ''>; //Why does this work?

export type PublicPatient = UnionOmit<PatientEntry, 'ssn' | 'entries'>;

export type NonSensitivePatientEntry = UnionOmit<PatientEntry, 'ssn'>;

export type NewPatientEntry = UnionOmit<PatientEntry, 'id'>;
