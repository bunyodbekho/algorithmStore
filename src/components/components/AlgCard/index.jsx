import { Link } from "react-router-dom";
import styles from "./AlgCard.module.scss";
import { Button } from "@chakra-ui/react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function AlgCard({ type, name, alg, duration }) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      className={styles.algcard}
      data-aos="fade-up"
      data-aos-duration={duration}
    >
      <h2>{type}</h2>
      <h1>{name}</h1>
      <Link to={alg}>
        <Button size="sm" colorScheme="green">
          See more...
        </Button>
      </Link>
    </div>
  );
}
