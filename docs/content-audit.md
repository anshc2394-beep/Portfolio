# Portfolio content review

Reviewed September 16, 2026. This review verifies portfolio wording against source; it does not certify the projects as production-ready or validate live packet capture.

## NetWatch SOC

Repository: https://github.com/anshc2394-beep/NetWatch-SOC

- `backend/capture/sniffer.py`: a Scapy capture thread feeds a bounded queue; a worker groups source/destination IP, source/destination port, and protocol into five-second flow windows. It computes packet/byte counts, duration, packet size, and timing features.
- `backend/detection/anomaly.py`: contains StandardScaler and IsolationForest fitting/scoring code, initial calibration, and shared flow/alert stores.
- `backend/api/routes.py`: Flask endpoints for flows, alerts, status, and related IP activity, plus investigation page routing. The demo endpoint explicitly creates simulated traffic.
- No image assets or screenshots were committed in the inspected repository tree. The portfolio therefore uses a labeled architecture diagram without fabricated metrics.

Limitations found in source: `_extract_features` is called but not defined; the corresponding extraction code appears after returns in `_determine_severity`. `_is_running` is read in `start` without an initial module-level definition. These are reasons to describe the live detector as under development. No claim of a working production security deployment, comprehensive attack classification, or validated detection accuracy is made. The portfolio does not repeat the README's enterprise-grade language. Fixing the separate NetWatch repository was outside this portfolio task.

## Desk Caddy AI

Repository: https://github.com/anshc2394-beep/DeskReceptionistAI

- `app/twilio_routes.py`: deterministic Twilio speech webhook flow through language, service, time, name, phone, and confirmation. Retry counters and regex-based confusion detection trigger reprompts or a message fallback.
- `app/models.py`: SQLAlchemy call-session and lead records; collected answers are persisted across webhooks.
- `requirements.txt`: Python, FastAPI, Twilio, SQLAlchemy, and notification dependencies. No Node.js application or LLM dependency is present in the inspected tree.
- The README explicitly says the application captures appointment requests rather than booking appointments.

Removed the previous Node.js, LLM, JSON-schema orchestration, and broad intent-routing claims. Retained conversation state but explained it concretely. JSON serialization is not described as schema validation. Async route declarations are not presented as evidence of asynchronous orchestration.

## World Cup Path

Repository: https://github.com/anshc2394-beep/World-Cup-Path

The README documents editable scorelines, qualification rules, knockout paths, seeded Monte Carlo simulation, and SQLite persistence. The existing screenshot is from `docs/screenshots/landing.png`. The project remains first in the portfolio. No deployment URL is configured because no verified live URL was supplied.

## Personal content and experience

The user supplied the updated interests, music choices, and portrait. Internship descriptions use the supplied résumé and brief, with no invented dates, metrics, or Offerdox technology stack. Offerdox's unknown date remains null. Technical takeaways describe engineering considerations, without inventing personal anecdotes about project origins or outcomes.
