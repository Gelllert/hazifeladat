import { EditableWheelTitle } from "../assets/EditableWheelTitle";
import { WheelInterface } from "../assets/WheelInterface";

/**
 * A középső (fő) panel komponens.
 * Ez tartalmazza magát a szerencsekereket és a pörgetés vezérlőit (WheelInterface).
 * @returns {JSX.Element} A fő tartalom konténere.
 */
export function MainPane() {

    return (
        <div className="MainContent pane">
            <h3><EditableWheelTitle/></h3>
            <WheelInterface />
        </div>
    );
}