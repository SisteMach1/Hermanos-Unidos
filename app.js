
// DATOS INICIALES
let predicas = JSON.parse(localStorage.getItem('hu_predicas') || 'null') || [
  {id:1,titulo:"El Poder de la Restauración",cat:"Fe",texto:"Dios quiere restaurar todo lo que el enemigo robó. Joel 2:25 dice 'Os restituiré los años que comió la oruga'. No importa tu pasado, hoy Dios empieza algo nuevo. Creé en la restauración de tu familia, tu salud y tus sueños.",pastor:"Pastor Juan"},
  {id:2,titulo:"Familia Bendecida",cat:"Familia",texto:"La familia es el primer ministerio. Efesios 6 habla del amor entre esposos e hijos. Cuando ponemos a Dios en el centro del hogar, todo se ordena. Orá hoy por tu familia.",pastor:"Pastora María"},
  {id:3,titulo:"Sanidad Divina",cat:"Sanidad",texto:"Por sus llagas fuimos curados. Isaías 53:5. Jesús llevó toda enfermedad en la cruz. Declará hoy sanidad sobre tu cuerpo.",pastor:"Pastor Carlos"},
];
let videos = JSON.parse(localStorage.getItem('hu_videos') || 'null') || [
  {id:1,titulo:"Domingo de Milagros",yt:"jfKfPfyJRdk",vistas:"2.3k"},
  {id:2,titulo:"Cómo vencer la ansiedad",yt:"dQw4w9WgXcQ",vistas:"1.8k"},
  {id:3,titulo:"El propósito de tu vida",yt:"9bZkp7q19f0",vistas:"3.1k"},
];
let testimonios = JSON.parse(localStorage.getItem('hu_testi') || 'null') || [
  {nombre:"Ana de SDE",prov:"Santiago del Estero",texto:"Dios sanó mi matrimonio después de 5 años. Hoy servimos juntos en Hermanos Unidos."},
  {nombre:"Luis de Córdoba",prov:"Córdoba",texto:"Me quedé sin trabajo y a los 3 días de orar, Dios me abrió una puerta mejor."},
];
let sedes = [
  {prov:"Buenos Aires",dir:"Av. Corrientes 1234",hor:"Dom 10hs y 19hs - Mié 20hs",wa:"5491112345678"},
  {prov:"Córdoba",dir:"Av. Colón 500",hor:"Dom 10hs - Mié 20hs",wa:"5493512345678"},
  {prov:"Santiago del Estero",dir:"Choya 123 - La Banda",hor:"Sáb 20hs - Dom 10hs",wa:"5493851234567"},
  {prov:"Tucumán",dir:"San Martín 800",hor:"Dom 19hs",wa:"5493812345678"},
  {prov:"Salta",dir:"Mitre 300",hor:"Dom 10hs",wa:"5493871234567"},
  {prov:"Mendoza",dir:"San Martín 1200",hor:"Dom 10hs y 19hs",wa:"5492612345678"},
  {prov:"Rosario",dir:"Córdoba 1500",hor:"Dom 19hs",wa:"5493412345678"},
  {prov:"Neuquén",dir:"Av. Argentina 200",hor:"Dom 10hs",wa:"5492991234567"},
];
let suscriptos = JSON.parse(localStorage.getItem('hu_wa') || '[]');
let oraciones = JSON.parse(localStorage.getItem('hu_oraciones') || '[]');
let recaudado = parseInt(localStorage.getItem('hu_recaudado') || '347000');
let visitas = parseInt(localStorage.getItem('hu_visitas') || '0'); visitas++; localStorage.setItem('hu_visitas', visitas);

let playlistYT = [
  {titulo:"Al que está sentado - Miel San Marcos",id:"iOTR8uF1V-4"},
  {titulo:"Reckless Love - Cory Asbury",id:"Sc6SSHuZvQE"},
  {titulo:"Oceans - Hillsong",id:"dy9nwe9_xzw"},
];

