import "../style/ButtonIcon.css"

export type ButtonIcon = {
    icon: string;
    label?: string;
    onClick: () => void;
}

export function ButtonIcon({ icon, label, onClick }: ButtonIcon) {
    return (
        <button type="button" class="ButtonIcon" onClick={onClick}>
            <span class="material-symbols-outlined">{icon}</span>
            {label && <span class="ButtonIconLabel">{label}</span>}
        </button>
    );
}