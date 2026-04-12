/**
 * NTUTEC Angel Individual Membership Form — Apps Script Webhook
 *
 * Paste this entire script into the Google Form's Apps Script editor
 * (Extensions > Apps Script), then set up an onFormSubmit trigger.
 *
 * Configuration:
 *   1. Replace WEBHOOK_URL with your deployed domain URL.
 *   2. Replace WEBHOOK_SECRET with the value of GOOGLE_FORM_WEBHOOK_SECRET
 *      from your .env file (or Vercel environment variables).
 *   3. Set up trigger: Triggers > + Add Trigger > onFormSubmit > On form submit
 *
 * Webhook endpoint: POST /api/webhook/angel-individual
 */

var WEBHOOK_URL = 'https://YOUR_DOMAIN/api/webhook/angel-individual';
var WEBHOOK_SECRET = 'YOUR_WEBHOOK_SECRET';

function onFormSubmit(e) {
  try {
    var responses = {};
    var itemResponses = e.response.getItemResponses();

    itemResponses.forEach(function(itemResponse) {
      var title = itemResponse.getItem().getTitle();
      var response = itemResponse.getResponse();
      // Checkbox grid / multiple choice grid returns array — keep as-is
      responses[title] = response;
    });

    var payload = {
      timestamp: new Date().toISOString(),
      responses: responses
    };

    var options = {
      method: 'post',
      contentType: 'application/json',
      headers: {
        'x-webhook-secret': WEBHOOK_SECRET
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    var result = UrlFetchApp.fetch(WEBHOOK_URL, options);
    var statusCode = result.getResponseCode();

    if (statusCode !== 200) {
      Logger.log('Webhook failed with status ' + statusCode + ': ' + result.getContentText());
    } else {
      Logger.log('Webhook sent successfully: ' + result.getContentText());
    }
  } catch (err) {
    Logger.log('Webhook error: ' + err.toString());
  }
}