function render(){
  // Predicas
  const q = (document.getElementById('searchPredica')?.value || '').toLowerCase();
  const cat = document.getElementById('catPredica')?.value || '';
  document.getElementById('predicasGrid').innerHTML = predicas.filter(p=> (!cat || p.cat===cat) && (p.titulo.toLowerCase().includes(q) || p.texto.toLowerCase().includes(q))).map(p=>`
    <div class="bg-white border rounded-[20px] p-5">
      <div class="text-[10px] font-bold bg-slate-900 text-white inline px-2 py-1 rounded-full">${p.cat}</div>
      <h3 class="font-bold mt-2">${p.titulo}</h3>
      <div class="text-xs text-slate-500">${p.pastor}</div>
      <p class="text-sm text-slate-600 mt-2 line-clamp-3">${p.texto}</p>
      <button onclick="abrirPredica(${p.id})" class="mt-3 text-xs font-bold underline">Leer completa</button>
    </div>
  `).join('');

  document.getElementById('videosGrid').innerHTML = videos.map(v=>`
    <div class="bg-white rounded-[20px] overflow-hidden border cursor-pointer" onclick="playVideo('${v.yt}')">
      <div class="aspect-video bg-black relative"><img src="https://img.youtube.com/vi/${v.yt}/hqdefault.jpg" class="w-full h-full object-cover"><div class="absolute inset-0 flex items-center justify-center"><div class="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">▶</div></div></div>
      <div class="p-4"><div class="font-bold text-sm">${v.titulo}</div><div class="text-xs text-slate-500">${v.vistas} vistas</div></div>
    </div>
  `).join('');

  document.getElementById('testiCarousel').innerHTML = testimonios.map(t=>`
    <div class="min-w-[280px] bg-white border rounded-[20px] p-5">
      <div class="font-bold text-sm">${t.nombre}</div><div class="text-xs text-slate-500">${t.prov}</div>
      <p class="text-sm mt-2">"${t.texto}"</p>
    </div>
  `).join('');

  document.getElementById('sedesGrid').innerHTML = sedes.map(s=>`
    <div class="bg-white/10 rounded-2xl p-4">
      <div class="font-bold">${s.prov}</div><div class="text-xs opacity-70">${s.dir}</div><div class="text-xs mt-1">${s.hor}</div>
      <div class="mt-2 flex gap-2"><a href="https://wa.me/${s.wa}" target="_blank" class="text-[11px] bg-white text-black px-2 py-1 rounded-full">WhatsApp</a><a href="https://maps.google.com/?q=${encodeURIComponent(s.dir)}" target="_blank" class="text-[11px] bg-white/20 px-2 py-1 rounded-full">Cómo llegar</a></div>
    </div>
  `).join('');

  document.getElementById('ytPlaylist').innerHTML = playlistYT.map(p=>`<button onclick="cambiarYT('${p.id}')" class="bg-slate-100 px-2 py-1 rounded-full">${p.titulo.substring(0,20)}...</button>`).join('');
  document.getElementById('conectados').innerText = (1200 + Math.floor(Math.random()*100)).toLocaleString();
  document.getElementById('subsCount').innerText = suscriptos.length;
  document.getElementById('waTotal').innerText = suscriptos.length;
  document.getElementById('oracionesCount').innerText = (1432 + oraciones.length).toLocaleString();
  document.getElementById('recaudado').innerText = '$'+recaudado.toLocaleString();
  document.getElementById('metaBar').style.width = Math.min(100, recaudado/500000*100)+'%';
}

function filtrarPredicas(){render(); localStorage.setItem('hu_predicas', JSON.stringify(predicas));}
function abrirPredica(id){const p=predicas.find(x=>x.id===id); alert(p.titulo+"\n\n"+p.texto+"\n\n-"+p.pastor);}
function playVideo(yt){document.getElementById('liveModal').classList.remove('hidden'); document.getElementById('liveFrame').src='https://www.youtube.com/embed/'+yt+'?autoplay=1';}
function cambiarYT(id){document.getElementById('liveFrame').src='https://www.youtube.com/embed/'+id+'?autoplay=1';}

let radioPlaying=false;
function toggleRadio(){
  radioPlaying=!radioPlaying;
  document.getElementById('radioBtn').innerText = radioPlaying?'❚❚':'▶';
  if(radioPlaying){document.getElementById('radioPlayer').classList.remove('hidden');} 
}

function copiarAlias(){navigator.clipboard.writeText('maxinaranja2025'); alert('¡Alias copiado! maxinaranja2025 🙏 Gracias por tu ofrenda'); recaudado+=2500; localStorage.setItem('hu_recaudado', recaudado); render();}

function suscribirWA(){
  const nombre=document.getElementById('waNombre').value; const num=document.getElementById('waNumero').value;
  if(!nombre||!num){alert('Completá nombre y WhatsApp');return;}
  suscriptos.push({nombre,numero:num,fecha:new Date().toLocaleDateString()}); localStorage.setItem('hu_wa', JSON.stringify(suscriptos)); render();
  document.getElementById('waNombre').value=''; document.getElementById('waNumero').value='';
  alert('¡Bienvenido a Hermanos Unidos '+nombre+'! 🙏 Te llegará el mensaje diario a las 7AM por WhatsApp');
}

function enviarOracion(){
  const n=document.getElementById('oracionNombre').value; const t=document.getElementById('oracionTexto').value;
  if(!t){alert('Escribí tu pedido');return;} oraciones.push({nombre:n||'Anónimo',texto:t,fecha:new Date().toLocaleDateString()}); localStorage.setItem('hu_oraciones', JSON.stringify(oraciones)); render();
  document.getElementById('oracionNombre').value=''; document.getElementById('oracionTexto').value=''; alert('Pedido recibido 🙏 Estamos orando por vos');
}
function agregarTestimonio(){
  const n=document.getElementById('tNombre').value; const p=document.getElementById('tProv').value; const t=document.getElementById('tTexto').value;
  if(!n||!t){alert('Falta nombre y testimonio');return;} testimonios.unshift({nombre:n,prov:p||'Argentina',texto:t}); localStorage.setItem('hu_testi', JSON.stringify(testimonios)); render();
  document.getElementById('tNombre').value=''; document.getElementById('tProv').value=''; document.getElementById('tTexto').value=''; alert('¡Testimonio publicado! Gracias por compartir');
}
setInterval(()=>{document.getElementById('liveChat').innerHTML += `<div>${new Date().toLocaleTimeString()} - ${['Ana','Luis','María','Juan'][Math.floor(Math.random()*4)]}: Amén 🙏</div>`; document.getElementById('liveChat').scrollTop=9999;},3000);
render();
