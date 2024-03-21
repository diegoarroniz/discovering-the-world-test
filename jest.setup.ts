import "@testing-library/jest-dom"

if (typeof AbortSignal.timeout !== 'function') {
    AbortSignal.timeout = (ms) => {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), ms);
      return controller.signal;
    };
  }
  