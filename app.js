
// CONFIGURABLE - Todo editable desde admin
let config = JSON.parse(localStorage.getItem('hu_config') || 'null') || {
  nombreIglesia: "Hermanos Unidos",
  subtitulo: "Una familia en Cristo",
  heroTitulo: "Bienvenidos a Casa. Dios te está esperando.",
  heroSub: "Iglesia virtual para toda Argentina. Prédicas, adoración y comunidad las 24hs.",
  alias: "maxinaranja2025",
  radioNombre: "Radio Hermanos Unidos 24/7",
  metaDon: 500000,
  devTitulo: "Dios renueva tus fuerzas",
  devTexto: "Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas... Isaías 40:31. Hoy es un nuevo comienzo para vos.",
  waMensaje: "Bendecido día {nombre} 🙏\nHoy Dios te dice: 'Yo estoy contigo' - Josué 1:9\nMirá la prédica de hoy en Hermanos Unidos: {link}\nQue tengas un día lleno de paz.",
  colorPrimario: "#FF6900",
  colorSecundario: "#0F172A"
};

let predicas = JSON.parse(localStorage.getItem('hu_predicas') || 'null') || [
  {id:1,titulo:"El Poder de la Restauración",cat:"Fe",texto:"Dios quiere restaurar todo lo que el enemigo robó. Joel 2:25 dice 'Os restituiré los años que comió la oruga'. No importa tu pasado, hoy Dios empieza algo nuevo.",pastor:"Pastor Juan"},
  {id:2,titulo:"Familia Bendecida",cat:"Familia",texto:"La familia es el primer ministerio. Efesios 6 habla del amor entre esposos e hijos. Cuando ponemos a Dios en el centro del hogar, todo se ordena.",pastor:"Pastora María"},
  {id:3,titulo:"Sanidad Divina",cat:"Sanidad",texto:"Por sus llagas fuimos curados. Isaías 53:5. Jesús llevó toda enfermedad en la cruz.",pastor:"Pastor Carlos"},
];
let videos = JSON.parse(localStorage.getItem('hu_videos') || 'null') || [
  {id:1,titulo:"Domingo de Milagros",yt:"jfKfPfyJRdk",vistas:"2.3k"},
  {id:2,titulo:"Cómo vencer la ansiedad",yt:"dQw4w9WgXcQ",vistas:"1.8k"},
  {id:3,titulo:"El propósito de tu vida",yt:"9bZkp7q19f0",vistas:"3.1k"},
];
let testimonios = JSON.parse(localStorage.getItem('hu_testi') || 'null') || [
  {id:1,nombre:"Ana de SDE",prov:"Santiago del Estero",texto:"Dios sanó mi matrimonio después de 5 años."},
  {id:2,nombre:"Luis de Córdoba",prov:"Córdoba",texto:"Me quedé sin trabajo y a los 3 días Dios me abrió una puerta mejor."},
];
let sedes = JSON.parse(localStorage.getItem('hu_sedes') || 'null') || [
  {id:1,prov:"Buenos Aires",dir:"Av. Corrientes 1234",hor:"Dom 10hs y 19hs - Mié 20hs",wa:"5491112345678"},
  {id:2,prov:"Córdoba",dir:"Av. Colón 500",hor:"Dom 10hs - Mié 20hs",wa:"5493512345678"},
  {id:3,prov:"Santiago del Estero",dir:"Choya 123 - La Banda",hor:"Sáb 20hs - Dom 10hs",wa:"5493851234567"},
  {id:4,prov:"Tucumán",dir:"San Martín 800",hor:"Dom 19hs",wa:"5493812345678"},
];
let playlistYT = JSON.parse(localStorage.getItem('hu_playlist') || 'null') || [
  {id:1,titulo:"Al que está sentado - Miel San Marcos",yt:"iOTR8uF1V-4"},
  {id:2,titulo:"Reckless Love - Cory Asbury",yt:"Sc6SSHuZvQE"},
  {id:3,titulo:"Oceans - Hillsong",yt:"dy9nwe9_xzw"},
];

