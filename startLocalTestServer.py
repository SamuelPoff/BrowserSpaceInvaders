import http.server
from http.server import HTTPServer, BaseHTTPRequestHandler
import socketserver

PORT = 4000

Handler = http.server.SimpleHTTPRequestHandler

Handler.extensions_map={
    '.manifest': 'text/cache-manifest',
	'.html': 'text/html',
        '.png': 'image/png',
	'.jpg': 'image/jpg',
	'.svg':	'image/svg+xml',
	'.css':	'text/css',
	'.js':	'application/x-javascript',
	'': 'application/octet-stream',
}

httpd = socketserver.TCPServer(("", PORT), Handler)

print("Serving at port: ", PORT)
httpd.serve_forever()