// Simulation d'un service d'analytics. Dans un vrai projet, ce serait Google Analytics, Mixpanel, etc.
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    console.log('Analytics Event:', eventName, properties);
    // Exemple: gtag('event', eventName, properties);
  };