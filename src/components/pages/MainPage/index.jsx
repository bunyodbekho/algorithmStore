import styles from "./MainPage.module.scss";
import supabase from "../../../service/supabaseClient";
import { useEffect, useState } from "react";
import AlgCard from "../../components/AlgCard";
import { Spinner } from "@chakra-ui/react";

export default function MainPage() {
  const [fetchError, setFerchError] = useState(null);
  const [algData, setAlgData] = useState(null);
  console.log(Boolean(algData));

  const duration = [
    { time: 100 },
    { time: 300 },
    { time: 500 },
    { time: 700 },
    { time: 1000 },
    { time: 1200 },
  ];
  useEffect(function () {
    const fetchAlgData = async () => {
      let { data: alg, error } = await supabase
        .from("algorithm")
        .select("*")
        .range(0, 5);

      if (error) {
        setFerchError("Could not fetch the algorithms data");
        setAlgData(null);
        console.log(error);
      }
      if (alg) {
        setAlgData(alg);
        setFerchError(null);
      }
    };
    fetchAlgData();
  }, []);

  console.log(algData);

  return (
    <div className={styles.mainpage}>
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
        <div className={styles.page}>
          <h1>Best Algorithms</h1>
          <div className={styles.algbox}>
            {algData.map((data) => {
              return (
                <AlgCard
                  type={data.algType}
                  name={data.algName}
                  key={data.algName}
                  alg={data.algId}
                  duration={1000}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
