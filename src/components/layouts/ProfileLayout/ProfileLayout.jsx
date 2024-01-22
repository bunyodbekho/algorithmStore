import { Outlet, useParams } from "react-router";
import UsrNav from "../../components/UsrNav";
import { useState, useEffect } from "react";
// import supabase from "../../../service/supabaseClient";

export default function ProfileLayout() {
  const params = useParams();
  const curUser = params.username;
  console.log(curUser);

  return (
    <div>
      <UsrNav curUser={curUser} />
      <Outlet context={{ curUser }} />
    </div>
  );
}
