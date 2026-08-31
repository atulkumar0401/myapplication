// Minimal Express server for the "myapplication" sample.
//
// Two routes only, on purpose: a real page for a human to look at, and a
// real health endpoint for Kubernetes' own liveness/readiness probes to
// call — the same two things any deployed service needs, kept small enough
// to read in one sitting.

const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, 'public')))

app.get('/healthz', (_req, res) => {
  res.json({ status: 'ok', service: 'myapplication', time: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`myapplication listening on port ${PORT}`)
})
