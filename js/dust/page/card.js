define(["dust-runtime"],function (dust) {
	// page/card.dust
	(function(){dust.register("page/card",body_0);function body_0(chk,ctx){return chk.partial("partial/myNav",ctx,{"cur":"card"}).write("<div j-field=\".Deck\">").section(ctx.get("deck"),ctx,{"block":body_1},null).write("</div><div j-field=\".Cards\"><div class=\"row\">").section(ctx.get("Cards"),ctx,{"else":body_3,"block":body_4},null).write("</div></div><div style=\"padding-bottom: 70px;\"></div><nav class=\"navbar navbar-default navbar-fixed-bottom\" role=\"navigation\"><ul class=\"nav navbar-nav\"> ").partial("partial/cardFilter",ctx,null).write("</ul></nav>");}function body_1(chk,ctx){return chk.write("<div class=\"row\">").helper("partial",ctx,{"block":body_2},{"Cards":ctx.get("UserCardInfo"),"Runes":ctx.get("UserRuneInfo")}).write("</div>");}function body_2(chk,ctx){return chk.partial("partial/deck",ctx,null);}function body_3(chk,ctx){return chk.write("没有符合条件的卡片");}function body_4(chk,ctx){return chk.write("<div class=\"col-md-1 col-sm-2 col-xs-3\"><div class=\"thumbnail\">").partial("partial/card",ctx,{"card":ctx.getPath(true,[])}).write("</div></div>");}return body_0;})();
	return "page/card";
});