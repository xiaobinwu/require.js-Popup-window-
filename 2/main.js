require.config({
　　　paths: {
　　　　　"jquery": "js/jquery-2.1.4.min",
		  "jqueryUI":"js/jquery-ui.min",
		  "window": "js/window",
		  "widget": "js/widget"
　　　}
});
require(['jquery','window'],function($,w){ 
	var win = new w.Window();
	$(".btn1").click(function(event) {
		 win.alert({ 
		 	 width: 300,
		 	 height: 200,
		 	 title:"这是一条消息",
		 	 content: "小斌开始学习如何制作web组件",
		 	 skinClassName: "window_skin_a",
		 	 textForAlertBtn:"OK",
		 	 hasCloseBtn: true,
		 	 isDraggable: true,
		 	 dragHandle: '.window_title',
		 	 closeAlertInputHandler: function(){  alert("第一次点击确定按钮把你给删除掉"); },
		 	 closeAlertBtnHandler: function(){  alert("第一次点击关闭按钮把你给删除掉"); }

		 }).on("alert",function(){
		 	 	alert("第二次点击确定按钮把你给删除掉"); 
		 	}).on("alert",function(){
		 		alert("第三次点击确定按钮把你给删除掉"); 
		 	});


		 win.on("close",function(){ alert("第二次点击关闭按钮把你给删除掉"); });

	});

	$(".btn2").click(function(event) {
		 win.confirm({ 
		 	 width: 300,
		 	 height: 200,
		 	 title:"系统提示",
		 	 content: "您确定要删除该条记录？",
			 textForConfirmSureBtn: '确定',
			 textForConfirmCancelBtn: '取消',
		 	 hasCloseBtn: true,
		 	 isDraggable: true,
		 	 dragHandle: '.window_title',
		 	 sureConfirmHandler: function(){  alert("您点击了确定按钮！"); },
		 	 cancelConfirmHandler: function(){  alert("您点击了取消按钮！"); }

		 }) ;


	});


	$(".btn3").click(function(event) {
		 win.prompt({ 
		 	 width: 300,
		 	 height: 200,
		 	 title:"系统提示",
		 	 content: "请输入您的姓名：",
			 defaultValuePrompt:'如：张三',
		 	 hasCloseBtn: true,
		 	 isDraggable: true,
		 	 dragHandle: '.window_title',
		 	 surePromptHandler: function(data){  alert("您输入的数据为"+data); }
		 }) ;


	});

	$(".btn4").click(function(event) {
		 win.common({ 
		 	 width: 300,
		 	 height: 200,
		 	 content: "我是一个通用的弹窗！",
		 	 hasCloseBtn: true,
		 	 isDraggable: true,
		 	 dragHandle: '.window_title'
		 }) ;


	});


})
