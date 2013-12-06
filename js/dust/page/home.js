define(["dust-runtime"],function (dust) {
	// page/home.dust
	(function(){dust.register("page/home",body_0);var blocks={'body':body_1};function body_0(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.partial("layout/default",ctx,null);}function body_1(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<div class=\"row\"><a href=\"#gou\" class=\"btn btn-default\">批发狗粮</a><a href=\"#friend\" class=\"btn btn-default\">好友列表</a><a href=\"#emufight\" class=\"btn btn-default\">战斗模拟</a></div>");}return body_0;})();
	return "page/home";
});