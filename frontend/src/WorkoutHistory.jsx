import { useEffect, useState } from "react";
import axios from "axios";

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/workouts")
      .then((res) => setWorkouts(res.data))
      .catch((err) => console.error("Error fetching workouts:", err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">🏋️ Workout History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {workouts.map((w, i) => (
          <div key={i} className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-blue-600">{w.exercise}</h3>
            <p className="text-gray-700 mt-2">
              <span className="font-medium">Sets/Reps:</span> {w.sets} × {w.reps}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Weight:</span> {w.weight} kg
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Duration:</span> {w.duration} min
            </p>
            {w.notes && (
              <p className="text-gray-600 italic mt-2">
                <span className="font-medium">Notes:</span> {w.notes}
              </p>
            )}
            <p className="text-sm text-gray-400 mt-2">
              Logged on: {new Date(w.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutHistory;
