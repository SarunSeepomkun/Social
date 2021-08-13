import React, { useEffect, useState, useContext, createRef } from "react";
import { GetProfile, EditProfile } from "../../API/UserAPI";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { default as Loading } from "../Skeletons/Feeds/Feeds";
import { Avatar } from "@material-ui/core";

const Profile = () => {
  const userID_Param = useParams().userid;
  const [Profile, SetProfile] = useState({});
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const BioRef = createRef();

  useEffect(() => {
    const fectUserProfile = async () => {
      if (userID_Param) {
        const { data } = await GetProfile(userID_Param);
        SetProfile(data);
      }
    };

    fectUserProfile();
  }, [userID_Param]);

  const SaveProfile = async () => {
    try {
      setLoading(true);
      const data = { token: user.token , userID:'', bio:'', country:'' };
      const result = await EditProfile(data);
      if (result) {
      } else {
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
          <div className="row p-1 m-1">
            <div className="col-12">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <button className="btn btn-link">
                  <Avatar alt="avatar" src="" />
                </button>
                <label>Follower 0 Following 0</label>
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
              {user.userID === Profile.userID && user ? (
                <input
                  type="text"
                  className="form-control"
                  id="txtUsername"
                  required
                  value={Profile.username}
                />
              ) : (
                <label>{Profile.username}</label>
              )}
            </div>
          </div>

          {user.userID === userID_Param ? (
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
              {user.userID === userID_Param ? (
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
              {user.userID === userID_Param ? (
                <input
                  type="email"
                  className="form-control"
                  id="txtEmail"
                  value={Profile.email}
                />
              ) : (
                <label>{Profile.email}</label>
              )}
            </div>
          </div>
          <div className="row p-1 m-1">
            <label htmlFor="txtAddress" className="col-sm-2 col-form-label">
              Address
            </label>
            <div className="col-sm-10">
              {user.userID === userID_Param ? (
                <input type="text" className="form-control" id="txtAddress" />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="row p-1 m-1">
            <label htmlFor="txtBio" className="col-sm-2 col-form-label">
              Your Bio
            </label>
            <div className="col-sm-10">
              {user.userID === userID_Param && user.userID !== null ? (
                <input
                  type="textarea"
                  className="form-control"
                  id="txtBio"
                  value={Profile.bio}
                  ref={BioRef}
                />
              ) : (
                <label>{Profile.bio}</label>
              )}
            </div>
          </div>
          <div className="row p-1 m-1">
            <div className="col-xs-12">
              <div className="d-flex justify-content-center">
                {user.userID === userID_Param ? (
                  <button
                    type="submit"
                    className="btn btn-outline-primary"
                    onClick={() => SaveProfile()}
                  >
                    Save
                  </button>
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
