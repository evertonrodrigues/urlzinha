docker build -f Dockerfile-Api -t urlzinha-api .
docker image rm urlzinha-api

docker run -p 3000:8080 -d urlzinha-api
docker container stop <container id>
docker container rm <container id>

docker run -d -p 6379:6379 -i -t redis:5.0.6-alpine