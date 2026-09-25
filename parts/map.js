(function(){
/* ---------- CITIES (map coordinates from a Natural Earth projection of the 1600×820 world) ---------- */
var HUBS=[
 {id:'vegas',name:'Las Vegas',country:'Nevada, USA',at:[274.6,276.1],side:'t',why:'The Strip is part of our legacy: resorts, retail and the spectacles that made Las Vegas an entertainment capital.'},
 {id:'la',name:'Los Angeles',country:'California, USA',at:[257.4,286.3],side:'b',why:'Hollywood, where rides meet the movies: attractions and live shows at Universal Studios.'},
 {id:'orlando',name:'Orlando',country:'Florida, USA',at:[405,315.6],side:'b',why:'Universal Orlando: a whole second theme park and some of its most famous rides.'},
 {id:'atlanta',name:'Atlanta',country:'Georgia, USA',at:[399.3,288.2],side:'r'},
 {id:'cleveland',name:'Cleveland, MS',country:'Mississippi, USA',at:[372.7,288.3],side:'b'},
 {id:'chicago',name:'Chicago',country:'Illinois, USA',at:[399.1,246.4],side:'t'},
 {id:'riyadh',name:'Riyadh',country:'Saudi Arabia',at:[953.9,335],side:'r',why:'Two city-scale destinations for Riyadh Season, seen by 17 million visitors in 2023.'},
 {id:'jeddah',name:'Jeddah',country:'Saudi Arabia',at:[922.4,351.4],side:'l'},
 {id:'macau',name:'Macau',country:'China',at:[1245.1,348.3],side:'b'},
 {id:'daejeon',name:'Daejeon',country:'South Korea',at:[1283.9,274.8],side:'t'}
];
var MINOR=[
 {name:'Sanrio Puroland & Sanrio Gift Gate',where:'Tokyo, Japan',at:[1335.5,278.6]},
 {name:'Harmony Land',where:'Oita, Japan',at:[1306.3,290.6]},
 {name:'Enchanted Kingdom',where:'Laguna, Philippines',at:[1284.4,388.9]},
 {name:'The Table Bay Hotel',where:'Cape Town, South Africa',at:[831,637.2]},
 {name:'Hershey\'s Chocolate World',where:'Pennsylvania, USA',at:[441.1,254.6]}
];
/* ---------- PROJECTS (facts from Landmark's 2026 corporate deck) ---------- */
var P=[
 {id:'ioa',hub:'orlando',disc:'Theme Parks',name:'Islands of Adventure',year:1999,budget:'$1B+',where:'Universal Orlando',img:['ioa'],
  list:['Original team member tasked with creating and master planning Universal Orlando\'s second park','Show design for Jurassic Park, Spider-Man, Dr. Doom\'s Fearfall, Dudley Do-Right\'s Ripsaw Falls and Popeye & Bluto\'s Bilge-Rat Barges','The first-ever Marvel theme park land'],
  q:'A world-class theme park with some of the most technologically advanced attractions you\'ll find anywhere in the world.',src:'Condé Nast Traveler'},
 {id:'spiderman',hub:'orlando',disc:'Attractions',name:'The Amazing Adventures of Spider-Man',year:1999,budget:'$85M',where:'Islands of Adventure',img:['spidey'],
  list:['The world\'s first 3D/4D dark ride','Created and produced for Universal Studios','The concept was later reused at Universal Hollywood for Transformers'],
  q:'The best theme park ride in the world. It surpasses Disney\'s top efforts.',src:'Los Angeles Times'},
 {id:'t2',hub:'orlando',disc:'Attractions',name:'Terminator 2: 3D',year:1996,budget:'$80M',where:'Universal Studios',img:['t2','t2b'],
  list:['The world\'s first 3D/4D live-stage experience, combining live actors with Hollywood special effects','The first attraction to feature franchise stars','James Cameron directed the 3D film'],
  q:'We rank T2: 3D the absolute best theme park attraction in the United States.',src:'Guide to Walt Disney World'},
 {id:'jurassic',hub:'la',disc:'Attractions',name:'Jurassic Park: The Ride',year:1996,budget:'$120M',where:'Universal Studios Hollywood',img:['jp','jp2'],
  list:['Developed with Steven Spielberg','Universal\'s most expensive attraction at the time','Rated the #1 attraction at Universal Studios Hollywood for 22 years','Duplicated at Universal Orlando and Universal Japan'],
  q:'A wild, wet jaunt coupled with fun scares and the most realistic dinosaurs ever.',src:'USA Today'},
 {id:'stage',hub:'la',disc:'Live Entertainment',name:'Conan & Live Theatre',year:null,budget:null,where:'Universal Studios & touring',img:['live'],
  list:['Conan the Barbarian at Universal Studios','Masters of the Universe · TMNT "Coming Out of Their Shells"','Jesus Christ Superstar · Jekyll & Hyde'],q:null,src:null},
 {id:'venetian',hub:'vegas',disc:'Resorts & Casinos',name:'The Venetian Resort',year:1999,budget:'$1.5B',where:'Las Vegas · Macau',img:['venetian'],
  list:['Landmark conceived the original concept and preliminary master plan','Started in Las Vegas and replicated in Macau','Also developed concepts for the Canal Shoppes and Phantom: The Las Vegas Spectacular'],
  q:'The world\'s most extraordinarily designed hotel.',src:'TripAdvisor'},
 {id:'caesars',hub:'vegas',disc:'Resorts & Casinos',name:'Caesars Palace',year:1986,budget:'$1.5B',where:'Las Vegas',img:['caesars'],
  list:['A 20-year master plan with Caesars World, a $1.5B investment','The Forum Shops, "World of Caesar" and Caesars Magical Empire were all part of it','Helped shape Las Vegas as a world-class entertainment destination'],
  q:'A classic example of themed design coupled with the very best that American showbiz can conjure up.',src:'Attractions Management International'},
 {id:'forum',hub:'vegas',disc:'Experiential Retail',name:'The Forum Shops at Caesars',year:1992,budget:'$100M',where:'Las Vegas',img:['forum'],
  list:['One of the highest-grossing retail experiences in the world','Higher sales per square foot than Rodeo Drive','A defining example of Landmark placemaking'],
  q:'Best Shopping Destination.',src:'Las Vegas Magazine'},
 {id:'canal',hub:'vegas',disc:'Experiential Retail',name:'Grand Canal Shoppes',year:1999,budget:'$300M',where:'The Venetian, Las Vegas',img:['canal'],
  list:['Original concept created by Landmark','Pitched to Venetian founder Sheldon Adelson, who fell in love with the idea'],
  q:'Still one of the most popular attractions in Las Vegas after more than 20 years.',src:'Las Vegas Magazine'},
 {id:'efx',hub:'vegas',disc:'Live Entertainment',name:'EFX',year:1995,budget:'$100M',where:'MGM Grand, Las Vegas',img:['efx'],
  list:['Conceived and produced by Landmark, including the book, music and lyrics','Ran for 10 years','Starred Michael Crawford, Tommy Tune, David Cassidy and Rick Springfield'],
  q:'Las Vegas\' greatest entertainment. See EFX and you have seen them all.',src:'Las Vegas Journal'},
 {id:'aquarium',hub:'atlanta',disc:'Museums & Expos',name:'Georgia Aquarium',year:2005,budget:'$290M',where:'Atlanta, Georgia',img:['aquarium','aquarium2'],
  list:['A concept and master plan that changed aquarium design, now copied worldwide','The largest aquarium in the United States','Centrepiece: a 6.3-million-gallon whale shark exhibit'],
  q:'Widely regarded as one of the best aquariums in the United States.',src:'Travel Caffeine',credit:'Done by GGE.'},
 {id:'grammy',hub:'cleveland',disc:'Museums & Expos',name:'Grammy Museum Mississippi',year:null,budget:null,where:'Cleveland, Mississippi',img:['grammy'],
  list:['Part of Landmark\'s museums & expos portfolio','A music museum built around the GRAMMY Awards and Mississippi\'s music legacy'],q:null,src:null},
 {id:'stones',hub:'chicago',disc:'Live Entertainment',name:'Bridges to Babylon Tour',year:1997,budget:null,where:'The Rolling Stones · opened in Chicago',img:['stones'],
  list:['A massive stage set with giant video screens, pyro and mechanical lighting effects','Opened in Chicago in September 1997 and sold out arenas and stadiums worldwide','One of the Stones\' most successful and memorable tours'],
  q:'Another huge jaunt for The Rolling Stones, starting in Chicago in September 1997 and ending a year later in Istanbul.',src:'uDiscover Music'},
 {id:'bworld',hub:'riyadh',disc:'Theme Parks',name:'Boulevard World',year:2022,budget:'$500M',where:'Riyadh, for Sela',img:['bworld','bworld2'],
  list:['Showcases ten countries of the world in one destination','Built around one of the largest artificial lakes in the world','Home to the largest spherical theatre'],
  q:'Brings together the cultures of 10 countries in a single location set around one of the largest artificial lakes in the world.',src:'Arab News'},
 {id:'bcity',hub:'riyadh',disc:'Theme Parks',name:'Boulevard City',year:2021,budget:'$300M',where:'Riyadh, for Sela',img:['bcity'],
  list:['The first theme park in Saudi Arabia (220 acres), opening with the first Riyadh Season','17 million visitors during Riyadh Season 2023','The largest dancing fountain in Saudi Arabia'],
  q:'One of the foremost recreational complexes in the Middle East and a favourite destination for tourists visiting Riyadh.',src:'Arab News'},
 {id:'citywalk',hub:'jeddah',disc:'Experiential Retail',name:'City Walk',year:2022,budget:'$250M',where:'Jeddah, Saudi Arabia',img:['citywalk'],
  list:['The first development of its size built around a steampunk theme','Sold out every night for three months','450,000 people tried to buy tickets after it closed'],
  q:'City Walk raises the bar of visitor attractions in Saudi Arabia.',src:'Arab News'},
 {id:'galaxy',hub:'macau',disc:'Resorts & Casinos',name:'Galaxy Macau',year:2011,budget:'$2B',where:'Macau, China',img:['galaxy'],
  list:['Luxury five-star integrated resort','Winner of over 30 major design and service awards','Casinos, major shopping malls and unique entertainment'],
  q:'Most spectacular entertainment and leisure destination in the world.',src:'Markets Insider',credit:'Done by GGE.'},
 {id:'samsung',hub:'daejeon',disc:'Museums & Expos',name:'Samsung Pavilion',year:1993,budget:'$80M',where:'Taejon Expo, Korea',img:['samsung','samsung2'],
  list:['Awarded the #1 attraction at the Expo','Designed for over 30,000 visitors a day','Concept, master planning, design and production supervision by Landmark'],
  q:'The #1 highest-attended and highest-rated pavilion at the Expo.',src:'Samsung'}
];
var HUB={};HUBS.forEach(function(h){HUB[h.id]=h;h.pro=[];});
P.forEach(function(p){HUB[p.hub].pro.push(p);});

var sky=document.getElementById('world-map'),world=document.getElementById('world'),stage=document.getElementById('stage'),spokes=document.getElementById('spokes');
var W,H,Z0,TOP,K=8,state={level:'0',hub:null,p:null,region:null};
function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}
function place(e,x,y){e.style.left=x+'px';e.style.top=y+'px';}

/* build hubs, pins, minors */
HUBS.forEach(function(h){
  var d=el('div','pt hub'+(h.pro.length>1?' big':''),'<span class="ring"></span><span class="dot"></span><span class="lbl '+h.side+'">'+h.name+(h.pro.length>1?'<span class="n">'+h.pro.length+'</span>':'')+'<small>'+h.country+'</small></span>');
  place(d,h.at[0],h.at[1]);world.appendChild(d);h.el=d;
  var kb=el('button','hubbtn',h.name);kb.addEventListener('click',function(){openHub(h);});document.getElementById('hubbtns').appendChild(kb);
  if(h.pro.length>1)h.pro.forEach(function(p){
    var pe=el('div','pt pin','<button aria-label="'+p.name+'"></button><span class="ring"></span><span class="dot"></span><span class="lbl r">'+p.name+'<i>View ›</i><small>'+(p.year||p.disc)+'</small></span>');
    pe.querySelector('button').addEventListener('click',function(e){e.stopPropagation();openPin(p);});
    pe.querySelector('.lbl').addEventListener('click',function(e){e.stopPropagation();openPin(p);});
    world.appendChild(pe);p.el=pe;
    var ln=document.createElementNS('http://www.w3.org/2000/svg','line');ln.dataset.hub=h.id;spokes.appendChild(ln);p.ln=ln;
  });
});
MINOR.forEach(function(m){var d=el('div','pt minor','<span class="dot"></span><span class="lbl r">'+m.name+'<small>'+m.where+'</small></span>');place(d,m.at[0],m.at[1]);world.appendChild(d);m.el=d;});
var coach=el('div','coach','<div class="ring2"></div><div class="tag">Click to explore ✦</div>');place(coach,HUB.riyadh.at[0],HUB.riyadh.at[1]);world.appendChild(coach);

/* city chips */
var chips=document.getElementById('chips');
HUBS.forEach(function(h){var b=el('button','',h.name+'<i>'+h.pro.length+'</i>');b.dataset.hub=h.id;b.addEventListener('click',function(){openHub(h);});chips.appendChild(b);});

function dust(e,n,max){var s='';for(var i=0;i<n;i++){var r=Math.random()*max+.6;s+='<i style="left:'+(Math.random()*100)+'%;top:'+(Math.random()*100)+'%;width:'+r+'px;height:'+r+'px;opacity:'+(Math.random()*.6+.2)+'"></i>';}e.innerHTML=s;}
dust(document.getElementById('dust1'),220,1.6);dust(document.getElementById('dust2'),60,2.4);

/* camera */
var CB=[130,200,1400,660];
function wide(){return W>900;}
function measure(){W=stage.clientWidth;H=stage.clientHeight;TOP=wide()?300:250;
  var avH=H-TOP-(wide()?80:80),avW=W-(wide()?80:20);Z0=Math.min(avW/(CB[2]-CB[0]),avH/(CB[3]-CB[1]));world.style.setProperty('--z0',Z0);}
var Z=1;
function cam(cx,cy,z,sx,sy){Z=z;world.style.setProperty('--z',z);world.style.setProperty('--tx',(sx-cx*z)+'px');world.style.setProperty('--ty',(sy-cy*z)+'px');cam.c=[cx,cy,z,sx,sy];
  var k=z/Z0;['neb','dust1','dust2'].forEach(function(id,i){var f=[.03,.08,.18][i];document.getElementById(id).style.transform='scale('+(1+Math.log(k)*f*2)+')';});}
function home(){cam((CB[0]+CB[2])/2,(CB[1]+CB[3])/2,Z0,W/2,TOP+(H-TOP-80)/2);}
function toScreen(x,y){var c=cam.c;return[c[3]+(x-c[0])*c[2],c[4]+(y-c[1])*c[2]];}
function toWorld(sx,sy){var c=cam.c;return[c[0]+(sx-c[3])/c[2],c[1]+(sy-c[4])/c[2]];}

function setLevel(l){state.level=l;sky.dataset.level=l;}
function focusHub(h,z){HUBS.forEach(function(o){o.el.classList.toggle('focus',o===h);
    var hide=false;if(h&&o!==h&&z){var R=Math.min(W,H)*(wide()?.2:.3);hide=Math.hypot(o.at[0]-h.at[0],o.at[1]-h.at[1])*z<R*1.6;}o.hidden2=hide;o.el.classList.toggle('hide',hide);});
  P.forEach(function(p){if(p.el)p.el.classList.toggle('show',p.hub===(h&&h.id));if(p.ln)p.ln.classList.toggle('on',p.hub===(h&&h.id));});
  [].forEach.call(chips.children,function(b){b.classList.toggle('active',!!h&&b.dataset.hub===h.id);});}
function fan(h,z){var n=h.pro.length,R=Math.min(W,H)*(wide()?.2:.3),r=R/z;
  h.pro.forEach(function(p,i){var a=-Math.PI/2+i*2*Math.PI/n+(n===2?Math.PI/2:0);p.x=h.at[0]+Math.cos(a)*r;p.y=h.at[1]+Math.sin(a)*r;place(p.el,p.x,p.y);
    var lb=p.el.querySelector('.lbl');lb.className='lbl '+(!wide()?'b':(Math.cos(a)<-.3?'l':'r'));
    p.ln.setAttribute('x1',h.at[0]);p.ln.setAttribute('y1',h.at[1]);p.ln.setAttribute('x2',p.x);p.ln.setAttribute('y2',p.y);});}
function hubView(h){return{z:Z0*K,sx:wide()?W*.6:W/2,sy:wide()?H*.56:H*.56};}

function used(){sky.classList.add('used');}
function openHub(h){used();closeScope();if(h.pro.length===1){openPin(h.pro[0]);return;}
  state.hub=h;setLevel('1');var v=hubView(h);fan(h,v.z);focusHub(h,v.z);cam(h.at[0],h.at[1],v.z,v.sx,v.sy);
  document.getElementById('whyE').textContent=h.country;document.getElementById('whyH').textContent=h.name;document.getElementById('whyP').textContent=h.why||'';
  document.getElementById('backT').textContent=state.region?'Back to the region':'Back to the world';hot(null);}
function openRegion(list){used();closeScope();state.region=list;state.hub=null;setLevel('r');focusHub(null);
  var xs=list.map(function(h){return h.at[0]}),ys=list.map(function(h){return h.at[1]});
  var bw=Math.max.apply(0,xs)-Math.min.apply(0,xs)+60,bh=Math.max.apply(0,ys)-Math.min.apply(0,ys)+60;
  var z=Math.min(W*.6/bw,(H-TOP)*.6/bh,Z0*K*.8);cam((Math.max.apply(0,xs)+Math.min.apply(0,xs))/2,(Math.max.apply(0,ys)+Math.min.apply(0,ys))/2,z,W/2,H*.55);
  document.getElementById('backT').textContent='Back to the world';}

var scope=document.getElementById('scope'),ring=document.getElementById('ring'),card=document.getElementById('card');
function openPin(p){used();var h=HUB[p.hub],multi=h.pro.length>1;state.hub=h;state.p=p;setLevel('2');
  var zz=Z0*K*(multi?1.9:1.4);if(multi)fan(h,Z0*K);else{p.x=h.at[0];p.y=h.at[1];}
  focusHub(h,zz);
  var R=wide()?Math.min(H*.62,W*.36):Math.min(W*.72,H*.36),sx=wide()?W*.33:W/2,sy=wide()?H*.52:H*.3;
  cam(p.x,p.y,zz,sx,sy);
  [scope,ring].forEach(function(e){e.style.width=e.style.height=R+'px';e.style.left=(sx-R/2)+'px';e.style.top=(sy-R/2)+'px';});
  setImg(p,0);scope.setAttribute('aria-label',p.name);
  document.getElementById('cDisc').textContent=p.disc+' · '+h.name;
  document.getElementById('cName').textContent=p.name;
  var f='';if(p.year)f+='<div><small>Opened</small><b>'+p.year+'</b></div>';if(p.budget)f+='<div><small>Budget</small><b>'+p.budget+'</b></div>';
  f+='<div><small>Where</small><b style="font-size:20px;line-height:1.1">'+p.where+'</b></div>';
  document.getElementById('cFacts').innerHTML=f;
  document.getElementById('cList').innerHTML=p.list.map(function(t){return'<li>'+t+'</li>'}).join('');
  var q=document.getElementById('cQuote');q.style.display=p.q?'':'none';if(p.q)q.innerHTML='“'+p.q+'”<cite>'+p.src+'</cite>';
  document.getElementById('cCredit').textContent=p.credit||'';
  var th=document.getElementById('cThumbs');th.innerHTML='';
  if(p.img.length>1)p.img.forEach(function(im,i){var b=el('button',i?'':'on');b.style.backgroundImage='url(img/'+im+'.webp)';b.setAttribute('aria-label','View photo '+(i+1));
    b.onclick=function(){setImg(p,i);[].forEach.call(th.children,function(x){x.classList.remove('on')});b.classList.add('on');};th.appendChild(b);});
  document.getElementById('prev').hidden=document.getElementById('nextS').hidden=!multi;
  document.getElementById('crumb').innerHTML='Our World &nbsp;/&nbsp; '+h.name+' &nbsp;/&nbsp; <b>'+p.name+'</b>';
  document.getElementById('backT').textContent=multi?'Back to '+h.name:(state.region?'Back to the region':'Back to the world');
  scope.classList.remove('open');ring.classList.remove('open');card.classList.remove('open');
  clearTimeout(openPin.t);openPin.t=setTimeout(function(){scope.classList.add('open');ring.classList.add('open');card.classList.add('open');},950);
}
function setImg(p,i){scope.style.backgroundImage='url(img/'+p.img[i]+'.webp)';}
function closeScope(){clearTimeout(openPin.t);scope.classList.remove('open');ring.classList.remove('open');card.classList.remove('open');}
function toWorldView(){closeScope();setLevel('0');state.hub=null;state.region=null;focusHub(null);home();}
function back(){var l=state.level;
  if(l==='2'&&state.hub.pro.length>1){openHub(state.hub);return;}
  if((l==='2'||l==='1')&&state.region){closeScope();openRegion(state.region);return;}
  toWorldView();}
document.getElementById('back').addEventListener('click',function(e){e.stopPropagation();back();});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&state.level!=='0')back();});
function step(d){var list=state.hub.pro,i=list.indexOf(state.p);openPin(list[(i+d+list.length)%list.length]);}
document.getElementById('prev').onclick=function(){step(-1)};document.getElementById('nextS').onclick=function(){step(1)};

