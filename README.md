# ActivosFijos

Aplicación Next.js con TypeScript y Ant Design para la gestión de activos fijos.

## Resumen

Esta aplicación permite llevar el control de activos fijos (alta, baja, traslado, inventario, etc.) con una interfaz construida en Next.js, TypeScript y Ant Design. Está pensada para ser desplegada como una aplicación web moderna y escalable.

## Tecnologías

- Next.js
- TypeScript
- Ant Design
- Node.js / npm
- CSS

## Requisitos

- Node.js (>= 16)
- npm (>= 8)

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/gpena52/ActivosFijos.git
cd ActivosFijos
```

2. Instala dependencias:

```bash
npm install
```

3. Configura variables de entorno (crear un archivo `.env`).

Ejemplo:

```
# Ejemplo de variables (ajusta según tu app)
DATABASE_URL="postgresql://user:password@localhost:5432/activos"
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXTAUTH_SECRET="una_clave_secreta_larga"
```

## Scripts disponibles

```bash
npm run dev         # Levanta la app en modo desarrollo (http://localhost:3000)
npm run build       # Compila para producción
npm run start       # Inicia la app compilada
npm run typecheck   # Ejecuta comprobación de tipos TypeScript
```

Asegúrate de ejecutar `npm run build` antes de `npm run start` en entorno de producción.

## Despliegue

Puedes desplegar en cualquier plataforma que soporte aplicaciones Node.js/Next.js (Vercel, Netlify, Fly, servidores propios). Para Vercel normalmente basta con conectar el repositorio y configurar las variables de entorno en el panel de la plataforma.

## Contribuciones

Si quieres contribuir:

1. Crea un fork y una rama con tu cambio.
2. Envía un pull request describiendo el cambio.

## Licencia

Incluye aquí la licencia del proyecto si aplica (por ejemplo MIT). Si no tienes una licencia definida, añade un archivo `LICENSE` con la licencia deseada.

## Contacto

Para dudas o sugerencias abre un issue o contáctame mediante GitHub.
