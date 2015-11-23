define(['jquery','widget','jqueryUI'],function($,widget,$UI){ 
	function Window(){
		/*****特权方法、属性******/

		//定义宽高
		this.config = { 
			width : 200,
			height: 150,
			title:"系统消息",
			content:'',
			textForAlertBtn:'确定',
			textForConfirmSureBtn: '确定',
			textForConfirmCancelBtn: '取消',
			textForPromptSureBtn:'确定',
			hasCloseBtn: false,
			hasMask:true,
			skinClassName:null,
			closeAlertInputHandler:null,
			closeAlertBtnHandler:null,
			sureConfirmHandler:null,
			cancelConfirmHandler:null,
			surePromptHandler:null,
			isPromptInputPassword:false,
			defaultValuePrompt:'',
			maxLengthPrompt:10,
			isDraggable:false,
			dragHandle:null
		};
 
	};
	Window.prototype =  $.extend({}, new widget.Widget(),{ 

		renderUI :function(){ 

			switch(this.config.winType){ 

				case 'alert':
				  var footer_content = "<input type='button' class='boundingbox_input' value='"+this.config.textForAlertBtn+"' />";
				break;

				case 'confirm':
				  var footer_content ="<input type='button' class='boundingbox_input_sure' value='"+this.config.textForConfirmSureBtn+"' /><input type='button' class='boundingbox_input_cancel' value='"+this.config.textForConfirmCancelBtn+"' />";
				break;

				case 'prompt':
				  var type = this.config.isPromptInputPassword ? 'password' : 'text';
				  var footer_content = "<p style='margin-top:20px;'><input class='promptInput' type='"+type+"' maxlength='"+this.config.maxLengthPrompt+"' value='"+this.config.defaultValuePrompt+"' /></p><p style='margin-top:5px;text-align:center;'><input type='button' class='boundingbox_prompt_sure' value='"+this.config.textForPromptSureBtn+"' /></p>";
				break;

			}

			this.boundingbox = $("<div class='window_boundingbox'><div class='window_content'>"+this.config.content+"</div></div>");

			if(this.config.winType!='common'){ 
				this.boundingbox.prepend("<div class='window_title'>"+this.config.title+"</div>");
				this.boundingbox.append("<div class='window_footer'>"+footer_content+"</div>")
			}

			this._prompt = this.boundingbox.find('.promptInput');

			if(this.config.hasCloseBtn){ 

					var closeBtn = $("<span class='window_boundingbox_close'>X</span>");
 					this.boundingbox.append(closeBtn);

			}

			if(this.config.hasMask){ 
				this._mask = $("<div class='mask'></div>");
				this._mask.appendTo('body');
			}

			this.boundingbox.appendTo('body');

		},

		bindUI: function(){ 
				var that = this;
				this.boundingbox.delegate('.window_footer input', 'click', function(event) {
					that.fire("alert");
					 that.destroy();
				}).delegate('.window_boundingbox_close', 'click', function(event) {
				 	 that.fire("close");
					 that.destroy();
				}).delegate('.boundingbox_input_sure', 'click', function(event) {
					that.fire("sure");
					that.destroy();
				}).delegate('.boundingbox_input_cancel', 'click', function(event) {
					that.fire("cancel");
					that.destroy();
				}).delegate('.boundingbox_prompt_sure', 'click', function(event) {
					that.fire('prompt',that._prompt.val());
					that.destroy();
				});

				if(this.config.closeAlertInputHandler){ 
					this.on("alert",this.config.closeAlertInputHandler);
				}

				if(this.config.closeAlertBtnHandler){ 
					this.on("close",this.config.closeAlertBtnHandler);
				}

				if(this.config.sureConfirmHandler){ 
					this.on("sure",this.config.sureConfirmHandler);
				}

				if(this.config.cancelConfirmHandler){ 
					this.on("cancel",this.config.cancelConfirmHandler);
				}

				if(this.config.surePromptHandler){ 
					this.on("prompt",this.config.surePromptHandler);
				}

		},

		syncUI:function(){ 
			this.boundingbox.css({
				width: this.config.width+"px",
				height: this.config.height+"px",
				top: (this.config.y || ($(window).height() - this.config.height)/2)+"px",
				left: (this.config.x || ($(window).width() - this.config.width)/2)+"px"
			});
			if(this.config.skinClassName){ 
				this.boundingbox.addClass(this.config.skinClassName);
			}

			if(this.config.isDraggable){ 
				if(this.config.dragHandle){ 
					this.boundingbox.draggable({handle:this.config.dragHandle});
				}else{ 
					this.boundingbox.draggable();
				}
			}

		},
		destructor: function(){ 
			this._mask && this._mask.remove();
		},

		alert:function(config){ 
			
			$.extend(this.config, config,{ 'winType': 'alert' });
			this.render();
			return this;

		},
		confirm:function(config){

			$.extend(this.config, config,{ 'winType': 'confirm' });
			this.render();
			return this;

		},
		prompt:function(config){

			$.extend(this.config, config,{ 'winType': 'prompt' });
			this.render();
			this._prompt.focus();
			return this;

		},
		common:function(config){ 
			$.extend(this.config, config,{ 'winType': 'common' });
			this.render();
			return this;			
		}
	});
	
	return { 
		Window:Window
	}

});