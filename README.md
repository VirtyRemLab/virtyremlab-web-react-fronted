# Frontend en react para el servicio VirtyRemLab

Frontend desarrollado en react y MUI para el servicio web de laboratorios remotos y virtuales de UniOvi. 

# Despliegue con docker

Este microservicio de frontend se alojará en un servidor web nginx. La configuración del mismo se encuentra en ```nginx.conf```.

Para crear la imagen del frontend se proporciona el dockerfile. 

Para crear la imagen:
```bash
docker build -t react-vite-nginx .
```

Para ejecutar el contenedor:
```bash
 docker run -d -p 8080:80 react-vite-nginx
```
