define(["dust-runtime"],function (dust) {
	// page/think.dust
	(function(){dust.register("page/think",body_0);var blocks={'body':body_1};function body_0(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.partial("layout/default",ctx,null);}function body_1(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<div j-field=\".info\"><div class=\"row\"><div class=\"btn-group pull-left\">").section(ctx.get("npc"),ctx,{"block":body_2},null).write("<button class=\"btn btn-primary btn-get\">收获</button></div><div class=\"btn-group pull-right\"><button class=\"btn btn-default btn-batch\" budget=\"100000\">冥想10w</button><button class=\"btn btn-default btn-batch\" budget=\"200000\">冥想20w</button><button class=\"btn btn-default btn-batch\" budget=\"400000\">冥想40w</button><button class=\"btn btn-default btn-batch\" budget=\"800000\">冥想80w</button></div></div><hr><div class=\"list row\"><div class=\"col-sm-1 hidden-xs\">&nbsp;</div>").section(ctx.getPath(false,["info","list"]),ctx,{"block":body_4},null).write("</div></div>");}function body_2(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.notexists(ctx.get("disable"),ctx,{"block":body_3},null);}function body_3(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<button class=\"btn btn-info btn-think\" npc=\"").reference(ctx.get("id"),ctx,"h").write("\">").reference(ctx.get("name"),ctx,"h").write("</button>");}function body_4(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<div class=\"col-md-2 col-sm-2 col-xs-4 thumbnail\"><img src=\"").reference(ctx.get("img"),ctx,"h").write("\" alt=\"\"><p class=\"text-center\">").reference(ctx.get("name"),ctx,"h").write("<strong>").helper("gt",ctx,{"block":body_5},{"key":ctx.get("num"),"value":1}).write("</strong></p></div>").helper("math",ctx,{"block":body_6},{"key":ctx.get("$idx"),"method":"mod","operand":"5"});}function body_5(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("* ").reference(ctx.get("num"),ctx,"h");}function body_6(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.helper("eq",ctx,{"block":body_7},{"value":4});}function body_7(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<div class=\"clearfix hidden-xs\"></div><div class=\"col-sm-1 hidden-xs\">&nbsp;</div>");}return body_0;})();
	return "page/think";
});