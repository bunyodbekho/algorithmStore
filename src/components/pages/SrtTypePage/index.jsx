import { useParams } from "react-router";
import { typemaker } from "../../../utils/helpers/typemaker";
import { useEffect, useState } from "react";
import supabase from "../../../service/supabaseClient";
import styles from "./SrtTypePage.module.scss";
import AlgCard from "../../components/AlgCard";
import { Spinner } from "@chakra-ui/react";

export default function SrtTypePage() {
  const params = useParams();
  const curType = params.type;
  const curTypeReq = typemaker(curType);

  const [fetchError, setFerchError] = useState(null);
  const [sortData, setSortData] = useState(null);

  useEffect(function () {
    const fetchAlData = async (curTypeReq) => {
      let { data: user, error } = await supabase
        .from("algorithm")
        .select("*")
        .eq("algType", `${curTypeReq}`);

      if (error) {
        setFerchError("Could not fetch the algorithms data");
        setSortData(null);
      }
      if (user) {
        setSortData(user);
        setFerchError(null);
      }
    };
    fetchAlData(curTypeReq);
  }, []);

  console.log(sortData);

  return (
    <div className={styles.srtpage}>
      {!sortData ? (
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
          <h1>{curTypeReq}</h1>

          <div className={styles.sortedbox}>
            {sortData.map((data) => {
              return (
                <AlgCard
                  type={data.algType}
                  name={data.algName}
                  alg={data.algId}
                  key={data.algId}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
