// Google Apps Script for the /collaborate creator list.
//
// Setup: create a Google Sheet -> Extensions -> Apps Script -> paste this file.
// Project Settings -> Script properties: SECRET = same value as COLLAB_SECRET.
// Deploy -> New deployment -> Web app (Execute as: Me, Access: Anyone).
// Put the /exec URL in COLLAB_WEBHOOK_URL on the server.

const COLUMNS = [
  "Submitted", "Name", "Email", "Phone", "Location",
  "Instagram", "IG followers", "TikTok", "TikTok followers", "Other links",
  "Niche", "Collab types", "Rates", "Last-minute", "Group size", "Message",
  "Source", "Relevance", "Notes",
];

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  if (data.secret !== PropertiesService.getScriptProperties().getProperty("SECRET")) {
    return json({ ok: false, error: "unauthorized" });
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
  }

  // Prefix "=" / "+" etc. with ' so user input is never evaluated as a formula.
  const safe = (v) => (typeof v === "string" && /^[=+\-@]/.test(v) ? "'" + v : v ?? "");
  const link = (base, handle) => (handle ? `=HYPERLINK("${base}${encodeURIComponent(handle)}","@${handle.replace(/"/g, "")}")` : "");

  sheet.appendRow([
    new Date(),
    safe(data.name), safe(data.email), safe(data.phone), safe(data.location),
    link("https://instagram.com/", data.instagram), data.instagramFollowers,
    link("https://tiktok.com/@", data.tiktok), data.tiktokFollowers,
    safe(data.otherLinks), safe(data.niche), data.collabTypes, safe(data.rate),
    data.lastMinute, safe(data.groupSize), safe(data.message), data.source,
    "", "", // Relevance + Notes: filled in by hand
  ]);
  return json({ ok: true });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
