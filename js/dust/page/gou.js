define(["dust-runtime"],function (dust) {
	// page/gou.dust
	(function(){dust.register("page/gou",body_0);var blocks={'body':body_1};function body_0(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.partial("layout/default",ctx,null);}function body_1(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<h3>狗粮批发，没有发票</h3><div class=\"buy\" j-field=\".buy\">").notexists(ctx.get("buying"),ctx,{"block":body_2},null).section(ctx.get("progress"),ctx,{"block":body_3},null).write("</div>");}function body_2(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<div class=\"btn-group\"><button type=\"button\" class=\"btn btn-default btn-buy\" time=\"5\">5包</button><button type=\"button\" class=\"btn btn-default btn-buy\" time=\"10\">10包</button><button type=\"button\" class=\"btn btn-default btn-buy\" time=\"10\">20包</button><button type=\"button\" class=\"btn btn-default btn-buy\" time=\"40\">40包</button><button type=\"button\" class=\"btn btn-default btn-buy\" time=\"80\">80包</button></div><hr>");}function body_3(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.reference(ctx.get("cur"),ctx,"h").write(" / ").reference(ctx.get("all"),ctx,"h");}return body_0;})();
	return "page/gou";
});