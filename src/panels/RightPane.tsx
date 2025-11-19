import { ButtonIcon } from "../assets/ButtonIcon";
import { LogList } from "../assets/LogList";

export function RightPane({ onBack }: { onBack?: () => void }) {
  return (
    <div className="RightPane pane">
      {onBack && (
        <div className="back-button-top">
          <ButtonIcon icon="arrow_back" label="Back" onClick={onBack} />
        </div>
      )}
      <h3>Statistics</h3>
      <LogList />
    </div>
  );
}
