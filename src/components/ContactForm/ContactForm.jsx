import styles from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsOps.js";
import { selectContacts, selectLoading } from "../../redux/contactsSlice.js";

const PhonebookSchema = Yup.object().shape({
  name: Yup.string().min(3, "Too short for the name!").max(50, "Too long for the name!").required("Name is required!"),
  number: Yup.string()
    .min(3, "Too short for the number!")
    .max(50, "Too long for the number!")
    .required("Number is required!"),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {
    const name = values.name.trim();
    const number = values.number.trim();

    const normalizedName = name.toLowerCase();

    const isDuplicate = contacts.some((contact) => contact.name.toLowerCase() === normalizedName);

    if (isDuplicate) {
      alert(`${name} is already in contacts!`);
      return;
    }

    dispatch(addContact({ name, number }));
    actions.resetForm();
  };

  return (
    <>
      <h2 className={styles.title}>Contact Form</h2>
      <Formik initialValues={{ name: "", number: "" }} onSubmit={handleSubmit} validationSchema={PhonebookSchema}>
        <Form className={styles.form}>
          <div className={styles.flexColumn}>
            <div className={styles.flexField}>
              <label htmlFor={nameFieldId}>Name</label>
              <Field id={nameFieldId} type='text' name='name' required className={styles.input} />
              <ErrorMessage className={styles.span} name='name' component='span' />
            </div>
            <div className={styles.flexField}>
              <label htmlFor={numberFieldId}>Number</label>
              <Field id={numberFieldId} type='tel' name='number' required className={styles.input} />
              <ErrorMessage className={styles.span} name='number' component='span' />
            </div>
            <button type='submit' className={styles.submitBtn}>
              {loading ? "Saving" : "Add contact"}
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default ContactForm;
