(function ($) {
         $.fn.Dropdown = function (options) {
         	 /*初始化 根据元数据拼接 */
         		let opts=$('select option');
         		let list = "<div class='ui-select-datalist'>";
         		opts.each(function(e){
         				if(e===0){
         					list+="<a href='javascript:' class='ui-select-datalist-li selected' data-index='"+e+"' data-value='"+this.value+"'>"+this.text+"</a>";
         				}else{
         					list+="<a href='javascript:' class='ui-select-datalist-li' data-index='"+e+"' data-value='"+this.value+"'>"+this.text+"</a>"
         				}
         		})
         		list+='</div>';
         		let btn = '<a href="javascript:" class="ui-select-button _">'+
         		'<span class="ui-select-text">请选择</span><i class="ui-select-icon"></i></a>';
         		$('select').hide().after('<div class="ui-select">'+btn+list+'<div>');
         		/*  选择框以按钮呈现添加点击事件 */
         		$('a._').on("click", function() {
         			$('.ui-select').toggleClass('active');
         		})
         		/*给下拉框选项添加事件*/
         		$('.ui-select-datalist-li').on("click", function() {
         				let number = $(this)[0].dataset.index;//获取点击目标index
         			  let options = $('.ui-select-datalist a'); //获取全部列表
                options.each(function(e){ //选择列表更新状态
                	if(e!=number){
                		$(this).removeClass("selected");
                	}
                	if(this.classList.length===1 && e==number){
                		$(this).addClass("selected");
                	}
                })
                $('.ui-select-text').text($(this)[0].text); //更新按钮内容为选择内容
                $('.ui-select').removeClass('active');//关闭下拉框

                $('select')[0].value = $(this)[0].dataset.value; //更新原始select选定值
                $('select').trigger('change');//触发绑定事件
         		})
	       	}
     })(window.jQuery);