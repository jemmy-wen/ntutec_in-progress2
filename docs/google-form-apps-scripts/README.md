# Google Form Apps Script Webhooks

This directory contains Apps Script snippets to wire up Google Forms to the NTUTEC webhook endpoints. Each time a Google Form is submitted, the script POSTs the responses to the corresponding API route.

## Files

| File | Form | Endpoint |
|------|------|----------|
| `angel-individual-webhook.js` | 天使個人會員申請表 | `POST /api/webhook/angel-individual` |
| `angel-corporate-webhook.js` | 天使企業會員申請表 | `POST /api/webhook/angel-corporate` |

> The startup/pitch webhook already exists at `/api/webhook/google-form` and has its own Apps Script configured separately.

---

## Setup Instructions

### Step 1: Open Apps Script Editor

1. Open the Google Form in edit mode.
2. Click **Extensions** → **Apps Script**.
3. This opens the script editor in a new tab.

### Step 2: Paste the Script

1. Delete any existing code in the editor.
2. Paste the contents of the relevant `.js` file from this directory.
3. Replace the two variables at the top:

```js
var WEBHOOK_URL = 'https://YOUR_DOMAIN/api/webhook/angel-individual';
// Replace YOUR_DOMAIN with your actual domain, e.g.:
// https://tec.ntu.edu.tw  (production)
// https://ntutec-platform.vercel.app  (Vercel preview)

var WEBHOOK_SECRET = 'YOUR_WEBHOOK_SECRET';
// Replace with the value of GOOGLE_FORM_WEBHOOK_SECRET from .env
// You can find this in: Vercel Dashboard > ntutec-platform > Settings > Environment Variables
```

### Step 3: Save the Script

Click **Save** (or Ctrl+S / Cmd+S). Give the project a descriptive name when prompted (e.g., "Angel Individual Webhook").

### Step 4: Set Up the Trigger

1. In the Apps Script editor, click the **clock icon** (Triggers) in the left sidebar.
2. Click **+ Add Trigger** (bottom right).
3. Configure:
   - **Choose which function to run**: `onFormSubmit`
   - **Choose which deployment to run**: `Head`
   - **Select event source**: `From form`
   - **Select event type**: `On form submit`
4. Click **Save**.
5. Google will ask you to authorize the script — follow the prompts and grant permission.

### Step 5: Test

1. Submit a test response in the Google Form.
2. In Apps Script, go to **Executions** (left sidebar) to see the run log.
3. Check `/admin/forms` on the NTUTEC platform to confirm the submission appeared.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `401 Unauthorized` | Check `WEBHOOK_SECRET` matches `GOOGLE_FORM_WEBHOOK_SECRET` env var |
| `500 Internal error` | Check Vercel function logs for details |
| No entry in `/admin/forms` | Check Supabase → `form_submissions` table directly |
| Trigger not firing | Make sure the trigger is set to "On form submit", not "On open" |
| Authorization error | Re-authorize: delete trigger, save script, re-add trigger |

---

## Security Notes

- The `WEBHOOK_SECRET` must match the `GOOGLE_FORM_WEBHOOK_SECRET` environment variable in Vercel.
- Never commit the actual secret value — only store it in Vercel's environment variable settings.
- If the secret is ever compromised, rotate it in both Vercel and the Apps Script simultaneously.
