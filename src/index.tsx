/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 30 Dec 2017
 * Description:
 */
import * as React from 'react';
import {render} from 'react-dom';

import {loadWasm, loadEmscriptenJS} from './loaders';

const load = (url: string, importsObj: any = {}, path: string = ''): Promise<any> => {
  const tmp = url.split('.');
  const ext = tmp[tmp.length - 1];
  if (ext === 'wasm') {
    return loadWasm(url, importsObj)
      .then(instance => {
        console.log(instance.exports);
      });
  } 
  return loadEmscriptenJS(url, path);
}

const Main = () => (
  <React.Fragment>
    <button onClick={() => load('/ts/test.wasm')}>TypeScript</button>
    <button onClick={() => load('/cpp/test.wasm')}>C++</button>
    <button onClick={() => load('/rust/test.wasm')}>Rust</button>
    <button
      onClick={() => load('/cpp-es/test.js', {}, '/cpp-es')
        .then(module => {
          const exportsObj: any = {};
          exportsObj.add = module.cwrap('add', 'number', ['number', 'number']);
          exportsObj.uint8ArrayAdd = module._uint8ArrayAdd;
          console.log(module, exportsObj);

          const array = (new Uint8ClampedArray(100)).fill(10);
          const nByte = 1;
    
          setTimeout(
            () => {
              const ptr1 = module._malloc(array.length * nByte);
              module.HEAPU8.set(array, ptr1 / nByte);
              const resPtr = exportsObj.uint8ArrayAdd(ptr1, 40, array.length / nByte);
              const pos = resPtr / nByte;
              const resData = module.HEAPU8.subarray(pos, pos + array.length);
              module._free(ptr1);
              module._free(resPtr);
              console.log(resData);
            },
            1000
          )
        })
      }
    >
      C++ with Emscripten
    </button>
    <button
      onClick={() => load('/rust-es/test.js', {}, '/rust-es')
        .then(module => {
          const exportsObj: any = {};
          exportsObj.add = module._add;
          console.log(module, exportsObj);
        })
      }
    >
      Rust with Emscripten
    </button>
  </React.Fragment>
);

render(<Main />, document.getElementById('container'));
