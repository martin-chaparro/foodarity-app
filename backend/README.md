# Backend docs

## Routes
Url Base: 'http://localhost:4000/api/v1'

### Rutas provincias y ciudades
---


GET: /cities : trae todos los municipios

GET: /cities?name : trae todos los municipios que matcheen con el query 'name'

GET: /states : trae todas provincias

GET: /states?name : trae todas las provincias que matcheen con el query 'name'

### Rutas Autenticacion
----
POST: /auth : Ruta para login
```
body:
{
"email":"user@email.com",
"password":"123456"
}
```
GET : /renew: ruta para renovar el token. Es una ruta protegida hay que mandar el token obtenido en el login por cabeceras con el formato de autorization del tipo Bearer Token.
Ejemplo:
```
var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://localhost:4000/api/v1/auth/renew',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsIm5hbWUiOiJNYXJ0ajjjsdFycm8iLCJpYXQiOjE2NDE0OTA1NTUsImV4cCI6MTY0MTQ5Nzc1NX0.1pwGm7r7tzde-eqS4qV2BxtoWmfDGhX6XvTkGNdp9Sk'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
### Rutas Usuarios
---
POST: /users : Ruta para login crear un usuario(registro). Minimo 6 caracteres
```
body:
{
    "name":"Nombre del usuario",
    "email":"email@email.com",
    "password":"123456"
}
```

GET: /users : Ruta para obtener todos los usuarios. Ruta Protegida. Se va a utilizar para la administracion

