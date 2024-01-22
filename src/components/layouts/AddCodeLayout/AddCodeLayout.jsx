import { Outlet, useParams } from "react-router";
import AddCodeNav from "../../components/AddCodeNav";

export default function AddCodeLayout() {
  const params = useParams();
  const curAlg = params.algorithm;
  return (
    <div>
      <AddCodeNav />
      <Outlet context={{ curAlg }} />
    </div>
  );
}
