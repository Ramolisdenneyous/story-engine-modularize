# TestReport

Owner: Tester Agent

Consumers: Conductor Agent, Backend Agent, Frontend Agent, RPG Design Agent

Purpose: report bugs, balance issues, UX friction, and recommended fixes after autonomous playtesting.

## Required Sections

- `pack_id`: pack tested.
- `summary`: short outcome of the run.
- `playthrough_id`: session id, run id, or save id when available.
- `bugs`: crashes, broken states, bad references, API errors, or visible defects.
- `balance_notes`: difficulty, pacing, resource pressure, and reward observations.
- `ux_friction`: confusing controls, unclear copy, missing feedback, or visual problems.
- `recommended_fixes`: concrete follow-up tasks.
- `regression_checks`: commands, routes, or play steps that should be re-run after fixes.

## Handoff Rules

Findings should be reproducible when possible. Include session ids, adventure ids, location ids, prompt numbers, and backend log symptoms when they matter.

Do not rewrite the design in the report. Recommend fixes and let the Conductor route them to the correct owner.
