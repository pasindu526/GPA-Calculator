export const calculateGPA = (courses) => {
  const level56Compulsory = courses.filter(
    (c) => (c.level === 5 || c.level === 6) && c.type === "Compulsory"
  );

  const level56Elective = courses.filter(
    (c) => (c.level === 5 || c.level === 6) && c.type === "Elective"
  );

  const level4Compulsory = courses.filter(
    (c) => c.level === 4 && c.type === "Compulsory"
  );

  const orderedCourses = [
    ...level56Compulsory,
    ...level56Elective,
    ...level4Compulsory,
  ];

  orderedCourses.sort((a, b) => b.gpv - a.gpv);

  let totalCredits = 0;
  let totalWeighted = 0;

  const selectedCourses = [];
  const excludedCourses = [];

  orderedCourses.forEach((course) => {
    if (totalCredits + course.credit <= 72) {
      totalCredits += course.credit;
      totalWeighted += course.credit * course.gpv;
      selectedCourses.push(course);
    } else {
      excludedCourses.push(course);
    }
  });

  const gpa =
    totalCredits === 0 ? 0 : (totalWeighted / totalCredits).toFixed(2);

  return {
    gpa,
    totalCredits,
    selectedCourses,
    excludedCourses,
  };
};