let suscriptos = JSON.parse(localStorage.getItem('hu_wa') || '[]');
let oraciones = JSON.parse(localStorage.getItem('hu_oraciones') || '[]');
let recaudado = parseInt(localStorage.getItem('hu_recaudado') || '347000');
let visitas = parseInt(localStorage.getItem('hu_visitas') || '0'); visitas++; localStorage.setItem('hu_visitas', visitas);

function saveAll(){
  localStorage.setItem('hu_config', JSON.stringify(config));
  localStorage.setItem('hu_predicas', JSON.stringify(predicas));
  localStorage.setItem('hu_videos', JSON.stringify(videos));
  localStorage.setItem('hu_testi', JSON.stringify(testimonios));
  localStorage.setItem('hu_sedes', JSON.stringify(sedes));
  localStorage.setItem('hu_playlist', JSON.stringify(playlistYT));
}

function render(){
  document.title = config.nombreIglesia + " - Iglesia Virtual";
  document.querySelectorAll('.churchName').forEach(e=>e.innerText=config.nombreIglesia);
  document.getElementById('heroTitulo').innerText=config.heroTitulo;
  document.getElementById('heroSub').innerText=config.heroSub;
  document.getElementById('devTitle').innerText=config.devTitulo;
  document.getElementById('devText').innerText=config.devTexto;
  document.getElementById('radioNombre').innerText=config.radioNombre;
  document.getElementById('aliasText').innerText=config.alias;
  document.getElementById('recaudado').innerText='$'+recaudado.toLocaleString();
  document.getElementById('metaBar').style.width=Math.min(100,recaudado/config.metaDon*100)+'%';
  document.getElementById('metaTexto').innerText=`Meta radio 24/7: $${config.metaDon.toLocaleString()} - $${recaudado.toLocaleString()} (${Math.round(recaudado/config.metaDon*100)}%)`;

  const q = (document.getElementById('searchPredica')?.value || '').toLowerCase();
  const cat = document.getElementById('catPredica')?.value || '';
  document.getElementById('predicasGrid').innerHTML = predicas.filter(p=> (!cat || p.cat===cat) && (p.titulo.toLowerCase().includes(q) || p.texto.toLowerCase().includes(q))).map(p=>`
    <div class="bg-white border rounded-[20px] p-5"><div class="text-[10px] font-bold bg-slate-900 text-white inline px-2 py-1 rounded-full">${p.cat}</div><h3 class="font-bold mt-2">${p.titulo}</h3><div class="text-xs text-slate-500">${p.pastor}</div><p class="text-sm text-slate-600 mt-2">${p.texto.substring(0,120)}...</p><button onclick="abrirPredica(${p.id})" class="mt-3 text-xs font-bold underline">Leer / Editar</button></div>
  `).join('');

  document.getElementById('videosGrid').innerHTML = videos.map(v=>`
    <div class="bg-white rounded-[20px] overflow-hidden border"><div class="aspect-video bg-black relative cursor-pointer" onclick="playVideo('${v.yt}')"><img src="https://img.youtube.com/vi/${v.yt}/hqdefault.jpg" class="w-full h-full object-cover"><div class="absolute inset-0 flex items-center justify-center"><div class="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">▶</div></div></div><div class="p-4 flex justify-between"><div><div class="font-bold text-sm">${v.titulo}</div><div class="text-xs text-slate-500">${v.vistas} vistas</div></div></div></div>
  `).join('');

  document.getElementById('testiCarousel').innerHTML = testimonios.map(t=>`
    <div class="min-w-[280px] bg-white border rounded-[20px] p-5"><div class="font-bold text-sm">${t.nombre}</div><div class="text-xs text-slate-500">${t.prov}</div><p class="text-sm mt-2">"${t.texto}"</p></div>
  `).join('');

  document.getElementById('sedesGrid').innerHTML = sedes.map(s=>`
    <div class="bg-white/10 rounded-2xl p-4"><div class="font-bold">${s.prov}</div><div class="text-xs opacity-70">${s.dir}</div><div class="text-xs mt-1">${s.hor}</div><div class="mt-2 flex gap-2"><a href="https://wa.me/${s.wa}" target="_blank" class="text-[11px] bg-white text-black px-2 py-1 rounded-full">WhatsApp</a><a href="https://maps.google.com/?q=${encodeURIComponent(s.dir)}" target="_blank" class="text-[11px] bg-white/20 px-2 py-1 rounded-full">Cómo llegar</a></div></div>
  `).join('');

  document.getElementById('ytPlaylist').innerHTML = playlistYT.map(p=>`<button onclick="cambiarYT('${p.yt}')" class="bg-slate-100 px-2 py-1 rounded-full text-xs">${p.titulo.substring(0,20)}...</button>`).join('');

  document.getElementById('conectados').innerText = (1200 + Math.floor(Math.random()*100)).toLocaleString();
  document.getElementById('subsCount').innerText = suscriptos.length;
  document.getElementById('waTotal').innerText = suscriptos.length;
  document.getElementById('oracionesCount').innerText = (1432 + oraciones.length).toLocaleString();
}

