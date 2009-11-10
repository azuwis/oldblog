---
layout: post
tag: [debian]
---
This is not a complete howto, I just wrote it for memorizing.

## preparation ##

    $ git clone git://git.debian.org/git/buildd-tools/buildd.git
    $ cd buildd && debuild binary
    # dpkg -i ../buildd_*.deb
    # aptitude install sbuild wanna-build buildd quin-diff dupload reprepro inoticoming

## sbuild ##

create chroots, watch final output:

    # useradd -m -s /bin/bash buildd
    # sbuild-createchroot --include="pkg-config" --arch=i386 sid /home/buildd/chroot/unstable http://ftp.debian.org/debian

refine auto added schroot config file:

    # mv /etc/schroot/chroot.d/sid-i386-sbuild.pk4BSL /etc/schroot/chroot.d/sid-i386-sbuild
    # edit /etc/schroot/chroot.d/sid-i386-sbuild, add [unstable-i386-sbuild]

edit /home/buildd/chroot/unstable/etc/apt/sources.list and /home/buildd/chroot/unstable/etc/apt/preferences:

* add local repo to sources.list:

        deb http://your-repo/debian sid main
        deb-src http://your-repo/debian sid main

* prefer local repo:

        Package: *
        Pin: release o=Azuwis, a=unstable  # (for o=Azuwis, see reprepro setup)
        Pin-Priority: 1000
        
        Package: *
        Pin: release a=unstable
        Pin-Priority: 500

let user buildd use sbuild:

    # sbuild-adduser buildd
    # su - buildd
    $ cp /usr/share/doc/sbuild/examples/example.sbuildrc ~/.sbuildrc
        $mailto='azuwis@163.org';
        $apt_update = 1;
        $key_id = 'Azuwis Debian Repository Build Daemon <azuwis@163.org>';
        $pgp_options = '';

generate gpg key for sbuild to sign and upload:

    $ echo -n "" | gpg
    $ echo -n "" | gpg
    $ gpg --gen-key
      ... use 'Azuwis Debian Repository Build Daemon <azuwis@163.org>'

test sbuild and gpg sign, watch ouput and email:

    $ sbuild hello_2.2-3

## buildd ##

    $ mkdir -p .ssh build logs mqueue old-logs stats/graphs upload upload-security
    $ chmod o= .ssh upload-security old-logs mqueue logs build
    $ zcat /usr/share/doc/buildd/examples/buildd.conf.gz > buildd.conf
        $admin_mail = 'azuwis@163.org';
        $statistics_mail = 'azuwis@163.org';
        $dupload_to = "azuwis"; # see dupload below
    $ zcat /usr/share/doc/buildd/examples/crontab.gz > cronjob
        10,25,40,55 * * * * /usr/bin/buildd-uploader
        20          * * * * /usr/bin/buildd-watcher
    $ crontab cronjob

## dupload ##

edit ~/.dupload.conf

    package config;
    $cfg{'azuwis'} = {
        fqdn => "azuwis.people.163.org",
        method => "ftp",
        incoming => "/pub/UploadQueue/",
        login => "anonymous",
        dinstall_runs => 1,
    };
    1;

## wanna-build ##

    $ mkdir ~/wanna-build
    $ chown 2755 ~/wanna-build
    $ cp /etc/buildd/wanna-build.conf ~/.wanna-buildrc
        $basedir = "/home/buildd/wanna-build";
        $db_maint = 'azuwis@163.org';
        $notforus_maint = 'azuwis@163.org';
        $log_mail = 'azuwis@163.org';
        $stat_mail = 'azuwis@163.org';
        $web_stats = "/home/buildd/wanna-build/stats.txt";

## reprepro ##

    # useradd -m -s /bin/bash reprepro
    # su - reprepro

edit conf/distributions:

    Origin: Azuwis
    Label: Azuwis
    Suite: unstable
    Codename: sid
    Architectures: i386 source
    Components: main
    Description: Random packages not in offical Debian archive
    SignWith: yes
    Uploaders: uploaders
    DscIndices: Sources Release . .gz .bz2
    DebIndices: Packages Release . .gz .bz2
    
    Origin: Azuwis
    Label: Azuwis
    Suite: experimental
    Codename: experimental
    AlsoAcceptFor: UNRELEASED
    Architectures: i386 source
    Components: main
    Description: Random packages not in offical Debian archive and experimental; use at your own risk.
    SignWith: yes
    NotAutomatic: yes
    Uploaders: uploaders
    DscIndices: Sources Release . .gz .bz2
    DebIndices: Packages Release . .gz .bz2

edit conf/uploaders, only allow some users to upload, gpg pubkeys need to be imported, see below for how to get key-id and how to import:
    
    allow * by key 5F617B74853F1566 # Azuwis Debian Repository Build Daemon <azuwis@163.org>

edit conf/incoming:

    Name: incoming
    IncomingDir: incoming
    TempDir: temp
    Allow: unstable>sid experimental>experimental UNRELEASED>experimental

prepare for ftp upload:

    # chown reprepro:nogroup /home/ftp/pub/UploadQueue # (nogroup is user ftp's main group)
    # chmod 01775 /home/ftp/pub/UploadQueue
    $ ln -s /home/ftp/pub/UploadQueue /home/reprepro/incoming

auto process incoming using inoticoming:

    $ cp /usr/share/doc/inoticoming/examples/cronjob ~/
        @reboot inoticoming --logfile /home/reprepro/logs/inoticoming.log /home/reprepro/incoming/ --stderr-to-log --stdout-to-log --suffix '.changes' --chdir /home/reprepro reprepro -b /home/reprepro processincoming incoming {} \;

import user buildd's gpg key, import other users' in the same way, remember add key-id to conf/uploaders:

    buildd@:~$ gpg --with-colons --list-secret-keys
        sec::1024:17:5F617B74853F1566:2008-12-16::::Azuwis Debian Repository Build Daemon <azuwis@163.org>:::
        ssb::2048:16:04A6D58060BC8BE7:2008-12-16:::::::
    buildd@:~$ gpg -a --export 5F617B74853F1566 > ~/buildd.asc
    reprepro@:~$ gpg --import /home/buildd/buildd.asc

export reprepro's gpg pubkey to public:

    reprepro@:~$ gpg --with-colons --list-secret-keys
        sec::1024:17:43A170358765EF08:2008-11-28::::Azuwis' Debian Repository <azuwis@gmail.com>:::
        ssb::2048:16:2CEB4DD6864C12E2:2008-11-28:::::::
    reprepro@:~$ gpg -a --export 43A170358765EF08 > reprepro.asc

trust local repo in sbuild chroots:

    # sbuild-shell unstable
    # apt-key add /home/reprepro/reprepro.asc

## Reference ##

* /usr/share/doc/buildd/examples/buildd-setup-system.gz
* /usr/share/doc/reprepro/manual.html
