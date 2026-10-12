/** Fly to the 3D map of Karnataka on the home page */
export function openJourney() {
  const el = document.getElementById("karunadu");
  if (el) el.scrollIntoView({ behavior: "smooth" });
  else window.location.assign("/#karunadu");
}
