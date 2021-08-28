import React, { useState, useContext, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltRoundedIcon from "@material-ui/icons/ThumbUpAltRounded";
import * as PostAPI from "../../API/PostAPI";
import { AuthContext } from "../../Context/AuthContext";
import { green } from '@material-ui/core/colors';

const LikeButton = ({ data }) => {
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (data) {
      const { likes } = data;
      if(likes.includes(user.userID)){
        setLiked(true);
      }
    }
  }, [data,user.userID]);

  const handleLikePost = async () => {
    try {
      const dataPut = {
        userID: user.userID,
        postID: data._id,
        token: user.token,
      };
      const result = await PostAPI.LikePost(dataPut);

      if (result) {
        const { data } = result;
        if (data.message.toLowerCase() === "liked") {
          setLiked(true);
        } else if (data.message.toLowerCase() === "unliked") {
          setLiked(false);
        }
      }
    } catch (error) {
      //   setErrorText(`Error : ${error}`);
      //   setOpenAlert(true);
    }
  };

  return (
    <div>
      <CardActions disableSpacing>
        <IconButton aria-label="like" onClick={() => handleLikePost(data)}>
          {liked === false ? (
            <ThumbUpAltOutlinedIcon color="disabled" />
          ) : (
            <ThumbUpAltRoundedIcon style={{ color: green[400] }} />
          )}
        </IconButton>
      </CardActions>
    </div>
  );
};

export default LikeButton;
