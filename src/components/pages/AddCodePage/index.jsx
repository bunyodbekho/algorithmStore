import styles from "./AddCodePage.module.scss";
import { useOutletContext } from "react-router";

export default function AddCodePage() {
  return (
    <div className={styles.addcodepage}>
      <h1>Select the language you want to view</h1>
    </div>
  );
}
