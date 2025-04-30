import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WorkoutForm from "./WorkoutForm";
import WorkoutHistory from "./WorkoutHistory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WorkoutForm />} />
        <Route path="/history" element={<WorkoutHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
