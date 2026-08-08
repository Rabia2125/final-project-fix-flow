export function captureSentryError(error, context = {}) {
  console.error('[Sentry Error Captured]:', error, context);
  // Sentry production SDK integration hook
}