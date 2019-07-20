# wasm-usage-guide
Guides for generating and using wasm with different language(TypeScript, c++ and rust).

## Note

In current time, a project that show the best practice of webassembly with rust toolchain is here: [https://github.com/dtysky/gl-matrix-wasm](https://github.com/dtysky/gl-matrix-wasm).

## Overview

In current time, wasm(WebAssembly has been published in major broswers), And I find there are three languages could be compiled to it, they are **TypeScript**, **C++** and **Rust**. After some trials I make a summary that hope for helping all coders who want to use it (^ o ^) !  

In this projects, you will know how to compile different languages to wasm and how to use them in your projects, like **load**, **share methods** and **share memories**. 

## Test

Just run the `npm run dev` and open `localhost:8888`, then open the console to find the **exports** in your wasm modules.  

After view this page, you can also write your own wasm code and test them in this project, here are many npm scripts:  

1. build-ts: compile src/ts/test.ts to src/ts/test.wasm with **asc**  
2. build-cpp: compile src/cpp/test.cc to src/cpp/test.wasm with **clang**, **llc** and **binaryen** 
3. build-rust: compile src/rust/test.rs to src/rust/test.wasm with **rustc**, **llc** and **binaryen**  
4. build-cpp-es: compile src/cpp-es/test.cc to src/cpp-es/test.wasm with **emcc**  
5. build-rust-es: compile src/rust-es/test.rs to src/rust-es/test.wasm with **emcc**  

>Note: In current tine, you may need to open some flags in some broswer to enable wasm.

## Pure wasm

To get the pure wasm file, we need the **[Binaryen](https://github.com/WebAssembly/binaryen)**, it is a compiler and toolchain infrastructure library for WebAssembly.  

### TypeScript

There is a project which named **[assemblyscript](https://github.com/AssemblyScript/assemblyscript)** allow us to compile ts files to wasm. In descriptions, it could compiles strictly typed TypeScript to WebAssembly using Binaryen, there are many limitations of it, you can check theme here: [Limitations](https://github.com/AssemblyScript/assemblyscript/wiki/Limitations).   

>Note: Actually, this project is not completed now, so it just can be used for some simple scene in current time.

Let's start with following shell:  

```bash
$> git clone https://github.com/AssemblyScript/assemblyscript.git
$> cd assemblyscript
$> npm install
$> npm link
```

>Note: For chinese developers who use cnpm, some libs may not be installed, please use the `npm mirror`.

After 'link', you could use `asc yourModule.ts -b yourModule.wasm -t yourModule.wast` to generate wasm file '*.wasm' and ast file '*.wast'.

Then you could use a function `loadWasm`(See src/loaders.ts) to load it, and use the methods and others your has written.

### C++

At first, you should ensure the **clang**, **[llvm with wasm support](https://gist.github.com/yurydelendik/4eeff8248aeb14ce763e)** has been installed, and then we will install **Binaryen**:  

```bash
git clone https://github.com/WebAssembly/binaryen.git
cd binaryen
cmake . && make
```

Then add your **binaryen/bin** path to `PATH` variables.

After these, write your own c++ code(like src/cpp/test.cc) and compile it!  

```bash
clang++ --target=wasm32 yourCode.cpp -emit-llvm -o yourCode.bc -c
llc --march=wasm32 -filetype=asm yourCode.bc -o yourCode.s
s2wasm yourCode.s >yourCode.wast
wasm-as yourCode.wast >yourCode.wasm
```

Then, we can use `loadWasm` to load this file.

### Rust

Ensure you have installed the **recent version of rustc**, then write your code like **src/rust/test.rs**.

Now you can compile your rs code into llvm bitcode:  

```bash
rustc --crate-type=lib --emit=llvm-bc yourCode.rs -o yourCode.bc
```

After execute this, your will get a file **yourCode.bc**, the next steps are as same as those in C++:  

```bash
llc --match=wasm32 -filetype=asm yourCode.bc -o yourCode.s
s2wasm yourCode.s >yourCode.wast
wasm-as yourCode.wast >yourCode.wasm
```

Then, we can use `loadWasm` to load this file.  

Now, rustc supports another method to generate pure wasm file, please see here for resolution: [Rust for the Web](https://www.hellorust.com/setup/wasm-target/):  

```bash
rustc --target wasm32-unknown-unknown yourCode.rs -o yourCode.wasm
```

For reducing the size of file, your need to install **wasm-gc**:  

```bash
cargo install --git https://github.com/alexcrichton/wasm-gc
wasm-gc yourCode.wasm small-yourCode.wasm
```

## With Emscripten

For c++ and rust, we also have a way to compile cpp and rust to wasm, it needs **[Emscripten](https://github.com/kripken/emscripten)**. Emscripten is an **LLVM-to-JavaScript** compiler, but with Binaryen, it could also generate wasm code. 

It also provides some pre-defined methods to let us use wasm easily, like `malloc`, `free`...

See here for installation: [Download and install](http://kripken.github.io/emscripten-site/docs/getting_started/downloads.html).

### C++

After installing and linking, we can use the command `emcc` to compile our c++ files to wasm, usually, we need emcc to generate a **wasm** file and a **js** file with following command:  

```bash
emcc yourCode.cc -o yourCode.js -s EXPORTED_FUNCTIONS='["_add"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' -s WASM=1
```

>Note: You should use the **c link rule** for your methods which need be exported in  c++ files, like **src/cpp-rs/test.cc**.

Now, we get a **yourCode.js** file and a **yourCode.wasm** file, you can put the js file into your html header with a script tag, then the function name `main` in cpp file will be executed and your can use `Module.cwrap` to warp your methods in cpp for using in js file:  

```ts
const add = module.cwrap('add', 'number', ['number', 'number']);
// output: 2
add(1, 1)
```

>Note: If you do not want to use `cwrap` and `ccall`, just include `<emscripten.h>` and put `EMSCRIPTEN_KEEPALIVE` into the front of your function in cpp file and use it in js by `_yourFunction`, in this way, you do not need **EXPORTED_FUNCTIONS='["_add"]'** and **EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'** options.

It looks good and all have done, but in general we expect a **Module** more the just a **script**, so we can put the prefix and postfix code into the js file generated by emcc, then we will get a factory function:  

```bash
emcc --pre-js src/cpp-es/pre.js --post-js src/cpp-es/post.js src/cpp-es/test.cc -o src/cpp-es/test.js -s EXPORTED_FUNCTIONS='["_add"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' -s WASM=1
```

>Note: you can find the pre.js and post.js in **src/cpp-es/pre.js** and **src/cpp-es/post.js**.

This command will generate a file like:  

```js
function getCurrentWasmModule() {
  return function(Module) {
    ......
    return Module;
  }
```

Then, we just need to load this js file and call function getCurrentWasmModule, check  function `loadEmscriptenJS` in file **src/loader**.

>Note: In this way, your should manage your file path yourself, like .wasm file, .wast file...Emscripten provide a method to definite them:  

```ts
const WasmModule = {locateFile: (url: string) => `/cpp-es/${url}`};
window.getCurrentWasmModule()(WasmModule);
```

Just implement the member method `locateFile` and all will be done.

#### Side module

If you do not need a js file(which conten this emscripten runtime), that means you just want a stand-alone wasm file like using **clang -> llvm -> binaryen** toolchain. A signal `SIDE_MODULE` will help you, just run this command: 

```bash
emcc --pre-js src/cpp-es/pre.js --post-js src/cpp-es/post.js src/cpp-es/test.cc -o src/cpp-es/test.wasm -s EXPORTED_FUNCTIONS='["_add"]' -s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' -s WASM=1 -s  SIDE_MODULE=1
```

Then you will get a stand-alone wasm file and you could load it with `loadWasm` function, but notice that this wasm module may require some dependencies like `env.memory`...

### Rust

At first, ensure you install the toolchain **nightly** and add **wasm32-unknown-emscripten** and **asmjs-unknown-emscripten** target for it by rustc:  

```bash
rustup toolchain add nightly
rustup target add asmjs-unknown-emscripten --toolchain nightly
rustup target add wasm32-unknown-emscripten --toolchain nightly
```

Then, write your rust file like **src/rust-es.test.rs**(do not forget `main` function)m and compile it:  

```bash
rustc --target wasm32-unknown-emscripten yourCode.rs -o yourCode.js
```

All will be done after a moment, then you could load it like in c++, use your rust function like `module._add`.  

>Note: I don't find the way to pass options from rustc to emcc, so you should concat pre.js post.js and yourCode.js by yourself.

## Share methods from js to wasm

In some scenes, you may want to use some js methods like `console.log` in your wasm file:  

```c++
void jsLog(int num);
int main {
  jsLog(1);
}
```

For doing this, we just need to create an `importsObject` when instantiating a wasm module:  

```ts
WebAssembly.instantiate(buf, {env: {jsLog: console.log}});
```

## Share memories

Pass a number between js and wasm is not hard, but how can we pass a js array(like Int32Array, Uint8Array...) to wasm?

### With Emscripten

If you use emscripten, it implement two methods `_malloc` and `_free` to manage memories. Following code show us how to use them and other methods to pass a array from js to wasm:

```cpp
// test.cc
#include<stdint.h>
#include <stdio.h>

extern "C" {

uint8_t* colorInvert(uint8_t* data, uint32_t size) {
    int max = 255;
    int i;
    for (i = 0; i < size; i += 4) {
        data[i] = max - data[i];
        data[i + 1] = max - data[i + 1];
        data[i + 2] = max - data[i + 2];
        data[i + 3] = max - data[i + 3];
    }
    return data;
}

}
```

```ts
// index.ts
const wasmColorInvert = Module.cwrap('colorInvert', 'number', ['number']);
const data = (new Uint8Array(128)).fill(100);
const nByte = 1;

// malloc, get pointer
const ptr = Module._malloc(data.length * nByte);
// copy data from js array to heap
Module.HEAPU8.set(data, ptr / nByte);
// run method and get pointer
const resPtr = wasmColorInvert(ptr, data.length / nByte);
const pos = resPtr / nByte;
// copy data from heap to js array
const resData = Module.HEAPU8.subarray(pos, pos + data.length);
// free
Module._free(ptr);
Module._free(resPtr);

// [155, 155, ......]
console.log(resData);
```

### Without Emscripten

If your do not want to use emcc, please check [WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Memory) and [wasm-intro](https://github.com/guybedford/wasm-intro) to get more information.  

## With Webpack

Actually, using `fetch` to request wasm file and load it is not necessary, we can read a wasm file as a binary file and put it into our js file in packaging phase.  

Yeah, you get it - with the help of webpack loaders, we can do this. There are many loaders such as **wasm-loader**, **rust-wasm-loader**...You can also write your own one, it's very easy !
