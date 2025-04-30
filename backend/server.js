const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/fitness", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const workoutSchema = new mongoose.Schema({
  exercise: String,
  sets: Number,
  reps: Number,
  weight: Number,
  duration: Number,
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

const Workout = mongoose.model("Workout", workoutSchema);

app.post("/workouts", async (req, res) => {
    try {
      const newWorkout = new Workout({
        ...req.body,
        sets: parseInt(req.body.sets),
        reps: parseInt(req.body.reps),
        weight: parseFloat(req.body.weight),
        duration: parseFloat(req.body.duration),
      });
      await newWorkout.save();
      res.status(201).json(newWorkout);
      
    } catch (error) {
      console.error("Error saving workout:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

app.get("/workouts", async (req, res) => {
  const workouts = await Workout.find().sort({ createdAt: -1 });
  res.json(workouts);
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
