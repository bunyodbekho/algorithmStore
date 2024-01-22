import styles from "./AddAlgPage.module.scss";
import {
  Button,
  Checkbox,
  Input,
  Text,
  Textarea,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import supabase from "../../../service/supabaseClient";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";

export default function AddAlgPage() {
  // CURRENT USER DATA
  const { curUser } = useOutletContext();
  const [userId, setUserId] = useState("");

  useEffect(
    function () {
      const fetchUser = async () => {
        try {
          const { data, error } = await supabase
            .from("user")
            .select("usrId")
            .eq("usrName", `${curUser}`);
          if (data) {
            setUserId(data[0].usrId);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    },
    [curUser]
  );

  // FORM DATA
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // INSERT FUNCTIONS
  const insertAlg = async (
    algName,
    algType,
    algDescription,
    algPrice,
    usrId
  ) => {
    try {
      const { data, error } = await supabase
        .from("algorithm")
        .insert({
          algName: algName,
          algType: algType,
          algDescription: algDescription,
          algPrice: algPrice,
          usrId: usrId,
        })
        .select();
      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // SUBMIT FUNCTIONS
  const onSubmit = (data) => {
    insertAlg(
      data.algName,
      data.algType,
      data.algDescription,
      Number(data.algPrice),
      userId
    );
  };

  return (
    <div className={styles.addalgpage}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formelement}>
          <label>Name</label>
          <Input {...register("algName")} placeholder="Enter algorithm name" />
        </div>

        <div className={styles.formelement}>
          <label>Type</label>
          <RadioGroup colorScheme="green">
            <Stack direction="row">
              <Radio {...register("algType")} value="sorting">
                Sorting
              </Radio>
              <Radio {...register("algType")} value="quest">
                Quest
              </Radio>
              <Radio {...register("algType")} value="dynamic programming">
                Dynamic Programming
              </Radio>
              <Radio {...register("algType")} value="ciphers">
                Ciphers
              </Radio>
              <Radio {...register("algType")} value="data structures">
                Data Structures
              </Radio>
              <Radio {...register("algType")} value="mathematics">
                Mathematics
              </Radio>
              <Radio {...register("algType")} value="digital image processing">
                Digital Image Processing
              </Radio>
              <Radio value="line">Line</Radio>
            </Stack>
          </RadioGroup>
        </div>

        <div className={styles.formelement}>
          <label>Description</label>
          <Textarea
            {...register("algDescription")}
            placeholder="Enter description"
          />
        </div>

        <div className={styles.formelement}>
          <label>Price</label>
          <Input {...register("algPrice")} placeholder="Enter price" />
        </div>

        <Button colorScheme="green" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
