/**
 * Soft fade between pages. Templates re-mount on navigation, so the CSS
 * animation replays per route. Pure CSS: content is visible without JavaScript,
 * and the global reduced-motion rule turns the animation off.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
