/**
 * Created by jianjian on 2017/3/2.
 */
var app = angular.module("parentModule", ["ng", "ngTouch"]);

app.controller("parentCtrl", function($scope, $http) {

	$scope.myCollect = [];
	//收藏信息与本地同步
	var collectLocalData = eval(localStorage.getItem("myCollect"));
	if(collectLocalData != null) {
		for(var i = 0; i < collectLocalData.length; i++) {
			var type = collectLocalData[i][0];
			var qid = collectLocalData[i][1];
			var data = [];
			data.push(type = type);
			data.push(qid = qid);

			$scope.myCollect.push(data);
		}
	}

	//点赞信息与本地同步
	$scope.myPraise = [];
	var praiseData = eval(localStorage.getItem("myPraise"));
	if(praiseData != null) {
		for(var i = 0; i < praiseData.length; i++) {
			console.log(praiseData[i])
			$scope.myPraise.push(praiseData[i]);
		}
	}

	//评论点赞信息与本地同步
	$scope.myCommentPraise = [];
	var CommentPraiseData = eval(localStorage.getItem("myCommentPraise"));
	if(CommentPraiseData != null) {
		for(var i = 0; i < CommentPraiseData.length; i++) {
			$scope.myCommentPraise.push(CommentPraiseData[i]);
		}
	}

	//将用户数据与本地同步
	$scope.userInfo = {
		username: "匿名"
	}

	if(localStorage.getItem("username") == null) {
		localStorage.setItem("username", $scope.userInfo.username);
	} else {
		$scope.userInfo.username = localStorage.getItem("username");
	}

	$scope.typeDetail = "";

	$scope.settypeDetail = function(str) {
		$scope.typeDetail = str;
	};

	$scope.type = "";

	$scope.setType = function(type) {
		$scope.type = type;
	};

	$scope.qid = "";

	$scope.setqid = function(qid) {
		$scope.qid = qid;
	};

	// 用于切换后刷新页面
	angular.element('body').on("pageinit", function(event) {

		var scope = angular.element(event.target).scope();

		angular.element(event.target).injector().invoke(function($compile) {

			$compile(event.target)(scope);
			scope.$digest();
		})

	});

	/*
	 *　方法:Array.remove(dx)
	 *　功能:删除数组元素.
	 *　参数:dx删除元素的下标.
	 *　返回:在原数组上修改数组
	 */
	Array.prototype.remove = function(dx) {
		if(isNaN(dx) || dx > this.length) { return false; }
		for(var i = 0, n = 0; i < this.length; i++) {
			if(this[i] != this[dx]) {
				this[n++] = this[i]
			}
		}
		this.length -= 1　
	}

	/**
	 * 给数据更具点赞数量排序
	 * 冒泡排序
	 */
	$scope.sortIvByPraise = function(response) {
		for(var i = 0; i < response.length; i++) {
			for(var j = i + 1; j < response.length; j++) {
				if(parseInt(response[i].praise) > parseInt(response[j].praise)) {
					var temp = response[i];
					response[i] = response[j];
					response[j] = temp;
				}
			}
		}
		return response;
	}

	/**
	 * 页面跳转函数
	 *	toMain()
	 *  toType()
	 *	toEdit()
	 *	toUserInfo()
	 *	toMyCollect()
	 */
	$scope.toType = function() {

		$.mobile.changePage("type.html", { transition: 'flip' });

	};

	$scope.toMain = function() {

		$.mobile.changePage("index.html", { transition: 'flip' });

	};

	$scope.toEdit = function() {
		$.mobile.changePage("edit.html", { transition: 'flip' });
	};

	$scope.toUserInfo = function() {
		$.mobile.changePage("userInfo.html", { transition: 'flip' });
	}

	$scope.toMyCollect = function() {
		$.mobile.changePage("myCollect.html", { transition: 'flip' });
	}

	$scope.toAbout = function() {
		$.mobile.changePage("about.html", { transition: 'flip' });
	}

});

