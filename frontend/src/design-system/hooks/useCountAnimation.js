// Hook para animación de conteo de números
import { useState, useEffect, useRef } from 'react';

export const useCountAnimation = (end, duration = 2000, start = 0, suffix = '') => {
  const [count, setCount] = useState(start);
  const countRef = useRef(null);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // Función para parsear el valor final
    const parseEndValue = () => {
      if (typeof end === 'number') return end;
      
      // Si es string, extraer el número
      const numMatch = end.toString().match(/[\d.]+/);
      if (numMatch) {
        return parseFloat(numMatch[0]);
      }
      return 0;
    };

    const endValue = parseEndValue();
    const startValue = start;

    // Función de animación usando requestAnimationFrame
    const animate = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      
      // Función de easing (ease-out-expo)
      const easeOutExpo = progress === 1 
        ? 1 
        : 1 - Math.pow(2, -10 * progress);
      
      const currentCount = startValue + (endValue - startValue) * easeOutExpo;
      
      // Formatear el número según el tipo
      const isInteger = Number.isInteger(endValue);
      const formattedCount = isInteger 
        ? Math.floor(currentCount) 
        : currentCount.toFixed(1);
      
      setCount(formattedCount);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Asegurar que el valor final sea exacto
        setCount(endValue);
      }
    };

    // Crear observer para detectar cuando el elemento es visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startTimeRef.current) {
            rafRef.current = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observar el elemento si existe
    if (countRef.current) {
      observer.observe(countRef.current);
    }

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
      startTimeRef.current = null;
    };
  }, [end, duration, start]);

  // Extraer el sufijo del valor original si existe
  const getSuffix = () => {
    if (suffix) return suffix;
    if (typeof end === 'string') {
      const match = end.match(/[^\d.]+$/);
      return match ? match[0] : '';
    }
    return '';
  };

  return {
    count,
    formattedValue: `${count}${getSuffix()}`,
    ref: countRef
  };
};

export default useCountAnimation;