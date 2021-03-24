import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "./HospitalFormField";
import { Diagnosis, BaseEntry } from "../../types";
import axios from "axios";
import { apiBaseUrl } from "../../constants";

export type HospitalEntryFormValues = Omit<BaseEntry, 'id'>;

interface Props {
  onSubmit: (values: HospitalEntryFormValues) => void;
  onCancel: () => void;
}

export type DiagnosisCodesOption = {
  value: Diagnosis;
  label: string;
};

export const AddHospitalEntryForm = ({ onSubmit, onCancel }: Props) => {
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

  /*

  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
  discharge: {
    date: string,
    criteria: string
  */

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        dischargeDate: "", 
        dischargeCriteria: ""}
      }
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
        if (!values.dischargeDate) {
          errors.dischargeDate = requiredError;
        }
        if (!values.dischargeCriteria) {
          errors.dischargeCriteria = requiredError;
        }
        if (!isDate(values.dischargeDate)) {
          errors.dischargeDate = 'Give date in format YYYY-MM-DD or DD.MM.YYYY';
        }
        if (!values.dischargeCriteria) {
          errors.dischargeCriteria = requiredError;
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
              label="Discharge Date"
              placeholder="Discharge Date"
              name="dischargeDate"
              component={TextField}
            />
             <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="dischargeCriteria"
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

export default AddHospitalEntryForm;
