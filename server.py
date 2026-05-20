#!/usr/bin/env python3
"""Serve the current directory with SPA fallback — any path that doesn't match
a real file serves index.html instead, matching how GitHub Pages behaves."""
import http.server
import os
import sys
import mimetypes

PORT = 8000

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        path = self.translate_path(self.path)
        if os.path.isfile(path):
            super().do_GET()
        else:
            self.path = "/index.html"
            super().do_GET()

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    http.server.HTTPServer(("", PORT), SPAHandler).serve_forever()
