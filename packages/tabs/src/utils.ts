export function debounce(func, wait = 200, immediate = false) {
  let timeout;
  return function () {
    var later = () => {
      timeout = null;
      // @ts-ignore
      if (!immediate) func.apply(this, arguments);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    // @ts-ignore
    if (callNow) func.apply(this, arguments);
  };
}
