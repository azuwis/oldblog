---
layout: post
title: 更新 linux 内核模块的较好方法
tags: [linux, kernel, module]
---
有时候 Linux 内核模块有更新，或者有第三方的改动需要用，要替换原来的模块。

比较简单的方法是把原来的 \*.ko 文件直接替换，但这样有不好的地方，如果想换回来，比较麻烦。

较好的方法是把模块装在 `` /lib/modules/`uname -r`/updates/ `` 下面，再运行 depmod，这样下次开机自动加载模块，或者用 modprobe 加载模块时，就会用 updates 下面的。如:

    # cp libdrm/linux-core/drm.ko /lib/modules/`uname -r`/updates/
    # depmod
    # /sbin/modinfo drm
    filename:       /lib/modules/2.6.25-2-amd64/updates/drm.ko
    license:        GPL and additional rights
    description:    DRM shared core routines
    author:         Gareth Hughes, Leif Delgass, José Fonseca, Jon Smirl
    depends:
    vermagic:       2.6.25 SMP mod_unload
    parm:           debug:Enable debug output (int)
