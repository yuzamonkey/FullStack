import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient, addEntry, setPatientEntries } from "../state";
import { SinglePatientEntry, Entry } from "../types";
import { Icon, SemanticICONS, Button, Divider } from 'semantic-ui-react';
import EntryDetails from './EntryDetails';

import AddHealthCheckEntry from './HealthCheckEntry/AddHealthcheckEntry';
import { HealthcheckEntryFormValues } from './HealthCheckEntry/AddHealthcheckEntryForm';

import AddHospitalEntry from './HospitalEntry/AddHospitalEntry';
import { HospitalEntryFormValues } from './HospitalEntry/AddHospitalEntryForm';

import AddOHCEntry from './OHCEntry/AddOHCEntry';
import { OHCEntryFormValues } from './OHCEntry/AddOHCEntryForm';

type EntryFormValues = HealthcheckEntryFormValues | HospitalEntryFormValues | OHCEntryFormValues;


const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient, entries }, dispatch] = useStateValue();

  const [healthcheckModalOpen, setHealthcheckModalOpen] = React.useState<boolean>(false);
  const [hospitalModalOpen, setHospitalModalOpen] = React.useState<boolean>(false);
  const [ohcModalOpen, setOHCModalOpen] = React.useState<boolean>(false);

  const [error, setError] = React.useState<string | undefined>();

  const openHealthcheckModal = (): void => setHealthcheckModalOpen(true);
  const openHospitalModal = (): void => setHospitalModalOpen(true);
  const openOHCModal = (): void => setOHCModalOpen(true);

  const closeHealthcheckModal = (): void => {
    setHealthcheckModalOpen(false);
    setError(undefined);
  };
  const closeHospitalModal = (): void => {
    setHospitalModalOpen(false);
    setError(undefined);
  };
  const closeOHCModal = (): void => {
    setOHCModalOpen(false);
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
      dispatch(addEntry(newEntry));
      closeHealthcheckModal();
      closeHospitalModal();
      closeOHCModal();
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
      <Button onClick={() => openHealthcheckModal()} color='twitter'>Add healthcheck entry</Button>
      <Button onClick={() => openOHCModal()} color='blue'>Add occupational healthcare entry</Button>
      <Button onClick={() => openHospitalModal()} color='facebook'>Add hospital entry</Button>
      <AddHealthCheckEntry
        modalOpen={healthcheckModalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeHealthcheckModal}
      />
      <AddHospitalEntry
        modalOpen={hospitalModalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeHospitalModal}
      />
      <AddOHCEntry
        modalOpen={ohcModalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeOHCModal}
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