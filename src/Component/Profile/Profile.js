import React, { useEffect, useState, useContext, createRef } from "react";
import { format, parseISO } from "date-fns";
import { GetProfile, EditProfile, FollowUser } from "../../API/UserAPI";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { default as Loading } from "../Skeletons/Feeds/Feeds";
import { Avatar } from "@material-ui/core";
import CountryDropdown from "../CountryDropdown/CountryDropdown";

const Profile = () => {
  const userID_Param = useParams().userid;
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [txtUsername, setTxtUsername] = useState("");

  const [txtEmail, setTxtEmail] = useState("");

  const BioRef = createRef();
  const [txtBio, setTxtBio] = useState("");

  const [lblFollower, setlblFollower] = useState("");
  const [lblFollowing, setlblFollowing] = useState("");

  const [lblCreatedDate, setLblCreatedDate] = useState("");

  const [lblCountry,setLblCountry] = useState("");

  const [btnFollowText, setBtnFollowText] = useState("Follow");
  const [selfProfile, setSelfProfile] = useState(false);

  function SetProfile(data) {
    setTxtUsername(data.username);
    setTxtEmail(data.email);
    setLblCountry(data.country);
    setLblCreatedDate(data.createdDate);
    setTxtBio(data.bio);
    setlblFollower(data.followers.length);
    setlblFollowing(data.followings.length);
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
      };
      const result = await EditProfile(data);
      if (result) {
      } else {
      }
    } catch (error) {
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
      } else if (result.data.message.toLowerCase() === "unfollowed") {
        setBtnFollowText("Follow");
      }
    } catch (error) {
    } finally {
      setLoading(false);
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

  return (
    <div className="d-flex justify-content-center mt-5">
      {Profile ? (
        <div className="container card p-1 m-1">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-end">
                {selfProfile === true ? (
                  ""
                ) : (
                  <>
                    {loading === true ? (
                      <LoadingButton />
                    ) : (
                      <button
                        className="btn btn-sm btn-outline-primary"
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
                <button className="btn btn-link">
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
                  />
                  <label className="form-check-label mx-1" htmlFor="radFemale">
                    Female
                  </label>
                </div>
              ) : (
                ""
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
                <CountryDropdown country={lblCountry} setCountry={setLblCountry} selfProfile={selfProfile} />
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
    </div>
  );
};

export default Profile;