//首页
app.controller("mainCtrl", function($scope, $http, $compile) {

	/**
	 * 点赞功能 
	 */
	$scope.praiseInIndex = function() {
		var date = new Date().getTime();
		$(event.currentTarget).addClass(date + "");
		//获取数据
		var type = $(event.currentTarget).parent().parent().children("div:hidden")[0].innerHTML;
		var qid = $(event.currentTarget).parent().parent().children("div:hidden")[1].innerHTML;

		//是否已经点赞过
		if($scope.myPraise.length == 0) {
			//加入收藏列表,同步本地信息
			$scope.myPraise.push(qid);
			localStorage.setItem("myPraise", JSON.stringify($scope.myPraise));
			console.log($scope.myPraise);
			//发送请求
			$http.get("php/praise.php?type=" + type + "&qid=" + qid)
				.success(function(response) {
					if(response != "点赞失败") {
						$("." + date).html("赞(" + response + ")")
					} else {
						$("." + date).html(response)
					}
				});
		} else {

			console.log($scope.myPraise);
			for(var i = 0; i < $scope.myPraise.length; i++) {
				if($scope.myPraise[i] == qid) {
					alert("已经点赞过了");
					return;
				}
			}
			//加入收藏列表,同步本地信息
			$scope.myPraise.push(qid);
			localStorage.setItem("myPraise", JSON.stringify($scope.myPraise));
			//发送请求
			$http.get("php/praise.php?type=" + type + "&qid=" + qid)
				.success(function(response) {
					if(response != "点赞失败") {
						$("." + date).html("赞(" + response + ")")
					} else {
						$("." + date).html(response)
					}
				});
		}

	}

	//本页面的收藏
	$scope.CollectInIndex = function() {
		//准备数据
		var type = $(event.currentTarget).parent().parent().children("div:hidden")[0].innerHTML;
		var qid = $(event.currentTarget).parent().parent().children("div :hidden")[1].innerHTML;
		var data = [];
		data.push(type = type);
		data.push(qid = qid);

		//判断是否重复
		//再加入收藏
		if($scope.myCollect.length == 0) {
			$scope.myCollect.push(data);
			localStorage.setItem("myCollect", JSON.stringify($scope.myCollect));
			alert("收藏成功");
		} else {
			for(var i = 0; i < $scope.myCollect.length; i++) {

				if($scope.myCollect[i][1] === qid) {
					alert("你已经收藏过了");
					return;
				}
			}

			$scope.myCollect.push(data);
			console.log(qid);
			console.log($scope.myCollect);
			localStorage.setItem("myCollect", JSON.stringify($scope.myCollect));
			alert("收藏成功");
		}

	}

	//本页面的跳转到详情
	$scope.toDetailInIndexSearch = function() {

		$scope.setqid($(event.currentTarget).parent().children("div:hidden")[1].innerHTML);
		$scope.setType($(event.currentTarget).parent().children("div:hidden")[0].innerHTML);
		$.mobile.changePage("detail.html", { transition: 'flip' });

	}

	//搜索
	$scope.indexSearch = function() {
		$(".Indexlistview").children("ul").html("");

		var type = $("#indexTypeSellect").val();
		var searchkey = $("#indexSearchInput").val();
		if(searchkey == '') {
			alert("请输入关键词");
			$("#indexSearchInput").focus();
		} else {
			$http.get("php/IndexSearch.php?type=" + type + "&searchkey=" + searchkey)
				.success(function(response) {
					//排序
					response = $scope.sortIvByPraise(response);
					//没搜到结果
					if(response.length == 0) {
						alert("没有搜索到相关内容");
					}
					//搜索到结果
					else {
						//$("#contentTop").css("display","none");
						$(".Indexlistview").children("ul").html("");
						for(var i = response.length - 1; i >= 0; i--) {

							var ele = '<li class="ui-shadow ui-li-static ui-body-inherit ui-first-child ui-last-child ng-scope"><div style="display: none">' + type + '</div><div style="display: none">' + response[i].qid + '</div><div ng-click="toDetailInIndexSearch()"><span class="ListquestionType">' + response[i].type + '</span><h3 class="ng-binding">' + response[i].question + '</h3></div><p class="commentNum"><a href="#" class="ui-link" ng-click="CollectInIndex()">收藏</a>&nbsp;&nbsp;&nbsp;<span class="ng-binding">评论(' + response[i].comment + ')</span>&nbsp;&nbsp;&nbsp;<a href="#" class="ng-binding" ng-click="praiseInIndex()">赞(' + response[i].praise + ')</a></p></li>';

							$(".Indexlistview").children("ul").append($compile(ele)($scope));

						}
					}
				})
		}
	}

});

