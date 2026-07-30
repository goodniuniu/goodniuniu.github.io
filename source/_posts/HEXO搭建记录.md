---
title: "基于HEXO的搭建"
slug: "HEXO搭建记录"
date: 2022-02-03 09:49:16
categories:
  - 自然科学
tags:
  - Practice
---

## 起因

在昨天完成基于JEKYLL的静态网页搭建后，发现始终是有几个md无法展现，在github发了相关的issue提问后，发现这个项目已经很久没有人回复了，而自己因为并不了解JEKYLL的建立机制，从零开始去解决这个使用层面的偶发问题，感觉会消耗大量的时间。

## 为此

我选择了基于HEXO重新搭建，原因在于：

1. 网上的教程都比较的新。
2. 静态页面直接提供的主题也不少，而且看到别人的演示页面风格也喜欢。
3. 能在本地化的模拟发布，这点比等github的“不确定”时间渲染后才知道效果要好。
4. 和现有的工作流一致，如支持md发布等。
5. 使用的资源基本是免费、可靠。

## 实施

找了几个教程，其中和在用环境最为匹配的是[Mac下使用GitHub+Hexo搭建个人博客](https://segmentfault.com/a/1190000038373795)。

1. 本地安装HEXO

在安装node.js的时候，碰到Failed to download resource “icu4c”等问题，需要下载源码编译（多了许多的时间）
使用npm安装HEXO
```shell
sudo npm install -g hexo-cli 
```
2. 配置HEXO

在HEXO中部署发布模式
```shell
sudo npm install hexo-deployer-git --save
```

关联GitHub，修改项目中的_config.yml文件
```shell
sudo npm install hexo-deployer-git --save
```
3. 绑定域名

在github中生成CNAME文件，写入绑定的域名

在github中项目的setting中，修改custom domain
![](https://s2.loli.net/2022/02/03/boUl5nMAScf3j9t.png)
4. 发布

在_post目录中写入md文件
在项目的目录下用HEXO命令发布
```shell
hexo g & hexo d
```
5. 优化

基于_config.yml的优化
基于新主题的优化（目前拟发布10篇blog再折腾）

## 体会

1. 在部署新项目的时候，需要看看项目的可靠性，包括了作者的更新时间，参与人员的数量等。
2. 在决定技术引入的时候，优先考虑可以本地化模拟的项目，然后再在云端发布，这样做初期可控性要好许多。
