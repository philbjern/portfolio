import { Outlet, useParams } from "react-router-dom";
import DefaultProfile from "./DefaultProfile";
import Popeye from "./Popeye";
import Spinach from "./Spinach";

const Profile = () => {
  const { name } = useParams();

  return (
    <div>
      <h1>Hello from profile page!</h1>
      <p>So, how are you?</p>
      <hr />
      <h2>The profile visited is here:</h2>
      {name === 'popeye' ? (
        <Popeye />
      ) : name === 'spinach' ? (
        <Spinach />
      ) : (
        <DefaultProfile />
      )}
    </div>
  )
}

export default Profile;