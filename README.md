# wasm-usage-guide
Guides for generating and using wasm with different language(TypeScript, c++ and rust).

## Overview

In current time, wasm(WebAssembly has been published in major broswers), And I find there are three languages could be compiled to it, they are **TypeScript**, **C++** and **Rust**. After some trials I make a summary that hope for helping all coders who want to use it (^ o ^) !  

In this projects, you will know how to compile different languages to wasm and how to use them in your projects, like **load**, **call**, **wrap** and **pass array from js to wasm**. 

## Test

just run the `npm run dev` and open `localhost:8888`, then open the console to find the **exports** in your wasm modules.  

After view this page, you can also write your own wasm code and test them in this project.  

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

## With Emscripten

For c++ and rust, we also have a way to compile cpp and rust to wasm, it needs **[Emscripten](https://github.com/kripken/emscripten)**. Emscripten is an **LLVM-to-JavaScript** compiler, but with Binaryen, it could also generate wasm code. 

It also provides some pre-defined methods to let us use wasm easily, like `malloc`, `free`...

See here for installation: [Download and install](http://kripken.github.io/emscripten-site/docs/getting_started/downloads.html).

### C++

### Rust

## With Webpack

### TypeScript

### C++

### Rust

## Pass array from js to wasm

