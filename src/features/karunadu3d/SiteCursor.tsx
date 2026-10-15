import { useCallback } from "react";
import Cursor from "@/features/karunadu3d/Cursor";
import "@/features/karunadu3d/karunadu3d.css";

/* The per-page cursor: every page has its own pointer and particle trail
 * (set with data-cursor on the page). */
export default function SiteCursor() {
  const noop = useCallback(() => {}, []);
  return <Cursor onActive={noop} />;
}
