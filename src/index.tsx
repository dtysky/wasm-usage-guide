/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 30 Dec 2017
 * Description:
 */
import * as React from 'react';
import {render} from 'react-dom';

import {loadWasm, loadEmscriptenJS} from './loaders';

const load = (url: string, importsObj: any = {}) => {
  const tmp = url.split('.');
  const ext = tmp[tmp.length - 1];
  if (ext === 'wasm') {
    return loadWasm(url, importsObj)
      .then(instance => {
        console.log(instance.exports);
      });
  } 
  return loadEmscriptenJS(url);
}

const Main = () => (
  <React.Fragment>
    <button onClick={() => load('/ts/test.wasm')}>TypeScript</button>
    <button onClick={() => load('/cpp/test.wasm')}>C++</button>
    <button onClick={() => load('/rust/test.wasm', {env: {
        '_ZN4core9panicking5panic17hf36e914ff6fb4fe4E': () => {}
    }})}>Rust</button>
  </React.Fragment>
);

render(<Main />, document.getElementById('container'));
