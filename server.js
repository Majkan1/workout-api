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

app.get("/workouts/:id",async (req,res)=> {
  try {
    const result = await pool.query(
      'SELECT * FROM "Workout" WHERE id = $1 ',[req.params.id]
    )
    if (!result.rows[0]) return res.status(404).json({error:"error"})
    res.json(result.rows[0])
  } catch (err){
    console.error(err)
    res.status(500).json({error:"Database error"})
  }
})

app.post("/workouts",async (req,res)=>{
  try{
    const result = await pool.query(
      'INSERT INTO "Workout" (id,"userId",name) VALUES ($1,$2,$3) RETURNING *',[crypto.randomUUID(),req.body.userId,req.body.name]
    )
    if(!result.rows[0]) return res.status(404).json({error:"error"})
    res.json(result.rows[0])
  } catch(err) {
    console.error(err)
    res.status(500).json({error:"Database error"})
  }
})

app.put("/workouts/:id",async (req,res) =>{
  try{
    const result = await pool.query(
      'UPDATE "Workout" SET name = $1 WHERE id = $2 RETURNING *',[req.body.name,req.params.id]
    )
    if(!result.rows[0]) return res.status(404).json({error:"error"})
    res.json(result.rows[0])
  } catch(err){
    console.error(err)
    res.status(500).json({error:"Database error"})
  }
})

app.delete("/workouts/:id",async (req,res)=>{
  try{
    const result = await pool.query(
      'DELETE FROM "Workout" WHERE id = $1 RETURNING *',[req.params.id]
    )
    if(!result.rows[0]) return res.status(404).json({error:"error"})
    res.json(result.rows[0])
  } catch(err){
    console.error(err)
    res.status(500).json({error:"Database error"})
  }
})
const PORT = 4000
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
