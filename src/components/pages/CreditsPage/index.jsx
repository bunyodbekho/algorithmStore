import { Button, Input } from "@chakra-ui/react";
import styles from "./CreditsPage.module.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router";
import supabase from "../../../service/supabaseClient";

export default function CreditsPage() {
  const [curAmount, setCurAmount] = useState(0);

  const { curUser } = useOutletContext();
  console.log(curUser);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const updateCode = async (amount) => {
    try {
      const { data, error } = await supabase
        .from("user")
        .update({ creditAmount: amount })
        .eq("usrName", curUser)
        .select();
      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    updateCode(curAmount);
  };

  return (
    <div className={styles.creditspage}>
      <div className={styles.creditamount}>
        <Button colorScheme="green" size="lg" onClick={() => setCurAmount(100)}>
          100
        </Button>
        <Button colorScheme="green" size="lg" onClick={() => setCurAmount(500)}>
          500
        </Button>
        <Button
          colorScheme="green"
          size="lg"
          onClick={() => setCurAmount(1000)}
        >
          1000
        </Button>
        <Button
          colorScheme="green"
          size="lg"
          onClick={() => setCurAmount(1500)}
        >
          1500
        </Button>
        <Button
          colorScheme="green"
          size="lg"
          onClick={() => setCurAmount(2000)}
        >
          2000
        </Button>
        <Button
          colorScheme="green"
          size="lg"
          onClick={() => setCurAmount(10000)}
        >
          10000
        </Button>
      </div>

      {curAmount && (
        <div className={styles.creditcard}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h1>Credit card info</h1>
            <div className={styles.cardinputs}>
              <Input placeholder="Enter credit card number" required />

              <Input placeholder="Enter expire date" required />

              <Button colorScheme="green" type="submit">
                Get {curAmount} credits
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
