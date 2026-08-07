'use client';
import { useRef, useCallback } from 'react';

// Arrastre con el mouse sobre un contenedor de scroll horizontal.
// En pantallas táctiles el scroll nativo ya funciona; esto es para escritorio,
// donde sin arrastre habría que usar shift + rueda para recorrer la fila.
//
// El desplazamiento es INCREMENTAL (delta entre cada movimiento) y no absoluto
// respecto del punto donde empezó el arrastre. Es a propósito: en las filas con
// bucle infinito, el scrollLeft salta de golpe al cruzar el punto de costura, y
// un cálculo absoluto arrastraría ese salto de vuelta en el siguiente
// movimiento, produciendo un tirón. Con deltas, el salto pasa inadvertido.
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    isDragging.current = true;
    lastX.current = e.pageX;
    ref.current.classList.add('is-dragging');
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !ref.current) return;
    const dx = e.pageX - lastX.current;
    lastX.current = e.pageX;
    ref.current.scrollLeft -= dx * 1.4;
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    ref.current?.classList.remove('is-dragging');
  }, []);

  return {
    ref,
    handlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave: onMouseUp,
    },
  };
}