//分类
app.controller("typeCtrl", function($scope) {

	$scope.toTypeDetail = function(type) {

		switch(type) {
			case 'iv_html':
				$scope.settypeDetail("HTML");
				break;
			case 'iv_css':
				$scope.settypeDetail("CSS");
				break;
			case 'iv_js':
				$scope.settypeDetail("JavaScrapt");
				break;
			case 'iv_jq':
				$scope.settypeDetail("Jquery");
				break;
			case 'iv_bootstrap':
				$scope.settypeDetail("Bootstrap");
				break;
			case 'iv_angular':
				$scope.settypeDetail("Angular");
				break;
			case 'iv_vue':
				$scope.settypeDetail("Vue");
				break;
			case 'iv_react':
				$scope.settypeDetail("React Native");
				break;
			case 'iv_other':
				$scope.settypeDetail("Other");
				break;
		}

		$scope.setType(type);

		$.mobile.changePage("typeDetail.html", { transition: "pop" });

	}

});

//分类详情
app.controller("typeDetailCtrl", function($scope, $compile, $http) {

	/**
	 * 点赞功能 
	 */
	$scope.praise = function() {
		var date = new Date().getTime();
		$(event.currentTarget).addClass(date + "");
		//获取数据
		var type = $scope.type;
		var qid = $(event.currentTarget).parent().parent().children("div:hidden")[0].innerHTML;

		//是否已经点赞过
		if($scope.myPraise.length == 0) {
			//加入收藏列表,同步本地信息
			$scope.myPraise.push(qid);
			localStorage.setItem("myPraise", JSON.stringify($scope.myPraise));
			console.log($scope.myPraise);
			//发送请求
			$http.get("php/praise.php?type=" + type + "&qid=" + qid)
				.success(function(response) {
					if(response != "点赞失败") {
						$("." + date).html("赞(" + response + ")")
					} else {
						$("." + date).html(response)
					}
				});
		} else {
			for(var i = 0; i < $scope.myPraise.length; i++) {
				console.log($scope.myPraise);
				console.log($scope.myPraise.length);
				if($scope.myPraise[i] == qid) {
					alert("已经点赞过了");
					return;
				}
			}
			//加入收藏列表,同步本地信息
			$scope.myPraise.push(qid);
			localStorage.setItem("myPraise", $scope.myPraise);
			//发送请求
			$http.get("php/praise.php?type=" + type + "&qid=" + qid)
				.success(function(response) {
					if(response != "点赞失败") {
						$("." + date).html("赞(" + response + ")")
					} else {
						$("." + date).html(response)
					}
				});
		}

	}

	//一次加载最大值
	$scope.maxQuestioNum = 10;
	//先加载$scope.maxQuestioNum
	//倒序加载
	$http.get("php/findOneType.php?type=" + $scope.type)
		.success(function(response) {
			//排序得到的数据
			response = $scope.sortIvByPraise(response);
			//加载
			if(response.length > $scope.maxQuestioNum) {
				for(var i = response.length - 1; i >= response.length - $scope.maxQuestioNum; i--) {

					var ele = '<li class="ui-shadow ui-li-static ui-body-inherit ui-first-child ui-last-child ng-scope"><div style="display: none">' + response[i].qid + '</div><div ng-click="toDetail()"><span class="ListquestionType">' + response[i].type + '</span><h3 class="ng-binding">' + response[i].question + '</h3></div><p class="commentNum"><a href="#" class="ui-link" ng-click="Collect(e)">收藏</a>&nbsp;&nbsp;&nbsp;<span class="ng-binding">评论(' + response[i].comment + ')</span>&nbsp;&nbsp;&nbsp;<a class="ng-binding" ng-click="praise()">赞(' + response[i].praise + ')</a></p></li>';

					$(".listview").children("ul").append($compile(ele)($scope));

				}
			} else {
				for(var i = response.length - 1; i >= 0; i--) {

					var ele = '<li class="ui-shadow ui-li-static ui-body-inherit ui-first-child ui-last-child ng-scope"><div style="display: none">' + response[i].qid + '</div><div ng-click="toDetail()"><span class="ListquestionType">' + response[i].type + '</span><h3 class="ng-binding">' + response[i].question + '</h3></div><p class="commentNum"><a href="#" class="ui-link" ng-click="Collect(e)">收藏</a>&nbsp;&nbsp;&nbsp;<span class="ng-binding">评论(' + response[i].comment + ')</span>&nbsp;&nbsp;&nbsp;<a class="ng-binding" ng-click="praise()">赞(' + response[i].praise + ')</a></p></li>';

					$(".listview").children("ul").append($compile(ele)($scope));
				}

				//按钮变化
				var btnGetMore = document.getElementById("btnGetMore");
				btnGetMore.innerHTML = "没有更多了";
				btnGetMore.style.color = "white";
				btnGetMore.style.background = "#e4393c";
				btnGetMore.setAttribute("disabled", "disabled");
			}

		});

	//更多
	$scope.readMore = function() {

		//获取当前显示的数量
		var listNum = $(".listview").children("ul").children('li').length;
		console.log(listNum);
		//请求数据库
		$http.get("php/findOneType.php?type=" + $scope.type)
			.success(function(response) {
				//排序得到的数据
				response = $scope.sortIvByPraise(response);
				//加载
				console.log(response);
				//如果剩余条数大于$scope.maxQuestioNum
				if(response.length - listNum > $scope.maxQuestioNum) {
					for(var i = response.length - listNum - 1; i >= response.length - listNum - $scope.maxQuestioNum; i--) {
						var ele = '<li class="ui-shadow ui-li-static ui-body-inherit ui-first-child ui-last-child ng-scope"><div style="display: none">' + response[i].qid + '</div><div ng-click="toDetail()"><span class="ListquestionType">' + response[i].type + '</span><h3 class="ng-binding">' + response[i].question + '</h3></div><p class="commentNum"><a href="#" class="ui-link" ng-click="Collect(e)">收藏</a>&nbsp;&nbsp;&nbsp;<span class="ng-binding">评论(' + response[i].comment + ')</span>&nbsp;&nbsp;&nbsp;<a class="ng-binding" ng-click="praise()">赞(' + response[i].praise + ')</a></p></li>';

						$(".listview").children("ul").append($compile(ele)($scope));
					}
				}
				//如果剩余条数小于$scope.maxQuestioNum
				else {

					for(var i = response.length - listNum - 1; i >= 0; i--) {
						var ele = '<li class="ui-shadow ui-li-static ui-body-inherit ui-first-child ui-last-child ng-scope"><div style="display: none">' + response[i].qid + '</div><div ng-click="toDetail()"><span class="ListquestionType">' + response[i].type + '</span><h3 class="ng-binding">' + response[i].question + '</h3></div><p class="commentNum"><a href="#" class="ui-link" ng-click="Collect(e)">收藏</a>&nbsp;&nbsp;&nbsp;<span class="ng-binding">评论(' + response[i].comment + ')</span>&nbsp;&nbsp;&nbsp;<a class="ng-binding" ng-click="praise()">赞(' + response[i].praise + ')</a></p></li>';

						$(".listview").children("ul").append($compile(ele)($scope));
					}
					//使按钮发生变化
					var btnGetMore = document.getElementById("btnGetMore");
					btnGetMore.innerHTML = "没有更多了";
					btnGetMore.style.color = "white";
					btnGetMore.style.background = "#e4393c";
					btnGetMore.setAttribute("disabled", "disabled");
				}
			});

	}

	//跳转到详情
	$scope.toDetail = function() {

		$scope.setqid($(event.currentTarget).parent().children("div:hidden").html());
		$.mobile.changePage("detail.html", { transition: 'flip' });

	}

	//收藏
	$scope.Collect = function(e) {
		//准备数据
		var type = $scope.type;
		var qid = $(event.currentTarget).parent().parent().children("div :hidden").html();

		var data = [];
		data.push(type = type);
		data.push(qid = qid);

		//判断是否重复
		//再加入收藏
		if($scope.myCollect.length == 0) {

			$scope.myCollect.push(data);
			localStorage.setItem("myCollect", JSON.stringify($scope.myCollect));
			alert("收藏成功");

		} else {

			for(var i = 0; i < $scope.myCollect.length; i++) {

				if($scope.myCollect[i][1] === qid) {
					alert("你已经收藏过了");
					return;
				}
			}

			$scope.myCollect.push(data);
			console.log(qid);
			console.log($scope.myCollect);
			localStorage.setItem("myCollect", JSON.stringify($scope.myCollect));
			alert("收藏成功");

		}

	}
});

