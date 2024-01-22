import { Outlet, useOutletContext, useParams } from "react-router";

export default function MyAlgLayout() {
  const { curUser } = useOutletContext();
  
  return (
    <div>
      <Outlet context={{ curUser }} />
    </div>
  );
}
