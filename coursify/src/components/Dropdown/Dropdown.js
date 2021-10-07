import React from "react";
import { useFormikContext } from "formik";
// import { CoursifyContext } from "../../context/CoursifyContext";

// import Select from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./editor.css";

const Dropdown = ({ label, name, value, handleChange,modules, ...otherProps }) => {
  const { errors, touched } = useFormikContext();
  return (
    <div className="mb-2">
      <div className="flex flex-col gap-y-2">
        <p className="paragraph1 bold">{label}</p>
        <select value={value}
          onChange={handleChange}
          name={name}
          {...otherProps}
          className="md:flex-1 input-field py-2 px-2 paragraph1">
          <option value={''} >Select</option>
          {modules && modules.map((item, i) => {
            return (
              <option value={item._id} key={i} >{item.title}</option>)
          })}
        </select>
      </div>
      {errors[name] && touched[name] && (
        <p className="error paragraph1 light mt-2">{errors[name]}</p>
      )}
    </div>
  );
};

export default Dropdown;
