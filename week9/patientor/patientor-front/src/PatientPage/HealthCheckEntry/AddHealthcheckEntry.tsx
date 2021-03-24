import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddHealthCheckEntryForm, { HealthcheckEntryFormValues } from './AddHealthcheckEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HealthcheckEntryFormValues) => void;
  error?: string;
}

const AddHealthcheckEntry = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>New healthcheck entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
  );
};

export default AddHealthcheckEntry;
