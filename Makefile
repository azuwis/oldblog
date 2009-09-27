all:

test:
	jekyll --auto --server

tagcloud:
	python _scripts/generate_cloud.py 10 6 . > _includes/_includes/tagcloud.html
