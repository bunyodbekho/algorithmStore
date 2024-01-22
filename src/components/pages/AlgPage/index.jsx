import { useState, useEffect } from "react";
import styles from "./AlgPage.module.scss";
import { useParams } from "react-router";
import supabase from "../../../service/supabaseClient";
import { Spinner } from "@chakra-ui/react";

export default function AlgPage() {
  const params = useParams();
  const curAlg = params.algorithm;

  // ALGORITHM DATA
  const [algData, setAlgData] = useState([false]);
  const [fetchError, setFetchError] = useState("");

  useEffect(function () {
    const fetchAlgData = async () => {
      let { data: alg, error } = await supabase
        .from("algorithm")
        .select("*")
        .eq("algId", curAlg);

      if (error) {
        setFetchError("Could not fetch the algorithms data");
        setAlgData([]);
        console.log(error);
      }
      if (alg) {
        setAlgData(alg);
        setFetchError(null);
      }
    };
    fetchAlgData();
  }, []);
  console.log(algData[0]);

  // CODE DATA
  const [codeData, setCodeData] = useState([]);
  const [curLan, setCurLan] = useState("java");

  useEffect(
    function () {
      const fetchAlgData = async () => {
        let { data: alg, error } = await supabase
          .from("code")
          .select("*")
          .eq("algId", curAlg)
          .eq("cdLan", curLan);

        if (error) {
          setFetchError("Could not fetch the algorithms data");
          setCodeData([]);
          console.log(error);
        }
        if (alg) {
          setCodeData(alg);
          setFetchError(null);
        }
      };
      fetchAlgData();
    },
    [curLan]
  );

  return (
    <div className={styles.algpage}>
      {!algData[0] ? (
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
        <div>
          <div className={styles.algMetaData}>
            <h2>{algData[0]?.algType}</h2>
            <h1>{algData[0]?.algName}</h1>
          </div>

          <div className={styles.codeView}>
            <p>{codeData[0]?.code}</p>
          </div>

          <div className={styles.languages}>
            <button onClick={() => setCurLan("java")}>Java</button>
            <button onClick={() => setCurLan("python")}>Python</button>
            <button onClick={() => setCurLan("javascript")}>JavaScript</button>
            <button onClick={() => setCurLan("cpp")}>C++</button>
            <button onClick={() => setCurLan("typescript")}>TypeScript</button>
          </div>
        </div>
      )}
    </div>
  );
}
