define(["dust-runtime"],function (dust) {
	// partial/rune.dust
	(function(){dust.register("partial/rune",body_0);function body_0(chk,ctx){return chk.section(ctx.get("rune"),ctx,{"block":body_1},null);}function body_1(chk,ctx){return chk.section(ctx.getPath(false,["RUNE",ctx.get("RuneId")]),ctx,{"block":body_2},null);}function body_2(chk,ctx){return chk.write("<div class=\"rune\"><img src=\"").helper("runeImg",ctx,{},{"id":ctx.get("RuneId")}).write("\" class=\"img-responsive\" /><span>").reference(ctx.get("RuneName"),ctx,"h").write("</span><span>Lv.").reference(ctx.get("Level"),ctx,"h").write("</span></div>");}return body_0;})();
	return "partial/rune";
});