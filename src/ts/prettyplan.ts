import {
  getCurrentVersion,
  getLastUsedVersion,
  updateLastUsedVersion
} from "./releases";
import { expandAll, collapseAll, accordion, closeModal } from "./ui";
import {
  showReleaseNotification,
  hideReleaseNotification,
  showReleaseNotes,
  displayParsingErrorMessage,
  hideParsingErrorMessage,
  clearExistingOutput,
  unHidePlan,
  render
} from "./render";
import { parse } from "./parse";

window.addEventListener("load", function() {
  if (getCurrentVersion() != getLastUsedVersion()) {
    showReleaseNotification(getCurrentVersion());
    updateLastUsedVersion();
  }
});

const runPrettyplan = (terraformPlan: string) => {
  hideParsingErrorMessage();
  clearExistingOutput();

  var plan = parse(terraformPlan);

  if (plan.warnings.length === 0 && plan.actions.length === 0) {
    displayParsingErrorMessage();
  }

  render(plan);
  unHidePlan();
};
(<any>window).runPrettyplan = runPrettyplan;

window.onload = function() {
  const b64_plan = window.location.hash.slice(1);

  if (b64_plan) {
    const plan = window.atob(b64_plan);
    console.log(plan);
    runPrettyplan(plan);
  }
};

(<any>window).showReleaseNotes = showReleaseNotes;
(<any>window).expandAll = expandAll;
(<any>window).collapseAll = collapseAll;
(<any>window).accordion = accordion;
(<any>window).closeModal = closeModal;
(<any>window).hideReleaseNotification = hideReleaseNotification;
