# Studio Blue: contexto del proyecto

## Qué es
Web de Studio Blue (studioblue.es), estudio de branding, fotografía, creación de contenido, redes sociales y desarrollo web de Felipe Alfonzo.
Sitio estático en HTML, CSS y JavaScript, sin frameworks ni paso de build. Se edita en VS Code y se publica en GitHub Pages con dominio propio (con y sin `www`). DNS en GoDaddy. Correo en Zoho (`contacto@studioblue.es`).
La web es meramente informativa: no muestra precios, que se hablan en privado.

## Dónde está cada cosa
- Esta carpeta (`test/`) es la web real en preparación. En la raíz del repositorio hay un `index.html` básico que hace de fachada. Cuando la web esté lista, el contenido de `test/` pasa a la raíz.
- Por eso todas las rutas deben ser **relativas** (`style.css`, `img/...`, `fonts/...`). Nunca rutas que empiecen por `/`.
- Este `CLAUDE.md` se puede borrar al publicar la web final.

## Estructura
- `index.html`: landing (hero, banners azules, carrusel de portafolio, servicios en acordeón, carrusel de logos, sobre mí, footer).
- `nosotros.html` + `nosotros.css` (clases con prefijo `nos-`): página "Sobre mí / Nosotros".
- `politica-privacidad.html` (v1.2): completa, pendiente de revisión profesional.
- `contacto.html`: pendiente de crear (esperando el mockup).
- `style.css`: base compartida. `script.js`: menú, carruseles, acordeón (se carga en todas).
- `img/`, `img/logos/`, `img/portafolio/`, `img/nosotros/`, `fonts/`.

## Reglas de estilo y código
- Variables en `:root`: `--blue-primary: #1b1be0`, `--bg-light: #f3f0ec`, `--text-dark: #111111`, `--brand-dark: #0d0d0d`, `--font-swiss`, `--font-custom`, `--font-serif`. Gris de paneles: `#e6e5e1`.
- Tipografías: Instrument Serif (títulos en cursiva), Swiss 721 Light (cuerpo), Swiss 721 Extended (local, `fonts/`, usada en `nosotros.css`) y Material Symbols (flecha de los botones).
- Aún se cargan desde servidores externos: Swiss 721 Light (onlinewebfonts), Instrument Serif y Material Symbols (Google Fonts). Pendiente hacerlas locales (faltan los archivos).
- Breakpoints: `900px` (móvil y tablet) y `768px` (menú hamburguesa y footer).
- Menú fijo con efecto "liquid glass" al hacer scroll. Botones en píldora: `.btn-primary` y `.btn-secondary`.
- Las páginas nuevas heredan `style.css` y añaden su propio CSS, sin duplicar lo compartido.
- Comentarios del código en español. Textos de la interfaz en español, en minúsculas salvo la primera letra, sin "por favor" y sin signos de exclamación en mensajes del sistema.
- Los PNG con márgenes transparentes alteran los tamaños visuales: recortarlos al borde real del contenido.
- Probar siempre en escritorio y en móvil (unos 390 px de ancho) antes de dar un cambio por bueno.

## Formulario de contacto (el backend NO está en este repositorio)
- Flujo: formulario → Worker de Cloudflare → correo (Resend) + Notion + Google Sheets. Cada destino es independiente; solo hay error si fallan los tres.
- Endpoint público del Worker: `https://studioblue-contacto-api.contacto-a8c.workers.dev/` (un GET responde `{"ok":false,"success":false,"error":"method"}`, es lo esperado).
- Site Key de Turnstile (pública): `0x4AAAAAAF_dV-IplKylP8ko`.
- Origen permitido: `https://studioblue.es` y `https://www.studioblue.es` (valen también para `/test/`).
- Campos que espera el Worker (JSON por POST): `nombre, apellido, email, telefono, pais, marca, proyecto, webSocial, servicios[], conocidoPor[], consentimiento (boolean), website (honeypot, siempre vacío), ts (Date.now() al cargar la página; mínimo 3 s), turnstileToken`.
- Servicios: Branding, Fotografía, Creación de contenido, Gestión de redes sociales, Diseño y desarrollo web, Otro. Conocido por: Instagram, Facebook, TikTok, Pinterest, Google, Otro.
- Casilla de consentimiento: sin marcar, con enlace a `politica-privacidad.html` (el Worker la exige).
- Códigos de error: method, origin, validation, too_fast, rate_limit, captcha, server.

## Seguridad: reglas que no se rompen
- Nunca escribir ni commitear claves: Resend, Notion, Turnstile (Secret Key), Sheets. Viven solo como secretos del Worker en Cloudflare.
- Solo son públicos en el código de la web: la Site Key de Turnstile y la URL del Worker.
- El backend (Worker y script de Sheets) se guarda fuera de este repositorio.

## Pendientes
1. Crear `contacto.html` y su JS con el mockup (aún sin enviar), conectado al Worker.
2. Hacer locales las fuentes restantes (Swiss 721 Light, Instrument Serif, Material Symbols) y actualizar la sección de cookies/tipografías de la política.
3. Revisión de la política por un profesional. Pedir a Zoho su contrato de tratamiento de datos (legal@zohocorp.com). Valorar un aviso legal.
4. Decidir si el botón "Sobre mí" del menú del index debe ir a `nosotros.html` (hoy va a `#sobre-mi`).
5. Al publicar: mover el contenido de `test/` a la raíz y retirar la fachada.

## Cómo quiero que trabajes
- Cambios pequeños y explicados, mostrando qué archivo y qué regla se toca.
- No reescribir archivos enteros si basta con editar una regla.
- Antes de borrar o renombrar archivos o imágenes, preguntar.
