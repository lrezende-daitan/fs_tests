# Freeswitch mod_xml_curl demo

## Dependencies

* Nodejs 6.x.x [link to install](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
  * I used nodejs/express to make a simple webserver to serve the dialplan.xml for freeswitch, just because of it's simplicity
* Docker
  * To deploy freeswitch, not mandatory, but it's easier to deploy using it and some other changes may be needed
  * sudo docker run -d --name freeswitch -p 5060:5060/tcp -p 5060:5060/udp -p 5080:5080/tcp -p 5080:5080/udp -p 8021:8021/tcp -p 8080:8080/tcp -p 7443:7443/tcp -p 60000-60050:60000-60050/udp -v \<PATH_TO_CONF\>:/usr/local/freeswitch/conf bettervoice/freeswitch-container:1.6.16

## How to

1. Checkout the project :)
2. Change the ips at the ./conf/autoload_modules/xml_curl.conf.xml and ./conf/vars.xml
    * On both files a ##CHANGE_ME## shows where to put the ips
    * On vars.xml we need to change the ip freeswitch will use as domain, for aws instances I used the instance public ip
    * On xml_curl.conf.xml we need to show where is the service that will provide the dialplan xml.
3. If using docker, start the freeswitch container using the command above. Remember to change \<PATH_TO_CONF> with the path to the conf folder of this project (/home/ubuntu/xml_curl_test/conf)
4. Start the dialplan webserver.
    * Go to the dialplan folder
    * Run ```node app.js```

Now it should be working, just register one of the default freeswitch users and try to make a call.

Look at ./dialplan/dialplan.xml to see what extensions are available to use.


