define(["dust-runtime"],function (dust) {
	// page/home.dust
	(function(){dust.register("page/home",body_0);var blocks={'body':body_1};function body_0(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.partial("layout/default",ctx,null);}function body_1(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("↑ ↑ 看上面↑ ↑ ");}return body_0;})();
	return "page/home";
});