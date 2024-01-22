import styles from "./InfoPage.module.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function InfoPage() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className={styles.infopage}>
      <div
        className={styles.header}
        style={{ backgroundImage: "url(./assets/images/infobg.jpg)" }}
      >
        <div data-aos="fade-up" data-aos-duration="2000">
          <h1>
            Welcome to <span>algorithmStore</span>
          </h1>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.infobox}>
          <div data-aos="fade-right" data-aos-duration="1000">
            <h2>What is an algorithm?</h2>
            <p>
              An algorithm is a set of rules that take one or more inputs,
              perform internal calculations and data processing, and return an
              output or set of outputs. In short, algorithms make life easier.
              From complex data and hash operations to simple arithmetic
              operations, algorithms perform a series of steps to produce a
              specific result. One example of an algorithm would be a simple
              function that takes two input values, adds them together, and
              returns their sum.
            </p>
          </div>

          <div data-aos="fade-left" data-aos-duration="1000">
            <h2>About us</h2>
            <p>
              We're a group of programmers helping each other create new things,
              whether it's writing complex encryption programs or simple
              ciphers. Our goal is to work together to document and model
              beautiful, useful, and interesting algorithms through code. We are
              an open-source community where everyone can contribute. We check
              each other's work, communicate, and collaborate to solve problems.
              We try to be welcoming and respectful, but we also make sure that
              our code is up to date with the latest programming guidelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
