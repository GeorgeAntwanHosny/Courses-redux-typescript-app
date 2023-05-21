// src/components/CourseList.tsx

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCourses,
  selectCourseLoading,
  selectCourseError,
  getCoursesStart,
  getCoursesSuccess,
  getCoursesFailure,
  deleteCourseSuccess,
  deleteCourseStart,
  deleteCourseFailure,
} from "../../store/coursesSlice";
import { Course } from "../../store/coursesSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteCourseAPIs,
  getCourseListAPIs,
} from "../../services/coursesService";
const CourseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses: Course[] = useSelector(selectCourses);
  const loading: boolean = useSelector(selectCourseLoading);
  const error: string | null = useSelector(selectCourseError);
  const [showModalDelete,setShowModalDelete]= useState(false);
  const [currentDelete,setCurrentDelete] = useState(0);
  async function handleAPICourseList() {
    try {
      const coureList = await getCourseListAPIs();
      dispatch(getCoursesSuccess(await coureList));
    } catch (e) {
      dispatch(getCoursesFailure("fail to get courses List try agian later."));
    }
  }
  async function handleAPICourseDelete(id: number) {
    try {
      dispatch(deleteCourseStart());
      await deleteCourseAPIs(id);
      dispatch(deleteCourseSuccess(id));
    } catch (e) {
      dispatch(
        deleteCourseFailure("fail to get courses List try agian later.")
      );
    }
  }
  useEffect(() => {
    dispatch(getCoursesStart());
    handleAPICourseList();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...<progress className="progress is-small is-primary" max="90">15%</progress>
    </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="content">
        <div className={showModalDelete?"modal is-active":"modal"}>
    <div className="modal-background"></div>
    <div className="modal-card">
        <header className="modal-card-head">
        <p className="modal-card-title">Confirmation delete </p>
        <button className="delete"  onClick={() =>setShowModalDelete(false)} aria-label="close"></button>
        </header>
        <section className="modal-card-body">
           Are you sure to delete this course?
        </section>
        <footer className="modal-card-foot">
        <button className="button is-danger" onClick={() =>{ handleAPICourseDelete(currentDelete);setShowModalDelete(false)}}>delete</button>
        <button className="button is-info is-light"  onClick={() =>setShowModalDelete(false)}>Cancel</button>
        </footer>
    </div>
    </div>
      <h2>Course List</h2>
      <div className="table-container">
      <table className="table  is-striped is-hoverable">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Course Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <th>{course.name}</th>
              <th>{course.description}</th>
              <th>
                <button className="button is-info is-outlined" onClick={() => navigate(`/${course.id}`)}>Edit</button>
              </th>
              <th>
                <button className="button is-danger is-outlined" onClick={() =>{setShowModalDelete(true); setCurrentDelete(course.id)}}>
                  delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    </div>
  );
};

export default CourseList;
