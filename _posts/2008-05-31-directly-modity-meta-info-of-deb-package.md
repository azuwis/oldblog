---
layout: post
tags: [debian]
---
Sometime I want to modify the meta info of some deb packages directly, remove
dependences, increase version number, etc.

For example, fusion-icon, in compiz-fusion debian repository by [shames][],
depends on compiz-kde | compiz-gnome.

  [shames]: http://download.tuxfamily.org/shames/debian-lenny/desktopfx/unstable/

In fact, compiz-kde or compiz-gnome are not necessary. If the desktop
environment is Xfce or KDE4, those packages are not needed at all.

So, here is how to directly modify deb packages without recompiling, remove
dependence:

    # apt-cache policy fusion-icon
    fusion-icon:
      Installed: (none)
      Candidate: 0.1.2+git20080216.shame-1
      Version table:
         0.1.2+git20080216.shame-1 0
            500 http://download.tuxfamily.org ./ Packages
         0.0.0+git20071028-3 0
            500 http://ftp.debian.org lenny/main Packages
            300 http://ftp.debian.org sid/main Packages
    # aptitude download fusion-icon=0.1.2+git20080216.shame-1
    # dpkg-deb -x fusion-icon_0.1.2+git20080216.shame-1_amd64.deb deb/
    # dpkg-deb -e fusion-icon_0.1.2+git20080216.shame-1_amd64.deb deb/DEBIAN/
    # vi deb/DEBIAN/control ...edit the file
    # dpkg-deb -b deb/ my.deb
    # dpkg -i my.deb
