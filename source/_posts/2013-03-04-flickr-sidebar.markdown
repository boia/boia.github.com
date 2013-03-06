---
layout: post
title: "octopress侧边栏放上Flickr相片"
date: 2013-03-04 22:35
comments: true
categories: octopress 生活
---

今天来点生活式的技术，在侧边栏，当然你也可以在页面上放上Flickr相片

## Demo

[octopress放入**Flickr**相册](http://boia.github.com/blog/archives/)

<!-- more -->

## 注册Flickr


[Flickr](http://www.flickr.com/)来自yahoo，所以注册的是雅虎账号


## 下载Flickr-Badge

Flickr-Badge是一个octopress插件，它托管在github上

输以下命令

{% codeblock %}
  &#123;% git clone https://github.com/chronon/Octopress-Flickr-Badge.git %}
{% endcodeblock %}


## 文件

 把`flickr.html`放到`source/_includes/custom/asides/`中 
`_styles.scss`放到 `sass/custom`中，如果你的`_styles.scss`以前有过修改，就把里面代码copy出来然后放到以前文件的尾部


## 配置

将`custom/asides/flickr.html` 放到`_config.yml`中default_asides的[]中.

在`_config.yml`的尾部加以下内容

```
# Flickr Badge
flickr_user:            # user id (not username)
flickr_count:           # 照片数量
flickr_display:         # random or latest(随机或者最新)
flickr_size:            # t (thumbnail), s (small square), m (medium)
flickr_source:          # user, user_tag, all, all_tag
flickr_tag:             # tagname - set if flickr_source is set to user_tag or all_tag
```

flickr_user不是用户名，是用户id，你可以从[idgettr.com](http://idgettr.com/)获得