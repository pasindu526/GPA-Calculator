function GPAStats({ result }) {
  const percentage = (result.totalCredits / 72) * 100;

  const getClassName = (gpa) => {
    if (gpa >= 3.7) return "First Class";
    if (gpa >= 3.3) return "Second Upper";
    if (gpa >= 3.0) return "Second Lower";
    if (gpa >= 2.0) return "General Degree";

    return "Below General";
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6">
      {/* GPA CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-gray-500 text-sm font-medium">Current GPA</h3>

        <h1 className="text-4xl font-bold text-blue-600 mt-3">{result.gpa}</h1>
      </div>

      {/* CLASS CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-gray-500 text-sm font-medium">Degree Class</h3>

        <h1 className="text-2xl font-bold text-green-600 mt-3">
          {getClassName(Number(result.gpa))}
        </h1>
      </div>

      {/* CREDIT CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-gray-500 text-sm font-medium">Used Credits</h3>

        <h1 className="text-4xl font-bold text-purple-600 mt-3">
          {result.totalCredits}/72
        </h1>
      </div>

      {/* PROGRESS CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-gray-500 text-sm font-medium mb-4">
          Credit Progress
        </h3>

        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-500"
            style={{
              width: `${percentage}%`,
            }}
          ></div>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {percentage.toFixed(0)}% Completed
        </p>
      </div>
    </div>
  );
}

export default GPAStats;
