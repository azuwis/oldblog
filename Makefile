all: jekyll tagcloud upload

test:
	jekyll --auto --server

jekyll:
	jekyll

tagcloud:
	python _scripts/generate_cloud.py 10 6 . > inc/tagcloud.html

upload:
	google_appengine update .
