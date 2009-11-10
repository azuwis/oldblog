#!/usr/bin/env python
"""Generate tag cloud HTML for jekyll posts.
   From http://github.com/metajack/metajack.im/blob/master/_scripts/generate_cloud.py
"""


import math
import os
import urllib
import sys
import re


def find_tags(postfile):
    f = open(postfile)
    tags = ''
    marker_count = 0
    for l in f.xreadlines():
	if l == '---\n':
	    marker_count += 1
	    if marker_count == 2:
		break
	    continue

	if l.startswith('tags:'):
	    tags = l[5:].strip()
	    break

    # remove brackets
    lb = tags.find('[')
    rb = tags.rfind(']')
    tags = tags[lb+1:rb]

    return [t.strip() for t in tags.split(',')]


if __name__ == '__main__':
    cloud_size = int(sys.argv[1])
    max_ranks = int(sys.argv[2])
    postpath = os.path.join(sys.argv[3], '_posts')
    posts = [i for i in os.listdir(postpath) if not os.path.isdir(i)]

    counts = {}
    for p in posts:
	tags = find_tags(os.path.join(postpath, p))
	for t in tags:
	    if t in counts.keys():
		counts[t] += 1
	    else:
		counts[t] = 1

    # get cse-url and cse-cx from _config.yml
    f_conf = open('_config.yml')
    cse_p = re.compile('cse-(\w+):\s+(\S+)')
    cse_url = ''
    cse_cx = ''
    for l in f_conf.xreadlines():
        m = cse_p.search(l)
        if m:
            if m.group(1) == 'cx':
                cse_cx = m.group(2)
            elif m.group(1) == 'url':
                cse_url = m.group(2)

    # grab the top N tags
    sorted_keys = sorted(counts.keys(), 
			 lambda x,y: cmp(counts[x], counts[y]),
			 reverse=True)

    # this code follows the algorithm in MT
    max_count = counts[sorted_keys[0]]
    min_count = counts[sorted_keys[-1]]
    factor = 1

    if max_count - min_count == 0:
	min_count -= max_ranks
    else:
	factor = (max_ranks - 1) / math.log(max_count - min_count + 1)

    if len(sorted_keys) < max_ranks:
	factor *= (len(sorted_keys) / float(max_ranks))
    # generate HTML in alpha order for top N tags
    for t in sorted(sorted_keys[:cloud_size]):
        rank = max_ranks - int(math.log(counts[t] - min_count + 1) * factor)
        fontsize = 8.0 + rank * 8.0 / max_ranks
        print "<a href='javascript:gcse(\"%s\");' title='%d topics' rel='%d'>%s</a>" % \
	    (t, counts[t], counts[t], t)
    #<a href='http://www.neoease.com/tag/release/' class='tag-link-13' title='41 topics' rel="tag" style='font-size: 11.102040816327pt;'>Release</a>
