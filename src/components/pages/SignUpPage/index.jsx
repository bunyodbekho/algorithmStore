import styles from "./SignUpPage.module.scss";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import supabase from "../../../service/supabaseClient";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useToast } from "@chakra-ui/react";

export default function SignUpPage() {
  // FORM DATA
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [fetchError, setFetchError] = useState(null);
  const toast = useToast();
  const errorDis = (error) =>
    toast({
      title: "Error.",
      description: error,
      status: "error",
      duration: 9000,
      isClosable: true,
    });

  // INSERT FUNCTION
  const insertUsr = async (username, password, email) => {
    try {
      const { data, error } = await supabase
        .from("user")
        .insert({
          usrName: username,
          usrPassword: password,
          usrEmail: email,
        })
        .select();
      if (data) {
        console.log(data);
      }
      if (error) {
        console.log(error);
        setFetchError(error);
      }
    } catch (error) {
      console.log(error);
      setFetchError(error);
    }
  };

  // SUBMIT FUNCTION
  const onSubmit = (data) => {
    insertUsr(data.usrName, data.usrPassword, data.usrEmail);
  };

  // Input state
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className={styles.signuppage}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className={styles.formelement}>
          <label>Username</label>
          <Input
            {...register("usrName")}
            focusBorderColor="#38a169"
            placeholder="Enter username"
          />
        </div>

        <div className={styles.formelement}>
          <label>Email</label>
          <Input
            {...register("usrEmail")}
            focusBorderColor="#38a169"
            placeholder="Enter email"
          />
        </div>

        <div className={styles.formelement}>
          <label>Password</label>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              {...register("usrPassword")}
              focusBorderColor="#38a169"
              color="#fff"
            />
            <InputRightElement width="4.5rem" color="#fff">
              <Button
                h="1.75rem"
                size="sm"
                onClick={handleClick}
                colorScheme="green"
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </div>

        <Button
          colorScheme="green"
          type="submit"
          onClick={() => {
            if (fetchError) {
              errorDis(fetchError.details);
            }
            console.log(fetchError);
          }}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}
