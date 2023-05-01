# linkMin URL shortner

http://linkm.in

linkMin is a simple url shortner written in node.js, expressjs, nginx and redis technologies.

# Installation

	install nginx [http://nginx.org/]
	install node.js	[http://nodejs.org]
	install redis [http://redis.io]

	git clone repo
	cd into/repo
	npm install
	node app	

# Usage

	save links forever in redis. links then redirects to saved url.

# API DOC

/////////////////////////////// API /////////////////////////////////////
[get Url] post /shortner/fetch
body ->
	key // [mandatory] key for the url

[create Url] post /shortner/create
body ->
	url // [mandatory] url to be shortened
	key // [optional] key for the url

[delete Url] post /shortner/delete
	key // [mandatory] key to be deleted

//////////////////////////////// API ////////////////////////////////////]
	

#  Author
	
	Nikhil Ranjan
	@niklabh
	niklabh811@gmail.com
	Software Engineer -> Node.js

# Still to do

	Minify
	Bootstrap
	filter http://[url] and [url]
	error on already existing links
	edit links
	etc et al.	





