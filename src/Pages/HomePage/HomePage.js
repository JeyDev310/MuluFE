import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from "../../_actions";
import Person from "./Person";
function HomePage() {
  const user = useSelector(state => state.users.user);
  const dispatch = useDispatch();
  useEffect(() => {
    let userinfo = JSON.parse(localStorage.getItem('user')).user;
    dispatch(userActions.getUserById(userinfo._id));
  }, []);
  function handleClick() {
    console.log(user);
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}>
        { user && <div>
          <h3>First Name: {user.firstName}</h3>
          <h3>Last Name: {user.lastName}</h3>
          <h3>Gender: {user.gender}</h3>
          <h3>Zipcode: {user.zipCode}</h3>
          {user.profession && <h3>{user.profession}</h3>}
          {user.connects && <h3>Connects: </h3>}
          {user.connects && user.connects.map((item, index) => <Person key={index} id={item} />)}
        </div>}
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export { HomePage };
