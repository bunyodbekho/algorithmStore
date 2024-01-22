import styles from "./ProfilePage.module.scss";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Flex, Input, Spinner } from "@chakra-ui/react";
import supabase from "../../../service/supabaseClient";
import { useForm } from "react-hook-form";

export default function ProfilePage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { curUser } = useOutletContext();

  const [fetchError, setFerchError] = useState(null);
  const [usrData, setUsrData] = useState(null);

  useEffect(function () {
    const fetchAlData = async (curUser) => {
      let { data: user, error } = await supabase
        .from("user")
        .select("*")
        .eq("usrName", `${curUser}`);

      if (error) {
        setFerchError("Could not fetch the algorithms data");
        setUsrData(null);
      }
      if (user) {
        setUsrData(user);
        setFerchError(null);
      }
    };
    fetchAlData(curUser);
  }, []);

  const updateUser = async () => {
    try {
      const { data, error } = await supabase
        .from("user")
        .update({ usrType: "premium" })
        .eq("usrName", curUser)
        .select();
      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateRegular = async () => {
    try {
      const { data, error } = await supabase
        .from("user")
        .update({ usrType: "regular" })
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
    updateUser();
  };

  return (
    <div className={styles.profilepage}>
      {!usrData ? (
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
          <div className={styles.usrData}>
            {usrData.map((data) => {
              return (
                <div key={data} className={styles.data}>
                  <h1>Name: {data.usrName}</h1>
                  <h1>Password: {data.usrPassword}</h1>
                  <h1>Type: {data.usrType}</h1>
                  <h1>Credits: {data.creditAmount}</h1>
                </div>
              );
            })}
          </div>

          {usrData[0]?.usrType === "regular" && (
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <Input
                placeholder="Enter card number"
                {...register("cardnum")}
                required
              />

              <Input
                placeholder="Enter expiry date"
                {...register("expdate")}
                required
              />

              <Button type="submit" colorScheme="green">
                Get Premium
              </Button>
            </form>
          )}

          {usrData[0]?.usrType === "premium" && (
            <Flex justifyContent="center" alignItems="center" mt="50px">
              <Button
                colorScheme="green"
                onClick={() => {
                  updateRegular();
                }}
                size="lg"
              >
                Back to Regular
              </Button>
            </Flex>
          )}
        </div>
      )}
    </div>
  );
}
