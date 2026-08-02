const observerMap = new Map<string, Map<HTMLElement, (value: unknown) => void>>();

const Observer = {
  observe<T>(event: string, target: HTMLElement, handler: (value: T) => void) {
    const entries = observerMap.get(event) || new Map();
    entries.set(target, handler as (value: unknown) => void);
    observerMap.set(event, entries);
  },

  unobserve(event: string, target: HTMLElement) {
    const entries = observerMap.get(event);

    if (!entries) {
      return;
    }

    entries.delete(target);
    observerMap.set(event, entries);
  },

  notify<T>(event: string, value: T) {
    const entries = observerMap.get(event);

    if (!entries) {
      return;
    }

    for (const [, handler] of entries) {
      handler(value);
    }
  },
};

export default Observer;

