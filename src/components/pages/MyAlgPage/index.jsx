import styles from "./MyAlgPage.module.scss";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import supabase from "../../../service/supabaseClient";
import { Link } from "react-router-dom";
import { linkmaker } from "../../../utils/helpers/linkmaker";
import { Button } from "@chakra-ui/react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Spinner } from "@chakra-ui/react";

export default function MyAlgPage() {
  useEffect(() => {
    AOS.init();
  }, []);

  // CURRENT USER DATA
  const { curUser } = useOutletContext();
  const [userId, setUserId] = useState("");

  useEffect(
    function () {
      const fetchUser = async () => {
        try {
          const { data, error } = await supabase
            .from("user")
            .select("usrId")
            .eq("usrName", `${curUser}`);
          if (data) {
            setUserId(data[0].usrId);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    },
    [curUser]
  );

  // MY ALGORITHMS DATA
  const [algData, setAlgData] = useState(null);

  useEffect(
    function () {
      const fetchAlg = async () => {
        try {
          const { data, error } = await supabase
            .from("algorithm")
            .select("*")
            .eq("usrId", `${userId}`);
          if (data) {
            setAlgData(data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchAlg();
    },
    [userId]
  );
  console.log(algData);

  return (
    <div className={styles.myalgpage}>
      <h1 className={styles.topheader}>My Algorithms</h1>

      {!algData ? (
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
        <div className={styles.myalgs}>
          {algData.map((data) => {
            return (
              <div
                key={data.algId}
                className={styles.algorithm}
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <h2>{data.algType}</h2>
                <h1>{data.algName}</h1>
                <Link to={data.algId}>
                  <Button colorScheme="green" size="sm">
                    Add code...
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
