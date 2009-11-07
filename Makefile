all: tagcloud upload

test:
	jekyll --auto --server

tagcloud:
	python _scripts/generate_cloud.py 10 6 . > inc/tagcloud.html

upload:
	google_appengine update .
