import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Params, useNavigate, useParams } from "react-router-dom";
import {
  updateCourseStart,
  updateCourseSuccess,
  updateCourseFailure,
  selectCourseError,
  selectCourseLoading,
} from "../../store/coursesSlice";
import { updateCourseAPIs } from "../../services/coursesService";

const CourseUpdate: React.FC = () => {
  const { id } = useParams<Params>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadById, setLoadById] = useState(false);
  const loading: boolean = useSelector(selectCourseLoading);
  const error: string | null = useSelector(selectCourseError);
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    description: "",
  });
  function handelChange(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }
  async function getCourseData() {
    try {
      setLoadById(true);
      const res = await fetch(`http://localhost:3001/courses/${id}`);
      if (res.status === 404) {
        setLoadById(false);
        navigate("/");
      } else {
        const data = await res.json();
        setFormData({ ...data });
        setLoadById(false);
      }
    } catch (err) {
      setLoadById(false);
      navigate("/");
    }
  }
  useEffect(() => {
    getCourseData();
  }, [id]);
  async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      dispatch(updateCourseStart());
      const updateCourse = await updateCourseAPIs(formData);
      dispatch(updateCourseSuccess(await updateCourse));

      navigate("/");
    } catch (error) {
      dispatch(
        updateCourseFailure(
          "fail to update this course, please try agian later."
        )
      );
    }
  }

  return (
    <>
      <div className="container content  column is-half">
        <h2>
          <Link to="/" className="button is-link is-light">
            go back
          </Link>
        </h2>
        <h3>Update Course</h3>
        {error ? <p>Erorr: {error}</p> : <></>}
        {loadById ? (
          <p>Loading Course data... </p>
        ) : (
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
                <Link to="/"
                  type="reset"
                  className="button is-link is-light"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};
export default CourseUpdate;
