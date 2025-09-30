import { RefObject, useLayoutEffect } from "react";

interface UseResizeObserverOptions {
  /**
   * Callback функция, вызываемая при изменении размеров элемента
   */
  onResize?: (entry: ResizeObserverEntry) => void;
  /**
   * Опции для ResizeObserver
   */
  observerOptions?: ResizeObserverOptions;
}

export function useResizeObserver(
  elementRef: RefObject<HTMLElement | null>,
  options:
    | UseResizeObserverOptions
    | ((entry: ResizeObserverEntry) => void) = {},
  deps: unknown[] = []
): void {
  useLayoutEffect(() => {
    const element = elementRef.current;

    // Если элемента нет или ResizeObserver не поддерживается
    if (!element || !("ResizeObserver" in window)) {
      return;
    }

    // Обрабатываем разные форматы параметров
    const callback = typeof options === "function" ? options : options.onResize;
    const observerOptions =
      typeof options === "function" ? undefined : options.observerOptions;

    if (!callback) {
      return;
    }

    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        // Вызываем callback для каждой записи
        entries.forEach((entry) => {
          callback(entry);
        });
      }
    );

    // Начинаем наблюдение
    resizeObserver.observe(element, observerOptions);

    // Вызываем callback сразу с текущими размерами
    const rect = element.getBoundingClientRect();
    const initialEntry: ResizeObserverEntry = {
      target: element,
      contentRect: rect,
      borderBoxSize: [{ inlineSize: rect.width, blockSize: rect.height }],
      contentBoxSize: [{ inlineSize: rect.width, blockSize: rect.height }],
      devicePixelContentBoxSize: [
        { inlineSize: rect.width, blockSize: rect.height },
      ],
    } as ResizeObserverEntry;

    callback(initialEntry);

    // Очистка
    return () => {
      resizeObserver.unobserve(element);
      resizeObserver.disconnect();
    };
  }, [elementRef, ...deps]);
}
