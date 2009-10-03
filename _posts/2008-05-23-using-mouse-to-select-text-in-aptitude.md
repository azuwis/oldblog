---
layout: post
title:  在 aptitude 里用鼠标选择文字
tags:    [debian, tip]
---

困扰我很长时间的问题，原来在 aptitude 的 FAQ 里就有答案，原话是:

    1) I want to select text, why doesn't aptitude let me disable the mouse?

        When a program running in an xterm is accessing the mouse, the xterm
        disables text selection.  However, you can override this behavior and
        perform a selection by holding the Shift key down.

原来只要按住 Shift，就可以在 aptitude 的 curses 程序里用鼠标选择和粘贴文字。

看来每用一个软件前都要好好的看一下它的 FAQ。
