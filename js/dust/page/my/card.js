define(["dust-runtime"],function (dust) {
	// page/my/card.dust
	(function(){dust.register("page/my/card",body_0);var blocks={'body':body_1};function body_0(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.partial("layout/default",ctx,null);}function body_1(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.partial("partial/myNav",ctx,{"cur":"card"}).write("<div j-field=\".Cards\"><div class=\"row\">").section(ctx.get("Cards"),ctx,{"else":body_2,"block":body_3},null).write("</div></div><div style=\"padding-bottom: 70px;\"></div><nav class=\"navbar navbar-default navbar-fixed-bottom\" role=\"navigation\"><ul class=\"nav navbar-nav\"> ").partial("partial/cardFilter",ctx,null).write("</ul></nav>");}function body_2(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("没有符合条件的卡片");}function body_3(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<div class=\"col-md-1 col-sm-2 col-xs-3\"><div class=\"thumbnail\">").partial("partial/card",ctx,{"card":ctx.getPath(true,[])}).write("</div></div>");}return body_0;})();
	return "page/my/card";
});