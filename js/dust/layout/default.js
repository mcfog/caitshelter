define(["dust-runtime"],function (dust) {
	// layout/default.dust
	(function(){dust.register("layout/default",body_0);function body_0(chk,ctx){return chk.write("<nav class=\"navbar navbar-inverse\" role=\"navigation\"><button class=\"navbar-toggle collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\".navbar-collapse\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><div class=\"navbar-header\"><a class=\"navbar-brand\" href=\"#home\" j-field=\"me.info\">").section(ctx.getPath(false,["me","info"]),ctx,{"else":body_1,"block":body_2},null).write("</a></div><div class=\"collapse navbar-collapse\" j-id=\"info\" j-field=\"me.info\"><ul class=\"nav navbar-nav pages\"><li class=\"dropdown\"><a class=\"dropdown-toggle\" href=\"javascipt:void(0);\" data-toggle=\"dropdown\">竞技 <b class=\"caret\"></b></a><ul class=\"dropdown-menu\"><li><a href=\"#fightrank\">排名</a></li><li><a href=\"#friend\">找人</a></li><li><a href=\"#gvg\">军团战</a></li></ul></li><li><a highlight=\"#my/.*\" href=\"#my/deck\">卡组</a></li><li><a href=\"#salary\">宝箱+").reference(ctx.getPath(false,["me","info","SalaryCount"]),ctx,"h").write("</a></li><li><a href=\"#thief\">打贼</a></li><li><a href=\"#maze\">扫塔</a></li><li><a href=\"#boss\">魔神</a></li></ul><ul class=\"nav navbar-nav navbar-right\"><li class=\"dropdown\">").section(ctx.getPath(false,["me","info"]),ctx,{"block":body_3},null).write("</li><li><a href=\"#account\">注销</a></li><li><a href=\"http://www.evernote.com/shard/s37/sh/1d2af942-400e-4867-8bff-73afa72489ba/4664d89f576bcecb1524c538cddcf313\" target=\"_blank\">帮助</a></li><!--       <li class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Dropdown <b class=\"caret\"></b></a><ul class=\"dropdown-menu\"><li><a href=\"#\">Action</a></li><li><a href=\"#\">Another action</a></li><li><a href=\"#\">Something else here</a></li><li class=\"divider\"></li><li><a href=\"#\">Separated link</a></li></ul></li> --></ul></div><!-- /.navbar-collapse --></nav><section class=\"container\">").block(ctx.getBlock("body"),ctx,{},null).write("</section>");}function body_1(chk,ctx){return chk.write("...");}function body_2(chk,ctx){return chk.reference(ctx.get("NickName"),ctx,"h");}function body_3(chk,ctx){return chk.write("<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\"> <span><i class=\"glyphicon glyphicon-fire\"></i>&nbsp;").reference(ctx.get("Energy"),ctx,"h").write("/50</span><b class=\"caret\"></b></a><ul class=\"dropdown-menu\"><li><a>Lv.").reference(ctx.get("Level"),ctx,"h").write("</a></li><li><a>差").helper("math",ctx,{},{"method":"subtract","key":ctx.get("NextExp"),"operand":ctx.get("Exp")}).write("经验升级</a></li><li><a>Cost.").reference(ctx.get("LeaderShip"),ctx,"h").write(" HP.").reference(ctx.get("HP"),ctx,"h").write("</a></li><li><a><span><i class=\"glyphicon glyphicon-copyright-mark\"></i>&nbsp;").reference(ctx.get("Coins"),ctx,"h").write("</span>&nbsp;<span><i class=\"glyphicon glyphicon-usd\"></i>&nbsp;").reference(ctx.get("Cash"),ctx,"h").write("</span>&nbsp;<span><i class=\"glyphicon glyphicon-tags\"></i>&nbsp;").reference(ctx.get("Ticket"),ctx,"h").write("</span></a></li><li><a><span style=\"color:blue\">").reference(ctx.get("Fragment_3"),ctx,"h").write("蓝</span>&nbsp;<span style=\"color:purple\">").reference(ctx.get("Fragment_4"),ctx,"h").write("紫</span>&nbsp;<span style=\"color:gold\">").reference(ctx.get("Fragment_5"),ctx,"h").write("金</span></a></li><!-- <li class=\"divider\"></li> --></ul>");}return body_0;})();
	return "layout/default";
});