(module
 (type $FUNCSIG$vi (func (param i32)))
 (import "env" "_ZN4core9panicking5panic17hf36e914ff6fb4fe4E" (func $_ZN4core9panicking5panic17hf36e914ff6fb4fe4E (param i32)))
 (table 0 anyfunc)
 (memory $0 1)
 (data (i32.const 16) "src/rust/test.rs")
 (data (i32.const 32) "attempt to add with overflow")
 (data (i32.const 64) " \00\00\00\00\00\00\00\1c\00\00\00\00\00\00\00\10\00\00\00\00\00\00\00\10\00\00\00\00\00\00\00\03\00\00\00\0c\00\00\00")
 (export "memory" (memory $0))
 (export "add" (func $add))
 (func $add (; 1 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (set_local $4
   (i32.gt_s
    (get_local $0)
    (i32.const -1)
   )
  )
  (set_local $3
   (i32.add
    (get_local $0)
    (get_local $1)
   )
  )
  (set_local $0
   (i32.gt_s
    (get_local $3)
    (i32.const -1)
   )
  )
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.and
      (i32.eq
       (get_local $4)
       (i32.gt_s
        (get_local $1)
        (i32.const -1)
       )
      )
      (i32.ne
       (get_local $4)
       (get_local $0)
      )
     )
    )
    (set_local $1
     (i32.add
      (get_local $3)
      (get_local $2)
     )
    )
    (br_if $label$0
     (i32.and
      (i32.eq
       (get_local $0)
       (i32.gt_s
        (get_local $2)
        (i32.const -1)
       )
      )
      (i32.ne
       (get_local $0)
       (i32.gt_s
        (get_local $1)
        (i32.const -1)
       )
      )
     )
    )
    (return
     (get_local $1)
    )
   )
   (call $_ZN4core9panicking5panic17hf36e914ff6fb4fe4E
    (i32.const 64)
   )
   (unreachable)
  )
  (call $_ZN4core9panicking5panic17hf36e914ff6fb4fe4E
   (i32.const 64)
  )
  (unreachable)
 )
)
