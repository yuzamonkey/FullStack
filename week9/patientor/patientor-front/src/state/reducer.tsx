import { State } from "./state";
import { Patient, Entry } from "../types";

export const addEntry = (entry: Entry): Action => {
  console.log("CONST ADD ENTRY CALLED", entry);
  return {
    type: "ADD_ENTRY",
    payload: entry
  };
};

export const setPatientEntries = (entries: Entry[]): Action => {
  return {
    type: "SET_PATIENT_ENTRIES",
    payload: entries
  };
};

export const setPatient = (patient: Patient): Action => {
  return {
    type: "SET_PATIENT",
    payload: patient
  };
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};



export type Action =
  | {
    type: "SET_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "ADD_ENTRY";
    payload: Entry;
  }
  | {
    type: "SET_PATIENT_ENTRIES";
    payload: Entry[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_ENTRIES": 
      return {
        ...state,
        entries: {
          ...action.payload.reduce(
            (memo, entry) => ({...memo, [entry.id]: entry}), 
            {}
          ),
          ...state.entries
        }
      };
    case "ADD_ENTRY":
      console.log("ADD_ENTRY CALLED IN REDUCER", action.payload);
      return {
        ...state, ////
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload
      };
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
