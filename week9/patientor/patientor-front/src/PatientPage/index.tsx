import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient } from "../state";
import { Diagnosis, SinglePatientEntry } from "../types";
import { Icon, SemanticICONS } from 'semantic-ui-react';

interface PatientPageProps {
  diagnoses: Array<Diagnosis>
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  useEffect(() => {
    const getPatientData = async () => {
      try {
        const { data: patientFromApi } = await axios.get<SinglePatientEntry>(`${apiBaseUrl}/patients/${id}`);
        //console.log("PATIENT", patientFromApi);
        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void getPatientData();
  }, [dispatch]);


  const genderIconName = (): SemanticICONS | undefined => {
    switch (patient.gender) {
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
      <h3>entries</h3>
      {patient.entries
        ? patient.entries.map(entry =>
          <p key={entry.id}>
            {entry.date} <i>{entry.description}</i>
            <ul>
              {entry.diagnosisCodes
                ? entry.diagnosisCodes.map(code => {
                  const diagnoseObject = diagnoses.find(diagnose => diagnose.code === code);
                  return (
                    <li key={code}>
                      {code} {diagnoseObject ? diagnoseObject.name : null}
                    </li>
                  );
                })
                : null}
            </ul>
          </p>)
        : null
      }
    </div>
  );
};

export default PatientPage;