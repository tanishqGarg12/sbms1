import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState, useContext } from "react";
import { loadSlim } from "@tsparticles/slim";
import { DarkModeContext } from "../DarkModeContext";

const ParticlesBackground = ({ id }) => {
    const { darkMode } = useContext(DarkModeContext);
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setInit(true));
    }, []);

    const options = useMemo(
        () => ({
            fullScreen: { enable: false },
            background: { color: { value: "transparent" } },
            fpsLimit: 120,
            particles: {
                number: { value: 30, density: { enable: true, value_area: 1500 } },
                color: { value: darkMode ? "#ffffff" : "#000000" },
                line_linked: { enable: false },
                move: { enable: true, direction: "right", speed: 0.5 },
                size: { value: darkMode ? 1 : 1.5 },
                opacity: { value: 0.3, anim: { enable: true, speed: 0.5, opacity_min: 0.1 } },
            },
            interactivity: { events: { onclick: { enable: false }, onhover: { enable: false } } },
            retina_detect: true,
        }),
        [darkMode]
    );

    if (!init) return null;

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
            <Particles id={id} options={options} style={{ width: '100%', height: '100%', pointerEvents: 'none' }} />
        </div>
    );
};

export default ParticlesBackground;
