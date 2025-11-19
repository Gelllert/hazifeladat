import { useState, useEffect } from "react";
import { LeftPane } from "./LeftPane";
import { RightPane } from "./RightPane";
import { MainPane } from "./MainPane";
import { ButtonIcon } from "../assets/ButtonIcon";
import "../style/Main.css";

type ActivePane = "none" | "left" | "right";

export function Main() {
  const [activePane, setActivePane] = useState<ActivePane>("none");
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fn = () => setWidth(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const isL1 = width >= 1600;
  const isL2 = width < 1600 && width >= 1100;
  const isL3 = width < 1100;

  const back = () => setActivePane("none");

  return (
    <div className="MainLayout">

      {/* ---------------- HEADER ---------------- */}
      <div className="Header">
        <div className="TopButtons">
          {isL2 && activePane === "none" && (
            <ButtonIcon icon="bar_chart" label="Stats" onClick={() => setActivePane("right")} />
          )}

          {isL3 && activePane === "none" && (
            <>
              <ButtonIcon icon="inventory" label="Items" onClick={() => setActivePane("left")} />
              <ButtonIcon icon="bar_chart" label="Stats" onClick={() => setActivePane("right")} />
            </>
          )}
        </div>
      </div>

      {/* ------------------- CONTENT ------------------- */}
      <div className="ContentArea">
        {isL1 && (
          <>
            <LeftPane />
            <div className="MainContent"><MainPane /></div>
            <RightPane />
          </>
        )}

        {isL2 && activePane === "none" && (
          <>
            <LeftPane />
            <div className="MainContent"><MainPane /></div>
          </>
        )}

        {isL2 && activePane === "right" && (
          <>
            <div className="MainContent"><MainPane /></div>
            <RightPane onBack={back} />
          </>
        )}

        {isL3 && activePane === "none" && (
          <div className="MainContent"><MainPane /></div>
        )}

        {isL3 && activePane === "left" && <LeftPane onBack={back} />}
        {isL3 && activePane === "right" && <RightPane onBack={back} />}
      </div>
    </div>
  );
}
