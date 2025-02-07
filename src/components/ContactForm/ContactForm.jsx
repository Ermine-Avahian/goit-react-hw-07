import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./ContactForm.module.css";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useId } from "react";
import { addContact } from "../../redux/contactsOps";

const ContactForm = () => {
  const initialValues = {
    name: "",
    number: "",
  };

  const nameField = useId();
  const numberField = useId();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Too short!")
      .max(50, "Too long!")
      .required("Required"),
    number: Yup.string()
      .matches(/^\d{10}$/, "Must be exactly 10 digits")
      .required("Required"),
  });

  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact(values));
    resetForm();
  };

  return (
    <div className={css.formContainer}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className={css.naimCont}>
            <label htmlFor={nameField} className={css.label}>
              Name
            </label>
            <Field name="name" id={nameField} className={css.inputField} />
            <ErrorMessage
              name="name"
              component="span"
              className={css.errorMessage}
            />
          </div>
          <div className={css.number}>
            <label htmlFor={numberField} className={css.label}>
              Number
            </label>
            <Field name="number" id={numberField} className={css.inputField} />
            <ErrorMessage
              name="number"
              component="span"
              className={css.errorMessage}
            />
          </div>
          <button type="submit" className={css.submitButton}>
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};
export default ContactForm;
