import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddOHCEntryForm, { OHCEntryFormValues } from './AddOHCEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: OHCEntryFormValues) => void;
  error?: string;
}

const AddOHCEntry = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>New occupationalhealthcare entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddOHCEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddOHCEntry;
