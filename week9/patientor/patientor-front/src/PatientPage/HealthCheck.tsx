import React from 'react';
import { HealthCheckEntry } from '../types';
import { Segment, Icon, SemanticCOLORS } from 'semantic-ui-react';

interface HealthCheckProps {
  entry: HealthCheckEntry
}


const HealthCheck = ({ entry }: HealthCheckProps) => {
  
  const getColorBasedOnRating = (): SemanticCOLORS | undefined => {
    switch (entry.healthCheckRating) {
      case (0):
        return 'green';
      case (1):
        return 'yellow';
      case (2):
        return 'red';
      default:
        return 'black';
    }
  };
  const descriptionStyle = {
    'color': 'gray'
  };
  return (
    <Segment>
      Health check
      <h3>{entry.date} <Icon name='user doctor' size='big' /></h3>
      <p style={descriptionStyle}><i>{entry.description}</i></p>
      <Icon name='heart' color={getColorBasedOnRating()} />
    </Segment>
  );
};

export default HealthCheck;