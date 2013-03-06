---
layout: post
title: "在octopress中加入jsfiddle"
date: 2013-03-04 14:23
comments: true
categories: octopress javascript
---
**jsFiddle**是一个web开发人员的练习场，一个可以在很多方面应用的工具。我们可以用他来在线编辑一些HTML,CSS,javascript片段。你编辑的代码可以与其他人分享，或嵌入你的博客等。使用这个工具，javascript的开发者可以很容易的发现并解决BUG问题。你还可以选择你自己熟悉的流行的各种javascript库来进行开发，对XHR的支持也非常好，还可以模拟一些响应等。

今天我们来学习将**jsfiddle**插件放入到octopress中。

<!-- more -->

## 下载**jsfiddle**插件

先用git命令将插件下载下来

{% codeblock %}
  git clone https://github.com/ShaunaGordon/octopress-jsfiddle.git
{% endcodeblock %}

然后将里面的`jsfiddle.rb`拷贝到 `/plugins`中

## 一般语法

{% codeblock %}
  &#123;% jsfiddle shorttag [tabs] [skin] [height] [width] %}
{% endcodeblock %}

缺省值如下:

* tabs: `js,resources,html,css,result`
* skin: `light`
* height: `300px`
* width: `100%`

如果你就想设置height，而前面几个值都用默认的，那么填default就行了


### 举例

这里我直接拿[张磊](http://www.cnblogs.com/iamzhanglei/archive/2011/10/07/2199306.html)的代码作为测试

{% codeblock %}
  &#123;% jsfiddle LHWmv result,js,html,css presentation 500px %}
{% endcodeblock %}


### 结果

{% jsfiddle LHWmv result,js,html,css presentation 500px %}

## 总结

**jsFiddle**以前在张磊的博客看见的时候挺新颖的，现在在自己的blog里加上这个插件还是分外激动的，以后就不用上面一段代码，下面一个演示那么墨迹了。

[jsFiddle]: http://jsfiddle.net
[Octopress]: http://octopress.org
[fiddle]: http://jsfiddle.net
[GitHub]: http://github.com
