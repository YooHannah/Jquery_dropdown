# 练习使用Jquery写下拉框组件

本次练习目的/效果，根据HTML文件select标签，更改原始标签样式，并保留基本功能

遗留问题

1.同一页面同时使用多个select标签时,本组件无法适用,已解决；

解决办法：使用this 代替对select标签的选定，然后使用循环对每一个select 进行替换和绑定事件

2.原始select标签添加的style基础样式(例如width),没有进行同步处理，已解决。

解决办法:使用$().attr('style')获取定制style属性，然后在拼接html时将属性添加进去，

同时将.ui-select-datalist原本的absolute属性去掉，否则按钮和下拉框位置发生错位


扩展方向

1.多选 完成

实现方法: 通过在select 标签中添加Multiple类判断要构建多选下拉框,将选择好的数据通过data-属性传递回原来select标签

遗留问题: 实现多选下拉列表在点击列表以外地方关闭列表   已解决

解决办法: 绑定下拉列表mouseleave事件,然后监听页面mouseup事件,执行关闭下拉列表,trigger callback,防止冒泡off掉页面mouseup事件;

处理问题：点击列表外区域关闭列表时，如果点击的是button,会触发button事件，列表又被打开，所以在点击列表时判断是不是点击的按钮，如果点击的是按钮，则交给按钮事件处理

2.查询 完成

实现方法：利用indexof判断选项是否符合查询条件,符合display：block,反之display：none


待完善工作
1.测试文件配置
2.压缩文件配置 已完成

