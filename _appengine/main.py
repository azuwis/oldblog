#!/usr/bin/python
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext.webapp import template

class NotFoundPageHandler(webapp.RequestHandler):
    def get(self):
        self.error(404)
	#self.redirect('/404.html')
        self.response.out.write(template.render("404.html", {}))

application = webapp.WSGIApplication([('/.*', NotFoundPageHandler)],
                                     debug=True)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()
