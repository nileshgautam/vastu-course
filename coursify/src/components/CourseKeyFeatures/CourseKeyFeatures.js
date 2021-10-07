import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Select from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./editor.css";

const CourseKeyFeatures = ({ data,setLearning,...otherProps }) => {
  const { errors, touched } = useFormikContext();
  const [courseKey, setCourseKey ] = useState([]);

// console.log('data',data);
// useEffect(()=>{
//   console.log('changec')
//   setLearning('learnings',allCourseKey);
// },[allCourseKey])

  const handleChange1 = (event) => {
    let item = event.target.value;
    setCourseKey(item);
  }
  const addKeyFeature = () => {
   setLearning('learnings',[...data,courseKey]);
    setCourseKey('');
  }

  return (
    <div className="mb-2 ">
      <div className="flex flex-col gap-y-2">
        <p className="paragraph1 bold">Add Features</p>
        <input          
          onChange={(e) => { handleChange1(e) }}
          name="feature"
          value={courseKey}
          {...otherProps}
          className="md:flex-1 input-field py-2 px-2 paragraph1"
        />
        <div className="">
          <button type="button" className="add-btn-key" onClick={addKeyFeature}>Add</button>
        </div>
        <ul>
          {data &&
            data.map((learn) => (
              <div
                className="flex gap-x-3 items-center paragraph2 light"
                key={learn}
              >
                <FontAwesomeIcon icon={faCheck} />
                <p>{learn}</p>
              </div>
            ))}

        </ul>
      </div>
      {/* {errors[name] && touched[name] && (
        <p className="error paragraph1 light mt-2">{errors[name]}</p>
      )} */}
    </div>
  );
};

export default CourseKeyFeatures;
