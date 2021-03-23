import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient, addEntry, setPatientEntries } from "../state";
import { SinglePatientEntry, Entry } from "../types";
import { Icon, SemanticICONS, Button, Divider } from 'semantic-ui-react';
import EntryDetails from './EntryDetails';
import AddEntry from './AddEntry';
import { EntryFormValues } from './AddEntryForm';


const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient, entries }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const getPatientData = async () => {
      try {
        const { data: patientFromApi } = await axios.get<SinglePatientEntry>(`${apiBaseUrl}/patients/${id}`);
        //console.log("PATIENT", patientFromApi);
        dispatch(setPatient(patientFromApi));
        dispatch(setPatientEntries(patientFromApi.entries));
      } catch (e) {
        console.error(e);
      }
    };
    void getPatientData();
  }, [dispatch]);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      //dispatch({ type: "ADD_PATIENT", payload: newEntry });
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

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
      <h2>{patient.name} <Icon name={genderIconName()} /></h2>
      ssn: {patient.ssn} <br></br>
      occupation: {patient.occupation}
      <h3>entries</h3>
      <Button onClick={() => openModal()} color='blue'>Add entry</Button>
      <AddEntry
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Divider hidden />
      {Object.values(entries)
        ? Object.values(entries).map(entry => <div key={entry.id}><EntryDetails entry={entry} /></div>)
        : null
      }
    </div>
  );
};

export default PatientPage;