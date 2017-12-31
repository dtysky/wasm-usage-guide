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
    <button onClick={() => load('/cpp-es/test.wasm')}>C++</button>
    <button onClick={() => load('/rust/test.wasm')}>Rust</button>
    <button
      onClick={() => load('/cpp-es/test.js', {}, '/cpp-es')
        .then(module => {
          const exportsObj: any = {};
          exportsObj.add = module.cwrap('add', 'number', ['number', 'number']);
          exportsObj.uint8ArrayAdd = module._uint8ArrayAdd;
          console.log(module, exportsObj);

          const array1 = (new Uint8ClampedArray(100)).fill(10);
          const array2 = (new Uint8ClampedArray(100)).fill(20);
          const nByte = 1;
    
          const ptr1 = module._malloc(array1.length * nByte);
          const ptr2 = module._malloc(array2.length * nByte);
          module.HEAPU8.set(array1, ptr1 / nByte);
          module.HEAPU8.set(array2, ptr2 / nByte);
          const resPtr = exportsObj.uint8ArrayAdd(ptr1, ptr2, array1.length / nByte);
          const pos = resPtr / nByte;
          const resData = module.HEAPU8.subarray(pos, pos + array1.length);
          module._free(ptr1);
          module._free(ptr2);
          module._free(resPtr);
          console.log(resData);
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
