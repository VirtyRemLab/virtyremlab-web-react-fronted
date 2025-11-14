# Frontend en react para el servicio VirtyRemLab

Frontend desarrollado en react y MUI para el servicio web de laboratorios remotos y virtuales de UniOvi. 

# Ejecución en local
```
npm run dev
```

# Despliegue con docker

Este microservicio de frontend se alojará en un servidor web nginx. La configuración del mismo se encuentra en ```nginx.conf```.

Para crear la imagen del frontend se proporciona el dockerfile. 

Para crear la imagen:
```bash
docker build -t react-vite-nginx:v0.1 .
```

Para ejecutar el contenedor:
```bash
docker run -d -p 5000:80 --name react-vite-nginx --network virtyremlab-net react-vite-nginx:v0.1
```
