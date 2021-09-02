import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { MESSAGE_ROUTE } from "../Routepath";

function Slidebar() {
  const UserReducer = useSelector((state) => state.UserReducer);
  const MyidReducer = useSelector((state) => state.MyidReducer);
  const { id, name } = MyidReducer;
  const [activeMenu, setActiveItem] = useState("/");
  let location = useLocation();
  useEffect(() => {
    let currentActive = window.location.pathname.replace("/", "") || "/";
    setActiveItem(currentActive);
  }, [location]);
  return (
    <>
      <p>myname:{name}</p>
      <div className="slide-bar">
        {UserReducer.filter((m) => m.id !== id).map((user) => (
          <li className={user.id == activeMenu ? "active" : ""}>
            <Link to={`${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </div>
    </>
  );
}

export default Slidebar;
