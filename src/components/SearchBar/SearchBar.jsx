import { useDispatch } from "react-redux";
import css from "./SearchBar.module.css";
import { changeFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();

  return (
    <div className={css.searchBox}>
      <p className={css.label}>Find contacts by name</p>
      <input
        type="text"
        onChange={(e) => dispatch(changeFilter(e.target.value))}
      />
    </div>
  );
};
export default SearchBox;
