import React from 'react';
import { OccupationalHealthcareEntry } from '../types';
import { Segment, Icon } from 'semantic-ui-react';

interface OccupationalHealthcareProps {
  entry: OccupationalHealthcareEntry
}

const descriptionStyle = {
  'color': 'gray'
};
const OccupationalHealthcare = ({ entry }: OccupationalHealthcareProps) => {
  return (
    <Segment>OC
      <h3>{entry.date} <Icon name='stethoscope' size='big' /> {entry.employerName}</h3>
      <p style={descriptionStyle}><i>{entry.description}</i></p>
    </Segment>
  );
};

export default OccupationalHealthcare;