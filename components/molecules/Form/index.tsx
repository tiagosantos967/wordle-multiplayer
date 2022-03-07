import { Formik, Form as FormikForm, FormikValues, useField } from "formik";
import { TextField as MuiTextField } from "@material-ui/core";

export type FormProps<T extends FormikValues> = {
  initialValues: T;
  onSubmit: (
    values: T
  ) => void | Promise<any>;
  children: React.ReactChild | React.ReactFragment | React.ReactPortal;
}

export const Form = <T, >(
  props: FormProps<T>
) => (
  <Formik
    initialValues={props.initialValues}
    onSubmit={props.onSubmit}
  >
    <FormikForm>{props.children}</FormikForm>
  </Formik>
)

interface TextFieldProps {
  name: string;
  label: string;
  fullWidth?: boolean;
}

export const TextField: React.FC<TextFieldProps> = (
  props
) => {
  const [ field ] = useField(props);
  
  return (
    <MuiTextField
      {...field}
      {...props}
    />
  )
}