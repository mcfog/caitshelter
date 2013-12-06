define(["dust-runtime"],function (dust) {
	// partial/deckeditor.dust
	(function(){dust.register("partial/deckeditor",body_0);var blocks={'localdeck_toolbar':body_2};function body_0(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<div j-field=\".deck\">").section(ctx.get("deck"),ctx,{"block":body_1},null).write("</div>");}function body_1(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.partial("partial/localdeck",ctx,null);}function body_2(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<button type=\"button\" class=\"btn btn-sm btn-primary btn-endedit\">结束编辑</button>");}return body_0;})();
	return "partial/deckeditor";
});