import React, { useContext } from "react";
import { useFormikContext } from "formik";
import { CoursifyContext } from "../../context/CoursifyContext";


// import Select from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./editor.css";
const MySelect = ({ label, name, value, fetchModule, ...otherProps }) => {
  const { errors, touched } = useFormikContext();
  const { courses } = useContext(CoursifyContext);
  const { values, setValues } = useFormikContext()
  const handleSelectChange = (event) => {
    // let title = event.target.options[event.target.selectedIndex].text;
    setValues({ ...values, [name]: event.target.value })
    fetchModule(event.target.value);
  }
    ;
  return (
    <div className="mb-2">
      <div className="flex flex-col gap-y-2">
        <p className="paragraph1 bold">{label}</p>
        <select
          onChangeCapture={handleSelectChange}
          name={name}
          {...otherProps}
          className="md:flex-1 input-field py-2 px-2 paragraph1">
          <option value={''} >Select</option>
          {courses.map((item, i) => {
            return (
              <option value={item._id} key={i} text={item.title} >{item.title}</option>)
          })}
        </select>
      </div>
      {errors[name] && touched[name] && (
        <p className="error paragraph1 light mt-2">{errors[name]}</p>
      )}
    </div>
  );
};

export default MySelect;
