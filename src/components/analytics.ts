export function trackEvent(name: string, props?: Record<string, unknown>) {
  if (
    typeof window !== "undefined" &&
    (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
  ) {
    (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.(
      "event",
      name,
      props,
    );
  }
}
