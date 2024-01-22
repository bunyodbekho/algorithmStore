import { Button } from "@chakra-ui/react";
import styles from "./SrtPage.module.scss";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function SrtPage() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className={styles.srtpage}>
      <NavLink to="sorting" data-aos="fade-up" data-aos-duration="500">
        <Button colorScheme="green" size="lg">
          Sorting
        </Button>
      </NavLink>

      <NavLink to="quest" data-aos="fade-up" data-aos-duration="800">
        <Button colorScheme="green" size="lg">
          Quest
        </Button>
      </NavLink>

      <NavLink
        to="dynamic-programming"
        data-aos="fade-up"
        data-aos-duration="1100"
      >
        <Button colorScheme="green" size="lg">
          Dynamic Programming
        </Button>
      </NavLink>

      <NavLink to="ciphers" data-aos="fade-up" data-aos-duration="1500">
        <Button colorScheme="green" size="lg">
          Ciphers
        </Button>
      </NavLink>

      <NavLink to="data-structures" data-aos="fade-up" data-aos-duration="1800">
        <Button colorScheme="green" size="lg">
          Data Structures
        </Button>
      </NavLink>

      <NavLink to="mathematics" data-aos="fade-up" data-aos-duration="2100">
        <Button colorScheme="green" size="lg">
          Mathematics
        </Button>
      </NavLink>

      <NavLink
        to="digital-image-processing"
        data-aos="fade-up"
        data-aos-duration="2400"
      >
        <Button colorScheme="green" size="lg">
          Digital Image Processing
        </Button>
      </NavLink>

      <NavLink to="line" data-aos="fade-up" data-aos-duration="2700">
        <Button colorScheme="green" size="lg">
          Line
        </Button>
      </NavLink>
    </div>
  );
}
