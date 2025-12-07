import "../style/ButtonIcon.css"

/**
 * A gomb komponens tulajdonságainak definíciója.
 * @typedef {object} ButtonIconProp 
 * @property {string} icon - A Material Symbols ikon neve (pl. 'add', 'delete').
 * @property {string} [label] - Opcionális szöveg a gombhoz.
 * @property {() => void} onClick - Eseménykezelő a kattintáshoz.
 */
export type ButtonIconProp = {
    icon: string;
    label?: string;
    onClick: () => void;
    variant?: 'default' | 'add' | 'delete' | 'spin' | 'nav';
}
/**
 * Egy ikon és szöveg alkotta gomb.
 * @param icon megjelenített googlefont ikon.
 * @param label szöveg a gomb mellett.
 * @param onClick gomb viselkedése, a button onClick eseménye. 
 * @returns 
 */
export function ButtonIcon({ icon, label, onClick, variant = 'default' }: ButtonIconProp) {
    return (
        <button type="button" class={`ButtonIcon ButtonIcon--${variant}`} onClick={onClick}>
            <span class="material-symbols-outlined">{icon}</span>
            {label && <span class="ButtonIconLabel">{label}</span>}
        </button>
    );
}