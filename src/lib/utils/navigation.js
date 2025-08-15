let navigator = null;

export function setNavigator(navFn) {
  navigator = navFn;
}

export function navigate(...args) {
  if (navigator) navigator(...args);
}
