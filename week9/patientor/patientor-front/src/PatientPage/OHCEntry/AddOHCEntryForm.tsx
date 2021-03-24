import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "./OHCFormField";
import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import axios from "axios";
import { apiBaseUrl } from "../../constants";

export type OHCEntryFormValues = Omit<OccupationalHealthcareEntry, 'id'>;

interface Props {
  onSubmit: (values: OHCEntryFormValues) => void;
  onCancel: () => void;
}

export type DiagnosisCodesOption = {
  value: Diagnosis;
  label: string;
};

export const AddOHCEntryForm = ({ onSubmit, onCancel }: Props) => {
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
        type: 'OccupationalHealthcare',
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",
        sickLeave: {startDate: "", endDate: ""}
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
        if (!values.employerName) {
          errors.empployerName = requiredError;
        }
        if (values.sickLeave?.startDate != undefined && !isDate(values.sickLeave?.startDate)) {
          errors.sickLeaveStart = 'Give start date in format YYYY-MM-DD or DD.MM.YYYY';
        }
        if (values.sickLeave?.endDate != undefined && !isDate(values.sickLeave?.endDate)) {
          errors.sickLeaveEnd = 'Give end date in format YYYY-MM-DD or DD.MM.YYYY';
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
              label="Sick leave start date"
              placeholder="YYYY-MM-DD"
              name="sickLeaveStart"
              component={TextField}
            />
            <Field
              label="Sick leave end date"
              placeholder="YYYY-MM-DD"
              name="sickLeaveEnd"
              component={TextField}
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

export default AddOHCEntryForm;
