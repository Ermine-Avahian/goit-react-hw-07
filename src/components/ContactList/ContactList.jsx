import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { selectFilteredContacts } from "../../redux/contactsSlice";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <div>
      <ul className={css.list}>
        {filteredContacts.map((filteredContact) => (
          <li key={filteredContact.id} className={css.item}>
            <Contact
              id={filteredContact.id}
              name={filteredContact.name}
              number={filteredContact.number}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
