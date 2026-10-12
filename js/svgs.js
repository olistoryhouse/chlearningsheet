/* ---------- SVG 繪圖工具 ---------- */
const O='#3a3a3a', SKIN='#f8d5b8';
const sw=`stroke="${O}" stroke-width="2" stroke-linejoin="round"`;
const svg=c=>`<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg">${c}</svg>`;
const limb=(x1,y1,x2,y2,c,w=7)=>
  `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${O}" stroke-width="${w+3}" stroke-linecap="round" fill="none"/>`+
  `<path class="f" d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
const hand=(x,y,r=4.5)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${SKIN}" ${sw}/>`;
const star=(x,y,r,c='#ffd34d')=>`<path d="M${x} ${y-r}L${x+r*.3} ${y-r*.3}L${x+r} ${y}L${x+r*.3} ${y+r*.3}L${x} ${y+r}L${x-r*.3} ${y+r*.3}L${x-r} ${y}L${x-r*.3} ${y-r*.3}Z" fill="${c}" ${sw}/>`;
const cloud=(x,y,c='#fff')=>`<path d="M${x-28} ${y+12}a14 14 0 0 1 4 -24a18 18 0 0 1 32 -6a14 14 0 0 1 20 30Z" fill="${c}" ${sw}/>`;
const flower=(x,y,c)=>`<path d="M${x} ${y}V${y+18}" stroke="#4c9a3f" stroke-width="2.5"/>`+
  [0,72,144,216,288].map(a=>`<circle cx="${(x+6*Math.cos(a*Math.PI/180)).toFixed(1)}" cy="${(y+6*Math.sin(a*Math.PI/180)).toFixed(1)}" r="4.5" fill="${c}" ${sw}/>`).join('')+
  `<circle cx="${x}" cy="${y}" r="3" fill="#ffd34d" ${sw}/>`;

