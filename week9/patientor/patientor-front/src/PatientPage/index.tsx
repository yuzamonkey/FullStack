import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";
import { Icon, SemanticICONS } from 'semantic-ui-react';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  useEffect(() => {
    const getPatientData = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        console.log("RESPONSE", patientFromApi);
        dispatch({ type: "SET_PATIENT", payload: patientFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    void getPatientData();
  }, [dispatch]);

  const genderIconName = (): SemanticICONS | undefined => {
    switch(patient.gender) {
      case ("male"):
        return "mars";
      case ("female"):
        return "venus";
      default:
        return "genderless";
    }
  };
  return (
    <div>
    <h2>{patient.name} <Icon name={genderIconName()} />{patient.gender}</h2>
    ssn: {patient.ssn} <br></br>
    occupation: {patient.occupation}
    </div>
  );
};

export default PatientPage;