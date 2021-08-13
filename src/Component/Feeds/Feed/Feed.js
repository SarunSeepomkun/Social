import React, { useContext, useState, useEffect, createRef } from "react";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import * as PostAPI from "../../../API/PostAPI";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: blue[500],
  },
}));

const Feed = ({ data, key }) => {
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const [functionAble, SetFunctionAble] = useState(false);
  const [editAble, SetEditAble] = useState(false);
  const [likeAble, SetLikeAble] = useState(false);
  const [followAble, SetFollowAble] = useState(false);

  const txtEditPostRef = createRef();
  const [txtPost, setTxtPost] = useState(data.message);
  const [textlength, setTextlength] = useState(0);
  const [edit, setEdit] = useState(false);

  const [openAlert,setOpenAlert] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [deletedPost, setDeletedPost] = useState(false);

  useEffect(() => {
    function checkFunctionAble() {
      if (user === null) {
        SetFunctionAble(false);
        SetLikeAble(false);
        SetEditAble(false);
        SetFollowAble(false);
      } else if (data.userID !== user.userID) {
        SetFunctionAble(true);
        SetLikeAble(true);
        SetFollowAble(true);
        SetEditAble(false);
      } else if (data.userID === user.userID) {
        SetFunctionAble(true);
        SetLikeAble(true);
        SetEditAble(true);
        SetFollowAble(false);
      }
    }
    checkFunctionAble();
  }, [data.userID, user]);

  useEffect(() => {
    setTextlength(data.message.length);
  }, [data.message.length]);

  const CountTextLength = () => {
    setTextlength(txtEditPostRef.current.value.length);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setEdit(true);
    setAnchorEl(null);
  };

  const handleConfirmEdit = async (data) => {
    try {
      data = {
        userID: user.userID,
        postID: data._id,
        message: txtEditPostRef.current.value,
        token: user.token,
      };
      const result = await PostAPI.EditPost(data);
      if (result.message === "Updated") {
        setEdit(false);
        setTxtPost(data.message);
        setErrorText("");
      } else {
        setErrorText(result.message);
        setOpenAlert(true);
      }
      setAnchorEl(null);
    } catch (error) {
      setErrorText(`Error : ${error.message}`);
      setOpenAlert(true);
    }
  };

  const handleCancelEdit = () => {
    setEdit(false);
  };

  const handleFollow = (data) => {};

  const handleDelete = async (data) => {
    try {
      data = {
        userID: user.userID,
        postID: data._id,
        token: user.token,
      };
      const result = await PostAPI.DeletePost(data);
      if (result.message === "OK") {
        setDeletedPost(true);
        setErrorText("");
      } else {
        setErrorText(result.response.data.message);
        setOpenAlert(true);
      }
      setAnchorEl(null);
    } catch (error) {
      setErrorText(`Error : ${error}`);
      setOpenAlert(true);
    }
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function handleAlertClose(){
    setOpenAlert(false);
  }

  return (
    <div className="container-fluid" key={key}>
      {deletedPost === false ? (
        <>
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar aria-label="avartar" className={classes.avatar}>
                  <Link to={`/profile/${data.user_info[0]._id}`}>
                    {data.user_info[0].username.charAt(0).toUpperCase()}
                  </Link>
                </Avatar>
              }
              action={
                functionAble ? (
                  <IconButton
                    aria-controls="action-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    aria-label="settings"
                  >
                    <MoreVertIcon onClick={handleClick} />
                  </IconButton>
                ) : (
                  ""
                )
              }
              title={
                <Link to={`/profile/${data.user_info[0]._id}`}>
                  {data.user_info[0].username}
                </Link>
              }
              subheader={format(
                parseISO(data.createdDate),
                "dd/MM/yyyy HH:mm:ss"
              )}
            />
            <CardContent>
              <Menu
                id="action-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bittom",
                  horizontal: "center",
                }}
              >
                {followAble ? (
                  <MenuItem onClick={() => handleFollow(data)}>Follow</MenuItem>
                ) : (
                  ""
                )}
                {editAble ? (
                  <MenuItem onClick={() => handleEdit()}>Edit</MenuItem>
                ) : (
                  ""
                )}
                {editAble ? (
                  <MenuItem onClick={() => handleDelete(data)}>Delete</MenuItem>
                ) : (
                  ""
                )}
              </Menu>
              {edit === false ? (
                <Typography variant="body2" color="textSecondary" component="p">
                  {txtPost}
                </Typography>
              ) : (
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <textarea
                        style={{ height: "220px" }}
                        className="form-control"
                        placeholder="Post something"
                        maxLength="500"
                        onChange={CountTextLength}
                        ref={txtEditPostRef}
                      >
                        {txtPost}
                      </textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <label className="form-label">{textlength}/500</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <button
                        className="btn btn-sm btn-outline-primary m-1"
                        onClick={() => handleConfirmEdit(data)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger m-1"
                        onClick={() => handleCancelEdit()}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            {likeAble === true ? (
              <CardActions disableSpacing>
                <IconButton aria-label="like">
                  <FavoriteIcon />
                </IconButton>
              </CardActions>
            ) : (
              ""
            )}
            <div>
              <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleAlertClose}
                anchorOrigin={{ vertical:"top", horizontal:"center" }}
              >
                <Alert onClose={handleAlertClose} severity="error">
                  {errorText}
                </Alert>
              </Snackbar>
            </div>
          </Card>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Feed;
