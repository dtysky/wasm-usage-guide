#include<stdint.h>
#include <emscripten.h>

extern "C" {

int add(int x, int y) {
  return x + y;
}

EMSCRIPTEN_KEEPALIVE
uint8_t* uint8ArrayAdd(uint8_t* array, uint8_t num, uint32_t size) {
    int i;
    for (i = 0; i < size; i += 1) {
        array[i] += num;
    }
    return array;
}


}
