import React, { useState } from "react";
// import { CoursifyContext } from "../../context/CoursifyContext";
import { Formik } from "formik";
import SubmitButton from "../Burron/SubmitButton";
import FormField from "../FormField/FormField";
import MySelect from "../CourseDDL/Select";
import Dropdown from "../Dropdown/Dropdown";
import axios from "axios";

const ModuleLectureForm = ({ modulelecture = {}, handleSubmit }) => {
  const [modules, setmodules] = useState([]);
  const coursify = JSON.parse(localStorage.getItem('coursify'));

  const fetchModule = async (value) => {
    // var token = "";
    if (coursify) {
      // let token = coursify.token;
    }
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_API}/modules/${value}`,
    };
    try {
      const res = await axios(options);
      setmodules(res.data.modules);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <p className="heading5 bold mb-5">Add Course module lectures </p>
      <div>
        <Formik
          initialValues={{
            title: "",
            course: "",
            module: "",
            thumbnail: "",
            video: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = "Required";
            }
            if (!values.course) {
              errors.courseId = "Required";
            }
            if (!values.module) {
              errors.title = "Required";
            } if (!values.thumbnail) {
              errors.thumbnail = "Required";
            }
            if (!values.video) {
              errors.video = "Required";
            }
            return errors;
          }}

          onSubmit={(values) => {
            handleSubmit && handleSubmit(values)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 xs:grid-cols-1 gap-x-2 gap-y-2">
                <MySelect
                  type="course"
                  name="course"
                  value={values.course}
                  label="Course:"
                  placeholder="Course"
                  fetchModule={fetchModule}
                />
                <Dropdown
                  type="module"
                  name="module"
                  handleChange={handleChange}
                  value={values.module}
                  label="Module:"
                  placeholder="Module"
                  modules={modules}
                />
                <FormField
                  type="title"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  label="Title:"
                  placeholder="Title"
                />
                <FormField
                  type="thumbnail"
                  name="thumbnail"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.thumbnail}
                  label="Thumbnail URL:"
                  placeholder="Thumbnail"
                />
                <FormField
                  type="video"
                  name="video"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.video}
                  label="Video URL:"
                  placeholder="Video URL"
                />
              </div>
              <div className="mt-3">
                <SubmitButton type="submit">Save Lecture</SubmitButton>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ModuleLectureForm;
