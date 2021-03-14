import axios from "axios";
import { useEffect, useState } from "react";
const ProfilePage = () => {
  const [profile, setProfile] = useState();
  useEffect(() => {
    axios
      .get(`/api/auth/profile?params=${localStorage.getItem("token")}`)
      .then((data) => setProfile(data.data));
  }, []);
  return (
    <div>
      <h1 className="page__title">Профиль</h1>
      {profile && (
        <div>
          <p>Почта: {profile.email}</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
