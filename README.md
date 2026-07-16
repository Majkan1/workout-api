# workout-api

A standalone Express REST API with **raw SQL** (no ORM), running against the
same PostgreSQL database (Supabase) as my [workout-tracker](https://github.com/Majkan1/workout-tracker) app.

I built this to go one layer deeper than Next.js server actions and Prisma —
writing the HTTP routing and SQL queries by hand instead of letting the
framework and ORM handle them.

## Run

```bash
npm install
node server.js
# → http://localhost:4000/workouts
```

## Endpoints

- `GET /workouts` — list all workouts
- `GET /workouts/:id` — single workout
- `POST /workouts` — create a workout
- `PUT /workouts/:id` — rename a workout
- `DELETE /workouts/:id` — delete a workout
- `GET /workouts/:id/exercises` — exercises for a workout (JOIN)
- `GET /stats` — per-workout aggregates (GROUP BY)

## Notes

- Prisma created case-sensitive table names, so raw SQL has to quote them: `"Workout"`, `"createdAt"`.
- All queries use `$1, $2` parameters, never string concatenation, to avoid SQL injection.
- Supabase requires `ssl: { rejectUnauthorized: false }` with node-postgres.
