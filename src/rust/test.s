	.text
	.file	"test0-8787f43e282added376259c1adb08b80.rs"
	.globl	add                     # -- Begin function add
	.type	add,@function
add:                                    # @add
	.param  	i32, i32
	.result 	i32
# %bb.0:                                # %start
	i32.add 	$push0=, $1, $0
                                        # fallthrough-return: $pop0
	.endfunc
.Lfunc_end0:
	.size	add, .Lfunc_end0-add
                                        # -- End function

