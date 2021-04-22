"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getNonSensitiveEntries = () => {
    //console.log("PATIENT DATA", patientData)
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};
const findById = (id) => {
    //console.log("PATIENT DATA", patientData)
    const entry = patients_1.default.map(({ id, name, ssn, dateOfBirth, gender, occupation, entries }) => ({
        id, name, ssn, dateOfBirth, gender, occupation, entries
    }));
    const patient = entry.find((p) => p.id === id);
    //console.log("PATIENT BY ID", patient)
    if (patient) {
        return patient;
    }
    else {
        return { id: "unknown", name: "unknown", ssn: "unknown", dateOfBirth: "unknown", gender: "unknown", occupation: "unknown", entries: [] };
    }
};
const addPatient = (entry) => {
    const newPatientEntry = Object.assign({ id: uuid_1.v1() }, entry);
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
exports.default = {
    getNonSensitiveEntries,
    findById,
    addPatient
};
