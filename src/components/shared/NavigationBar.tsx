import { NavLink, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const location = useLocation();
  return (
    <div className="tabs is-medium">
      <ul>
       <li className={location.pathname === '/'?"is-active":""}> <NavLink to="/">
         Courses
        </NavLink>
        </li>
        <li  className={location.pathname === '/add-course'?"is-active":""}> <NavLink to="/add-course" className="">
          Add Course
        </NavLink>
        </li>
      </ul>
    </div>
  );
};
export default NavigationBar;
