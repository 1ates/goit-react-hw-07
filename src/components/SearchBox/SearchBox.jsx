import styles from './SearchBox.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice.js';

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  return (
    <>
      <h2 className={styles.title}>SearchBox</h2>
      <div className={styles.search}>
        <label className={styles.label} htmlFor="searchBox">
          Find contacts by name
        </label>
        <input
          className={styles.input}
          type="text"
          name="search"
          id="searchBox"
          placeholder="Enter name"
          value={filter}
          onChange={event => dispatch(changeFilter(event.target.value))}
        />
      </div>
    </>
  );
};

export default SearchBox;
