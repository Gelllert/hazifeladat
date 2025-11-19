import { ButtonIcon } from "../assets/ButtonIcon";
import { AddEntryBar } from "../assets/AddEntryBar";
import { EntryList } from "../assets/EntryList";

export function LeftPane({ onBack }: { onBack?: () => void }) {
  return (
    <div className="LeftPane pane">
      {onBack && (
        <div className="back-button-top">
          <ButtonIcon icon="arrow_back" label="Back" onClick={onBack} />
        </div>
      )}
      <h3>Wheel Entries</h3>
      <AddEntryBar />
      <EntryList />
    </div>
  );
}
