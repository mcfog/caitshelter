define(["dust-runtime"],function (dust) {
	// page/fightrank.dust
	(function(){dust.register("page/fightrank",body_0);var blocks={'body':body_1};function body_0(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.partial("layout/default",ctx,null);}function body_1(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<div class=\"fight\" j-field=\".fight\">").notexists(ctx.get("fighting"),ctx,{"block":body_2},null).section(ctx.get("progress"),ctx,{"block":body_3},null).write("<ul>").section(ctx.get("result"),ctx,{"block":body_4},null).write("</ul></div>");}function body_2(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<div class=\"btn-group\"><button type=\"button\" class=\"btn btn-default btn-fight\" time=\"10\">10次</button><button type=\"button\" class=\"btn btn-default btn-fight\" time=\"30\">30次</button></div><hr>");}function body_3(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.reference(ctx.get("cur"),ctx,"h").write(" / ").reference(ctx.get("all"),ctx,"h");}function body_4(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<li>").reference(ctx.getPath(true,[]),ctx,"h").write("</li>");}return body_0;})();
	return "page/fightrank";
});