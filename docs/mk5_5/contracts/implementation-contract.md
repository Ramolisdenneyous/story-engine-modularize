# ImplementationContract

Owner: Conductor Agent or Lead Implementation Agent

Consumers: Backend Agent, Frontend Agent

Purpose: state the exact backend, frontend, and data work required to make a `GamePackSpec` playable.

## Required Sections

- `pack_id`: pack being implemented.
- `source_spec_version`: identifier or date for the `GamePackSpec` used.
- `backend_tasks`: content registry, engine, API, validation, and persistence tasks.
- `frontend_tasks`: UI manifest, component, hook, route, and state tasks.
- `data_tasks`: structured content changes, migrations, and seed data.
- `asset_tasks`: required image, audio, music, or voice integration work.
- `acceptance_checks`: concrete checks a tester or agent can run.
- `risk_notes`: compatibility, balance, missing asset, migration, or UX risks.
- `out_of_scope`: tempting work that should not be done in this implementation pass.

## Handoff Rules

This contract is practical and bounded. It should say what to change, where the ownership lives, and how success will be checked.

Avoid open-ended creative invention here. If a new lore or design choice is needed, send that question back to the Conductor or RPG Design Agent.
