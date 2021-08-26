import React, { useContext, useState, useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { AuthContext } from "../../Context/AuthContext";
import { GetProfile, FollowUser } from "../../API/UserAPI";

function FollowButton({ data }) {
  const { user } = useContext(AuthContext);
  const [followText, setBtnFollowText] = useState("");

  useEffect(() => {
    async function CheckFollowing() {
      if (data) {
        const followers = await GetProfile(data.userID);
        if (followers.data.followers.includes(user.userID)) {
          setBtnFollowText("Followed");
        } else {
          setBtnFollowText("Follow");
        }
      }
    }
    CheckFollowing();
  }, [data, user.userID]);

  const handleFollow = async () => {
    try {
      const dataPost = {
        token: user.token,
        userID: user.userID,
        followuserID: data.userID,
      };
      const result = await FollowUser(dataPost);
      if (result.data.message.toLowerCase() === "followed") {
        setBtnFollowText("Followed");
      } else if (result.data.message.toLowerCase() === "unfollowed") {
        setBtnFollowText("Follow");
      }
      if (result) {
      }
    } catch (error) {
      //   setErrorText(`Error : ${error}`);
      //   setOpenAlert(true);
    }
  };
  return (
    <div>
      <MenuItem onClick={() => handleFollow(data)}>{followText}</MenuItem>
    </div>
  );
}

export default FollowButton;
