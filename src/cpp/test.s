	.text
	.file	"test.cc"
	.hidden	add                     # -- Begin function add
	.globl	add
	.type	add,@function
add:                                    # @add
	.param  	i32, i32
	.result 	i32
# %bb.0:
	i32.add 	$push0=, $1, $0
                                        # fallthrough-return: $pop0
	.endfunc
.Lfunc_end0:
	.size	add, .Lfunc_end0-add
                                        # -- End function

	.ident	"Apple LLVM version 9.0.0 (clang-900.0.39.2)"
