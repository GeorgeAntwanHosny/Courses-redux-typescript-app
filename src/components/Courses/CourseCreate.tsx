import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addCourseStart,
  addCourseSuccess,
  addCourseFailure,
  selectCourseError,
  selectCourseLoading,
} from "../../store/coursesSlice";
import { addCourseAPIs } from "../../services/coursesService";

const CourseCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading: boolean = useSelector(selectCourseLoading);
  const error: string | null = useSelector(selectCourseError);
  const [formData, setFormData] = useState({ name: "", description: "" });

  function handelChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }
  async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      dispatch(addCourseStart());
      const newCourse = await addCourseAPIs(formData);
      dispatch(addCourseSuccess(await newCourse));
      setFormData({ name: "", description: "" });
      navigate("/");
    } catch (error) {
      dispatch(
        addCourseFailure("fail to add new course, please try agian later.")
      );
    }
  }
  function handelRestForm(){
    setFormData({name: "", description: ""});
  }
  return (
    <div className="container content  column is-half">
      <h2>
        <Link to="/" className="button is-link is-light">go back</Link>
      </h2>
      <h3>Create New Course</h3>
      {error ? <p>Erorr: {error}</p> : <></>}
      <form onSubmit={handelSubmit}>
        <div className="field">
          <label className="label">Course Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="name"
              placeholder="Enter Course Name"
              value={formData.name}
              onChange={handelChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Course Description</label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Enter Course Description"
              name="description"
              value={formData.description}
              onChange={handelChange}
            ></textarea>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" disabled={loading}>
              {loading ? "...save" : "save"}
            </button>
          </div>
          <div className="control">
            <button type="reset" onClick={handelRestForm} className="button is-link is-light">
             Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CourseCreate;