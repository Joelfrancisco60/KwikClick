import { useEffect, useRef } from "react";
import Main from "./Components/Main";
import video from "./Asset/VideoFondKwiKlick.mp4";
import "./App.sass";

function App() {
  const videoRef = useRef(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = true;
    vid.play().catch(() => {
      console.debug("Autoplay bloqué : attente interaction.");
    });

    const enableSound = () => {
      vid.muted = false;
      vid.play().catch(() => console.debug("Lecture avec son encore bloquée."));

      // retirer listeners
      ["click", "keydown", "touchstart", "mousemove"].forEach((ev) =>
        window.removeEventListener(ev, enableSound)
      );
    };

    ["click", "keydown", "touchstart", "mousemove"].forEach((ev) =>
      window.addEventListener(ev, enableSound, { once: true })
    );

    return () => {
      ["click", "keydown", "touchstart", "mousemove"].forEach((ev) =>
        window.removeEventListener(ev, enableSound)
      );
    };
  }, []);

  return (
    <div className="appContainer">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="videoBackground"
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="content">
        <Main />
      </div>
    </div>
  );
}

export default App;
