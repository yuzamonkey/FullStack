"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const newPatientEntryValidations_1 = require("../utils/newPatientEntryValidations");
const newEntryValidations_1 = require("../utils/newEntryValidations");
const patientRouter = express_1.default.Router();
patientRouter.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitiveEntries());
});
patientRouter.post('/', (req, res) => {
    try {
        const newPatient = newPatientEntryValidations_1.toNewPatientEntry(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
patientRouter.get('/:id', (req, res) => {
    const patient = patientService_1.default.findById(String(req.params.id));
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
patientRouter.post('/:id/entries', (req, res) => {
    console.log("ADD ENTRY CALLED IN BACKEND", req.body);
    try {
        const newEntry = newEntryValidations_1.toNewEntry(req.body);
        console.log("NEW ENTRY", newEntry);
        res.json(newEntry);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.default = patientRouter;
