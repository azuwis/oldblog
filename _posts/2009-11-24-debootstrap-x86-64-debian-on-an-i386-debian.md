---
layout: post
title: Debootstrap x86_64 Debian on an i386 Debian
tags: [debian, debootstrap, x86_64]
---
I know that an i386 Debian can be easily installed using debootstrap on a
already installed x86_64 Debian.

But the scenario is an i386 Debian is already installed on a machine that has a
x86_64 CPU, and I want to bootstrap a x86_64 Debian on it. Can this be done?

The answer is yes, with a bit more extra work.

First install a x86_64 kernel, so that debootstrap can run x86_64 apps in the
chroot. An i386 system can run under a x86_64 kernel, and Debian has prepared
everything for you, just:

    # aptitude install linux-image-2.6-amd64
    # update-grub # just in case dpkg won't run this for you
    # reboot

Select x86_64 kernel in the grub menu and boot, and the rest is just a normal
debootstrap process:

    # fdisk /dev/sdX # partition
    # mkdir /mnt/target
    # mount /mnt/target # mount all target partitions, including /boot, /home...
    # debootstrap --verbose --arch amd64 unstable /mnt/target
    # mount -o bind /proc /mnt/target/proc
    # mount -o bind /dev /mnt/target/dev
    # chroot /mnt/target
    # dpkg-reconfigure debconf # set to low
    # dpkg-reconfigure -a # reconfigure all packages
    # aptitude # install needed packages, remember to install locales
    # vi /etc/fstab
    # aptitude install linux-image-2.6-amd64 # install kernel inside the chroot
    # passwd # change root password
    # useradd -m -s /bin/bash normal_user # add a normal user

Exit chroot and add the new entry in grub's config file, reboot. Now you have a
newly installed x86_64 Debian.

For more detail, see [this chapter][1] of Debian GNU/Linux Installation Guide
and debootstrap manual.

[1]: http://www.debian.org/releases/stable/amd64/apds03.html.en
