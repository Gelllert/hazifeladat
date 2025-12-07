import { LogList } from "../assets/LogList";

/**
 * A jobb oldali panel komponens.
 * Tartalmazza a statisztikákat és a pörgetési naplót (LogList).
 * Mobil nézetben 'Back' gombbal rendelkezik.
 * @returns {JSX.Element} A jobb oldali panel.
 */
export function RightPane() {
  return (
    <div className="RightPane pane">
      <h3>Statistics</h3>
      <LogList />
    </div>
  );
}
