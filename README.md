# POKEMON APP

## Herramientas usadas:
### Vite
Se escogió Vite en vez de usar **Create React App** dado que CRA no se considera buena opción en producción y con
Vite se configura desde cero, eligiendo solo los paquetes necesarios

### Redux Toolkit
Aunque por las dimensiones de la app no era tan necesario, ayuda a evitar el pasar callbacks a componentes
hijos y centraliza el storage en un solo sitio para que los componentes se conecten a él

### Tailwind
Aunque no tengo mucho tiempo usando tailwind considero que permite prototipar más rápido que en CSS clásico, aunque hubiese querido pasar los estilos a
CCS para que quedara más limpio el HTML. Aun así intenté colocar el plus de hacer el **diseño responsive** 

![imagen](capture.png)

### Jest y MSW
Para realizar pruebas unitarias se realizó un mock de la API en MSW, lo que permite siempre tener los mismos
resultados y no tener que hacer peticiones de prueba a la API real

### OBSERVACIONES
Aunque no vi necesario usar **React Router** organicé los componentes en la carpeta *pages* porque es la
estructura que normalmente tendría usando React Router o NextJS y el componente principal se puede
visualizar como una página
