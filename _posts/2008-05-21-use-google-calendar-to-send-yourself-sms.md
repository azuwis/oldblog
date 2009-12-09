---
layout: post
title: 拿 google calendar 来做接口给自己发短信
tags: [google, calendar, SMS]
---
![google calendar](http://calendar.google.com/googlecalendar/images/calendar_logo_sm_en.gif)
google calendar 的短信提醒服务支持中国移动(联通不知道是不是支持)，可以通过 google 提供的 GData 接口给 google calendar 添加短信提醒，从而达到短信接口的效果。

首先是让你的 google calendar 帐号跟你的手机绑定。

下面是一个 ruby 代码实现添加提醒:

    #!/usr/bin/ruby
    require 'rubygems'
    require 'googlecalendar'
    
    def sms(google_acount, password, message)
      now = Time.now.utc
      # 添加一个 360 秒后的事件
      startTime = (now + 360).strftime("%Y-%m-%dT%H:%M:%S.000Z")
      endTime = (now + 3600 + 360).strftime("%Y-%m-%dT%H:%M:%S.000Z")
      g = GData.new
      g.login(google_acount + '@gmail.com', password)
      event = { :title=>message,
        :content=>message,
        :author=>google_acount,
        :email=>google_acount + '@gmail.com',
        :where=>'some place',
        :startTime=>startTime,
        :endTime=>endTime
      }
      # 给事件添加一个提前 5 分钟的 sms 提醒
      g.add_reminder(event, 5, 'sms')
      g.new_event(event)
    end
    
    sms(google_acount, password, 'a test')

googlecalendar 的 rubygem 可以用 gem install googlecalendar 来安装。

还有 [gcalcli][] 命令行工具，可以管理 google calendar，不喜欢自己写代码的也可以用这个实现。

[gcalcli]: http://code.google.com/p/gcalcli/
