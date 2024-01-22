import styles from "./ProfilePage.module.scss";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../../../service/supabaseClient";
import { Spinner } from "@chakra-ui/react";

export default function ProfilePage() {
  const { curUser } = useOutletContext();

  const [fetchError, setFerchError] = useState(null);
  const [usrData, setUsrData] = useState(null);

  useEffect(function () {
    const fetchAlData = async (curUser) => {
      let { data: user, error } = await supabase
        .from("user")
        .select("*")
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
  console.log(usrData);

  return (
    <div className={styles.profilepage}>
      {!usrData ? (
        <div className={styles.spinner}>
          <Spinner
            thickness="8px"
            speed="0.65s"
            emptyColor="gray.200"
            color="green.500"
            size="xl"
          />
        </div>
      ) : (
        <div className={styles.usrData}>
          {usrData.map((data) => {
            return (
              <div key={data} className={styles.data}>
                <h1>Name: {data.usrName}</h1>
                <h1>Password: {data.usrPassword}</h1>
                <h1>Type: {data.usrType}</h1>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
