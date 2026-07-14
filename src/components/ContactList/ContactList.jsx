import styles from "./ContactList.module.css";
import clsx from "clsx";
import { useSelector } from "react-redux";
import Contact from "../Contact/Contact.jsx";
import { selectFilteredContacts, selectLoading, selectError } from "../../redux/contactsSlice.js";

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  if (loading && contacts.length < 1) {
    return <p className={styles.card}>Please wait, loading your contacts...</p>;
  }

  if (error) {
    return <p className={clsx(styles.card, styles.error)}>Opps! Somethings went wrong: {error}</p>;
  }

  if (contacts.length < 1) {
    return <p className={styles.card}>No matches found.</p>;
  }

  return (
    <>
      <h2 className={styles.title}>Contact List</h2>
      <div>
        <ul className={styles.list}>
          {contacts.map((contact) => (
            <li key={contact.id} className={styles.card}>
              <Contact contact={contact} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ContactList;
