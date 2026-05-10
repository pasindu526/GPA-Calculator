import { useMemo, useState, useEffect } from "react";

import CourseForm from "./components/CourseForm";
import CourseTable from "./components/CourseTable";
import GPAStats from "./components/GPAStats";

import { calculateGPA } from "./utils/calculateGPA";

import logo from "./assets/logo.png";

function App() {
  const [addedCourses, setAddedCourses] = useState(() => {
    try {
      const raw = localStorage.getItem("addedCourses");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("addedCourses", JSON.stringify(addedCourses));
    } catch {
      // ignore write errors (e.g., quota)
    }
  }, [addedCourses]);

  const result = useMemo(() => {
    return calculateGPA(addedCourses);
  }, [addedCourses]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 text-white shadow-lg">
        <div className="flex mx-auto justify-center items-center w-11/12 lg:pr-8">
          <div className="w-11/12 mx-auto py-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold">
              OUSL GPA Calculator
            </h1>

            <p className="mt-1 md:mt-3 text-blue-100 text-sm md:text-lg">
              For BSE Students - Courses in New Curriculum (RC'25)
            </p>
          </div>
          <div className="hidden lg:block w-1/12 border-2 border-white p-1.5">
            <img src={logo} />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="w-11/12 mx-auto py-6 lg:px-8">
        {/* GPA STATS */}
        <GPAStats result={result} />

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 space-y-6">
          {/* COURSE FORM */}
          <CourseForm
            addedCourses={addedCourses}
            setAddedCourses={setAddedCourses}
          />

          {/* COURSE TABLE */}
          <CourseTable
            courses={addedCourses}
            setAddedCourses={setAddedCourses}
          />
        </div>

        {/* EXTRA SECTION */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* SELECTED COURSES */}
          <div className="hidden md:block bg-white rounded-2xl shadow-lg p-6 pb-2 max-h-96">
            <h2 className="text-2xl font-bold text-green-600 mb-5">
              GPA Selected Courses
            </h2>

            {result.selectedCourses.length === 0 ? (
              <p className="text-gray-500">No selected courses yet</p>
            ) : (
              <div className="space-y-3 max-h-4/5 overflow-y-auto">
                {result.selectedCourses.map((course) => (
                  <div
                    key={course.code}
                    className="flex justify-between items-center border rounded-lg px-4 py-3"
                  >
                    <div>
                      <h3 className="font-semibold">{course.code}</h3>

                      <p className="text-sm text-gray-500">{course.name}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-blue-600">{course.grade}</p>

                      <p className="text-sm text-gray-500">
                        {course.credit} Credits
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* EXCLUDED COURSES */}
          <div className="bg-white rounded-2xl shadow-lg p-6 pb-2 max-h-96">
            <h2 className="text-2xl font-bold text-red-600 mb-5">
              Excluded Courses
            </h2>

            {result.excludedCourses.length === 0 ? (
              <p className="text-gray-500">No excluded courses</p>
            ) : (
              <div className="space-y-3 max-h-4/5 overflow-y-auto">
                {result.excludedCourses.map((course) => (
                  <div
                    key={course.code}
                    className="flex justify-between items-center border rounded-lg px-4 py-3"
                  >
                    <div>
                      <h3 className="font-semibold">{course.code}</h3>

                      <p className="text-sm text-gray-500">{course.name}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-red-600">{course.grade}</p>

                      <p className="text-sm text-gray-500">
                        {course.credit} Credits
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-sm font-medium text-center bg-gradient-to-b from-blue-600 via-indigo-600 to-blue-800 p-4 text-white mt-6">
        <p>&copy; 2026 Pasindu Bandara. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default App;
