(function ($) {
         $.fn.Dropdown = function (options) {
                this.each(function(){
                    let isMultiple = $(this).hasClass('Multiple'); //判断是不是多选
                    let isSearch = $(this).hasClass('Search');
                    let olddata = '';
                    let SingleOlddata = '';
                    let origindata = [];

                    /*初始化 根据元数据拼接 */
                    let list = "<div class='ui-select-datalist'>";
                    let btn = '<a href="javascript:" class="ui-select-button _">'+
                    '<span class="ui-select-text">请选择</span><i class="ui-select-icon"></i></a>';
                    let inputbox = '<input type="" name="" class="ui-select-input">';
                    let style=$(this).attr('style');/* 将定制style传递进来  */

                    if(isSearch){
                        list+=inputbox;
                    }
                    $(this).find('option').each(function(e){
                        if(e===0){
                            list+="<a href='javascript:' class='ui-select-datalist-li selected' data-index='"+e+"' data-value='"+this.value+"' data-text='"+this.text+"'>"+this.text+"</a>";
                        }else{
                            list+="<a href='javascript:' class='ui-select-datalist-li' data-index='"+e+"' data-value='"+this.value+"' data-text='"+this.text+"'>"+this.text+"</a>"
                        }
                        origindata.push({
                            value:this.value,
                            text:this.text
                             })
                    })
                    list+='</div>';

                    if(isMultiple){
                            $(this).hide().after('<div class="ui-select Multiple" style="'+style+'">'+btn+list+'<div>');
                    }else{
                         $(this).hide().after('<div class="ui-select" style="'+style+'">'+btn+list+'<div>');
                    }

                     $(this).next().find('.ui-select-input').on("input", function() {
                        let searchResult = [];
                        let search = $(this)[0].value;
                        let options = $(this).nextAll();
                        for(let i=0;i<options.length;i++){
                            if($(options[i]).data('value') !== ''){
                                $(options[i]).css('display','block')
                            }
                            if($(options[i]).data('text').indexOf(search) === -1){
                                $(options[i]).css('display','none');
                            }
                        }
                     })


                    /*  选择框以按钮呈现添加点击事件 */
                    $(this).next().find('a._').on("click", function() {
                        /* 选项删除‘未选择’*/
                        let temp = $(this).next().find('a')[0];
                        if($(temp).data('value') === ''){
                           $(temp).css('display','none');
                        }
                        //下拉框打开关闭
                    $(this).parent().toggleClass('active');
                         if(!isMultiple && $(this).parent().hasClass('active')){ //单选 下拉框打开时获取现有值 关闭时做比较
                           SingleOlddata = $(this).parents('.ui-select').prev()[0].value;
                         }

                        if(isMultiple && $(this).parent().hasClass('active')){ //多选 下拉框打开时获取现有值 关闭时做比较
                           olddata = $(this).parents('.ui-select').prev().data('value');
                        }
                        if(isMultiple && !$(this).parent().hasClass('active')){ //多选关闭 判断是否触发change事件
                            let data = $(this).parents('.ui-select').prev().data('value');
                            let flag = false;
                            if(olddata === undefined || data.length != olddata.length){
                                flag = true;
                            }else{
                                let length = data.length;
                                for(let j=0;j<length-1;j++){
                                    if(data[j].value != olddata[j].value){
                                        flag = true;
                                        break;
                                    }
                                }
                            }
                            if(flag){
                                 $(this).parents('.ui-select').prev().trigger('change');//关闭下拉框时触发多选绑定事件
                            }
                        }
                    })

                    /* 在下拉框外点击实现关闭下拉框*/
                    $(this).next().find('.ui-select-datalist').on('mouseleave',function(e){
                        let tempobj = $(this).parent();
                        $(document).on('mouseup',function(e){
                           if($(e.target).hasClass('ui-select-text')){ //如果是点击的按钮则不执行
                             $(this).off('mouseup');
                             return
                           }
                            if(tempobj.hasClass('active')){
                                tempobj.toggleClass('active');
                            }
                            if(isMultiple){ //如果是多选判断是不是要触发change callback
                                let data = tempobj.prev().data('value');
                                let flag = false;
                                if(olddata === undefined || data.length != olddata.length){
                                    flag = true;
                                }else{
                                    let length = data.length;
                                    for(let j=0;j<length-1;j++){
                                        if(data[j].value != olddata[j].value){
                                            flag = true;
                                            break;
                                        }
                                    }
                                }
                                if(flag){
                                     tempobj.prev().trigger('change');//关闭下拉框时触发多选绑定事件
                                }
                            }
                            $(this).off('mouseup');
                        })
                    })

                    /*给下拉框选项添加事件*/
                    $(this).next().find('.ui-select-datalist-li').on("click", function() {
                        let options =$(this).parent().find('a'); //获取全部列表
                        /* 单选下拉框*/
                        if(!isMultiple){
                            let number = $(this)[0].dataset.index;//获取点击目标index
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
                            if($(this)[0].dataset.value != SingleOlddata){
                                 $(this).parents('.ui-select').prev()[0].value = $(this)[0].dataset.value; //更新原始select选定值
                                 $(this).parents('.ui-select').prev().trigger('change');//触发绑定事件
                            }
                        }

                        /*  多选下拉框 */
                        if(isMultiple){
                            let textstr = '';
                            let results=[];//多选集合

                            //*****扩展可定制选项属性******
                            // let attrs = $(this).parents('.ui-select').prev().data('obj');//多选需要的参数
                            // let arr = attrs.split(/\,/);

                            $(this).toggleClass("selected");//选择列表更新状态
                             options.each(function(e){ //整理已选选项
                                if($(this).hasClass('selected') && e!=0){
                                    results.push({
                                        value:$(this).data('value'),
                                        text:$(this).data('text'),
                                    })
                                    if(results.length==1){
                                        textstr=$(this).data('text');
                                    }else{
                                        textstr=textstr+'、'+$(this).data('text');
                                    }
                                };
                            })
                            if(textstr.length === 0){
                                textstr = '请选择'
                            }
                            $(this).parents('.ui-select').find('.ui-select-text').text(textstr); //更新按钮内容为选择内容
                            $(this).parents('.ui-select').prev().data('value',results) //传递选择参数
                        }
                    })
                })
	       	}
     })(window.jQuery);