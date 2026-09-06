# Hermanos Unidos - Iglesia Virtual

## COMO SUBIR A GITHUB (copy paste)

1. Crea repo en github.com/new -> nombre: hermanos-unidos -> Public -> Create
2. Sube estos 5 archivos: index.html, admin.html, app.js, admin.js, manifest.json
   (Arrastrá y soltalos en la pagina de github)
3. Anda a Settings > Pages > Branch: main > Save
4. Tu web queda en: https://tuusuario.github.io/hermanos-unidos/

## INSTALAR COMO APP (PWA)

- En celular: Abrí la web > Menu > Agregar a pantalla principal
- Queda como app instalada con icono HU

## PANEL ADMIN SECRETO

- Entra a: tuweb.com/admin.html
- Contraseña: hermanos2025 (cambiala en admin.js linea 1: const PASS = '...')
- Ves: visitas, suscriptos WhatsApp, donaciones, oraciones
- Podes editar prédicas, videos, sumar donaciones
- Exportar suscriptos WhatsApp a CSV para mensajes diarios

## DONACIONES

- Alias: maxinaranja2025 - Naranja X (solo alias, como pediste)
- Al copiar alias suma automaticamente $2500 al contador (estimado)
- Podes sumar manual en admin

## WHATSAPP AUTOMATICO DIARIO

1. Suscriptos se guardan en localStorage (ves en admin)
2. Exportas CSV con boton
3. Para automatico 7AM:
   - Opcion A (gratis): n8n.io + Evolution API (WhatsApp)
     Importa csv y programa envio diario del mensaje que editas en admin
   - Opcion B: WhatsApp Business API + Make.com
   - Opcion C: Manual: copias numeros y mandas difusion diaria

Mensaje diario editable en admin: usa {nombre} y {link}

## QUE PUEDES EDITAR

- Todo desde admin sin codigo: predicas, videos
- Textos: edita index.html directo
- Colores: cambia #FF6900 (naranja) y #0F172A (azul) en index.html
- Alias: busca maxinaranja2025 y reemplazalo

## SOPORTE

Cualquier cosa me escribis y te lo modifico.
