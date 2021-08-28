import React from "react";
import { useParams } from "react-router-dom";
import Profile from "../../Component/Profile/Profile";
import FadeIn from "react-fade-in";

const ProfilePage = () => {
  const userID_Param = useParams().userid;

  return (
    <div>
      <FadeIn>
        <Profile userID_Param={userID_Param} />
      </FadeIn>
    </div>
  );
};

export default ProfilePage;
