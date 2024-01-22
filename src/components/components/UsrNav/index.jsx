import styles from "./UsrNav.module.scss";
import { NavLink } from "react-router-dom";

export default function UsrNav({ curUser }) {
  return (
    <div className={styles.usrnav}>
      <div className={styles.logo}>
        <NavLink to={`/${curUser}`}>
          <h1>algorithmStore</h1>
        </NavLink>
      </div>

      <div className={styles.navlinks}>
        <NavLink to="profile">Profile</NavLink>
        <NavLink to="my-algorithms">My algorithms</NavLink>
        <NavLink to="add-algorithm">AddAlgorithm</NavLink>
        <NavLink to="credits">Credits</NavLink>
        <NavLink to="sorting">Sorting</NavLink>
        <NavLink to="/">Logout</NavLink>
      </div>
    </div>
  );
}
