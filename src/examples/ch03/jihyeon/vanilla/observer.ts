const _observerMap = new Map<string, Map<any, (val: unknown) => void>>();

const Observer = {
  observe<T>(event: string, target: HTMLElement, handler: (val: T) => void) {
    const entires = _observerMap.get(event) || new Map();
    entires.set(target, handler);
    _observerMap.set(event, entires);
  },

  unobserve<T>(event: string, target: HTMLElement) {
    const entires = _observerMap.get(event);
    if (!entires) return;
    entires.delete(target);
    _observerMap.set(event, entires);
  },

  notify<T>(event: string, val: T) {
    const entires = _observerMap.get(event);
    if (entires) {
      for (const [, handler] of entires) {
        handler(val);
      }
    }
  },
};

export default Observer;
