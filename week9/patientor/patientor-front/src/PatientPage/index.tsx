import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
//qimport { useStateValue } from "../state";
import { Patient } from "../types";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  //const [{ patient }, dispatch] = useStateValue();
  //console.log("STATE PATIENT", patient);
  //const [patient, setPatient] = useState(null);

  useEffect(() => {
    const getPatientData = async () => {
      const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      console.log("RESPONSE", response.data);
      //setPatient(response.data);
      //dispatch({ type: "ADD_PATIENT", payload: response.data });
    };
    void getPatientData();
  }, []);

  return (
    <h3>Here is patient info for {id}</h3>
  );
};

export default PatientPage;