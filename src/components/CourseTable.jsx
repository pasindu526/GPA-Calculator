import { FaTrash } from "react-icons/fa";

function CourseTable({ courses, setAddedCourses }) {
  const removeCourse = (code) => {
    setAddedCourses((prev) => prev.filter((course) => course.code !== code));
  };

  const getGradeColor = (grade) => {
    if (grade.includes("A")) {
      return "text-green-700";
    }

    if (grade.includes("B")) {
      return "text-blue-700";
    }

    if (grade.includes("C")) {
      return "text-yellow-700";
    }

    return "text-red-700";
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-bold mb-5 text-green-600">
        Added Courses List
      </h2>

      {courses.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No courses added yet
        </div>
      ) : (
        <div>
          {/* desktop course table */}
          <div className="hidden lg:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">Course Code</th>
                  <th className="p-3 text-left">Course Name</th>
                  <th className="p-3">Level</th>
                  <th className="p-3">Credit</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Grade</th>
                  <th className="p-3">GPV</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((course) => (
                  <tr key={course.code} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-semibold">{course.code}</td>

                    <td className="p-3">{course.name}</td>

                    <td className="p-3 text-center">{course.level}</td>

                    <td className="p-3 text-center">{course.credit}</td>

                    <td className="p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          course.type === "Compulsory"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-pink-100 text-pink-700"
                        }`}
                      >
                        {course.type}
                      </span>
                    </td>

                    <td className="p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(
                          course.grade
                        )}`}
                      >
                        {course.grade}
                      </span>
                    </td>

                    <td className="p-3 text-center font-semibold">
                      {course.gpv}
                    </td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() => removeCourse(course.code)}
                        className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* mobile course table */}
          <div className="lg:hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">Course Code</th>

                  <th className="p-3">Grade</th>
                  <th className="p-3">GPV</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((course) => (
                  <tr key={course.code} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-semibold">{course.code}</td>

                    <td className="p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(
                          course.grade
                        )}`}
                      >
                        {course.grade}
                      </span>
                    </td>

                    <td className="p-3 text-center font-semibold">
                      {course.gpv}
                    </td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() => removeCourse(course.code)}
                        className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseTable;
