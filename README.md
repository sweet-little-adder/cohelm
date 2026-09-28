# cohelm

A Next.js prototype of a medical-record review flow. It presents two document selectors (medical record and guidelines), a staged review display, supporting evidence text, and an approved/not-approved result. The current repository implements the browser UI, not document parsing or LLM inference.

## What the code does

- `src/components/uploadform.tsx` shows two file inputs and simulated upload states. Submitting waits two seconds and logs the selected `File`; it does not send the file to a server. After both forms have been submitted, it opens the result panel.
- `src/components/processDocument.tsx` requests a hard-coded `example-response.json` URL on Notion's file host and renders its `procedure_name`, `summary`, `is_met`, and per-step `question`, `options`, and `evidence` fields. The steps and final approval are revealed on timers. The URL contains an expiration timestamp, so the sample response may no longer load.
- `src/app/page.tsx` coordinates the upload, review, and final-result panels.

The interface shows what an evidence-backed decision *could* look like. It does not generate evidence, verify medical records, perform retrieval-augmented generation, or implement a clinical decision system. Do not use it for patient care or upload real patient records. The UI labels evidence as RAG-generated, but no RAG implementation is present in this repository.

## Run locally

Requires Node.js and npm. Run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The UI can load even if the remote sample JSON fails, but the review and final result depend on that external URL. There is no server API, test suite, or local fixture in the repository. `npm run build` and `npm run start` are the production scripts.
