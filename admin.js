
const PASS = 'Todocasero.2020'; // CAMBIA TU CONTRASEÑA AQUI
function login(){
  const p=document.getElementById('pass').value;
  if(p===PASS){document.getElementById('login').classList.add('hidden'); document.getElementById('panel').classList.remove('hidden'); cargarAdmin(); localStorage.setItem('hu_admin','1');}
  else{document.getElementById('loginError').classList.remove('hidden');}
}
function logout(){localStorage.removeItem('hu_admin'); location.reload();}
if(localStorage.getItem('hu_admin')==='1'){document.getElementById('login').classList.add('hidden'); document.getElementById('panel').classList.remove('hidden'); setTimeout(cargarAdmin,200);}

function cargarAdmin(){
  const visitas=localStorage.getItem('hu_visitas')||0;
  const wa=JSON.parse(localStorage.getItem('hu_wa')||'[]');
  const ora=JSON.parse(localStorage.getItem('hu_oraciones')||'[]');
  const rec=parseInt(localStorage.getItem('hu_recaudado')||'347000');
  document.getElementById('statVisitas').innerText=visitas;
  document.getElementById('statWA').innerText=wa.length;
  document.getElementById('statOra').innerText=ora.length;
  document.getElementById('statDon').innerText='$'+rec.toLocaleString();
  document.getElementById('recaudadoAdmin').innerText=rec.toLocaleString();
  document.getElementById('barraAdmin').style.width=Math.min(100,rec/500000*100)+'%';

  document.getElementById('tablaWA').innerHTML='<table class="w-full"><tr class="bg-slate-100"><th>Nombre</th><th>WhatsApp</th><th>Fecha</th></tr>'+wa.map(w=>`<tr><td>${w.nombre}</td><td>${w.numero}</td><td>${w.fecha}</td></tr>`).join('')+'</table>';
  document.getElementById('tablaOraciones').innerHTML = ora.map(o=>`<div class="p-2 border-b"><b>${o.nombre}</b> (${o.fecha}): ${o.texto}</div>`).join('');

  const pred=JSON.parse(localStorage.getItem('hu_predicas')||'[]');
  document.getElementById('listaPredicasAdmin').innerHTML = pred.map(p=>`<div class="flex justify-between border-b py-1"><span>${p.titulo}</span><button onclick="borrarPredica(${p.id})" class="text-red-600">X</button></div>`).join('');
  const vids=JSON.parse(localStorage.getItem('hu_videos')||'[]');
  document.getElementById('listaVideosAdmin').innerHTML = vids.map(v=>`<div class="flex justify-between border-b py-1"><span>${v.titulo}</span><button onclick="borrarVideo(${v.id})" class="text-red-600">X</button></div>`).join('');
}

function agregarPredicaAdmin(){
  const t=document.getElementById('editPredTitulo').value; const cat=document.getElementById('editPredCat').value; const txt=document.getElementById('editPredTexto').value;
  if(!t||!txt){alert('Falta título o texto');return;}
  let pred=JSON.parse(localStorage.getItem('hu_predicas')||'[]'); pred.unshift({id:Date.now(),titulo:t,cat,texto:txt,pastor:'Hermanos Unidos'}); localStorage.setItem('hu_predicas', JSON.stringify(pred)); cargarAdmin(); alert('Prédica agregada');
}
function borrarPredica(id){let p=JSON.parse(localStorage.getItem('hu_predicas')||'[]'); p=p.filter(x=>x.id!==id); localStorage.setItem('hu_predicas', JSON.stringify(p)); cargarAdmin();}
function agregarVideoAdmin(){
  const t=document.getElementById('editVidTitulo').value; const yt=document.getElementById('editVidYoutube').value;
  if(!t||!yt){alert('Falta');return;} let v=JSON.parse(localStorage.getItem('hu_videos')||'[]'); v.unshift({id:Date.now(),titulo:t,yt,vistas:'0'}); localStorage.setItem('hu_videos', JSON.stringify(v)); cargarAdmin();
}
function borrarVideo(id){let v=JSON.parse(localStorage.getItem('hu_videos')||'[]'); v=v.filter(x=>x.id!==id); localStorage.setItem('hu_videos', JSON.stringify(v)); cargarAdmin();}

function sumarDonacion(){const m=parseInt(document.getElementById('montoDon').value||0); let r=parseInt(localStorage.getItem('hu_recaudado')||'0'); r+=m; localStorage.setItem('hu_recaudado', r); cargarAdmin();}
function resetDonaciones(){if(confirm('Resetear?')){localStorage.setItem('hu_recaudado','0'); cargarAdmin();}}

function exportarWA(){
  const wa=JSON.parse(localStorage.getItem('hu_wa')||'[]'); if(!wa.length){alert('No hay suscriptos');return;}
  let csv='Nombre,WhatsApp,Fecha\n'+wa.map(w=>`${w.nombre},${w.numero},${w.fecha}`).join('\n');
  let blob=new Blob([csv],{type:'text/csv'}); let a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='suscriptos_hermanos_unidos.csv'; a.click();
}
function copiarNumeros(){const wa=JSON.parse(localStorage.getItem('hu_wa')||'[]'); const nums=wa.map(w=>w.numero).join(', '); navigator.clipboard.writeText(nums); alert('Números copiados: '+nums.length+' caracteres');}
function borrarWA(){if(confirm('Borrar todos los suscriptos?')){localStorage.setItem('hu_wa','[]'); cargarAdmin();}}
function borrarOraciones(){if(confirm('Borrar oraciones?')){localStorage.setItem('hu_oraciones','[]'); cargarAdmin();}}