//录入
app.controller("EditCtrl", function($scope, $http) {

	//记录单选条目数量
	$scope.simItem = 2;
	//用于ng-repeat
	$scope.simItemNum = [1, 2];

	//记录多选条目数量
	$scope.mutItem = 2;
	//用于ng-repeat
	$scope.mutItemNum = [1, 2];

	$scope.edit_type = function(id) {

		$("#sim").hide();
		$("#mut").hide();
		$("#sian").hide();
		$("#" + id).show();

	}

	//单选添加选项
	$scope.SimaddItem = function() {

		$scope.simItem++;

		var ele = '<tr class="simtr' + $scope.simItem + '"><td><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input class="simAns" type="text" placeholder="选项' + $scope.simItem + '" value=""></div></td><td><div class="ui-radio"><input type="radio" class="simAns_radio" name="simRadio" value="' + $scope.simItem + '"></div></td></tr>';

		$("#simTable").append(ele);

		$scope.simItemNum.push($scope.simItem);
	};

	// 单选删除选项
	$scope.SimdelItem = function() {

		if($scope.simItem > 2) {
			$("tr").remove(".simtr" + $scope.simItem);
			$scope.simItem--;
			$scope.simItemNum.pop();
		} else {
			alert("至少需要两个选项");
		}
	}

	// 单选题提交
	$scope.SimSubmit = function() {
		var qtype = $("#qtype").val();
		var type = "单选题";
		var question = $("#simTitle").val();
		var answerArr = [];
		//正真提交的答案
		var answer = "";
		var trueAnswer = "";
		var qid = new Date().getTime();

		//答案选项
		var simAns = document.getElementsByClassName("simAns");
		for(var i = 0; i < simAns.length; i++) {
			for(var j = i + 1; j < simAns.length; j++) {
				if(simAns[i].value == simAns[j].value) {
					alert("选项不能重复");
					return;
				}
			}
			if(simAns[i].value != '' && simAns[i].value != null && simAns[i].value != undefined) {
				answerArr.push(simAns[i].value);
			}
		}

		for(var i = 0; i < answerArr.length; i++) {
			answer += answerArr[i] + "/@@@/";
		}
		answer = answer.slice(0, answer.length - 5);

		//获得正确答案
		var simAns_radio = document.getElementsByClassName("simAns_radio");
		for(var i = 0; i < simAns_radio.length; i++) {
			if(simAns_radio[i].checked) {
				trueAnswer = i;
			}
		}

		if(question == "") {
			alert("请输入题目");
		} else if(answer.length < 2) {
			alert("答案数量必须大于2");
		} else if(trueAnswer === "") {
			console.log(trueAnswer);
			alert("请勾选正确答案");
		} else {
			$http.get("php/uploadQuestion.php?qtype=" + qtype + "&type=" + type + "&question=" + question + "&answer=" + answer + "&trueAnswer=" + trueAnswer + "&qid=" + qid)
				.success(function(response) {

					alert(response);

					//清空输入
					$("#simTitle").val("");
					var simAns = document.getElementsByClassName("simAns");
					for(var i = 0; i < simAns.length; i++) {
						simAns[i].value = "";
					}

					var simAns_radio = document.getElementsByClassName("simAns_radio");
					for(var i = 0; i < simAns_radio.length; i++) {
						simAns_radio[i].checked = false;
					}
				})

		}

	}

	//多选添加选项
	$scope.MutaddItem = function() {

		$scope.mutItem++;
		var ele = '<tr class="muttr' + $scope.mutItem + '"><td><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input class="mutAns" type="text" placeholder="选项' + $scope.mutItem + '" value=""></div></td><td><div class="ui-radio"><input type="checkbox" class="mutAns_che" name="mutCheck" value="' + $scope.mutItem + '"></div></td></tr>';

		$("#mutTable").append(ele);

		$scope.mutItemNum.push($scope.mutItem);
	};

	// 多选删除选项
	$scope.MutdelItem = function() {

		if($scope.mutItem > 2) {
			$("tr").remove(".muttr" + $scope.mutItem);
			$scope.mutItem--;
			$scope.mutItemNum.pop();
		} else {
			alert("至少需要两个选项");
		}
	}

	//多选题提交
	$scope.MutSubmit = function() {
		var qtype = $("#qtype").val();
		var type = "多选题";
		var question = $("#mutTitle").val();
		var answerArr = [];
		//真正提交的答案
		var answer = "";
		var trueAnswer = [];
		var qid = new Date().getTime();

		var mutAns = document.getElementsByClassName("mutAns");
		for(var i = 0; i < mutAns.length; i++) {
			for(var j = i + 1; j < mutAns.length; j++) {
				if(mutAns[i].value == mutAns[j].value) {
					alert("选项不能重复");
					return;
				}
			}
			if(mutAns[i].value != '' && mutAns[i].value != null && mutAns[i].value != undefined) {
				answerArr.push(mutAns[i].value);
			}
		}

		for(var i = 0; i < answerArr.length; i++) {
			answer += answerArr[i] + "/@@@/";
		}

		answer = answer.slice(0, answer.length - 5);

		var mutAns_che = document.getElementsByClassName("mutAns_che");
		for(var i = 0; i < mutAns_che.length; i++) {
			if(mutAns_che[i].checked) {
				trueAnswer.push(i);
			}
		}

		if(question == "") {
			alert("请输入题目");
		} else if(answer.length < 2) {
			alert("答案不少于两个");
		} else if(trueAnswer.length == 0) {
			alert("请勾选正确答案");
		} else {

			$http.get("php/uploadQuestion.php?qtype=" + qtype + "&type=" + type + "&question=" + question + "&answer=" + answer + "&trueAnswer=" + trueAnswer.toString() + "&qid=" + qid)
				.success(function(response) {

					alert(response);

					//清空输入
					$("#mutTitle").val("");
					var mutAns = document.getElementsByClassName("mutAns");
					for(var i = 0; i < mutAns.length; i++) {
						mutAns[i].value = "";
					}

					var mutAns_che = document.getElementsByClassName("mutAns_che");
					for(var i = 0; i < mutAns_che.length; i++) {
						mutAns_che[i].checked = false;
					}
				})

		}

	}

	// 简答题提交
	$scope.SianSubmit = function() {
		var qtype = $("#qtype").val();
		var type = "简答题";
		var question = document.getElementById("sianTitle").value;
		var answer = document.getElementById("sianAns").value;
		var trueAnswer = null;
		var qid = new Date().getTime();
		
		if(question = "") {
			alert("请输入问题");
		} else if(answer == "") {
			alert("答案不能为空");
		} else {
			var question = document.getElementById("sianTitle").value;
			$http.get("php/uploadQuestion.php?qtype=" + qtype + "&type=" + type + "&question=" + question + "&answer=" + answer + "&trueAnswer=" + trueAnswer + "&qid=" + qid)
				.success(function(response) {
					console.log(question);
					alert(response);
					//清空输入
					document.getElementById("sianTitle").value = "";
					document.getElementById("sianAns").value = "";
				})
		}
	}

});

