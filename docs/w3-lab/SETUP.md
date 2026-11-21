# W3 Lab Solidtime for ClickUp: setup (2 minutes)

A **Start timer** button inside ClickUp tasks that tracks time in our Solidtime (`solidtime.w3-lab.com`). It replaces the Clockify ClickUp widget.

## 1. Install

Open the install link from the team channel and click **Add to Chrome**. It's a private listing: you need to be signed in to Chrome or the Chrome Web Store with the Google account that was added to the testers list (your w3-lab.com account, or the Google account you gave us).

Tip: click the puzzle icon in Chrome's toolbar and pin the extension.

## 2. Create an API token in Solidtime

1. Go to [solidtime.w3-lab.com](https://solidtime.w3-lab.com) → your avatar → **Profile Settings**.
2. **Create API Token**, name it e.g. `ClickUp extension`, and copy it. It's only shown once.

## 3. Connect the extension

1. Right-click the extension icon → **Options**.
2. The Solidtime URL is already filled in. Paste your token and click **Connect**. Chrome asks to allow access to `solidtime.w3-lab.com`; click **Allow**.
3. Organization: **W3 Lab SE**. Click **Save**.

## 4. Track time

- Open a ClickUp task and click **▶ Start timer** in the task header. While it runs, the button shows **Stop timer | 0:12:34**.
- In List view, hover a row and click **▶**.
- Clicking another task's button switches the timer over. Clicking the running one stops it.

Entries are named `Task name | #taskid`, like Clockify did.

## Projects

The project is picked from the ClickUp **Folder** name (e.g. Folder "Eklix" → project "Eklix"). Hover the button to see which Folder and List it read.

If a task ends up without a project, you'll see a notice in the bottom-right corner. Add a mapping in **Options → Manual mappings** (Type: Folder or List, the ClickUp name, the Solidtime project) and click **Save**.

## Security

Your token is stored only in this browser, and the extension only sends it to `solidtime.w3-lab.com`. When you stop using the extension: **Options → Disconnect**, then revoke the token in Solidtime.

## Problems?

- **No button in ClickUp:** refresh the page. If it's still missing, ClickUp probably changed its layout. Tell the team; we fix it once and everyone gets the update automatically.
- **"Solidtime rejected the API token":** create a new token and Connect again.
