import React, { useContext } from "react";
import IndividualContent from "./IndividualContent";
import "./course-content.css";
import { CoursifyContext } from "../../context/CoursifyContext";
const CourseContent = ({handleOpen}) => {
  const { modules, lectures } = useContext(CoursifyContext);
  // console.log('module', modules);
  // console.log('lectures', lectures);

  return (
    <div className="course-content">
      <p className="heading5 bold mb-3">Course Content</p>
      <div className="flex items-center gap-x-2 paragraph1 light mb-2">
        <p>{modules && modules.length} Modules</p>
        <p>{lectures && lectures.length} Lectures</p>
      </div>
      <div>
         {modules && modules.map((module) => (
          <div key={module._id}>
            <IndividualContent
              module={module}
              content={lectures.filter(
                (content) => content.moduleId === module._id
              )}
              handleOpen={handleOpen}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContent;
