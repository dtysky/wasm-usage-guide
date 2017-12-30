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

export const loadEmscriptenJS = (url: string) => {

}
