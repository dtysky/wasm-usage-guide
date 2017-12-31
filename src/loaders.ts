/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 29 Dec 2017
 * Description:
 */
export const loadWasm = (url: string, importsObject: any = {}) => {
  return fetch(url).then(response => {
    return response.arrayBuffer();
  }).then(bytes => {
    return WebAssembly.instantiate(bytes, importsObject)
  }).then(results => {
    return results.instance
  });
}

declare const window: any;
export const loadEmscriptenJS = (url: string, path: string) => {
  return getScript(url)
    .then(() => {
      const WasmModule = {locateFile: (url: string) => `${path}/${url}`};
      window.getCurrentWasmModule()(WasmModule);
      return WasmModule;
    })
}

function getScript (src: string) {
  return new Promise(resolve => {
    const script: any = document.createElement('script');
    const prior = document.getElementsByTagName('script')[0];
    script.async = true;
    prior.parentNode.insertBefore(script, prior);
  
    script.onload = script.onreadystatechange = (_: HTMLElement, isAbort: Event) => {
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onload = script.onreadystatechange = null;
  
        if (!isAbort) {
          return resolve();
        }
      }
    };
  
    script.src = src;
  })
};
