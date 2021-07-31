import React, { useEffect, useState, useContext, createRef } from "react";
import { GetProfile } from "../../API/UserAPI";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Profile = () => {
  const userID_Param = useParams().userid;
  const [Profile, SetProfile] = useState({});
  const user = useContext(AuthContext);
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

  const Loading = () => {
    return (
      <button className="btn btn-outline-primary" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </button>
    );
  };

  return (
    <>
      {Profile === null ||
      Profile === {} ||
      Profile === "" ||
      Profile === undefined ? (
        <Loading />
      ) : (
        <div className="container p-1 m-1">
          <div className="row p-1 m-1">
            <label htmlFor="txtUsername" className="col-sm-2 col-form-label">
              Username
            </label>
            <div className="col-sm-10">
              {user.userID === Profile.userID ? (
                <input
                  type="text"
                  className="form-control"
                  id="txtUsername"
                  placeholder="required"
                  required
                  value={Profile.username}
                />
              ) : (
                <label>{Profile.username}</label>
              )}
            </div>
          </div>
          <div className="row p-1 m-1">
            <label htmlFor="txtPassword" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="txtPassword"
                placeholder="required"
                required
              />
            </div>
          </div>

          <div className="row p-1 m-1">
            <label htmlFor="txtAddress" className="col-sm-2 col-form-label">
              Gender
            </label>
            <div className="col-sm-10 col-form-check">
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
          </div>

          <div className="row p-1 m-1">
            <label htmlFor="txtEmail" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              {user.userID === Profile.userID ? (
                <input
                  type="email"
                  className="form-control"
                  id="txtEmail"
                  placeholder="not required"
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
              <input
                type="text"
                className="form-control"
                id="txtAddress"
                placeholder="not required"
              />
            </div>
          </div>
          <div className="row p-1 m-1">
            <label htmlFor="txtBio" className="col-sm-2 col-form-label">
              Your Bio
            </label>
            <div className="col-sm-10">
              {user.userID === Profile.userID ? (
                <input
                  type="textarea"
                  className="form-control"
                  id="txtBio"
                  placeholder="not required"
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
              {user.userID === userID_Param ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
