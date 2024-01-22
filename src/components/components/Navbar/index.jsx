import styles from "./Navbar.module.scss";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">
          <h1>algorithmStore</h1>
        </Link>
      </div>

      <div className={styles.navlinks}>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/sign-up">Sign up</NavLink>
      </div>
    </div>
  );
}
