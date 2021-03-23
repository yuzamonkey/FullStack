import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField } from "./EntryFormField";
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

// const diagnosisOptions: DiagnosisCodesOption[] = [
//   { value: {name: "abc", code: "def"}, label: "Diagnosis" },
// ];

export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {
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

  const diagnosisOptions: DiagnosisCodesOption[] = diagnoses.map(diagnose => {
    const name = diagnose.name;
    const code = diagnose.code;
    const diagnoseObject = {
      value: {name: name, code: code}, label: name
    };
    return diagnoseObject;
  });
  /*
  [
    { value: {name: "abc", code: "def"}, label: "Diagnosis" },
  ];
*/

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: []
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
        if (!values.specialist) {
          errors.specialist = requiredError;
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
            <SelectField
              label="Diagnosis"
              name="diagnosisCodes"
              options={diagnosisOptions}
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

export default AddEntryForm;