/* clicking the map: pick the nearest gold light; if several are packed together, zoom into that area first */
var PICK=36;
function near(sx,sy,r){var out=[];HUBS.forEach(function(h){if(state.level==='1'&&(h===state.hub||h.hidden2))return;var s=toScreen(h.at[0],h.at[1]),d=Math.hypot(s[0]-sx,s[1]-sy);if(d<r)out.push({h:h,d:d});});
  return out.sort(function(a,b){return a.d-b.d});}
function local(e){var r=stage.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top];}
stage.addEventListener('click',function(e){if(state.level==='2'){back();return;}
  var m=local(e),c=near(m[0],m[1],PICK);
  if(!c.length){if(state.level!=='0')back();return;}
  if(c.length===1||(c[1].d-c[0].d>18&&c[0].d<14)){openHub(c[0].h);return;}
  var group=near(m[0],m[1],PICK*2.4).map(function(o){return o.h});openRegion(group);});
function hot(h){HUBS.forEach(function(o){o.el.classList.toggle('hot',o===h);});}
stage.addEventListener('mousemove',function(e){if(state.level==='2')return;var m=local(e),c=near(m[0],m[1],PICK);hot(c.length?c[0].h:null);
  stage.classList.toggle('pointy',!!c.length);
  MINOR.forEach(function(mm){var s=toScreen(mm.at[0],mm.at[1]);mm.el.classList.toggle('hot',Math.hypot(s[0]-m[0],s[1]-m[1])<20);});});
