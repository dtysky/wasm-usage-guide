	.text
	.file	"test.cc"
	.hidden	add                     # -- Begin function add
	.globl	add
	.type	add,@function
add:                                    # @add
	.param  	i32, i32
	.result 	i32
	.local  	i32
# %bb.0:
	i32.const	$push2=, 0
	i32.load	$push1=, __stack_pointer($pop2)
	i32.const	$push3=, 16
	i32.sub 	$2=, $pop1, $pop3
	i32.store	12($2), $0
	i32.store	8($2), $1
	i32.add 	$push0=, $0, $1
                                        # fallthrough-return: $pop0
	.endfunc
.Lfunc_end0:
	.size	add, .Lfunc_end0-add
                                        # -- End function

	.ident	"Apple LLVM version 9.0.0 (clang-900.0.39.2)"