function abrirPredica(id){const p=predicas.find(x=>x.id===id); alert(p.titulo+"\n\n"+p.texto+"\n\n-"+p.pastor);}
function playVideo(yt){document.getElementById('liveModal').classList.remove('hidden'); document.getElementById('liveFrame').src='https://www.youtube.com/embed/'+yt+'?autoplay=1';}
function cambiarYT(id){document.getElementById('liveFrame').src='https://www.youtube.com/embed/'+id+'?autoplay=1';}
let radioPlaying=false;
function toggleRadio(){radioPlaying=!radioPlaying; document.getElementById('radioBtn').innerText = radioPlaying?'❚❚':'▶'; if(radioPlaying)document.getElementById('radioPlayer').classList.remove('hidden');}
function copiarAlias(){navigator.clipboard.writeText(config.alias); alert('¡Alias copiado! '+config.alias+' 🙏'); recaudado+=2500; localStorage.setItem('hu_recaudado', recaudado); render();}
function suscribirWA(){
  const nombre=document.getElementById('waNombre').value; const num=document.getElementById('waNumero').value;
  if(!nombre||!num){alert('Completá nombre y WhatsApp');return;}
  suscriptos.push({nombre,numero:num,fecha:new Date().toLocaleDateString()}); localStorage.setItem('hu_wa', JSON.stringify(suscriptos)); render();
  document.getElementById('waNombre').value=''; document.getElementById('waNumero').value='';
  alert('¡Bienvenido a '+config.nombreIglesia+' '+nombre+'! 🙏');
}
function enviarOracion(){
  const n=document.getElementById('oracionNombre').value; const t=document.getElementById('oracionTexto').value;
  if(!t){alert('Escribí tu pedido');return;} oraciones.push({nombre:n||'Anónimo',texto:t,fecha:new Date().toLocaleDateString()}); localStorage.setItem('hu_oraciones', JSON.stringify(oraciones)); render();
  document.getElementById('oracionNombre').value=''; document.getElementById('oracionTexto').value=''; alert('Pedido recibido 🙏');
}
function agregarTestimonio(){
  const n=document.getElementById('tNombre').value; const p=document.getElementById('tProv').value; const t=document.getElementById('tTexto').value;
  if(!n||!t){alert('Falta nombre y testimonio');return;} testimonios.unshift({id:Date.now(),nombre:n,prov:p||'Argentina',texto:t}); saveAll(); render();
  document.getElementById('tNombre').value=''; document.getElementById('tProv').value=''; document.getElementById('tTexto').value=''; alert('¡Testimonio publicado!');
}
function filtrarPredicas(){render();}
setInterval(()=>{const c=document.getElementById('liveChat'); if(c){c.innerHTML+=`<div>${new Date().toLocaleTimeString()} - ${['Ana','Luis','María'][Math.floor(Math.random()*3)]}: Amén 🙏</div>`; c.scrollTop=9999;}},3000);
render();
