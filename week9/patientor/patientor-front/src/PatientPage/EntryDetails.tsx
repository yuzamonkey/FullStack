import React from 'react';
import { Entry } from '../types';
import OccupationalHealthcare from './OccupationalHealthcare';
import Hospital from './Hospital';
import HealthCheck from './HealthCheck';

interface EntryDetailsProps {
  entry: Entry
}

const EntryDetails = ({ entry }: EntryDetailsProps) => {
  switch (entry.type) {
    case ("Hospital"):
      return <Hospital entry={entry} />;
    case ("OccupationalHealthcare"):
      return <OccupationalHealthcare entry={entry} />;
    case ("HealthCheck"):
      return <HealthCheck entry={entry} />;
    default:
      return <h2>No type of entry</h2>;
  }
};

export default EntryDetails;