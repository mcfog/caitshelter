define(["dust-runtime"],function (dust) {
	// page/map.dust
	(function(){dust.register("page/map",body_0);var blocks={'body':body_1};function body_0(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.partial("layout/default",ctx,null);}function body_1(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<div j-field=\".stages\">").section(ctx.get("stages"),ctx,{"block":body_2},null).write("</div>");}function body_2(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<div class=\"row\">").section(ctx.get("maps"),ctx,{"block":body_3},null).write("</div><hr>");}function body_3(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<div class=\"thumbnail col-md-3 col-xs-6\"><h4 class=\"clearfix\"><span class=\"pull-left\">").reference(ctx.get("stage"),ctx,"h").write("-").helper("math",ctx,{},{"method":"add","key":ctx.get("$idx"),"operand":"1"}).write("&nbsp;</span><small class=\"label label-default pull-right\">").reference(ctx.get("FinishedStage"),ctx,"h").write("★</small></h4><div class=\"btn-group\"><button class=\"btn btn-sm btn-success\">探索</button>").helper("gt",ctx,{"block":body_4},{"key":ctx.get("CounterAttackTime"),"value":"0"}).write("</div></div>");}function body_4(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<button class=\"btn btn-sm btn-default\">清除侵略</button>");}return body_0;})();
	return "page/map";
});