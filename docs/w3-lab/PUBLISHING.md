# Publishing to the Chrome Web Store (W3 Lab)

## Build the zip

```bash
npm ci
npm run build && npm run check-manifest   # must print "Release manifests OK"
npx wxt zip                                # → .output/solidtime-clickup-bridge-<version>-chrome.zip
```

For an update: bump `version` in `package.json` (e.g. `npm version 0.2.1 --no-git-tag-version`), build, zip, and upload the new zip under **Package** in the dashboard. Chrome updates installed copies automatically after review.

## One-time setup

1. Register at the [Chrome Web Store developer dashboard](https://chrome.google.com/webstore/devconsole) with a **company** Google account (one-time $5 fee).
2. **Account → Trusted testers:** add the people who may install the extension, by email, or add a Google Group you manage (e.g. `solidtime-extension@w3-lab.com`). Each person needs a Google account.
3. **Add new item** → upload the zip.

## Store listing tab

- **Name:** comes from the manifest, `W3 Lab Solidtime for ClickUp`.
- **Summary:** comes from the manifest description.
- **Description:**

  > Internal W3 Lab tool. Adds a Start timer button to ClickUp tasks that tracks time in W3 Lab's Solidtime (solidtime.w3-lab.com).
  >
  > - Start/stop from the task header, or from List view rows.
  > - The task header shows the running time.
  > - Entries are named "Task name | #taskid".
  > - The Solidtime project is matched from the ClickUp Folder, List or Space name, with optional manual mappings.
  >
  > Based on the open-source Solidtime for ClickUp extension (MIT). Not affiliated with Solidtime or ClickUp.

- **Category:** Productivity (Workflow & Planning). **Language:** English.
- **Icon:** 128×128 is in the package (`public/icon/128.png`).
- **Screenshots:** at least one, 1280×800 or 640×400, e.g. a ClickUp task with the Start timer button. Use a task with nothing confidential in it. If the form also asks for a 440×280 promo tile, use the icon on a plain background.

## Privacy tab

- **Single purpose:** "Start and stop Solidtime time entries from ClickUp tasks."
- **Permission justifications:**
  - `storage`: "Stores the Solidtime URL, the user's API token and project settings locally."
  - `scripting`: "After a timer starts or stops, refreshes open tabs of the user's own Solidtime instance (solidtime.w3-lab.com) so they show the change."
  - Host permission `https://solidtime.w3-lab.com/*`: "The extension's only server: creates and stops time entries through the Solidtime API. Requested when the user clicks Connect."
  - Content script on `https://app.clickup.com/*`: "Reads the task ID, title and Space/Folder/List names from the open ClickUp page and shows the timer button."
- **Remote code:** No, I am not using remote code.
- **Data usage:** tick **Authentication information** (the Solidtime API token) and **Website content** (ClickUp task titles and names). Tick all three certifications (not sold, not used for unrelated purposes, not used for creditworthiness).
- **Privacy policy URL:** `https://github.com/w3-lab-git/solidtime-clickup-bridge/blob/main/PRIVACY.md`

## Distribution tab

- **Visibility:** **Private**, with trusted testers. Our people use both w3-lab.com and w3lab.rs addresses, and the domain-only option would only cover w3-lab.com.
- **Regions:** all.

Submit for review. After approval, share the item's store URL with the team, together with [SETUP.md](SETUP.md).
