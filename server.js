require("dotenv").config()
const express = require("express")
const { Pool } = require("pg")

const app = express()
app.use(express.json())

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

app.get("/workouts", async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM "Workout" ORDER BY "createdAt" DESC',
    )
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
