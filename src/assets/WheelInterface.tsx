import { useEffect, useState } from "preact/hooks";
import { ButtonIcon } from "./ButtonIcon";
import { wheelService } from "../services/WheelServices";
import { Wheel } from "./Wheel";
import { logService } from "../services/LogService";
import "../style/WheelInterface.css";


export function WheelInterface() {
    const [rotation, setRotation] = useState(0);
    const [state, setState] = useState<"idle" | "reset" | "spinning" | "finished">("idle");
    const [winner, setWinner] = useState(null);
    const [eliminate, setEliminate] = useState(false);
    const [entries, setEntries] = useState(wheelService.getEntries());


    useEffect(() => {
        const listener = () => setEntries([...wheelService.getEntries()]);
        wheelService.addListener(listener);
        return () => wheelService.removeListener(listener);
    }, []);

    async function spin() {
        if (state !== "idle") return;

        setState("reset");
        setWinner(null);


        await new Promise(res => setTimeout(res, 100));

        const result = wheelService.spinWheel(eliminate);

        if (!result || !result.winningEntry) {
            setState("idle");
            return;
        }


        const currentRotationMod = rotation % 360;
        const distanceToNextCircle = (360 - currentRotationMod) % 360;
        const extraSpins = Math.floor(Math.random() * 5 + 5) * 360;

        const finalDeg = rotation + distanceToNextCircle + result.rotation + extraSpins;



        setState("spinning");
        setRotation(finalDeg);

        await new Promise(res => setTimeout(res, 3100));

        if (eliminate && result.winningEntry) {
            wheelService.removeWinnerEntry(result.winningEntry.id);
        }

        if (result.winningEntry) {
            logService.addLog(result.winningEntry.name, eliminate, entries);
        }

        setWinner(result.winningEntry);
        setState("finished");
    }

    function reset() {
        if (state === "spinning") return;
        setWinner(null);
        setState("idle");
    }

    return (
        <div class="WheelInterface">

            <Wheel rotationDeg={rotation} entries={entries} />

            <div class="WheelControls">
                {state === "idle" && <ButtonIcon icon="rotate_right" onClick={spin} label="Spin" />}
                {state === "reset" && <div>Preparing…</div>}
                {state === "spinning" && <div>Spinning…</div>}
                {state === "finished" && (
                    <ButtonIcon icon="check_circle" label={`Winner: ${winner?.name}`} onClick={reset} />
                )}

                <label class="elim-toggle">
                    <input
                        type="checkbox"
                        checked={eliminate}
                        onInput={() => setEliminate(!eliminate)}
                    />
                    Elimination mode
                </label>
            </div>


        </div>
    );
}