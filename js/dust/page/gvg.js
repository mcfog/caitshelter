define(["dust-runtime"],function (dust) {
	// page/gvg.dust
	(function(){dust.register("page/gvg",body_0);var blocks={'body':body_1};function body_0(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.partial("layout/default",ctx,null);}function body_1(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<div class=\"info\" j-field=\".info\">").section(ctx.get("info"),ctx,{"else":body_2,"block":body_3},null).write("</div>");}function body_2(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<h3>暂无团战</h3>");}function body_3(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<div class=\"jumbotron\" mid=\"Id\"><h2>").section(ctx.get("LegionName"),ctx,{"else":body_4,"block":body_5},null).write("</h2><h3>").reference(ctx.get("Name"),ctx,"h").write(" @ ").reference(ctx.get("Time"),ctx,"h").write("</h3><div class=\"btn-group\">").notexists(ctx.get("LegionName"),ctx,{"block":body_6},null).write("<!-- <button class=\"btn btn-warning btn-fight\">查看结果</button> --></div></div>").section(ctx.get("member"),ctx,{"block":body_9},null);}function body_4(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.reference(ctx.getPath(false,["AttackLegion","Name"]),ctx,"h").write(" vs. ").reference(ctx.getPath(false,["DefendLegion","Name"]),ctx,"h");}function body_5(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<strong class=\"text-danger\">胜利者</strong>").reference(ctx.getPath(true,[]),ctx,"h");}function body_6(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.section(ctx.get("IsJoin"),ctx,{"else":body_7,"block":body_8},null);}function body_7(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<button class=\"btn btn-primary btn-join\">参战</button>");}function body_8(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<button class=\"btn btn-info btn-exit\">让位</button>");}function body_9(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<div class=\"row\"><div class=\"col-md-6 col-xs-12\">").section(ctx.get("AttackLegion"),ctx,{"block":body_10},null).write("</div><div class=\"col-md-6 col-xs-12\">").section(ctx.get("DefendLegion"),ctx,{"block":body_12},null).write("</div></div>");}function body_10(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<h4>").reference(ctx.get("Name"),ctx,"h").write(" 人数:").reference(ctx.getPath(false,["FightUserList","length"]),ctx,"h").write("</h4><ul>").section(ctx.get("FightUserList"),ctx,{"block":body_11},null).write("</ul>");}function body_11(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<li>Lv").reference(ctx.get("Level"),ctx,"h").write(" ").reference(ctx.get("NickName"),ctx,"h").write("</li>");}function body_12(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<h4>").reference(ctx.get("Name"),ctx,"h").write(" 人数:").reference(ctx.getPath(false,["FightUserList","length"]),ctx,"h").write("</h4><ul>").section(ctx.get("FightUserList"),ctx,{"block":body_13},null).write("</ul>");}function body_13(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<li>Lv").reference(ctx.get("Level"),ctx,"h").write(" ").reference(ctx.get("NickName"),ctx,"h").write("</li>");}return body_0;})();
	return "page/gvg";
});