import styles from "./UsrNav.module.scss";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../../../service/supabaseClient";

export default function UsrNav({ curUser }) {
  const [fetchError, setFerchError] = useState(null);
  const [usrData, setUsrData] = useState([]);

  useEffect(function () {
    const fetchAlData = async (curUser) => {
      let { data: user, error } = await supabase
        .from("user")
        .select("usrType")
        .eq("usrName", `${curUser}`);

      if (error) {
        setFerchError("Could not fetch the algorithms data");
        setUsrData(null);
      }
      if (user) {
        setUsrData(user);
        setFerchError(null);
      }
    };
    fetchAlData(curUser);
  }, []);

  return (
    <div className={styles.usrnav}>
      <div className={styles.logo}>
        <NavLink to={`/${curUser}`}>
          <h1>algorithmStore</h1>
        </NavLink>
      </div>

      <div className={styles.navlinks}>
        <NavLink to="profile">Profile</NavLink>
        {usrData[0]?.usrType === "premium" && (
          <NavLink to="my-algorithms">My algorithms</NavLink>
        )}
        {usrData[0]?.usrType === "premium" && (
          <NavLink to="add-algorithm">AddAlgorithm</NavLink>
        )}
        <NavLink to="credits">Credits</NavLink>
        <NavLink to="sorting">Sorting</NavLink>
        <NavLink to="/">Logout</NavLink>
      </div>
    </div>
  );
}
