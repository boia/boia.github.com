---
layout: post
title: "invalid byte sequence in GBK"
date: 2013-03-06 19:31
comments: true
categories: octopress
---

## 痛不欲生的windows

今天360奇迹般地发挥他的作用，将我jajl-ruby里的一个文件给删了，这尼玛痛苦地搞了一下午啊，还将ruby和devkit都重新安装了一遍，360是白痴，我也变成白痴了？

<!-- more -->

## invalid byte sequence in GBK

接着就出现了编码问题，对ruby几乎不懂，看懂代码还是可以的，然后就一个个文件地查，到底哪个文件是转换文件格式编码的，最后锁定到了`convertible.rb`(还有iconf)

真心还是不懂，也忘了输了什么关键词，就找到[解决方法](https://github.com/imathis/octopress/issues/232)
<br><br><br>
{% img /images/post/1.png imath %}
<br><br><br>
只要改成以下代码就可以了，在`convertible.rb`的28行
{% codeblock %}
  self.content = File.read(File.join(base, name), :encoding => "utf-8")
{% endcodeblock %}

{% include links %}
