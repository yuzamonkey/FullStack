export interface DiagnoseEntry {
  code: string,
  name: string,
  latin?: string
}
export interface Entry {

}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female'
}