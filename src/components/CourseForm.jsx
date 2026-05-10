import { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";

import { courses } from "../data/courses";
import { gradePoints } from "../data/grades";

function CourseForm({ addedCourses, setAddedCourses }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [grade, setGrade] = useState("A");

  const addCourse = () => {
    if (!selectedCourse) {
      Swal.fire({
        icon: "warning",
        title: "Please select a course",
      });

      return;
    }

    const alreadyExists = addedCourses.find(
      (course) => course.code === selectedCourse.code
    );

    if (alreadyExists) {
      Swal.fire({
        icon: "error",
        title: "Course already added",
      });

      return;
    }

    const newCourse = {
      ...selectedCourse,
      grade,
      gpv: gradePoints[grade],
    };

    setAddedCourses([...addedCourses, newCourse]);

    Swal.fire({
      icon: "success",
      title: "Course Added",
      timer: 1200,
      showConfirmButton: false,
    });

    setSelectedCourse(null);
    setGrade("A");
  };

  const courseOptions = courses.map((course) => ({
    value: course.code,
    label: `${course.code} - ${course.name}`,
    data: course,
  }));

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-5 text-blue-700">Add Course</h2>

      <div className="grid md:grid-cols-4 gap-4 md:gap-8">
        {/* COURSE SELECT */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold">Select Course</label>

          <Select
            className="w-full"
            options={courseOptions}
            // show course type in the dropdown only, hide it in the selected value
            formatOptionLabel={(option, { context }) => {
              if (context === "menu") {
                return (
                  <div>
                    <div className="font-medium">{option.label}</div>
                    {option.data?.type && (
                      <div className="text-sm text-gray-500">
                        {option.data.type}
                      </div>
                    )}
                  </div>
                );
              }
              // for the single-value (selected) display, only show the label
              return <div>{option.label}</div>;
            }}
            value={
              selectedCourse
                ? {
                    value: selectedCourse.code,
                    label: `${selectedCourse.code} - ${selectedCourse.name}`,
                    data: selectedCourse,
                  }
                : null
            }
            onChange={(option) => setSelectedCourse(option.data)}
            placeholder="Search course..."
            isSearchable
          />
        </div>

        {/* GRADE SELECT */}
        <div>
          <label className="block mb-2 font-semibold">Grade</label>

          <Select
            className="w-full"
            options={Object.keys(gradePoints).map((g) => ({
              value: g,
              label: g,
            }))}
            value={grade ? { value: grade, label: grade } : null}
            onChange={(option) => setGrade(option.value)}
            placeholder="Select grade..."
            isSearchable={false}
          />
        </div>

        {/* BUTTON */}
        <div className="flex items-end">
          <button
            onClick={addCourse}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition cursor-pointer"
          >
            Add Course
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseForm;
