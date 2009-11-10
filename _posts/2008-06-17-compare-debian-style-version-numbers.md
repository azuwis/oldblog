---
layout: post
tags: [debian]
---
I wanted to write a script to comparing debian style version numbers, for a
reason I don't remember. Today, I've just discover this:

    $ dpkg --compare-versions 1.5.1 gt 1.5.1~svn && echo "1.5.1 is greater"
    1.5.1 is greater

And there're some api in package libapt-pkg-perl to, see:

    $ /usr/share/doc/libapt-pkg-perl/examples/apt-version compare 1.5.1~svn 1.5.1
    [System: Debian dpkg interface; Versioning type: Standard .deb]
    * package version `1.5.1~svn' is earlier than `1.5.1'
