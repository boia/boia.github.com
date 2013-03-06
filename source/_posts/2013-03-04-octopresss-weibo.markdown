---
layout: post
title: "Octopress增加新浪微博侧栏"
date: 2013-03-04 10:24
comments: true
categories: octopress 技术
---
**Geek**是在IT行业对那些智力超群且对某样技术有狂热兴趣的人的称号，随着互联网技术在中国逐渐流行起来，中国所谓的各个IT行业的**Geek**也越来越多。

之所以谈这个不是我自诩为**Geek**，而是希望中国想搞技术的人都能够像**Geek**一样专心。

今天来介绍下在Octopress增加侧栏，以新浪微博秀为例子，

<!-- more -->

首先到[微博秀](http://weibo.com/tool/weiboshow "Title")设置自己喜欢的样式，设置完成以后，将代码获得，如果懂html的话应该能明白这是个内联框架

接着在`\source\_includes\custom\asides`中新建一个`weibo.html`，最好是放在custom下，有些人喜欢在`\source\_includes\asides`中修改或者创建，一旦主题换了，那些自己改过的都会消失，这就得不偿失了，在`weibo.html`中加入以下内容

```
{% if site.weibo_uid %}
<section class="well">
  <h1>新浪微博</h1>
  <ul id="weibo">
    <li>
      <iframe 
        width="100%" 
        height="550" 
        class="share_self" 
        frameborder="0" 
        scrolling="no" 
        src="http://widget.weibo.com/weiboshow/index.php?width=0&height=550&ptype={% if site.weibo_pic %}1{% else %}0{% endif %}&speed=0&skin={{weibo_skin}}&isTitle=0&noborder=1&isWeibo={% if site.weibo_show %}1{% else %}0{% endif %}&isFans={{weibo_fansline}}&uid={{site.weibo_uid}}&verifier={{site.weibo_verifier}}">
      </iframe>
    </li>
  </ul>
</section>
{% endif %}
```

最后就是在`_config.yml`中配置了

```
 #weibo
 #http://weibo.com/tool/weiboshow to get your uid and verifier
weibo_uid: #你自己的微博id(在生成的代码中可以看见)
weibo_verifier: #你自己的verifier
weibo_fansline: 0   # How many lines for the fan list
weibo_show: true    # Whether you want your weibo content to be shown
weibo_pic: true     # Whether you want the pictures in weibo to be shown
weibo_skin: 10      # Please refer to http://weibo.com/tool/weiboshow
weibo_share: true   # Whether show the sharing button
```

