all: tagcloud jekyll upload

test:
	jekyll --auto --server

jekyll:
	jekyll

tagcloud:
	python _scripts/generate_cloud.py 100 6 . > inc/tagcloud.html

upload:
	cp _site/404.html _appengine/
	google_appengine update _appengine
