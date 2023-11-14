# Projector notes

This folder collects short implementation notes and visual references for the platform.

## Frontend direction

- Rounded cards and inputs keep dense project information approachable.
- Orange is reserved for actions and moments that need attention.
- Teal text maintains contrast while keeping the page softer than pure black.

## Backend direction

The Flask service exposes `/health` for container readiness and returns JSON for unknown routes, which makes local debugging and deployment checks easier.