stage.addEventListener('mouseleave',function(){hot(null);});

/* lights come on in the order Landmark built them */
var lit=false;
function ignite(instant){if(lit)return;lit=true;
  var order=P.filter(function(p){return p.year}).sort(function(a,b){return a.year-b.year}),yr=document.getElementById('yr'),yl=document.getElementById('yrl');
  function finish(){HUBS.forEach(function(h){h.el.classList.add('lit')});P.forEach(function(p){p.el&&p.el.classList.add('lit')});MINOR.forEach(function(m){m.el.classList.add('lit')});
    yr.textContent='Today';yl.textContent='4 continents and counting';}
  if(instant||matchMedia('(prefers-reduced-motion: reduce)').matches){finish();return;}
  order.forEach(function(p,i){setTimeout(function(){var h=HUB[p.hub];h.el.classList.add('lit');p.el&&p.el.classList.add('lit');yr.textContent=p.year;yl.textContent=p.name+' · '+h.name;},500+i*300);});
  setTimeout(finish,500+order.length*300+400);
}
new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&e.intersectionRatio>.5)ignite(false);});},{threshold:[.5]}).observe(sky);

measure();home();
addEventListener('resize',function(){measure();if(state.level==='2')openPin(state.p);else if(state.level==='1')openHub(state.hub);else if(state.level==='r')openRegion(state.region);else home();});

