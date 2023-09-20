import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, signOutAsync } from "../authSlice";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(signOutAsync());
  }, [user, dispatch]);
  return !user && <Navigate to="/" replace={true} />;
};

export default Logout;
