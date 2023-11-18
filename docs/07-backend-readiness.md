# Backend readiness

The Flask service exposes `/health` with a small JSON payload and returns structured JSON for unknown routes. This keeps local checks and container probes easy to understand.