/* "You've ridden our rides" cards fly straight to the ride on the map */
document.querySelectorAll('[data-go]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();
  var p=P.filter(function(q){return q.id===a.dataset.go})[0];sky.scrollIntoView({behavior:'smooth'});ignite(true);setTimeout(function(){openPin(p);},700);});});

/* hero: stars + gold windows (Landmark's light in the skyline) */
var hs=document.getElementById('heroStars'),s='';for(var i=0;i<90;i++){s+='<i style="left:'+Math.random()*100+'%;top:'+Math.pow(Math.random(),1.6)*100+'%;opacity:'+(1-Math.random()*.6)+';animation-delay:'+(Math.random()*3)+'s;transform:scale('+(Math.random()*.8+.5)+')"></i>';}hs.innerHTML=s;
var win=document.getElementById('windows'),rects=[[236,148,88,146],[342,184,56,110],[172,90,32,200],[1402,210,142,84],[1444,150,58,50]],wh='';
rects.forEach(function(r){for(var y=r[1];y<r[1]+r[3]-8;y+=14)for(var x=r[0]+4;x<r[0]+r[2]-6;x+=12){if(Math.random()<.42)wh+='<rect x="'+x+'" y="'+y+'" width="5" height="7" opacity="'+(.55+Math.random()*.45)+'"/>';}});
wh+='<circle cx="680" cy="186" r="6"/><circle cx="1262" cy="86" r="4"/><circle cx="188" cy="14" r="3"/>';
[[442,230],[468,230],[494,230],[520,230],[546,230]].forEach(function(c){wh+='<rect x="'+c[0]+'" y="'+c[1]+'" width="8" height="60" opacity=".75"/>';});
win.innerHTML=wh;

/* partners marquee (names from the corporate deck) */
var names=['Universal','Caesars Palace','MGM Grand','The Venetian','Sela','Samsung','The Rolling Stones','Paramount Parks','Hershey\'s Chocolate World','M&M\'s World','Sanrio','Galaxy Macau','Grammy Museum'];
var mq=names.map(function(n){return'<span>'+n+'</span><span aria-hidden="true" style="color:#F2C45A">✦</span>'}).join('');document.getElementById('mq').innerHTML=mq+mq;

var nav=document.getElementById('nav');addEventListener('scroll',function(){nav.classList.toggle('solid',scrollY>innerHeight*.6);},{passive:true});
document.getElementById('contact').addEventListener('submit',function(e){e.preventDefault();document.getElementById('sent').style.display='block';});
})();
