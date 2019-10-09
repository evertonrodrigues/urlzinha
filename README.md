# Urlzinha
  This is Urlzinha, a api and web service to shorten urls. Urlzinha in portuguese mean's something like 'small url'


## Help
### Docker commands
```
docker build -f Dockerfile-Api -t urlzinha-api .
docker image rm urlzinha-api

docker run -p 3000:8080 -d urlzinha-api

docker build -f Dockerfile-Web -t urlzinha-web .
docker image rm urlzinha-web

docker run -p 3000:8080 -d urlzinha-web

docker container stop <container id>  
docker container rm <container id>

docker run -d -p 6379:6379 -i -t redis:5.0.6-alpine
```
