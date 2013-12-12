define(["dust-runtime"],function (dust) {
	// page/dungeon.dust
	(function(){dust.register("page/dungeon",body_0);var blocks={'body':body_1};function body_0(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.partial("layout/default",ctx,null);}function body_1(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<div class=\"jumbotron\" j-field=\".status\">").section(ctx.get("status"),ctx,{"block":body_2},null).write("</div><div class=\"panel panel-default\" j-field=\".result\">").section(ctx.get("result"),ctx,{"block":body_4},null).write("</div>");}function body_2(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<div class=\"content\" layer=\"").reference(ctx.get("layer"),ctx,"h").write("\"><h3>当前层数: ").reference(ctx.get("layer"),ctx,"h").write("</h3><hr>").section(ctx.get("Condition"),ctx,{"block":body_3},null).write("<p class=\"btn-group\"><a class=\"btn btn-primary btn-lg btn-fight\">战斗</a><a class=\"btn btn-default btn-lg btn-sweep\">扫荡</a><a class=\"btn btn-default btn-lg btn-emu\" p=\"1\">模拟玩家1</a><a class=\"btn btn-default btn-lg btn-emu\" p=\"2\">模拟玩家2</a><a class=\"btn btn-info btn-lg btn-auto\" limit=\"2\">自动到1次复活</a><a class=\"btn btn-info btn-lg btn-auto\" limit=\"1\">自动到0次复活</a><a class=\"btn btn-info btn-lg btn-auto\" limit=\"0\">自动到死</a></p><p>剩余复活次数：").reference(ctx.getPath(false,["UserDungeon","Resurrection"]),ctx,"h").write(" / 怒气：").reference(ctx.getPath(false,["UserDungeon","Anger"]),ctx,"h").write(" / 扫荡层数：").reference(ctx.getPath(false,["UserDungeon","RaidsLayer"]),ctx,"h").write("</p></div>");}function body_3(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<p class=\"alert alert-info\"><strong>过关条件：</strong>").reference(ctx.get("Content"),ctx,"h").write("</p>");}function body_4(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<div class=\"panel-heading\">战斗").helper("eq",ctx,{"else":body_5,"block":body_6},{"key":ctx.get("Win"),"value":1}).write("</div><div class=\"panel-body\">").section(ctx.get("ExtData"),ctx,{"block":body_7},null).write("<div class=\"row\">").section(ctx.get("AwardCards"),ctx,{"block":body_9},null).write("</div></div>");}function body_5(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("失败");}function body_6(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("胜利");}function body_7(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<h3>奖励</h3><p>金币 ").reference(ctx.getPath(false,["Award","Coins"]),ctx,"h").write(" /经验 ").reference(ctx.getPath(false,["Award","Exp"]),ctx,"h").write(" /怒气 ").reference(ctx.getPath(false,["Award","Anger"]),ctx,"h").write("      </p><div class=\"row\">").section(ctx.get("AwardChips"),ctx,{"block":body_8},null).write("</div>");}function body_8(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<div class=\"thumbnail col-md-2 col-sm-2 col-xs-4\">").partial("partial/card",ctx,{"card":ctx.getPath(true,[])}).write("<span class=\"label label-info\">碎片</span></div>");}function body_9(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<div class=\"thumbnail col-md-2 col-sm-2 col-xs-4\">").partial("partial/card",ctx,{"card":ctx.getPath(true,[])}).write("</div>");}return body_0;})();
	return "page/dungeon";
});