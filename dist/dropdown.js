(function ($) {
         $.fn.Dropdown = function (options) {
                this.each(function(){
                    /*初始化 根据元数据拼接 */
                    let list = "<div class='ui-select-datalist'>";
                    $(this).find('option').each(function(e){
                        if(e===0){
                            list+="<a href='javascript:' class='ui-select-datalist-li selected' data-index='"+e+"' data-value='"+this.value+"'>"+this.text+"</a>";
                        }else{
                            list+="<a href='javascript:' class='ui-select-datalist-li' data-index='"+e+"' data-value='"+this.value+"'>"+this.text+"</a>"
                        }
                    })
                    list+='</div>';
                    let btn = '<a href="javascript:" class="ui-select-button _">'+
                    '<span class="ui-select-text">请选择</span><i class="ui-select-icon"></i></a>';
                    let style=$(this).attr('style');/* 将定制style传递进来  */
                    $(this).hide().after('<div class="ui-select" style="'+style+'">'+btn+list+'<div>');
                    /*  选择框以按钮呈现添加点击事件 */
                    $(this).next().find('a._').on("click", function() {
                        $(this).parent().toggleClass('active');
                    })
                    /*给下拉框选项添加事件*/
                    $(this).next().find('.ui-select-datalist-li').on("click", function() {
                        let number = $(this)[0].dataset.index;//获取点击目标index
                        let options =$(this).parent().find('a'); //获取全部列表
                        options.each(function(e){ //选择列表更新状态
                            if(e!=number){
                                $(this).removeClass("selected");
                            }
                            if(this.classList.length===1 && e==number){
                                $(this).addClass("selected");
                            }
                        })
                        $(this).parents('.ui-select').find('.ui-select-text').text($(this)[0].text); //更新按钮内容为选择内容
                        $(this).parents('.ui-select').removeClass('active');//关闭下拉框
                        $(this).parents('.ui-select').prev()[0].value = $(this)[0].dataset.value; //更新原始select选定值
                        $(this).parents('.ui-select').prev().trigger('change');//触发绑定事件
                    })

                })
	       	}
     })(window.jQuery);