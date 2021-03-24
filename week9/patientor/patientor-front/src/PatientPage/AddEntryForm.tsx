import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection, NumberField } from "./EntryFormField";
import { Diagnosis, BaseEntry } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";

export type EntryFormValues = Omit<BaseEntry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export type DiagnosisCodesOption = {
  value: Diagnosis;
  label: string;
};

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [, setFieldValue] = React.useState('');
  const [, setFieldTouched] = React.useState('');

  const [diagnoses, setDiagnoses] = React.useState<Diagnosis[]>([]);
  React.useEffect(() => {
    const getDiagnoseCodes = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses/`);
        setDiagnoses(diagnosesFromApi);
      } catch (e) {
        console.error(e);
      }
    };
    void getDiagnoseCodes();
  }, []);

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!isString(values.date) || !isDate(values.date)) {
          errors.date = 'Give date in format YYYY-MM-DD or DD.MM.YYYY';
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!isString(values.specialist)) {
          errors.specialist = 'Give proper specialist';
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        if (values.healthCheckRating < 0 || values.healthCheckRating > 3) {
          errors.healthCheckRating = 'Rating must be between 0 and 3';
          values.healthCheckRating = 0;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              diagnoses={diagnoses}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};



const isString = (a: unknown): a is string => {
  return typeof a === 'string' || a instanceof String;
};

const isDate = (d: string): boolean => {
  return Boolean(Date.parse(d));
};

export default AddEntryForm;