//详情
app.controller("detailCtrl", function($scope, $http, $compile) {

	//最大评论条数
	$scope.maxCommentNum = 20;

	//加载question,answer,trueAnswer 
	
	$http.get("php/findIV.php?table=" + $scope.type + "&qid=" + $scope.qid)
		.success(function(response) {
			//更具类型加载
			switch(response[0].type) {

				case "简答题":
					$("#question").html(response[0].question);
					$("#answer").html(response[0].answer);
					$("#qid").html(response[0].qid);
					$("#trueAnswer").html("");
					break;

				case "单选题":

					$("#question").html(response[0].question);
					$("#qid").html(response[0].qid);
					var answer = response[0].answer.split("/@@@/");
					for(var i = 0; i < answer.length; i++) {
						$("#answer").html($("#answer").html() + parseInt(i + 1) + ".&nbsp;&nbsp;");
						$("#answer").html($("#answer").html() + answer[i] + "</br>");
					}
					$("#trueAnswer").html("答案为:" + "&nbsp;&nbsp;" + (parseInt(response[0].trueAnswer) + 1));

					break;

				case "多选题":

					$("#question").html(response[0].question);
					$("#qid").html(response[0].qid);
					var answer = response[0].answer.split("/@@@/");
					for(var i = 0; i < answer.length; i++) {
						$("#answer").html($("#answer").html() + parseInt(i + 1) + ".&nbsp;&nbsp;");
						$("#answer").html($("#answer").html() + answer[i] + "</br>");
					}

					var trueAnswer = response[0].trueAnswer.split(",");
					$("#trueAnswer").html($("#trueAnswer").html() + "正确答案：");
					for(var i = 0; i < trueAnswer.length; i++) {
						$("#trueAnswer").html($("#trueAnswer").html() + "&nbsp;&nbsp;" + (parseInt(trueAnswer[i]) + 1));
					}

					break;

			}

		});

	//comment//初始加载
	$http.get("php/findIV.php?table=comment&qid=" + $scope.qid)
		.success(function(response) {
			response=$scope.sortIvByPraise(response);
			
			//评论大于$scope.maxCommentNum
			
			if(response.length > $scope.maxCommentNum) {

				for(var i = response.length - 1; i >= response.length - $scope.maxCommentNum; i--) {

					var ele = '<li><div style="display:none">' + response[i].cid + '</div><span><b class="name">' + response[i].name + '</b>:<span class="say">' + response[i].say + '</span><button class="commentPraise" ng-click="commentPraise()">赞(' + response[i].praise + ')</button></span></li>';

					$("#commentList").append($compile(ele)($scope));
				}
				//显示按钮
				$("#BtnMoreComment").css("display", "block");

			} else {
				for(var i = response.length - 1; i >= 0; i--) {

					var ele = '<li><div style="display:none">' + response[i].cid + '</div><span><b class="name">' + response[i].name + '</b>:<span class="say">' + response[i].say + '</span><button class="commentPraise" ng-click="commentPraise()">赞(' + response[i].praise + ')</button></span></li>';

					$("#commentList").append($compile(ele)($scope));
				}

				//隐藏按钮
				$("#BtnMoreComment").css("display", "none");
			}

		});

	//当评论多于最大条数时加载更多评论
	$scope.moreComment = function() {

		$http.get("php/findIV.php?table=comment&qid=" + $scope.qid)
			.success(function(response) {
				
				response=$scope.sortIvByPraise(response);
				
				//获得已经加载的条数
				var commentNum = $("#commentList").children().length;
				//评论大于$scope.maxCommentNum
				if(response.length - commentNum > $scope.maxCommentNum) {

					for(var i = response.length - commentNum - 1; i >= response.length - commentNum - $scope.maxCommentNum; i--) {

						var ele = '<li><div style="display:none">' + reponse[i].cid + '</div><span><b class="name">' + response[i].name + '</b>:<span class="say">' + response[i].say + '</span><button class="commentPraise" ng-click="commentPraise()">赞(' + response[i].praise + ')</button></span></li>';

						$("#commentList").append($compile(ele)($scope));
					}

					//显示按钮
					$("#BtnMoreComment").css("display", "block");
				} else {
					for(var i = response.length - commentNum - 1; i >= 0; i--) {

						var ele = '<li><div style="display:none">' + reponse[i].cid + '</div><span><b class="name">' + response[i].name + '</b>:<span class="say">' + response[i].say + '</span><button class="commentPraise" ng-click="commentPraise()">赞(' + response[i].praise + ')</button></span></li>';

						$("#commentList").append($compile(ele)($scope));
					}
					$("#BtnMoreComment").css("display", "none");
				}

			});

	}

	/**
	 * 发表评论
	 */
	$scope.myComment = '';
	$scope.sendComment = function() {
		//得到输入内容
		$scope.myComment = $("#myComment").val();
		//判断是否为空
		if($scope.myComment == null || $scope.myComment == undefined || $scope.myComment == '') {
			alert('评论不能为空');
		} else {
			//评论唯一指定id
			var cid = new Date().getTime();
			//提交评论
			$http.get("php/insertComment.php?qid=" + $scope.qid + "&name=" + $scope.userInfo.username + "&say=" + $scope.myComment + "&type=" + $scope.type + "&cid=" + cid)
				.success(function(response) {
					alert(response);
					$("#myComment").val("");
				})

			//刷新评论列表
			var ele = '<li><div style="display:none">' + cid + '</div><span><b class="name">' +$scope.userInfo.username + '</b>:<span class="say">' + $("#myComment").val() + '</span><button class="commentPraise" ng-click="commentPraise()">赞(0)</button></span></li>';
			
			$("#commentList").children("li:first").before($compile(ele)($scope));
			
		}

	}
	
	
	/**
	 * 评论点赞
	 * 
	 */
	$scope.commentPraise = function() {
		//数据准备
		var type = $scope.type;
		var cid = $(event.currentTarget).parent().parent().children("div :hidden")[0].innerHTML;
		var qid = $scope.qid;
		
		console.log("cid:"+cid);

		var data = [];
		data.push(cid);
		data.push(qid);

		//时间戳作为点赞标识
		var date = new Date().getTime();
		$(event.currentTarget).addClass(date + "");

		//本地点赞信息为0立即收藏
		if($scope.myCommentPraise.length == 0) {
			//加入收藏列表,同步本地信息
			$scope.myCommentPraise.push(data);
			localStorage.setItem("myCommentPraise", JSON.stringify($scope.myPraise));
			console.log($scope.myCommentPraise);
			//发送请求
			$http.get("php/commentPraise.php?cid=" + cid + "&qid=" + qid)
				.success(function(response) {
					if(response != "点赞失败") {
						$("." + date).html("赞(" + response + ")")
					} else {
						$("." + date).html(response)
					}
				});
		} else {
			//存在相同则不收藏
			console.log("$scope.myCommentPraise:"+$scope.myCommentPraise);
			for(var i = 0; i < $scope.myCommentPraise.length; i++) {
				if($scope.myCommentPraise[i][0] == cid) {
					alert("已经点赞过了");
					return;
				}
			}
			//加入收藏列表,同步本地信息
			$scope.myCommentPraise.push(data);
			localStorage.setItem("myCommentPraise", JSON.stringify($scope.myCommentPraise));
			//发送请求
			$http.get("php/commentPraise.php?cid=" + cid + "&qid=" + qid)
				.success(function(response) {
					console.log($scope.myCommentPraise);
					console.log(localStorage.getItem("myCommentPraise"));
					if(response != "点赞失败") {
						$("." + date).html("赞(" + response + ")")
					} else {
						$("." + date).html(response)
					}
				});
		}

	}

})

