import { useState } from "preact/hooks";
import "../style/EditableWheelTitle.css";
/**
 * Kezeli a szerencsekerék fölött megjelenő, szerkeszthető címet.
 * State-et használ a szerkesztési mód (isEditing) és a cím szövegének kezelésére.
 * Fókuszvesztéskor (onBlur) visszaállítja a címet.
 * @returns {JSX.Element} A szerkeszthető cím UI eleme.
 */
export function EditableWheelTitle() {
    const [title, setTitle] = useState("Bemész, megrakod, elbukod");
    const [isEditing, setIsEditing] = useState(false);

    const handleBlur = () => {
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <input
                type="text"
                value={title.toUpperCase()}
                onChange={(e) => setTitle(e.currentTarget.value)}
                onBlur={handleBlur}
                autoFocus
                class="WheelTitleInput"
                maxLength={40}
            />
        );
    }

    return (
        <h1 class="WheelTitleDisplay" onClick={() => setIsEditing(true)}>
            {title.toUpperCase()}
        </h1>
    );
}