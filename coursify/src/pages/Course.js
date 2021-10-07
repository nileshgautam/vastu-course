import axios from "axios";
import React, { useContext, useEffect, useState, useCallback } from "react";
import CourseContent from "../components/CourseContent/CourseContent";
import CourseDescription from "../components/CourseDescription/CourseDescription";
import CourseHeader from "../components/Header/CourseHeader";
import JumboCourse from "../components/JumboCourse/JumboCourse";
import LearningOutcome from "../components/LearningOutcome/LearningOutcome";
import PreviewModel from "../components/PreviewModel/PreviewModel";
import { CoursifyContext } from "../context/CoursifyContext";

const Course = (props) => {
  const { courses, lectures, dispatchModules, dispatchLectures } =
    useContext(CoursifyContext);
  const course = courses.find((course) => course._id === props.match.params.id);

  console.log('LEC',lectures);

  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState();

  // const [models, setModel] = useState(true);
  // const [lecture, setLecture] = useState(true);

  const handleScroll = () => {
    const toggle = document.querySelector(".toggle");
    const sticky = toggle && toggle.offsetTop ? toggle.offsetTop : 0;
    if (window.scrollY >= 50) {
      toggle.style.display = "block";
    } else {
      toggle.style.display = "none";
    }
    if (window.pageYOffset > sticky) {
      toggle.classList.add("sticky");
    } else {
      toggle.classList.remove("sticky");
    }
  };

  const fetchContent = async () => {
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_API}/modules/${props.match.params.id}`,
    };
    const newOptions = {
      method: "GET",
      url: `${process.env.REACT_APP_API}/lectures/${props.match.params.id}`,
    };
    try {
      const res = await axios(options);
      // console.log(res);
      if (res.status === 200 || res.status === 201) {
        // setModel(res.data.modules);
        dispatchModules({
          type: "SET_MODULES",
          modules: res.data.modules,
        });
      }
      const res1 = await axios(newOptions);
      if (res1.status === 200 || res1.status === 201) {
        // console.log(res1)
        // setLecture(res1.data.lectures);
        dispatchLectures({
          type: "SET_LECTURES",
          lectures: res1.data.lectures,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  // Use effect
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  
    if (lectures.length === 0) {
      fetchContent();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, fetchContent]);

  const handleOpen = (id) => {
    // console.log('id',id);
    setActiveId(id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  return (
    <>
      <div>
        <div
          style={{
            display: "none",
          }}
          className="toggle"
        >
          <CourseHeader course={course} />
        </div>
        <JumboCourse course={course} handleOpen={handleOpen} />
        <div className="mt-5">
          <LearningOutcome course={course} />
        </div>
        <div className="my-5">
          <CourseContent handleOpen={handleOpen} />
        </div>
        <div className="my-5">
          <CourseDescription description={course.info} />
        </div>
      </div>
      {open && lectures && lectures.length !== 0 && (
        <PreviewModel
          courseContent={lectures}
          handleClose={handleClose}
          activeId={activeId}
          setActiveId={setActiveId}
        />
      )}
    </>
  );
};

export default Course;
