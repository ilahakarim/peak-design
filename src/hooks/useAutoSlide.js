// src/hooks/useAutoSlide.js
// Bölmə ekranda görünəndə şəkilləri avtomatik dəyişdirən sadə hook.
// count  = neçə şəkil var
// delay  = neçə millisaniyədə bir dəyişsin (default 2000ms)
import { useState, useEffect, useRef } from "react";

function useAutoSlide(count, delay = 2000) {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef(null);
    const hasStarted = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const isVisible = entries[0].isIntersecting;
                if (isVisible && !hasStarted.current) {
                    hasStarted.current = true;
                    setInterval(() => {
                        setActiveIndex((prev) => (prev + 1) % count);
                    }, delay);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [count, delay]);

    return { activeIndex, sectionRef };
}

export default useAutoSlide;