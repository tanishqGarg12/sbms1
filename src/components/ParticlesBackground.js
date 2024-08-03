// ParticlesBackground.jsx
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
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container);
    };

    const options = useMemo(
        () => ({
            background: {
                color: {
                    value: darkMode ? "#000000" : "#ffffff", // White background in light mode
                },
            },
            fpsLimit: 120,
            particles: {
                number: {
                    value: 160,
                    density: {
                        enable: true,
                        value_area: 1500,
                    },
                },
                color: {
                    value: darkMode ? "#ffffff" : "#000000", // Particle color for contrast
                },
                line_linked: {
                    enable: false,
                    opacity: 0.03,
                },
                move: {
                    enable: true,
                    direction: "right",
                    speed: 0.9,
                },
                size: {
                    value: darkMode ? 1 : 1.75, // Increase particle size in light mode
                },
                opacity: {
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.5,
                    },
                },
            },
            interactivity: {
                events: {
                    onclick: {
                        enable: true,
                        mode: "push",
                    },
                },
                modes: {
                    push: {
                        particles_nb: 1,
                    },
                },
            },
            retina_detect: true,
        }),
        [darkMode]
    );

    return <Particles id={id} init={particlesLoaded} options={options} />;
};

export default ParticlesBackground;
