define(["dust-runtime"],function (dust) {
	// partial/deck.dust
	(function(){dust.register("partial/deck",body_0);function body_0(chk,ctx){return chk.write("<div class=\"col-md-7 col-xs-12\">").section(ctx.get("Cards"),ctx,{"block":body_1},null).write("</div><div class=\"col-md-5 col-xs-12\"><div class=\"clearfix visible-xs visible-sm\"></div>").section(ctx.get("Runes"),ctx,{"block":body_3},null).write("</div>");}function body_1(chk,ctx){return chk.write("<div class=\"col-md-2 col-sm-2 col-xs-4 thumbnail\" ucid=\"").reference(ctx.get("UserCardId"),ctx,"h").write("\">").partial("partial/card",ctx,{"card":ctx.getPath(true,[])}).write("</div>").helper("eq",ctx,{"block":body_2},{"key":ctx.get("$idx"),"value":4});}function body_2(chk,ctx){return chk.write("<div class=\"clearfix hidden-xs\"></div>");}function body_3(chk,ctx){return chk.write("<div class=\"col-md-6 col-xs-3 thumbnail\" urid=\"").reference(ctx.get("UserRuneId"),ctx,"h").write("\">").partial("partial/rune",ctx,{"rune":ctx.getPath(true,[])}).write("</div>");}return body_0;})();
	return "partial/deck";
});