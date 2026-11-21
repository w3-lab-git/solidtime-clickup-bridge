# Privacy policy: W3 Lab Solidtime for ClickUp

_Last updated: 2026-11-21_

W3 Lab Solidtime for ClickUp ("the extension") is a browser extension for W3 Lab team members. It starts and stops time entries in W3 Lab's Solidtime instance (`https://solidtime.w3-lab.com`) from ClickUp tasks. It is W3 Lab's build of the open-source [Solidtime for ClickUp](https://github.com/benloeffel/solidtime-clickup-bridge) extension; the source code is public at [github.com/w3-lab-git/solidtime-clickup-bridge](https://github.com/w3-lab-git/solidtime-clickup-bridge).

## What the extension reads

- **On `app.clickup.com` only:** the ID and title of the task you open or hover, and the names of its Space, Folder and List. It reads them from the page itself and never calls ClickUp's API.
- **From Solidtime:** your organizations, projects and running time entry, using the API token you enter.

## What it stores

- In your browser's extension storage on your own computer: the Solidtime URL, your Solidtime API token, your chosen organization, and your project settings (mappings, default project, billable).
- For the current browser session: the IDs of the task whose timer is running and of open ClickUp tabs.

Nothing is synced to other devices or stored anywhere else by the extension.

## Where data is sent

- **Only to `https://solidtime.w3-lab.com`,** over HTTPS, when you start or stop a timer or the extension checks what is running. That's the task title and ID (as the time entry description), the matched project, and your API token (to authenticate).
- **Nowhere else.** No analytics, no tracking, no advertising, no third parties. The data is not sold or used for anything other than creating your time entries.

## Removing your data

Click **Disconnect** on the extension's options page to delete the stored token and settings, or remove the extension from your browser. Revoke the API token in Solidtime (Profile Settings) as well. Time entries in Solidtime are managed in Solidtime.

## Contact

Questions: open an issue at [github.com/w3-lab-git/solidtime-clickup-bridge/issues](https://github.com/w3-lab-git/solidtime-clickup-bridge/issues) or ask the W3 Lab team.
