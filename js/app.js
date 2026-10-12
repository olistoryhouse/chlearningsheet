/* ---------- 工具 ---------- */
const $=id=>document.getElementById(id);
const q=s=>document.querySelector(s);
// 拆字：IVS 讀音選擇器（U+E0100–E01EF）併入前一字
function splitChars(s){ const out=[]; for(const ch of s){ const cp=ch.codePointAt(0);
  if(cp>=0xE0100 && cp<=0xE01EF && out.length) out[out.length-1]+=ch; else out.push(ch);} return out; }
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }

function gridHTML(total,opt,given=''){
  const withZy = opt.mode==='hz' && opt.zy;
  const per = withZy ? 6 : 9, w = withZy ? 27.5 : 20.5;
  const inner = opt.mode==='hz' ? `<div class="sq"></div>${withZy?'<div class="zy"></div>':''}` : '';
  const g = splitChars(given);
  let h = g.map(c=>`<div class="cell given"><span class="gch">${c}</span></div>`).join('');
  for(let i=g.length;i<total;i++) h+=`<div class="cell">${inner}</div>`;
  return `<div class="grid ${opt.mode==='hz'?'m-hz':'m-zy'}" style="grid-template-columns:repeat(${per},${w}mm)">${h}</div>`;
}
const perRow = opt => (opt.mode==='hz' && opt.zy) ? 6 : 9;

/* ---------- 單題頁 ---------- */
const headHTML=(L,idx,total)=>`<div class="head"><span>姓名：＿＿＿＿＿＿　日期：＿＿月＿＿日</span><span>${L.name}　第 ${idx}／${total} 題</span></div>`;
const exHTML=s=>`<div class="ex"><span class="lab">範例</span>${s.example.map(([w,t])=>`<div class="blk"><div class="w">${w}</div><div class="tag">${t||'&nbsp;'}</div></div>`).join('')}</div>`;
const planHTML=labels=>!labels?'':`<div class="plan-t">先想一想（寫關鍵詞或注音就好）：</div><div class="plan">${labels.map(l=>`<div class="pl"><div class="pt">${l}</div><div class="pb"></div></div>`).join('')}</div>`;
const footHTML=L=>`<div class="foot">
  <div class="check"><b>我會檢查</b><div class="items">${L.checklist.map(c=>`<div><span class="box"></span>${c}</div>`).join('')}</div></div>
  <div class="adult"><b>大人的話</b><div class="ln">我欣賞你：</div><div class="ln">再試試看：</div></div></div>`;

function pageHTML(s,idx,total,L,opt){
  const per=perRow(opt);
  const fillTotal=Math.ceil((splitChars(s.fill.given).length+s.fill.ans+3)/per)*per;
  const lifeTotal=Math.max(2,Math.ceil((s.lifeEst+4)/per))*per;
  const title=`<div class="title">${s.title}<small>句型：${s.pattern}</small></div>`;
  const sec1=`<div class="sec"><div class="sec-t"><span class="num">1</span>讀一讀，找一找</div>
    <div class="story"><div class="txt">${s.text.join('')}</div><div class="ill">${SVGS[s.svg]}</div></div>
    <div class="task">${s.find}</div></div>`;
  const sec2=`<div class="sec"><div class="sec-t"><span class="num">2</span>照樣寫<span class="q">${s.fill.hint}</span></div>
    ${exHTML(s)}${gridHTML(fillTotal,opt,s.fill.given)}</div>`;
  const sec3=`<div class="sec"><div class="sec-t"><span class="num">3</span>寫我的生活<span class="q">${s.life}</span></div>
    <div class="subq">${s.subq||`用「${s.pattern}」，寫一句真的發生的事。`}</div>
    ${planHTML(s.plan||L.plan)}${gridHTML(lifeTotal,opt)}</div>`;
  const h=headHTML(L,idx,total);
  if(!L.twoPage) return `<section class="page">${h}${title}${sec1}${sec2}${sec3}${footHTML(L)}</section>`;
  return `<section class="page">${h}${title}${sec1}${sec2}</section>
          <section class="page">${h}${title}${sec3}${footHTML(L)}</section>`;
}

/* ---------- 引導頁 ---------- */
function guideHTML(L){
  return `<section class="page guide">
    <h2>家長／老師引導小抄：${L.guide.title}</h2>
    ${L.guide.items.map(([h,p])=>`<h3>${h}</h3><p>${p}</p>`).join('')}
    <div class="src">教學概念整理自：宜蘭縣教師部落格〈[寫作教學]造句怎麼寫啊？〉https://2blog.ilc.edu.tw/1003/2019/03/24/</div>
  </section>`;
}

/* ---------- 產生 ---------- */
let order=[];
function getOpt(){ return { lv:q('input[name=lv]:checked').value, n:+$('count').value,
  mode:q('input[name=mode]:checked').value, zy:$('zy').checked,
  art:q('input[name=art]:checked').value, guide:$('withGuide').checked }; }
function build(reshuffle){
  const opt=getOpt(), L=LEVELS[opt.lv];
  if(reshuffle || !order.length) order=shuffle(L.stories);
  const picked=order.slice(0,opt.n);
  let html=picked.map((s,i)=>pageHTML(s,i+1,opt.n,L,opt)).join('');
  if(opt.guide) html+=guideHTML(L);
  const box=$('sheets'); box.innerHTML=html;
  box.classList.toggle('lineart', opt.art==='line');
  $('zyWrap').style.opacity = opt.mode==='hz' ? 1 : .4;
  $('zy').disabled = opt.mode!=='hz';
  requestAnimationFrame(checkOverflow);
}
function checkOverflow(){
  const bad=[...document.querySelectorAll('.page:not(.guide)')]
    .map((p,i)=>p.scrollHeight>p.clientHeight+2 ? i+1 : 0).filter(Boolean);
  const w=$('warn');
  if(bad.length){ w.textContent=`第 ${bad.join('、')}  頁超出 A4`; w.className='ng'; }
  else { w.textContent='版面：每題一頁 OK'; w.className='ok'; }
}
// 字型由 css/style.css 的 @font-face 自帶，檢查它是否真的載入成功
function detectFont(){
  const face=document.fonts && [...document.fonts].find(f=>f.family.replace(/["']/g,'')==='BpmfZihiKaiStd');
  const el=$('fontStatus');
  if(face && face.status==='loaded'){ el.textContent='注音字型：已載入'; el.className='ok'; }
  else { el.textContent='注音字型：載入失敗，請確認 fonts/ 資料夾完整'; el.className='ng'; }
}

// 各年級預設書寫格：一年級用注音格（國字格＋注音欄會超出 A4），二、三年級用國字格
const DEFAULT_MODE={1:'zy',2:'hz',3:'hz'};
function applyDefaultMode(){ q(`input[name=mode][value=${DEFAULT_MODE[q('input[name=lv]:checked').value]}]`).checked=true; }

/* ---------- 事件 ---------- */
$('count').onchange=()=>build(false);
$('withGuide').onchange=()=>build(false);
$('zy').onchange=()=>build(false);
document.querySelectorAll('input[name=mode],input[name=art]').forEach(r=>r.onchange=()=>build(false));
document.querySelectorAll('input[name=lv]').forEach(r=>r.onchange=()=>{applyDefaultMode();build(true);});
$('reshuffle').onclick=()=>build(true);
$('printBtn').onclick=()=>window.print();

applyDefaultMode();
build(true);
(document.fonts ? document.fonts.ready : Promise.resolve()).then(()=>{ detectFont(); checkOverflow(); });
