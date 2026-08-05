# Sentinel Journal

This journal documents critical security learnings discovered during security reviews and audits of this codebase.

## 2026-08-05 - Safe Parameter Handling and Robust Error Management in Serverless Functions
**Vulnerability:** Unsafe parameter parsing (using nonexistent objects like `req.parms` causing crashes), unhandled promise rejections, missing input type validation (e.g., non-numeric IDs), and lack of secure error boundaries leading to database internal leakage or server/lambda crashes.
**Learning:** In Catalyst Serverless functions, using raw input properties directly on query builders or filestores without validation can lead to uncaught runtime errors (like Typo errors or connection resets) which might crash the function runtime or expose internal call stacks.
**Prevention:** Always validate all parameters (like `folderid` and `fileid`) using strict numeric checks or regexes, catch all potential promise rejections, and map them to generic secure error responses.
