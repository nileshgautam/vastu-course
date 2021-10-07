import { Formik } from "formik";
import React, { useState } from "react";
import SubmitButton from "../Burron/SubmitButton";
import FormField from "../FormField/FormField";
import RichtextEditor from "../TextEditor/RichTextEditor";
import CourseKeyFeatures from "../CourseKeyFeatures/CourseKeyFeatures";

const CourseForm = ({ course = {}, handleSubmit }) => {
  const [keyList, setkeylist] = useState([]);
  const setLearning = (coursekey) => {
    setkeylist({ ...keyList, coursekey });
  }
  return (
    <div>
      <p className="heading5 bold mb-5">Add Course</p>
      <div>
        <Formik
          initialValues={{
            title: "",
            description: "",
            author: "",
            authorInfo: "",
            info: "",
            picture: "",
            learnings: keyList,
          }}

          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = "Required";
            }
            if (!values.description) {
              errors.description = "Required";
            }
            if (!values.author) {
              errors.author = "*Required";
            }
            if (!values.authorInfo) {
              errors.authorInfo = "*Required";
            }
            if (!values.info) {
              errors.info = "*Required";
            }
            if (!values.picture) {
              errors.picture = "*Required";
            }
            return errors;
          }}
          onSubmit={(values) =>handleSubmit(values)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 xs:grid-cols-1 gap-x-2 gap-y-2">
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
                  type="author"
                  name="author"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.author}
                  label="Author:"
                  placeholder="Author"
                />
                <FormField
                  type="description"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  label="Short Description:"
                  placeholder="Description"
                />
                <FormField
                  type="text"
                  name="picture"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.picture}
                  label="Image:"
                  placeholder="Image Link"
                />
                <RichtextEditor
                  name="info"
                  value={values.info}
                  label="Course Info:"
                  placeholder="Give Info"
                />
                <RichtextEditor
                  name="authorInfo"
                  value={values.authorInfo}
                  label="Author's Info:"
                  placeholder="Give Info"
                />
                <CourseKeyFeatures
                  data={values.learnings}
                  // setValue={setValue}    
                  placeholder="Add Key Features..."
                  setLearning={setFieldValue}
                />
              </div>
              <div className="mt-3">
                <SubmitButton type="submit">Save Course</SubmitButton>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CourseForm;
