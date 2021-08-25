import React, { useEffect, useState, useContext, createRef } from "react";
import { format, parseISO } from "date-fns";
import {
  GetProfile,
  EditProfile,
  FollowUser,
  UploadAvatar,
} from "../../API/UserAPI";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { default as Loading } from "../Skeletons/Feeds/Feeds";
import { Avatar } from "@material-ui/core";
import CountryDropdown from "../CountryDropdown/CountryDropdown";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";

const Profile = () => {
  const userID_Param = useParams().userid;
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [txtUsername, setTxtUsername] = useState("");

  const [txtEmail, setTxtEmail] = useState("");

  const BioRef = createRef();
  const [txtBio, setTxtBio] = useState("");

  const [gender, setGender] = useState("");

  const [lblFollower, setlblFollower] = useState("");
  const [lblFollowing, setlblFollowing] = useState("");

  const [lblCreatedDate, setLblCreatedDate] = useState("");

  const [lblCountry, setLblCountry] = useState("");

  const [btnFollowText, setBtnFollowText] = useState("Follow");
  const [selfProfile, setSelfProfile] = useState(false);

  const [avatarFile, setAvatarFile] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbar_Message, setSnackbar_Message] = useState("");

  function SetProfile(data) {
    setTxtUsername(data.username);
    setTxtEmail(data.email);
    setLblCountry(data.country);
    setLblCreatedDate(data.createdDate);
    setTxtBio(data.bio);
    setlblFollower(data.followers.length);
    setlblFollowing(data.followings.length);
    setGender(data.gender);
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      //By Parameter
      if (userID_Param) {
        const { data } = await GetProfile(userID_Param);
        SetProfile(data);
      }
    };
    fetchUserProfile();
  }, [userID_Param]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      //By User logon
      if (user != null) {
        if (user.userID === userID_Param) {
          setSelfProfile(true);
        } else {
          setSelfProfile(false);
          const { data } = await GetProfile(user.userID);
          if (data.followings.includes(userID_Param)) {
            setBtnFollowText("Followed");
          } else {
            setBtnFollowText("Follow");
          }
        }
      } else {
        setSelfProfile(false);
      }
    };
    fetchUserProfile();
  }, [user, userID_Param]);

  const SaveProfile = async () => {
    try {
      setLoading(true);
      const data = {
        token: user.token,
        userID: user.userID,
        bio: BioRef.current.value,
        country: lblCountry,
        gender: gender,
      };
      const result = await EditProfile(data);
      if (result) {
        setOpenSnackbar(true);
        setSnackbar_Message("Saved");
      } else {
        setOpenSnackbar(true);
        setSnackbar_Message("Cannot save");
      }
    } catch (error) {
      setOpenSnackbar(true);
      setSnackbar_Message(`${Error}`);
    } finally {
      setLoading(false);
    }
  };

  const FollowHandle = async () => {
    try {
      setLoading(true);
      const data = {
        token: user.token,
        userID: user.userID,
        followuserID: userID_Param,
      };
      const result = await FollowUser(data);
      if (result.data.message.toLowerCase() === "followed") {
        setBtnFollowText("Followed");
        setlblFollower(lblFollower + 1);
      } else if (result.data.message.toLowerCase() === "unfollowed") {
        setBtnFollowText("Follow");
        
        setlblFollower(lblFollower - 1);
      }
    } catch (error) {
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const importFile = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (_) => {
      let files = Array.from(input.files);
      setAvatarFile(files);
      UploadHandle();
    };
    input.click();
  };

  const UploadHandle = async () => {
    try {
      const formData = new FormData();

      const data = { files: formData, userID: user.userID, token: user.token };

      formData.append("file", avatarFile);
      const result = await UploadAvatar(data);

      if (result) {
      }
    } catch (error) {
      console.log(`Error: Profile.UploadHandle ${error}`);
    }
  };

  const LoadingButton = () => {
    return (
      <button className="btn btn-outline-secondary" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Saving
      </button>
    );
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const Snackbar_handleClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      {Profile ? (
        <div className="container card p-1 m-1">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-end">
                {selfProfile === true || user === null ? (
                  ""
                ) : (
                  <>
                    {loading === true ? (
                      <LoadingButton />
                    ) : (
                      <button
                        className={btnFollowText === "Followed" ? "btn btn-sm btn-primary" : "btn btn-sm btn-outline-primary"}
                        onClick={() => FollowHandle()}
                      >
                        {btnFollowText}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="row p-1 m-1">
            <div className="col-12">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <button onClick={() => importFile()}>
                  <Avatar alt="avatar" src="" />
                </button>
                <div className="form-group">
                  <label className="form-label mx-1">Joined</label>
                  <label className="form-label mx-1">
                    {lblCreatedDate === ""
                      ? ""
                      : format(parseISO(lblCreatedDate), "dd MMMM yyyy")}
                  </label>
                </div>
                <div className="form-group d-flex">
                  <label className="form-label mx-1">Follower</label>
                  <label className="form-label mx-1">{lblFollower}</label>
                  <label className="form-label mx-1">Following</label>
                  <label className="form-label mx-1">{lblFollowing}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="row p-1 m-1">
            <div className="col-sm-2">
              <label htmlFor="txtUsername" className="col-form-label">
                Username
              </label>
            </div>
            <div className="col-sm-10">
              {selfProfile === true ? (
                <input
                  type="text"
                  className="form-control"
                  id="txtUsername"
                  required
                  value={txtUsername}
                  onChange={(e) => setTxtUsername(e.target.value)}
                />
              ) : (
                <label>{txtUsername}</label>
              )}
            </div>
          </div>

          {selfProfile === true ? (
            <div className="row p-1 m-1">
              <div className="col-sm-2">
                <label htmlFor="txtPassword" className="form-label">
                  Password
                </label>
              </div>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="txtPassword"
                  required
                />
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="row p-1 m-1">
            <div className="col-sm-2">
              <label htmlFor="txtAddress" className="form-label">
                Gender
              </label>
            </div>
            <div className="col-sm-10 col-form-check">
              {selfProfile === true ? (
                <div>
                  <input
                    id="radMale"
                    className="form-check-input mx-1"
                    type="radio"
                    value="male"
                    name="gender"
                    required
                    onChange={() => setGender("male")}
                    checked={gender === "male" ? true : false}
                  />
                  <label className="form-check-label mx-1" htmlFor="radMale">
                    Male
                  </label>
                  <input
                    id="radFemale"
                    className="form-check-input mx-1"
                    type="radio"
                    value="female"
                    name="gender"
                    required
                    onChange={() => setGender("female")}
                    checked={gender === "female" ? true : false}
                  />
                  <label className="form-check-label mx-1" htmlFor="radFemale">
                    Female
                  </label>
                </div>
              ) : (
                gender
              )}
            </div>
          </div>

          <div className="row p-1 m-1">
            <label htmlFor="txtEmail" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              {selfProfile === true ? (
                <input
                  type="email"
                  className="form-control"
                  id="txtEmail"
                  value={txtEmail}
                  onChange={(e) => setTxtEmail(e.target.value)}
                />
              ) : (
                <label>{txtEmail}</label>
              )}
            </div>
          </div>
          <div className="row p-1 m-1">
            <label htmlFor="txtAddress" className="col-sm-2 col-form-label">
              Location
            </label>
            <div className="col-sm-10">
              <CountryDropdown
                country={lblCountry}
                setCountry={setLblCountry}
                selfProfile={selfProfile}
              />
            </div>
          </div>
          <div className="row p-1 m-1">
            <label htmlFor="txtBio" className="col-sm-2 col-form-label">
              Your Bio
            </label>
            <div className="col-sm-10">
              {selfProfile === true ? (
                <input
                  type="textarea"
                  className="form-control"
                  id="txtBio"
                  value={txtBio}
                  onChange={(e) => setTxtBio(e.target.value)}
                  ref={BioRef}
                />
              ) : (
                <label>{txtBio}</label>
              )}
            </div>
          </div>
          <div className="row p-1 m-1">
            <div className="col-xs-12">
              <div className="d-flex justify-content-center">
                {selfProfile === true ? (
                  <>
                    {loading === true ? (
                      <LoadingButton />
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-outline-primary"
                        onClick={() => SaveProfile()}
                      >
                        Save
                      </button>
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={Snackbar_handleClose}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={Snackbar_handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert onClose={Snackbar_handleClose} severity="success">
          {snackbar_Message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;
