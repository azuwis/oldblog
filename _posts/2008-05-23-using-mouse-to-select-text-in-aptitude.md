---
layout: post
tags:    [debian, tip]
---

It obsessed me for a long time, but today I found the answer in aptitude's FAQ:

    1) I want to select text, why doesn't aptitude let me disable the mouse?

        When a program running in an xterm is accessing the mouse, the xterm
        disables text selection.  However, you can override this behavior and
        perform a selection by holding the Shift key down.

So, just hold down shift key, copying and pasting text in aptitude's curses interface will work as expected.

It's always good to look at software's FAQ before using it.
