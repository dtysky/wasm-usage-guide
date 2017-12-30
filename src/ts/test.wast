(module
 (type $FFF (func (param f64 f64) (result f64)))
 (global $HEAP_BASE i32 (i32.const 4))
 (memory $0 1)
 (export "add" (func $src/ts/test/add))
 (export "memory" (memory $0))
 (func $src/ts/test/add (; 0 ;) (type $FFF) (param $0 f64) (param $1 f64) (result f64)
  (return
   (f64.add
    (get_local $0)
    (get_local $1)
   )
  )
 )
)
