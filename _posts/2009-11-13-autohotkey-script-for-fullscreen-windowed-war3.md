---
layout: post
tags: [autohotkey, war3, DotA]
---
![autohotkey](http://www.autohotkey.com/docs/images/AutoHotkey_logo.gif)
If you like me, press `alt+tab` a lot when playing war3, maybe here is what you
want.

In normal fullscreen mode of war3, video display mode will change and cause
flicking every time you alt-tab out and in. This is annoying.

Add `-window` param to the war3 startup shortcut, this will let war3 run in
window mode. Use this piece of [autohotkey][] script to remove the window
decoration and border, and make window fullscreen:

    WinSet, Style, -0xC40000, Warcraft III
    WinMaximize, Warcraft III

Script file [here][], base on [Window Tools][].

[autohotkey]: http://www.autohotkey.com/
[here]: /stack/fullscreen-windowed.ahk
[Window Tools]: http://www.garena.com/forum/viewthread.php?tid=212884
