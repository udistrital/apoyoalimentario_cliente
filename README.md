# apoyoalimentario_CLIENTE

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5.

Esta aplicación sirve para realizar la inscripción al Apoyo Alimentario de la Universidad Distrital Francisco José de Caldas

# IMPORTANTE

Es necesario que se tenga el `CRUD_API` y `MID_API`

## Configuración de IP

Modifique todos los archivos llamados `Path` del archivo `model.constants.ts` que está ubicado en `src/app/common/constants/model.constants.ts`.

Ingrese la dirección IP del equipo en el que está ubicados el `CRUD_API` y `MID_API`.

## Para desplegar

Debe ejecutar el comando `npm install` para instalar las dependencias necesarias en el proyecto.

Ejecute el comando `ng serve` o `npm start` para ejecutarlo en un servidor local, la aplicación corre por defecto en `http://localhost:4200/.`

Si desea cambiarla, modifique la propiedad `baseURL` del archivo `protractor.conf.js`que esta ubicado en la carpeta raiz del proyecto.

## Build

Ejecute `ng build` para hacer el build del proyecto. El build se guarda en la carpeta `dist/`.