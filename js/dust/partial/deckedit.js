define(["dust-runtime"],function (dust) {
	// partial/deckedit.dust
	(function(){dust.register("partial/deckedit",body_0);function body_0(chk,ctx){return chk.section(ctx.get("deck"),ctx,{"block":body_1},null);}function body_1(chk,ctx){return chk.write("<section class=\"panel panel-info\"><header class=\"panel-heading clearfix\"><span class=\"pull-left\">").reference(ctx.get("name"),ctx,"h").write("</span></header><div class=\"panel-body\"><div class=\"row\">").partial("partial/deck",ctx,null).write("</div><hr><div class=\"label label-default\">Cost: ").reference(ctx.get("cost"),ctx,"h").write("/").reference(ctx.getPath(false,["me","info","LeaderShip"]),ctx,"h").write("</div></div></section>");}return body_0;})();
	return "partial/deckedit";
});