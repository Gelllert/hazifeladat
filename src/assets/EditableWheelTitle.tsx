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

    if (title.toLowerCase().includes("gajdos")) {
        const body = document.body;
        const videoPath = 'warning_loop.mp4';
        const videoHTML = `<video src="${videoPath}" autoplay playsinline
                style="width: 100%; max-width: 800px; margin-bottom: 20px;"
            ></video>`;
        const errorHTML = `${videoHTML}
        <h1>Ah hell naahh</h1><p>Majd jövőre, meg ilyenek kolléga <p>(<b>inkább ne</b>) Jöjjön legközelebb. Az alkalmazás működése felfüggesztve. <p>Terminating session, meg ilyenek<h1>szevasz</h1></p></p></p>`;
        if (body) {
            body.innerHTML = '';
            body.style.margin = '0';
            body.style.display = 'flex';
            body.style.alignItems = 'center';
            body.style.justifyContent = 'center';
            body.style.minHeight = '100vh';
            body.style.minWidth = '100vw';
            body.style.backgroundColor = '#440000';
            body.style.color = 'white';
            body.style.flexDirection = 'column';
            body.style.textAlign = 'center';
            body.style.position = 'fixed';
            body.style.top = '0';
            body.style.left = '0';
            body.innerHTML = errorHTML;
        }

    } 

    return (
        <h1 class="WheelTitleDisplay" onClick={() => setIsEditing(true)}>
            {title.toUpperCase()}
        </h1>
    );
}