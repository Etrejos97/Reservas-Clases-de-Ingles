# Reserva de clases de inglés

App móvil hecha con React Native y Expo para el taller de Desarrollo Móvil. Muestra un catálogo de clases de inglés, deja reservar un horario y guarda todo en el teléfono. No tiene inicio de sesión: trabajo como si ya hubiera una persona dentro, y su perfil se registra y se guarda en el mismo teléfono.

## Qué hace

- **Clases:** lista de clases con buscador por título o profesor y filtro por nivel. Al tocar una clase se abre el detalle con la descripción, el profesor, los horarios, los cupos y el precio.
- **Reservar:** en el detalle elijo un horario y reservo. Si todavía no tengo perfil, el botón me lleva a la pestaña Perfil. Los cupos bajan con cada reserva.
- **Reservas:** lista de mis reservas con la más nueva arriba, el total a pagar y un botón para cancelar cada una. Al cancelar, el cupo vuelve a quedar libre.
- **Perfil:** formulario con nombre, apellido, nivel de inglés (A1 a C2), teléfono, documento y foto. Los datos se guardan al pulsar Guardar. El documento no se puede cambiar después de registrarlo, porque cada reserva guarda el documento de quien la hizo.
- **Borrar mis datos:** en la vista del perfil, con una confirmación antes de borrar. Borra el perfil y las reservas, tanto del teléfono como de lo que la app tiene en memoria.
- **Caja de depuración:** al final de la vista del perfil, solo en desarrollo, muestra como texto lo que hay guardado en AsyncStorage. Sirve para ver que los datos se guardan como JSON.

## Cómo correrla

Necesito Node.js y la app Expo Go en el teléfono.

```
npm install
npx expo start
```

Escaneo el código QR de la terminal con Expo Go. También se puede correr en un emulador de Android con `npm run android`.

## Cómo está organizado

```
src/
  components/   piezas visuales: tarjeta de clase, tarjeta de reserva, avatar, chips
  constants/    nombres de las llaves donde se guardan los datos
  context/      perfil y reservas, compartidos por todas las pantallas
  data/         las clases de ejemplo y los niveles de inglés
  hooks/        useAlmacenamiento, usePerfil, useReserva, useResponsive
  navigation/   la barra de pestañas y la navegación de Clases
  screens/      Clases, Detalle de la clase, Reservas y Perfil
  services/     storage.js, el único archivo que habla con AsyncStorage
  theme/        colores, espacios y tipografía
  utils/        reglas del perfil y de a quién pertenece una reserva
```

El recorrido de un dato guardado es: pantalla, contexto, hook `useAlmacenamiento`, servicio `storage.js`, AsyncStorage.

## Cómo se guardan los datos

AsyncStorage solo guarda texto, así que el servicio convierte los datos a JSON al guardar y de vuelta al leer. Uso dos llaves, definidas en `src/constants/storageKeys.js`: una para el perfil y otra para las reservas.

De la foto guardo solo la dirección de la imagen, no la imagen. Si esa dirección deja de existir (por ejemplo, si se limpia el caché), el avatar muestra las iniciales.

## Decisiones

- Un perfil por teléfono y sin inicio de sesión. Cada reserva guarda el documento para que, cuando haya login, se sepa de quién es.
- Los cupos son de la clase y cuentan las reservas de todos.
- Uso solo Ionicons para los íconos y mi propio tema de colores, sin librería de diseño.
- Separé el servicio, el contexto y las reglas del perfil para poder cambiar una parte sin tocar las demás.

## De dónde viene cada cosa

La forma de guardar y leer con JSON, el archivo de llaves, el teclado del formulario, el borrado de una lista con `filter` y la caja que muestra lo guardado vienen del ejemplo del Mercado que nos dieron para practicar AsyncStorage. El resto es mío: las pantallas, los contextos, las reglas del perfil y la navegación.

## Pendiente

- Inicio de sesión. Cuando llegue, el id de la reserva y la revisión de duplicados tendrán que incluir al dueño.
- Copiar la foto a una carpeta propia de la app, para que no dependa del caché.
- Probar el teclado del formulario en iPhone.
- Abrir la clase al tocar una reserva.