/* 人物：x,y 為腳底中心；s 為縮放；bust=只畫上半身 */
function person(o){
  const p=Object.assign({s:1,hair:'#3b2a20',hs:'short',shirt:'#6fa8dc',pants:'#3d5a80',skirt:false,
    arms:[[-22,-40],[22,-40]],face:'smile',glasses:false,hat:'',back:'',front:'',bust:false},o);
  let g='';
  if(p.hs==='long') g+=`<path d="M-17 -84C-20 -108 20 -108 17 -84L19 -60Q0 -55 -19 -60Z" fill="${p.hair}" ${sw}/>`;
  if(p.hs==='pony') g+=`<ellipse cx="19" cy="-90" rx="6" ry="10" fill="${p.hair}" ${sw}/>`;
  if(p.hs==='bun')  g+=`<circle cx="0" cy="-102" r="7.5" fill="${p.hair}" ${sw}/>`;
  g+=p.back;
  if(!p.bust){
    if(p.skirt) g+=`<rect x="-9" y="-30" width="6" height="26" fill="${SKIN}" ${sw}/><rect x="3" y="-30" width="6" height="26" fill="${SKIN}" ${sw}/>`;
    else g+=`<rect x="-11" y="-40" width="9" height="36" rx="3" fill="${p.pants}" ${sw}/><rect x="2" y="-40" width="9" height="36" rx="3" fill="${p.pants}" ${sw}/>`;
    g+=`<ellipse cx="-7" cy="-3" rx="7" ry="4" fill="#5a4636" ${sw}/><ellipse cx="7" cy="-3" rx="7" ry="4" fill="#5a4636" ${sw}/>`;
  }
  g+=`<rect x="-16" y="-70" width="32" height="34" rx="9" fill="${p.shirt}" ${sw}/>`;
  if(p.skirt && !p.bust) g+=`<path d="M-15 -42H15L20 -24H-20Z" fill="${p.pants}" ${sw}/>`;
  g+=p.front;
  const [a1,a2]=p.arms;
  g+=limb(-13,-64,a1[0],a1[1],p.shirt)+hand(a1[0],a1[1]);
  g+=limb(13,-64,a2[0],a2[1],p.shirt)+hand(a2[0],a2[1]);
  g+=`<circle cx="0" cy="-84" r="15" fill="${SKIN}" ${sw}/>`;
  g+=`<path d="M-16.5 -80C-19 -107 19 -107 16.5 -80C10 -92 -6 -94 -16.5 -80Z" fill="${p.hair}" ${sw}/>`;
  if(p.face==='sleep') g+=`<path class="k" d="M-8 -83q3 2.5 6 0M2 -83q3 2.5 6 0" stroke="#222" stroke-width="1.6" fill="none"/>`;
  else g+=`<circle class="k" cx="-5" cy="-83" r="2" fill="#222"/><circle class="k" cx="5" cy="-83" r="2" fill="#222"/>`;
  g+=`<circle cx="-10" cy="-77" r="2.6" fill="#f6a9a9"/><circle cx="10" cy="-77" r="2.6" fill="#f6a9a9"/>`;
  g+=`<path d="M-4.5 -76.5Q0 -72.5 4.5 -76.5" stroke="#222" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
  if(p.glasses) g+=`<circle cx="-5.5" cy="-83" r="4.5" fill="none" stroke="#222" stroke-width="1.4"/><circle cx="5.5" cy="-83" r="4.5" fill="none" stroke="#222" stroke-width="1.4"/><path d="M-1 -83H1" stroke="#222" stroke-width="1.4"/>`;
  g+=p.hat;
  return `<g transform="translate(${p.x} ${p.y}) scale(${p.s})">${g}</g>`;
}
const driverCap=`<path d="M-16 -93Q-14 -109 0 -109Q14 -109 16 -93Z" fill="#2c4a7a" ${sw}/><rect x="-17" y="-96" width="34" height="5" rx="1.5" fill="#1d2f4f" ${sw}/><circle cx="0" cy="-102" r="2.5" fill="#f6c445"/>`;
const nurseCap=`<path d="M-10 -97L-8 -106H8L10 -97Z" fill="#fff" ${sw}/><path class="k" d="M0 -104.5V-98.5M-3 -101.5H3" stroke="#e53935" stroke-width="2" fill="none"/>`;

function cat(x,y){ return `<g transform="translate(${x} ${y})">
  ${limb(-18,-6,-30,-22,'#f4a259',5)}
  <ellipse cx="0" cy="-8" rx="20" ry="11" fill="#f4a259" ${sw}/>
  <path d="M-6 -18v8M2 -19v8" stroke="#c97b35" stroke-width="2.5"/>
  <path d="M14 -18L16 -30L23 -20Z" fill="#f4a259" ${sw}/><path d="M26 -20L33 -29L33 -16Z" fill="#f4a259" ${sw}/>
  <circle cx="24" cy="-11" r="10" fill="#f4a259" ${sw}/>
  <path class="k" d="M19 -13q2 2 4 0M26 -12q2 2 4 0" stroke="#222" stroke-width="1.4" fill="none"/>
  <path d="M32 -4h24l-4 8h-16z" fill="#6fa8dc" ${sw}/>
  <ellipse cx="44" cy="-6" rx="7" ry="3" fill="#9ec5e8" ${sw}/><path d="M51 -6l5 -3v6z" fill="#9ec5e8" ${sw}/>
</g>`; }
function dog(x,y){ return `<g transform="translate(${x} ${y})">
  <path d="M22 -12q10 -6 6 -14" stroke="${O}" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="0" cy="-10" rx="24" ry="10" fill="#d9a066" ${sw}/>
  <circle cx="-24" cy="-14" r="10" fill="#d9a066" ${sw}/>
  <ellipse cx="-33" cy="-11" rx="6" ry="4" fill="#e8bd8a" ${sw}/><circle class="k" cx="-38" cy="-12" r="2" fill="#222"/>
  <ellipse cx="-17" cy="-14" rx="4" ry="7" fill="#8b5a2b" ${sw}/>
  <path class="k" d="M-28 -18q2 2 4 0" stroke="#222" stroke-width="1.4" fill="none"/>
</g>`; }

/* ---------- 六張插圖 ---------- */
let rain='';
for(let i=0;i<46;i++){ const x=(i*47)%316+2, y=(i*29)%190+4;
  if(x>78 && x<300 && y>18) continue;
  rain+=`<path d="M${x} ${y}l-3 9" stroke="#5b9bd5" stroke-width="2" stroke-linecap="round"/>`; }

const SVGS = {
  breakfast: svg(`
    <rect width="320" height="220" fill="#fdf1d6"/><rect y="185" width="320" height="35" fill="#e3c39d"/>
    <rect x="20" y="18" width="70" height="52" rx="3" fill="#bfe6fb" ${sw}/><circle cx="40" cy="36" r="10" fill="#ffd34d"/>
    <path d="M55 18V70M20 44H90" stroke="${O}" stroke-width="2"/>
    <circle cx="150" cy="40" r="14" fill="#fff" ${sw}/><path class="k" d="M150 40V31M150 40L144 44" stroke="#222" stroke-width="2" fill="none"/>
    ${person({x:55,y:192,s:.85,hs:'pony',shirt:'#ffb5c2',arms:[[-20,-42],[7,-74]]})}
    <rect x="56" y="116" width="12" height="16" rx="2" fill="#fff" ${sw}/>${hand(61,130,3.8)}
    ${person({x:178,y:192,glasses:true,shirt:'#8fbf7f',arms:[[-22,-58],[22,-58]]})}
    <rect x="154" y="124" width="48" height="30" fill="#f7f7f7" ${sw}/>
    <path d="M160 132H196M160 138H196M160 144H184" stroke="#9a9a9a" stroke-width="2"/>
    ${hand(156,134)}${hand(200,134)}
    <rect x="22" y="150" width="190" height="9" rx="2" fill="#c68b59" ${sw}/>
    <rect x="34" y="159" width="8" height="41" fill="#a8713f" ${sw}/><rect x="192" y="159" width="8" height="41" fill="#a8713f" ${sw}/>
    <ellipse cx="82" cy="149" rx="16" ry="3.5" fill="#fff" ${sw}/>
    <path d="M104 150V132L111 125L118 132V150Z" fill="#fff" ${sw}/><path d="M104 132L111 125L118 132Z" fill="#6fa8dc" ${sw}/>
    ${cat(98,197)}
    ${person({x:290,y:212,s:1.1,hs:'long',hair:'#4a3020',shirt:'#f6a5a5',
      front:`<rect x="-11" y="-60" width="22" height="24" rx="3" fill="#fff" ${sw}/>`,arms:[[-20,-56],[22,-42]]})}
    <rect x="222" y="160" width="98" height="45" fill="#e9e4dc" ${sw}/>
    <rect x="226" y="155" width="44" height="5" fill="#666" ${sw}/>
    <ellipse cx="246" cy="152" rx="16" ry="5" fill="#444" ${sw}/>
    <ellipse cx="246" cy="150.5" rx="9" ry="3" fill="#fff" ${sw}/><circle cx="246" cy="150" r="2.6" fill="#ffc300"/>
    <path d="M262 151L270 149" stroke="#333" stroke-width="4" stroke-linecap="round"/>${hand(268,150.4,5)}`),

  family: svg(`
    <rect width="320" height="220" fill="#f3ead8"/>
    <path d="M130 16L160 4L190 16" fill="none" ${sw}/><circle cx="160" cy="4" r="2.5" fill="#888"/>
    <rect x="38" y="14" width="244" height="200" rx="5" fill="#b5835a" ${sw}/>
    <rect x="50" y="26" width="220" height="176" fill="#cfeaf7" ${sw}/>
    <rect x="51" y="160" width="218" height="41" fill="#a8d58b"/>
    <circle cx="245" cy="50" r="11" fill="#ffd34d" ${sw}/>${cloud(110,52)}
    <rect x="56" y="118" width="54" height="38" rx="6" fill="#f6c445" ${sw}/>
    <rect x="61" y="124" width="12" height="11" fill="#d8f1ff" ${sw}/><rect x="77" y="124" width="12" height="11" fill="#d8f1ff" ${sw}/><rect x="93" y="124" width="12" height="11" fill="#d8f1ff" ${sw}/>
    <rect x="57" y="140" width="52" height="4" fill="#e0782f"/>
    <circle cx="68" cy="157" r="5" fill="#444" ${sw}/><circle cx="98" cy="157" r="5" fill="#444" ${sw}/>
    ${person({x:124,y:194,s:1.05,shirt:'#7fa7d9',pants:'#2c4a7a',hat:driverCap,
      front:`<path d="M0 -69L-3.5 -63L0 -50L3.5 -63Z" fill="#c0392b" ${sw}/>`,arms:[[-22,-40],[24,-46]]})}
    ${person({x:172,y:194,hs:'long',hair:'#4a3020',shirt:'#fff',pants:'#f2f2f2',skirt:true,hat:nurseCap})}
    ${person({x:220,y:194,s:.85,hs:'long',hair:'#2b1d14',shirt:'#fff',pants:'#2c4a7a',skirt:true,
      front:`<path d="M-9 -70L0 -61L9 -70" fill="none" stroke="#2c4a7a" stroke-width="3"/>`,arms:[[-8,-52],[22,-42]]})}
    <rect x="203" y="140" width="16" height="20" rx="1" fill="#e57373" ${sw}/><path d="M207 146h8" stroke="#fff" stroke-width="2"/>${hand(213.2,150,3.8)}
    ${person({x:256,y:194,s:.68,shirt:'#ffd166',pants:'#3d5a80',arms:[[-20,-90],[20,-40]]})}`),

  bag: svg(`
    <rect width="320" height="220" fill="#dfe6ee"/><rect y="196" width="320" height="24" fill="#c3c9cf"/>
    <rect x="6" y="88" width="72" height="108" fill="#f2d7a6" ${sw}/><path d="M2 88H82L72 74H12Z" fill="#c0504d" ${sw}/>
    <rect x="14" y="100" width="16" height="14" fill="#bfe6fb" ${sw}/><rect x="54" y="100" width="16" height="14" fill="#bfe6fb" ${sw}/>
    <rect x="14" y="126" width="16" height="14" fill="#bfe6fb" ${sw}/><rect x="54" y="126" width="16" height="14" fill="#bfe6fb" ${sw}/>
    <rect x="32" y="150" width="20" height="46" fill="#a8713f" ${sw}/>
    ${cloud(36,28,'#b8c2cc')}${cloud(292,26,'#b8c2cc')}
    <ellipse cx="40" cy="207" rx="24" ry="5" fill="#9fd0f0" ${sw}/><ellipse cx="300" cy="209" rx="16" ry="4" fill="#9fd0f0" ${sw}/>
    ${rain}
    <path d="M190 68V136q0 8 -6 8q-5 0 -5 -5" fill="none" stroke="#555" stroke-width="3" stroke-linecap="round"/>
    ${person({x:215,y:205,s:1.05,hs:'long',hair:'#4a3020',shirt:'#7cc4a4',pants:'#4a5a7a',arms:[[-24,-76],[22,-40]]})}
    ${person({x:140,y:205,s:.8,hs:'pony',shirt:'#ffd166',pants:'#3d5a80',skirt:true,arms:[[-17,-50],[17,-50]]})}
    <rect x="126" y="150" width="28" height="28" rx="7" fill="#ff7aa2" ${sw}/>
    <path d="M126 160Q140 166 154 160" fill="none" ${sw}/><rect x="133" y="166" width="14" height="9" rx="2" fill="#ffc2d4" ${sw}/>
    <path d="M134 150q6 -8 12 0" fill="none" ${sw}/>${hand(126.4,165,3.6)}${hand(153.6,165,3.6)}
    ${star(118,140,6)}${star(162,146,5)}
    ${person({x:262,y:205,s:.7,shirt:'#9bd1f5',pants:'#556b8a',arms:[[-20,-40],[24,-72]]})}
    <rect x="274" y="142" width="10" height="22" rx="3" fill="#4fb3e8" ${sw}/><rect x="275" y="138" width="8" height="5" fill="#2a6f97" ${sw}/>
    ${hand(278.8,154.6,3.2)}${star(294,132,5)}
    <path d="M84 72Q190 -12 296 72Q270 62 243 72Q216 62 190 72Q164 62 137 72Q110 62 84 72Z" fill="#e94b4b" ${sw}/>
    <path d="M190 30L137 72M190 30L243 72M190 30V22" stroke="${O}" stroke-width="2" fill="none"/>`),

  park: svg(`
    <rect width="320" height="220" fill="#d6efff"/>
    <path d="M0 150Q80 136 160 148T320 146V220H0Z" fill="#a6d86f" ${sw}/>
    <circle cx="44" cy="36" r="15" fill="#ffd34d" ${sw}/>
    <path d="M44 14V8M44 64V58M22 36H16M72 36H66M28 20l-4 -4M60 52l4 4M60 20l4 -4M28 52l-4 4" stroke="#f2b134" stroke-width="3" stroke-linecap="round"/>
    <rect x="14" y="112" width="14" height="88" fill="#a0703f" ${sw}/>
    <circle cx="6" cy="112" r="14" fill="#5cb85c" ${sw}/><circle cx="36" cy="112" r="14" fill="#5cb85c" ${sw}/><circle cx="21" cy="96" r="24" fill="#5cb85c" ${sw}/>
    <path d="M100 56q18 -12 36 0t36 0M120 84q14 -9 28 0t28 0" fill="none" stroke="#7fb3d5" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="184" cy="52" rx="6" ry="3" fill="#7cc576" ${sw} transform="rotate(-30 184 52)"/>
    <ellipse cx="182" cy="82" rx="6" ry="3" fill="#7cc576" ${sw} transform="rotate(20 182 82)"/>
    <path d="M210 70V205M224 70V205" stroke="#e85d5d" stroke-width="4" stroke-linecap="round"/>
    <path d="M210 92H224M210 114H224M210 136H224M210 158H224M210 180H224" stroke="#e85d5d" stroke-width="3"/>
    <rect x="206" y="64" width="40" height="8" fill="#4f8fd8" ${sw}/>
    <path d="M246 66L258 66L314 196L298 196Z" fill="#ffcf3f" ${sw}/>
    ${flower(150,186,'#ff6b6b')}${flower(170,196,'#f78fb3')}${flower(190,184,'#ffd166')}
    ${person({x:80,y:205,hs:'bun',hair:'#cfcfcf',shirt:'#b39ddb',pants:'#6d5d8f',skirt:true,glasses:true,arms:[[-22,-40],[20,-42]]})}
    ${person({x:122,y:205,s:.72,shirt:'#ff9f43',pants:'#3d5a80',arms:[[-26,-58],[24,-80]]})}`),

  hide: svg(`
    <rect width="320" height="220" fill="#dff3ff"/><rect y="160" width="320" height="60" fill="#b5e08a"/>
    ${person({x:60,y:205,s:.7,shirt:'#7ed6a5',pants:'#3d5a80',arms:[[-14,-62],[20,-40]]})}
    <rect x="32" y="92" width="28" height="114" fill="#a0703f" ${sw}/>
    <circle cx="20" cy="98" r="18" fill="#5cb85c" ${sw}/><circle cx="74" cy="98" r="18" fill="#5cb85c" ${sw}/><circle cx="46" cy="82" r="30" fill="#5cb85c" ${sw}/>
    ${hand(50.2,161.6,3.4)}
    <path d="M128 92V205M142 92V205" stroke="#e85d5d" stroke-width="4" stroke-linecap="round"/>
    <path d="M128 112H142M128 132H142M128 152H142M128 172H142M128 192H142" stroke="#e85d5d" stroke-width="3"/>
    <rect x="124" y="86" width="50" height="8" fill="#4f8fd8" ${sw}/>
    <path d="M170 90L184 90L246 202L230 202Z" fill="#ffcf3f" ${sw}/>
    ${person({x:178,y:205,s:.6,shirt:'#ffb36b',pants:'#3d5a80',arms:[[-20,-40],[4,-76]]})}
    <rect x="244" y="182" width="13" height="22" rx="3" fill="#b9b9b9" ${sw}/><rect x="278" y="182" width="13" height="22" rx="3" fill="#b9b9b9" ${sw}/>
    <ellipse cx="270" cy="172" rx="36" ry="24" fill="#b9b9b9" ${sw}/>
    <circle cx="236" cy="156" r="20" fill="#b9b9b9" ${sw}/>
    <path d="M220 164q-10 14 -2 32l9 -2q-7 -12 3 -26Z" fill="#b9b9b9" ${sw}/>
    <ellipse cx="248" cy="156" rx="11" ry="15" fill="#a3a3a3" ${sw}/>
    <circle class="k" cx="228" cy="150" r="2" fill="#222"/>
    <path d="M262 160l6 4M282 176l5 -3" stroke="#8d8d8d" stroke-width="2"/>
    ${person({x:302,y:208,s:.68,hs:'long',hair:'#2b1d14',shirt:'#f78fb3',pants:'#c2185b',skirt:true,arms:[[-22,-40],[20,-92]]})}`),

  night: svg(`
    <rect width="320" height="220" fill="#2f3e66"/>
    <path d="M26 16a15 15 0 1 0 14 24a12 12 0 1 1 -14 -24Z" fill="#ffe680" ${sw}/>
    ${star(298,20,6,'#ffe680')}${star(306,46,4,'#ffe680')}${star(14,72,4,'#ffe680')}${star(292,84,4,'#ffe680')}
    <rect y="210" width="320" height="10" fill="#4a5a3a"/>
    <path d="M38 60L160 14L282 60Z" fill="#c0504d" ${sw}/>
    <rect x="50" y="60" width="110" height="74" fill="#d9f1f8" ${sw}/>
    <rect x="160" y="60" width="110" height="74" fill="#fff3c4" ${sw}/>
    <rect x="50" y="134" width="110" height="76" fill="#f6e3cf" ${sw}/>
    <rect x="160" y="134" width="110" height="76" fill="#e8f5e1" ${sw}/>
    <path d="M51 80H159M51 100H159" stroke="#b5dbe6" stroke-width="1.5"/>
    <path d="M150 62V74q0 4 -6 4h-4" fill="none" ${sw}/><path d="M128 76h14l-2 5h-10z" fill="#9aa9b0" ${sw}/>
    ${person({x:100,y:144,s:.6,bust:true,shirt:SKIN,arms:[[-24,-70],[24,-70]]})}
    <path d="M58 104H152V118Q152 130 140 130H70Q58 130 58 118Z" fill="#fff" ${sw}/>
    <circle cx="70" cy="101" r="6" fill="#fff" stroke="#7fb8d8" stroke-width="1.8"/><circle cx="80" cy="96" r="5" fill="#fff" stroke="#7fb8d8" stroke-width="1.8"/>
    <circle cx="124" cy="100" r="6" fill="#fff" stroke="#7fb8d8" stroke-width="1.8"/><circle cx="136" cy="95" r="5" fill="#fff" stroke="#7fb8d8" stroke-width="1.8"/>
    ${person({x:205,y:140,s:.62,bust:true,shirt:'#5c9ded',arms:[[-18,-50],[18,-50]]})}
    <rect x="168" y="110" width="94" height="6" fill="#c68b59" ${sw}/>
    <rect x="174" y="116" width="5" height="18" fill="#a8713f" ${sw}/><rect x="251" y="116" width="5" height="18" fill="#a8713f" ${sw}/>
    <path d="M190 110L205 106L220 110V113L205 110L190 113Z" fill="#fff" ${sw}/>
    <path d="M216 109L222 99" stroke="#f2b134" stroke-width="2.5" stroke-linecap="round"/>
    ${hand(193.8,109,2.8)}${hand(216.2,109,2.8)}
    <rect x="246" y="106" width="12" height="4" fill="#555" ${sw}/><path d="M252 106V86" stroke="#555" stroke-width="2.5"/>
    <path d="M240 86H262L256 74H246Z" fill="#ffcf3f" ${sw}/>
    ${person({x:82,y:210,s:.7,bust:true,hair:'#cfcfcf',glasses:true,shirt:'#8d6e63',arms:[[-20,-40],[26,-58]]})}
    <rect x="58" y="180" width="98" height="6" fill="#c68b59" ${sw}/>
    <rect x="64" y="186" width="5" height="24" fill="#a8713f" ${sw}/><rect x="145" y="186" width="5" height="24" fill="#a8713f" ${sw}/>
    <path d="M102 164q-6 4 0 9" fill="none" stroke="${O}" stroke-width="3"/>
    <ellipse cx="114" cy="168" rx="12" ry="9" fill="#5fae8a" ${sw}/>
    <path d="M108 160q6 -6 12 0Z" fill="#5fae8a" ${sw}/><circle cx="114" cy="156" r="2" fill="#5fae8a" ${sw}/>
    <path d="M125 166L134 160L132 166L126 171Z" fill="#5fae8a" ${sw}/>
    <path d="M134 161q6 4 6 13" fill="none" stroke="#c8a26a" stroke-width="2"/>
    <path d="M134 174H146L144 180H136Z" fill="#fff" ${sw}/>${hand(100.2,169.4,3.2)}
    <ellipse cx="215" cy="198" rx="42" ry="10" fill="#e57373" ${sw}/><ellipse cx="215" cy="195" rx="33" ry="6" fill="#ffcdd2" ${sw}/>
    ${dog(222,198)}
    <text class="k" x="236" y="170" font-family="Arial" font-size="13" fill="#5a6ea0">z</text>
    <text class="k" x="245" y="158" font-family="Arial" font-size="16" fill="#5a6ea0">z</text>
    <text class="k" x="256" y="145" font-family="Arial" font-size="19" fill="#5a6ea0">z</text>`)
};

/* ---------- 二、三年級新增插圖 ---------- */
const BOOKC=['#e57373','#64b5f6','#81c784','#ffd54f','#ba68c8'];
Object.assign(SVGS,{
  library: svg(`
    <rect width="320" height="220" fill="#f4efe6"/><rect y="192" width="320" height="28" fill="#d9c3a5"/>
    <rect x="14" y="20" width="120" height="160" fill="#b5835a" ${sw}/>
    ${[20,60,100,140].map((y,r)=>[0,1,2,3,4,5,6].map(i=>`<rect x="${20+i*16}" y="${y+8+(i%3)*3}" width="12" height="${32-(i%3)*3}" fill="${BOOKC[(i+r)%5]}" ${sw}/>`).join('')).join('')}
    <path d="M14 60H134M14 100H134M14 140H134" stroke="${O}" stroke-width="3"/>
    ${person({x:156,y:205,hs:'long',hair:'#2b1d14',shirt:'#9575cd',pants:'#4a3b6b',skirt:true,arms:[[-26,-96],[20,-40]]})}
    <rect x="222" y="22" width="84" height="64" fill="#cfeaf7" ${sw}/><path d="M264 22V86M222 54H306" stroke="${O}" stroke-width="2"/>
    ${cloud(256,50)}
    ${person({x:262,y:192,s:.8,bust:true,hs:'pony',shirt:'#ffb5c2',arms:[[-18,-40],[18,-40]]})}
    <rect x="200" y="160" width="116" height="8" rx="2" fill="#c68b59" ${sw}/>
    <rect x="208" y="168" width="7" height="30" fill="#a8713f" ${sw}/><rect x="300" y="168" width="7" height="30" fill="#a8713f" ${sw}/>
    <path d="M242 160L262 153L282 160V164L262 157L242 164Z" fill="#fff" ${sw}/>
    ${hand(247.6,158,3.6)}${hand(276.4,158,3.6)}`),

  market: svg(`
    <rect width="320" height="220" fill="#fff6e0"/><rect y="196" width="320" height="24" fill="#cfc4b0"/>
    ${[0,1,2,3,4,5,6,7].map(i=>`<rect x="${12+i*17}" y="36" width="17" height="18" fill="${i%2?'#fff':'#4caf50'}" ${sw}/>`).join('')}
    ${[0,1,2,3,4,5,6,7].map(i=>`<rect x="${172+i*17}" y="36" width="17" height="18" fill="${i%2?'#fff':'#e94b4b'}" ${sw}/>`).join('')}
    <path d="M18 54V130M142 54V130M178 54V130M302 54V130" stroke="#8d6e63" stroke-width="5"/>
    <rect x="12" y="130" width="136" height="44" fill="#c68b59" ${sw}/><rect x="172" y="130" width="136" height="44" fill="#c68b59" ${sw}/>
    ${[30,52,74,96,118].map(x=>`<circle cx="${x}" cy="122" r="10" fill="#8bc34a" ${sw}/><path d="M${x-5} 120q5 6 10 0" stroke="#558b2f" stroke-width="2" fill="none"/>`).join('')}
    ${[196,222,276].map(x=>`<circle cx="${x}" cy="118" r="13" fill="#43a047" ${sw}/><path d="M${x-6} 108q-3 10 0 20M${x+6} 108q3 10 0 20" stroke="#1b5e20" stroke-width="2" fill="none"/>`).join('')}
    <path d="M236 130A16 16 0 0 1 268 130Z" fill="#ef5350" ${sw}/><path d="M240 130A12 12 0 0 1 264 130" stroke="#a5d6a7" stroke-width="3" fill="none"/>
    <circle cx="248" cy="124" r="1.5" fill="#222"/><circle cx="256" cy="124" r="1.5" fill="#222"/>
    ${person({x:92,y:212,hs:'long',hair:'#4a3020',shirt:'#f6a5a5',pants:'#7a4a5a',skirt:true,arms:[[-26,-82],[24,-44]]})}
    <path d="M110 166H128L124 186H114Z" fill="#d7a86e" ${sw}/><path d="M112 166q7 -12 14 0" fill="none" ${sw}/>
    ${person({x:224,y:212,s:.75,shirt:'#ffd166',pants:'#3d5a80',arms:[[-20,-40],[22,-112]]})}`),

  lunch: svg(`
    <rect width="320" height="220" fill="#fdf6e3"/><rect y="182" width="320" height="38" fill="#d7c4a3"/>
    <rect x="24" y="14" width="190" height="58" fill="#2e5e4e" stroke="#8d6e63" stroke-width="5"/>
    <path d="M40 34h40M40 48h60M120 30l10 10l16 -18" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <circle cx="268" cy="40" r="16" fill="#fff" ${sw}/><path d="M268 40V28M268 40H276" stroke="#222" stroke-width="2"/>
    ${person({x:66,y:178,s:.8,bust:true,hs:'pony',shirt:'#ffb5c2',arms:[[-18,-38],[8,-72]]})}
    <path d="M73 120L78 114" stroke="#9e9e9e" stroke-width="3" stroke-linecap="round"/>
    ${person({x:146,y:178,s:.8,bust:true,shirt:'#81c784',arms:[[-18,-38],[18,-38]]})}
    <ellipse cx="106" cy="96" rx="16" ry="11" fill="#fff" ${sw}/><path d="M98 104l-6 8l12 -4" fill="#fff" ${sw}/>
    <circle cx="100" cy="96" r="2" fill="#222"/><circle cx="106" cy="96" r="2" fill="#222"/><circle cx="112" cy="96" r="2" fill="#222"/>
    <rect x="24" y="150" width="166" height="8" rx="2" fill="#c68b59" ${sw}/>
    <rect x="32" y="158" width="7" height="34" fill="#a8713f" ${sw}/><rect x="176" y="158" width="7" height="34" fill="#a8713f" ${sw}/>
    <rect x="44" y="140" width="34" height="10" rx="2" fill="#ffb74d" ${sw}/><ellipse cx="61" cy="140" rx="13" ry="3" fill="#fff" ${sw}/>
    <rect x="128" y="140" width="34" height="10" rx="2" fill="#4fc3f7" ${sw}/><ellipse cx="145" cy="140" rx="13" ry="3" fill="#fff" ${sw}/>
    ${hand(51.6,147.6,3.6)}${hand(131.6,147.6,3.6)}${hand(160.4,147.6,3.6)}
    ${person({x:262,y:206,s:1.05,glasses:true,shirt:'#90a4ae',pants:'#455a64',arms:[[-22,-40],[26,-96]]})}`),

  brush: svg(`
    <rect width="320" height="220" fill="#e3f2fd"/>
    ${[0,1,2,3,4,5,6,7].map(i=>`<path d="M${i*40} 0V220" stroke="#bbdefb" stroke-width="2"/>`).join('')}
    ${[0,1,2,3,4,5].map(i=>`<path d="M0 ${i*40}H320" stroke="#bbdefb" stroke-width="2"/>`).join('')}
    <rect x="106" y="16" width="88" height="66" rx="6" fill="#d6f0ff" stroke="#9e9e9e" stroke-width="4"/>
    <path d="M120 30l20 -8M124 44l30 -14" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
    ${person({x:150,y:214,s:1.1,hs:'pony',shirt:'#ffb5c2',pants:'#3d5a80',arms:[[-20,-40],[12,-80]]})}
    <path d="M170 126L151 129" stroke="#4fc3f7" stroke-width="4" stroke-linecap="round"/>
    <circle cx="148" cy="131" r="3" fill="#fff" ${sw}/><circle cx="143" cy="128" r="2.5" fill="#fff" ${sw}/>
    <path d="M90 150H210L200 178Q150 192 100 178Z" fill="#fff" ${sw}/>
    <rect x="140" y="182" width="20" height="38" fill="#eeeeee" ${sw}/>
    <path d="M150 150V140H166" stroke="#9e9e9e" stroke-width="5" fill="none" stroke-linecap="round"/>
    <rect x="44" y="120" width="18" height="26" rx="3" fill="#ffd54f" ${sw}/><path d="M50 120L46 100M56 120L60 102" stroke="#e57373" stroke-width="3"/>
    <path d="M30 146H76" stroke="${O}" stroke-width="3"/>
    <path d="M250 60H290" stroke="#9e9e9e" stroke-width="4" stroke-linecap="round"/>
    <rect x="254" y="60" width="32" height="64" rx="3" fill="#81c784" ${sw}/><path d="M254 108H286" stroke="#fff" stroke-width="3"/>`)
});
