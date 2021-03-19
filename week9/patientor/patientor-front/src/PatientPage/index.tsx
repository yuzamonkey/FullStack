import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  //console.log("STATE PATIENT", patient);
  //const [patient, setPatient] = useState(null);

  useEffect(() => {
    const getPatientData = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        console.log("RESPONSE", patientFromApi);
        //setPatient(response.data);
        dispatch({ type: "SET_PATIENT", payload: patientFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    void getPatientData();
  }, [dispatch]);

  return (
    <div>
    <h2>{patient.name}</h2>
    ssn: {patient.ssn} <br></br>
    occupation: {patient.occupation}
    </div>
  );
};

export default PatientPage;