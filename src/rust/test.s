	.text
	.file	"test0-8787f43e282added376259c1adb08b80.rs"
	.globl	add                     # -- Begin function add
	.type	add,@function
add:                                    # @add
	.param  	i32, i32, i32
	.result 	i32
	.local  	i32, i32
# %bb.0:                                # %start
	i32.const	$push13=, -1
	i32.gt_s	$4=, $0, $pop13
	i32.add 	$3=, $0, $1
	i32.const	$push12=, -1
	i32.gt_s	$0=, $3, $pop12
	block   	
	block   	
	i32.const	$push11=, -1
	i32.gt_s	$push0=, $1, $pop11
	i32.eq  	$push1=, $4, $pop0
	i32.ne  	$push2=, $4, $0
	i32.and 	$push3=, $pop1, $pop2
	br_if   	0, $pop3        # 0: down to label1
# %bb.1:                                # %bb1
	i32.add 	$1=, $3, $2
	i32.const	$push15=, -1
	i32.gt_s	$push4=, $2, $pop15
	i32.eq  	$push5=, $0, $pop4
	i32.const	$push14=, -1
	i32.gt_s	$push6=, $1, $pop14
	i32.ne  	$push7=, $0, $pop6
	i32.and 	$push8=, $pop5, $pop7
	br_if   	1, $pop8        # 1: down to label0
# %bb.2:                                # %bb2
	return  	$1
.LBB0_3:                                # %panic
	end_block                       # label1:
	i32.const	$push10=, .Lpanic_loc.2
	call    	_ZN4core9panicking5panic17hf36e914ff6fb4fe4E@FUNCTION, $pop10
	unreachable
.LBB0_4:                                # %panic1
	end_block                       # label0:
	i32.const	$push9=, .Lpanic_loc.2
	call    	_ZN4core9panicking5panic17hf36e914ff6fb4fe4E@FUNCTION, $pop9
	unreachable
	.endfunc
.Lfunc_end0:
	.size	add, .Lfunc_end0-add
                                        # -- End function
	.type	str.0,@object           # @str.0
	.section	.rodata,"a",@progbits
str.0:
	.ascii	"src/rust/test.rs"
	.size	str.0, 16

	.type	str.1,@object           # @str.1
	.p2align	4
str.1:
	.ascii	"attempt to add with overflow"
	.size	str.1, 28

	.type	.Lpanic_loc.2,@object   # @panic_loc.2
	.section	.data.rel.ro,"aw",@progbits
	.p2align	3
.Lpanic_loc.2:
	.int32	str.1
	.skip	4
	.int64	28                      # 0x1c
	.int32	str.0
	.skip	4
	.int64	16                      # 0x10
	.int32	3                       # 0x3
	.int32	12                      # 0xc
	.size	.Lpanic_loc.2, 40


	.functype	_ZN4core9panicking5panic17hf36e914ff6fb4fe4E, void, i32