//个人信息
app.controller("userInfoCtrl", function($scope) {

	//修改用户名
	$scope.changeName = function() {
		$scope.userInfo.username = $("#newUserName").val();
		localStorage.setItem("username", $scope.userInfo.username);
		alert("修改成功");
	}

});

//我的收藏
app.controller("myCollectCtrl", function($scope, $http, $compile) {

	/**
	 * 跳转到详情页
	 */
	$scope.toDetail = function() {
		var type = $(event.currentTarget).children("div :hidden")[0].innerHTML;
		var qid = $(event.currentTarget).children("div :hidden")[1].innerHTML;
		$scope.setqid(qid);
		$scope.setType(type);
		$.mobile.changePage("detail.html", { transition: "pop" });
	}

	/**
	 * 点击编辑按钮
	 */
	$scope.editCollect = function() {
		//使删除按钮出现/消失
		if($(".deleteCollectBtn").css("display") == "none") {
			$(".deleteCollectBtn").css("display", "block");
		} else {
			$(".deleteCollectBtn").css("display", "none");
		}

	}

	/*
	 * 删除收藏
	 */
	$scope.deleteCollect = function() {
		//暂时消失
		$(event.currentTarget).parent().css("display", "none");
		//获取qid
		var qid = $(event.currentTarget).next().children("div :hidden")[1].innerHTML;
		//遍历Mycollect
		for(var i = 0; i < $scope.myCollect.length; i++) {
			if($scope.myCollect[i][1] == qid) {
				$scope.myCollect.remove(i);
				localStorage.setItem("myCollect", $scope.myCollect);
				alert("删除成功");
				return;
			}
		}

	}

	/**
	 * 加载收藏
	 * 
	 */
	//最大收藏数量
	var maxCollectNum = 100;
	//清空列表内容
	$(".listview").children("ul").html("");
	//大于最大值
	if($scope.myCollect.length > maxCollectNum) {
		for(var i = 99; i >= 0; i--) {
			var type = $scope.myCollect[i][0];
			$http.get("php/findIV.php?table=" + $scope.myCollect[i][0] + "&qid=" + $scope.myCollect[i][1])
				.success(function(response) {
					var ele = '<li class="ui-shadow ui-li-static ui-body-inherit ui-first-child ui-last-child ng-scope"><div class="deleteCollectBtn" ng-click="deleteCollect()">&otimes;</div><div ng-click="toDetail()"><div style="display: none">' + type + '</div><div style="display: none">' + response[0].qid + '</div><div><span class="ListquestionType">' + response[0].type + '</span><h3 class="ng-binding">' + response[0].question + '</h3></div></div></li>';

					$(".listview").children("ul").append($compile(ele)($scope));
				})
		}
	} else {
		for(var i = $scope.myCollect.length - 1; i >= 0; i--) {
			var type = $scope.myCollect[i][0];
			$http.get("php/findIV.php?table=" + $scope.myCollect[i][0] + "&qid=" + $scope.myCollect[i][1])
				.success(function(response) {
					var ele = '<li class="ui-shadow ui-li-static ui-body-inherit ui-first-child ui-last-child ng-scope"><div class="deleteCollectBtn" ng-click="deleteCollect()">&otimes;</div><div ng-click="toDetail()"><div style="display: none">' + type + '</div><div style="display: none">' + response[0].qid + '</div><div><span class="ListquestionType">' + response[0].type + '</span><h3 class="ng-binding">' + response[0].question + '</h3></div></div></li>';

					$(".listview").children("ul").append($compile(ele)($scope));
				})
		}
	}

});

app.controller("aboutCtrl", function($scope) {

})