define(['jquery'],function(){ 

	//抽象类（公共，可多个模块使用）

	function Widget(){ 
		 
		 this.boundingbox =null;
	}

	Widget.prototype = { 

		on:function(type,handler){ 
			if(typeof this.handlers[type]=="undefined"){ 
				this.handlers[type]=[];
			}
			this.handlers[type].push(handler);
			return this;
		},

		fire: function(type,data){ 
			if(this.handlers[type] instanceof Array){ 
				var handlers = this.handlers[type];
				for (var i = 0,len=handlers.length; i < len ; i++) {
					handlers[i](data);
				};
			}
		},

		/*渲染组件*/
		render:function(container){ 
			this.renderUI(); //渲染dom树
			this.handlers = {};
			this.bindUI(); //渲染节点中的事件
			this.syncUI(); //初始化UI
			$(container || document.body).append(this.boundingbox);
		},

		destroy: function(){ 
			this.destructor();
			this.boundingbox.off();
			this.boundingbox.remove();
		},

		renderUI:function(){},
		bindUI:function(){},
		syncUI:function(){},
		destructor:function(){}

	}

	return{ 
		Widget : Widget
	}

})



