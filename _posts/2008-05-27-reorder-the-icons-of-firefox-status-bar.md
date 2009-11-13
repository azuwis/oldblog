---
layout: post
title: 给 Firefox 状态栏图标重新排位
tags: [firefox]
---
![Firefox](http://www.mozilla.com/img/tignish/about/logo/download/logo-only-preview.png){:.right}
Firefox 自己并不能方便的给状态栏的图标重新排序，有一个扩展叫 [Organize Status Bar](https://addons.mozilla.org/en-US/firefox/addon/1759)，可以比较方便的做这个事情。但只是是为了重新排序而装一个扩展，似乎并不值得。

其实，Firefox 状态栏的图标一般是由扩展产生的，图标的顺序跟扩展的安装顺序对应。通过改扩展的顺序，可以改变状态栏图标的顺序。

在 Firefox 的配置目录(Linux 下为 ~/.mozilla/firefox/\*.default/)里，extensions.ini 这个文件记录的是扩展的顺序，如：

    [ExtensionDirs]
    Extension0=/home/azuwis/.mozilla/firefox/cv7nxof9.default/extensions/firebug@software.joehewitt.com
    Extension1=/home/azuwis/.mozilla/firefox/cv7nxof9.default/extensions/{0C4B554C-05D9-11DB-9804-B622A1EF5492}

通过查看 extensions.rdf 这个文件，可以得到扩展的 ID 和名称的对应，如：

    <RDF:Description RDF:about="urn:mozilla:item:{73a6fe31-595d-460b-a920-fcc0f8843232}"
        ...
        NS1:name="NoScript"
        ...

就知道 {73a6fe31-595d-460b-a920-fcc0f8843232} 这个 ID 是对应 NoScript 这个扩展的，根据这点修改 extensions.ini 的内容，改变扩展的顺序，重启 Firefox，状态栏图标的顺序就会跟著改变。
