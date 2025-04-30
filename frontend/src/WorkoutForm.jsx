import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WorkoutForm = () => {
  const [workout, setWorkout] = useState({
    exercise: "",
    sets: "",
    reps: "",
    weight: "",
    duration: "",
    notes: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/workouts", {
      ...workout,
      sets: parseInt(workout.sets),
      reps: parseInt(workout.reps),
      weight: parseFloat(workout.weight),
      duration: parseFloat(workout.duration),
    });
    // After successful submission, navigate to WorkoutHistory
    navigate("/history");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Log New Workout</h2>
      {["exercise", "sets", "reps", "weight", "duration", "notes"].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={workout[field]}
          onChange={handleChange}
          className="block w-full mb-3 p-2 border border-gray-300 rounded"
        />
      ))}
      <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        Submit
      </button>
    </form>
  );
};

export default WorkoutForm;
