## Requisitos previos

Esto solo se tiene que hacer la primera vez, es para instalar los programas que se necesitan.
1. Descargar e instalar Node.js
⋅⋅⋅(Hay dos versiones, descargar la versión LTS) `https://nodejs.org/es/`
2. Descargar e instalar mongodb
...#### Windows
...Seguir las instrucciones del video `https://youtu.be/2KMQdqDk9e8`

...#### MAC:
...Ejecutar lo siguiente en la terminal (el proceso puede tardar 20 minutos):
...> /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

...Cuando el proceso termine ejecutar lo siguiente en la terminal:
...> sudo brew install mongo

...Al terminar el proceso ejecutar lo siguiente en la terminal:
...> sudo mkdir -p /data/db

...Validar la instalación ejecutando (Debe mostrar el nombre de la versión)
...> sudo mongo --version

## Instalación del proyecto