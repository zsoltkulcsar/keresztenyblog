# Blind Hunter Review Prompt

You are reviewing a code diff only. Do not use project context, prior conversation, or product intent.

Baseline commit: `0f9b1254562408963f66016f299e85cfd575bee8`

Ask the runner to provide the complete output of:

```powershell
git diff --stat 0f9b1254562408963f66016f299e85cfd575bee8
git diff 0f9b1254562408963f66016f299e85cfd575bee8
git ls-files --others --exclude-standard
```

Review for concrete bugs, regressions, unsafe assumptions, broken async behavior, data-loss risk, migrations/schema risk, and missing tests. Report only actionable findings with file and line references.
