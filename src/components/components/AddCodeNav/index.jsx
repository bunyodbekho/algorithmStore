import styles from "./AddCodeNav.module.scss";
import { NavLink } from "react-router-dom";
import { Button } from "@chakra-ui/react";

export default function AddCodeNav() {
  return (
    <div className={styles.addcodenav}>
      <NavLink to="java">
        <Button colorScheme="green">Java</Button>
      </NavLink>
      <NavLink to="python">
        <Button colorScheme="green">Python</Button>
      </NavLink>
      <NavLink to="javascript">
        <Button colorScheme="green">JavaScript</Button>
      </NavLink>
      <NavLink to="cpp">
        <Button colorScheme="green">C++</Button>
      </NavLink>
      <NavLink to="typescript">
        <Button colorScheme="green">TypeScript</Button>
      </NavLink>
    </div>
  );
}
