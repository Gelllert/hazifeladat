import { ButtonIcon } from "./ButtonIcon";
import "../style/EntryListItem.css";


export function EntryListItem({ entry, percent, weight, onDelete }) {
    return (
        <div class="EntryListItem" style={{ "--entry-color": entry.color }}>

            <div class="EntryName">
                <span class="EntrySpan">{entry.name}</span>
            </div>

            <div class="EntryPercent">
                <span class="PercentSpan">{percent.toFixed(1)}% / w: {weight}</span>
            </div>


            <div class="EntryButtons">
                <ButtonIcon icon="delete" onClick={onDelete} />
            </div>

        </div>
    );
}