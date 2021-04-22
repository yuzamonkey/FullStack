import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection, NumberField } from "./HealthcheckEntryFormField";
import { Diagnosis, BaseEntry } from "../../types";
import axios from "axios";
import { apiBaseUrl } from "../../constants";

export type HealthcheckEntryFormValues = Omit<BaseEntry, 'id'>;

interface Props {
  onSubmit: (values: HealthcheckEntryFormValues) => void;
  onCancel: () => void;
}

export type DiagnosisCodesOption = {
  value: Diagnosis;
  label: string;
};

export const AddHealthcheckEntryForm = ({ onSubmit, onCancel }: Props) => {

  const setFieldValue = (field: string, value: any, shouldValidate?: boolean | undefined) => {
    console.log("SET FIELD VALUE");
    console.log("FIELD", field);
    console.log("VALUE", value);
    console.log("SHOULD VALIDATE", shouldValidate);
  };

  /*const setFieldTouched = (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => {
    console.log("SET FIELD TOUCHED");
    console.log("FIELD", field);
    console.log("ISTOUCHED", isTouched);
    console.log("SHOULD VALIDATE", shouldValidate);
  };*/

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
        diagnosisCodes: [{
          key: 'M24.2',
          text: 'foobarM24.2',
          value: 'M24.2'
        }],
        healthCheckRating: 0
      }}
      onSubmit={(formValuesWithoutDiagnoses: any) => {
        console.log('FORMIK SENT SUBMIT EVENT with data:', formValuesWithoutDiagnoses);
      }}
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
              setFieldTouched={() => {console.log('');}}
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

export default AddHealthcheckEntryForm;
