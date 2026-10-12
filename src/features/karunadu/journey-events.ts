export const OPEN_JOURNEY_EVENT = "kd:open-journey";

/** Open the 3D journey from anywhere on the site */
export function openJourney() {
  window.dispatchEvent(new Event(OPEN_JOURNEY_EVENT));
}
