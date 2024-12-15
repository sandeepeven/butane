function debounce (fn: Function, delay = 100) {;
  let timeout: NodeJS.Timeout;
  return (...args: []) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(self, args), delay)
  }
}

export default {
  debounce
}