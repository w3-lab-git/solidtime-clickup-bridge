/**
 * W3 Lab build (fork-only). The published extension only talks to W3 Lab's own Solidtime
 * instance: the manifest only allows this origin, and the options page fills it in.
 */
export const W3_LAB_SOLIDTIME_URL = "https://solidtime.w3-lab.com";

export const W3_LAB_EXTENSION_NAME = "W3 Lab Solidtime for ClickUp";

export const W3_LAB_HOST_PERMISSIONS = [`${W3_LAB_SOLIDTIME_URL}/*`];
