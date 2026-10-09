const $=(s,r=document)=>[...r.querySelectorAll(s)];
// phone mini-UIs (swap for real screenshots: see README)
const U={
mate1:`<div class=tb>MATE</div><div class=bx>Fund Balance<b>RM 1,250.00</b></div><div class=ring></div><div class=bx>Food &amp; Dining <b style="font-size:11px">-RM12.00</b></div>`,
mate2:`<div class=tb>Quick Expense</div><div class=bx style="border:1px solid var(--c)"><b>RM 0.00</b></div><span class="chip on">Food</span><span class=chip>Transport</span><span class=chip>Bills</span><span class=chip>Leisure</span><div class=tb style="margin-top:14px;justify-content:center">SAVE</div>`,
mate3:`<div class=tb>Tabung</div><div class=bx>Emergency Fund<div class=bar><i style="width:72%"></i></div></div><div class=bx>New Laptop<div class=bar><i style="width:35%"></i></div></div><div class=bx>Books<div class=bar><i style="width:55%"></i></div></div>`,
chef1:`<div class=tb>HomeChef</div><div class=bx>Search recipes…</div><span class="chip on">Breakfast</span><span class=chip>Lunch</span><span class=chip>Dinner</span><div class=bx style="height:70px;margin-top:6px">Nasi Lemak<b style="font-size:11px">420 kcal</b></div>`,
chef2:`<div class=tb>Smart ✦</div><div class=bx>Tap your ingredients</div><span class="chip on">Egg</span><span class="chip on">Rice</span><span class=chip>Chicken</span><span class=chip>Onion</span><span class=chip>Tofu</span><div class=bx style="margin-top:8px">3 recipes found</div>`,
chef3:`<div class=tb>Recipe</div><div class=bx style="height:80px">▶ Chef video</div><div class=bx>Ingredients &amp; steps<div class=bar><i style="width:60%"></i></div></div><div class=bx>Comments · EN / BM</div>`};
$('.phone').forEach(p=>p.innerHTML=U[p.dataset.app]);
// nav, progress, glow
const nav=$('#nav')[0],prog=$('#prog')[0],glow=$('#glow')[0];
addEventListener('scroll',()=>{nav.classList.toggle('s',scrollY>30);prog.style.width=scrollY/(document.body.scrollHeight-innerHeight)*100+'%'},{passive:true});
addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
$('#burger')[0].onclick=()=>$('#links')[0].classList.toggle('o');$('#links a').forEach(a=>a.onclick=()=>$('#links')[0].classList.remove('o'));
// active link
const secs=$('section,header'),lk=$('#links a');
secs.forEach(s=>s.id&&new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)lk.forEach(a=>a.classList.toggle('on',a.hash==='#'+s.id))}),{rootMargin:'-45% 0px -50% 0px'}).observe(s));
// reveal + counters
$('.rv').forEach((el,i)=>el.style.transitionDelay=(i%4)*.08+'s');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');io.unobserve(e.target);
const b=$('b[data-to]',e.target)[0];if(b){const to=+b.dataset.to,s=b.dataset.s||'',t0=performance.now();(function f(t){const k=Math.min((t-t0)/1600,1),v=to*(1-Math.pow(1-k,3));b.textContent=(to%1?v.toFixed(1):Math.round(v))+s;k<1&&requestAnimationFrame(f)})(t0)}}),{threshold:.15});
$('.rv').forEach(el=>io.observe(el));
// 3D tilt + magnetic
$('.tilt').forEach(c=>{c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(900px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-6px)`});c.addEventListener('pointerleave',()=>c.style.transform='')});
$('.mag').forEach(m=>{m.addEventListener('pointermove',e=>{const r=m.getBoundingClientRect();m.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.3}px)`});m.addEventListener('pointerleave',()=>m.style.transform='')});

const exs=document.getElementById('screenshots'),pcs=[...exs.querySelectorAll('.pc')];
function exl(){const r=exs.getBoundingClientRect(),p=Math.max(0,Math.min(1,-r.top/(r.height-innerHeight))),k=Math.min(1,innerWidth/1100),s=1-Math.pow(1-Math.min(1,p*1.5),3);
pcs.forEach(c=>{c.style.transform=`translate3d(${c.dataset.x*k*s}px,${c.dataset.y*s}px,${s*90}px) rotateY(${c.dataset.r*s}deg) scale(${1+.1*s})`;c.querySelector('.lb').style.opacity=Math.max(0,(s-.5)*2)})}
addEventListener('scroll',exl,{passive:true});addEventListener('resize',exl);exl();

