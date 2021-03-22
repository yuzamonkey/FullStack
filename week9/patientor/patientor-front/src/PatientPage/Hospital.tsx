import React from 'react';
import { HospitalEntry } from '../types';
import { Segment, Icon } from 'semantic-ui-react';

interface HospitalProps {
  entry: HospitalEntry
}

const descriptionStyle = {
  'color': 'gray'
};

const Hospital = ({ entry }: HospitalProps) => {
  return (
    <Segment>Hospital
      <h3>{entry.date} <Icon name='hospital' size='big' /></h3>
      <p style={descriptionStyle}><i>{entry.description}</i></p>
      <p style={descriptionStyle}>{entry.discharge.criteria} </p>
      <p>discharged: {entry.discharge.date}</p>
      <p>Specialist: {entry.specialist}</p>
    </Segment>
  );
};

export default Hospital;