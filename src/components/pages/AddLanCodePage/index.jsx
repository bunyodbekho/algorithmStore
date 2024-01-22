import styles from "./AddLanCodePage.module.scss";
import { Button, Input, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import supabase from "../../../service/supabaseClient";
import { useOutletContext } from "react-router";
import { useEffect, useState } from "react";

export default function AddLanCodePage({ lan }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { curAlg } = useOutletContext();

  const insertCode = async (lan, code, algId) => {
    try {
      const { data, error } = await supabase
        .from("code")
        .insert({
          cdLan: lan,
          code: code,
          algId: algId,
        })
        .select();
      if (data) {
        console.log(data);
        console.log("lan", lan);
        console.log(code);
        console.log(algId);
      }
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCode = async (code) => {
    try {
      const { data, error } = await supabase
        .from("code")
        .update({ code: code })
        .eq("cdLan", lan)
        .eq("algId", curAlg)
        .select();
      if (data) {
        console.log("data", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Textarea data
  const [textarea, setTextarea] = useState("");
  const [fetchError, setFerchError] = useState(null);

  useEffect(
    function () {
      const fetchAlData = async (curAlg) => {
        let { data: user, error } = await supabase
          .from("code")
          .select("*")
          .eq("algId", `${curAlg}`)
          .eq("cdLan", lan);

        if (error) {
          setFerchError("Could not fetch the algorithms data");
          setTextarea("");
        }
        if (user) {
          setTextarea(user[0]);
          setFerchError(null);
        }
      };
      fetchAlData(curAlg);
    },
    [lan]
  );

  const onSubmit = (data) => {
    console.log(data);
    insertCode(lan, data.code, curAlg);
    // if (textarea) {
    //   updateCode(data.code);
    // } else {
    // }
  };
  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    setTextarea(inputValue);
  };

  return (
    <div className={styles.addlancodepage}>
      <h1>{lan}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Textarea
          {...register("code")}
          value={textarea?.code}
          onChange={handleInputChange}
          size="lg"
          h="600px"
        />

        <Button colorScheme="green" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