(function(){
const L=document.getElementById('sl'),V=document.getElementById('sv');if(!L||!V)return;
const D=[
{a:'p',t:'2-Tap Expense Logging',d:'Amount, category, save. Fast enough that you actually keep doing it.',h:'<div class="amt"><span class="ty">RM 12.00</span></div><span class="pp on" style="--i:1">Food</span><span class="pp" style="--i:2">Transport</span><span class="pp" style="--i:3">Bills</span><span class="pp" style="--i:4">Leisure</span><div class="tt" style="--i:6">Saved ✓ Food −RM 12.00</div>'},
{a:'p',t:'Virtual Tabung',d:'Lock money away for a goal and watch the progress bar fill.',h:'<div class="tb2"><div class="bl"><span>Emergency fund</span><b>72%</b></div><div class="bar"><i style="--w:72%"></i></div></div><div class="tb2"><div class="bl"><span>New laptop</span><b>35%</b></div><div class="bar"><i style="--w:35%"></i></div></div><div class="tb2"><div class="bl"><span>Books</span><b>54%</b></div><div class="bar"><i style="--w:54%"></i></div></div>'},
{a:'p',t:'Visual Analytics',d:'Charts show where your money goes. Alerts warn you before you overspend.',h:'<div class="bs"><i style="--h:45%;--i:1"></i><i style="--h:80%;--i:2"></i><i style="--h:35%;--i:3"></i><i style="--h:95%;--i:4"></i><i style="--h:60%;--i:5"></i></div><div class="tt" style="--i:8">⚠ Food budget: 80% used</div>'},
{a:'a',t:'Smart Recipe Match',d:'Tap the ingredients you have and get recipes that fit.',h:'<span class="pp on" style="--i:1">Egg</span><span class="pp on" style="--i:2">Rice</span><span class="pp on" style="--i:3">Chilli</span><span class="pp" style="--i:4">Onion</span><div class="rc"><div style="--i:1;background:linear-gradient(0deg,#000a,transparent 60%),url(food/nasi-goreng.jpg) center/cover,linear-gradient(135deg,var(--c1),var(--c2))">Nasi goreng</div><div style="--i:2;background:linear-gradient(0deg,#000a,transparent 60%),url(food/telur-dadar.jpg) center/cover,linear-gradient(135deg,var(--c1),var(--c2))">Telur dadar</div><div style="--i:3;background:linear-gradient(0deg,#000a,transparent 60%),url(food/sambal-egg.jpg) center/cover,linear-gradient(135deg,var(--c1),var(--c2))">Sambal egg</div></div>'},
{a:'a',t:'Bilingual EN / BM',d:'Switch between English and Malay on any screen.',h:'<div class="lg"><div class="l1">Tap your ingredients, get recipes.</div><div class="l2">Pilih bahan anda, dapatkan resipi.</div></div><span class="pp on" style="--i:1">EN</span><span class="pp" style="--i:2">BM</span>'},
{a:'a',t:'Guest Browsing',d:'Explore everything first. Log in only when you like, save or comment.',h:'<div class="gc"><b>Nasi Lemak</b><u>♡</u><div class="im" style="background:url(food/nasi-lemak-guest.jpg) center/cover,linear-gradient(135deg,var(--c1),var(--c2))"></div><div class="sh">Log in to save this recipe</div></div>'}];
let cur=0,auto=true;
L.innerHTML=D.map((x,i)=>`<button class="si ${x.a}" data-i="${i}"><i>0${i+1}</i><span><b>${x.t}</b><small>${x.a=='p'?'MATE':'HOMECHEF'}</small></span></button>`).join('');
function show(i){cur=i;[...L.children].forEach((b,k)=>b.classList.toggle('on',k==i));V.className='sv '+D[i].a;V.innerHTML=`<div class="dm"><div class="tg">${D[i].a=='p'?'MATE':'HOMECHEF'}</div><h3>${D[i].t}</h3><p>${D[i].d}</p><div>${D[i].h}</div></div>`}
['mouseover','click','focusin'].forEach(ev=>L.addEventListener(ev,e=>{const b=e.target.closest('.si');if(b){auto=false;if(+b.dataset.i!==cur)show(+b.dataset.i)}}));
setInterval(()=>{if(auto)show((cur+1)%D.length)},5200);
show(0);
})();

// team: tilt 3D + foil ikut kursor + klik pusing
const panels=[...document.querySelectorAll('.tp')];
panels.forEach(p=>{
  const t=p.querySelector('.tpi');
  p.addEventListener('pointermove',e=>{
    const r=p.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    t.style.setProperty('--ry',((x-.5)*12)+'deg');
    t.style.setProperty('--rx',((.5-y)*12)+'deg');
    t.style.setProperty('--mx',(x*100)+'%');
    t.style.setProperty('--my',(y*100)+'%');
  });
  p.addEventListener('pointerleave',()=>{t.style.setProperty('--rx','0deg');t.style.setProperty('--ry','0deg')});
  p.addEventListener('click',()=>p.classList.toggle('flip'));
  p.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();p.classList.toggle('flip')}});
});
const tf=document.getElementById('tflip');
if(tf)tf.addEventListener('click',()=>{
  const allOn=panels.every(p=>p.classList.contains('flip'));
  panels.forEach(p=>p.classList.toggle('flip',!allOn));
  tf.classList.toggle('on',!allOn);
});