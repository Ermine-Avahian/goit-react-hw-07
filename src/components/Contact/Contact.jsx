import { useDispatch } from "react-redux";
import css from "./Contact.module.css";
import { deleteContact } from "../../redux/contactsOps";

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();

  return (
    <div className={css.container}>
      <div>
        <p className={css.name}>
          <i className="fas fa-user"></i>
          {name}
        </p>
        <p className={css.number}>
          <i className="fas fa-phone"></i>
          {number}
        </p>
      </div>
      <button
        className={css.btnDelete}
        onClick={() => dispatch(deleteContact(id))}
      >
        Delete
      </button>
    </div>
  );
};
export default Contact;
