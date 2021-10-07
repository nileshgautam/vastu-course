import { Formik } from "formik";
import React from "react";
import SubmitButton from "../Burron/SubmitButton";
import FormField from "../FormField/FormField";
import MySelect from "../CourseDDL/Select";
const CourseModuleForm = ({ coursemodule = {}, handleSubmit }) => {
  return (
    <div>
      <p className="heading5 bold mb-5">Add Course Module</p>
      <div>
        <Formik
          initialValues={{
            title: "",
            course: "",
          }}

          validate={(values) => {
            const errors = {};
            if (!values.course) {
              errors.course = "Required";
            }
            if (!values.title) {
              errors.title = "Required";
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
                  onChange={handleChange}
                  value={values.course}
                  label="Course:"
                  placeholder="Course"
                  fetchModule={()=>{}}
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
              </div>
              <div className="mt-3">
                <SubmitButton type="submit">Save Module</SubmitButton>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>

  );
};

export default CourseModuleForm;
