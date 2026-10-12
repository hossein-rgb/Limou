/* =============================================
   Merged JS — 21 file(s)
   Generated: 5/28/2026, 11:22:54 AM
   ============================================= */

/* === config.js === */

'use strict';
const MFONT = "'STIX Two Math','Latin Modern Math',Georgia,serif";
const SS = 0.68;
const MM = 3.7795275591;
const DELIM_STEPS = [1,1.35,1.75,2.2,2.75,3.4,4.2];
const PRESETS = {A4:{w:210,h:297},A3:{w:297,h:420},A5:{w:148,h:210},Letter:{w:216,h:279}};
const LAYER_COLORS = ['#378ADD','#1D9E75','#D85A30','#7F77DD','#D4537E','#BA7517'];
const PN_POS_MAP = {bc:'@bottom-center',br:'@bottom-right',bl:'@bottom-left',tc:'@top-center'};
const PN_CTR_STYLE = {arabic:'decimal',roman:'lower-roman',alpha:'lower-alpha'};
const BLOCK_ICON = {text:'¶',title:'H1',h2:'H2',formula:'∑','canvas-textbox':'T','eq-snapshot':'∑'};
const BLOCK_BG   = {text:'#eee',title:'rgba(55,138,221,.13)',h2:'rgba(55,138,221,.08)',formula:'rgba(29,158,117,.13)','canvas-textbox':'rgba(123,200,0,.13)','eq-snapshot':'rgba(29,158,117,.13)'};
const BLOCK_CLR  = {text:'#aaa',title:'#378ADD',h2:'#378ADD',formula:'#1D9E75','canvas-textbox':'#7BC800','eq-snapshot':'#1D9E75'};

// ── Guest access — what visitors WITHOUT an account may use ───────────────────
// true  = open to everyone
// false = reserved to signed-in users (guests see the button dimmed; clicking it opens "Sign in")
// Signed-in users always have everything. Change a value, commit, done.
const GUEST_ACCESS = {
  export:    false, // Export HTML, export SVG, export profiles (JSON)
  fonts:     false, // Import custom fonts
  print:     false,  // Paged.js preview & print
  equations: true,  // Save equations
  profiles:  false,  // Save profiles
  document:  true,  // ¶ Document mode and the ⇄ Doc button
};

// ── Education levels ──────────────────────────────────────────────────────────
// 4 levels: 0=elementary, 1=middle, 2=high, 3=advanced
// lvl on each key = minimum level required to see it
const KB_LEVELS_KEYS = ['elementary','middle','high','advanced'];
let kbLevel = Math.min(+(localStorage.getItem('limou-kb-level') ?? 2), 3); // default High School, cap at 3

function setKbLevel(n){ kbLevel=Math.min(n,3); localStorage.setItem('limou-kb-level',kbLevel); buildKb(); }

// ── Accent variants (long-press popup) ──────────────────────────────────────
// Map base char → array of accent variant objects {k, s, lbl}
const ACCENT_VARIANTS = {
  'a':[{k:'aa',s:'à',lbl:'à'},{k:'ab',s:'á',lbl:'á'},{k:'ac',s:'â',lbl:'â'},{k:'ae',s:'ä',lbl:'ä'},{k:'af',s:'å',lbl:'å'},{k:'ag',s:'ã',lbl:'ã'},{k:'ah',s:'æ',lbl:'æ'}],
  'e':[{k:'ea',s:'è',lbl:'è'},{k:'eb',s:'é',lbl:'é'},{k:'ec',s:'ê',lbl:'ê'},{k:'ed',s:'ë',lbl:'ë'}],
  'i':[{k:'ia',s:'ì',lbl:'ì'},{k:'ib',s:'í',lbl:'í'},{k:'ic',s:'î',lbl:'î'},{k:'id',s:'ï',lbl:'ï'}],
  'o':[{k:'oa',s:'ò',lbl:'ò'},{k:'ob',s:'ó',lbl:'ó'},{k:'oc',s:'ô',lbl:'ô'},{k:'od',s:'ö',lbl:'ö'},{k:'oe',s:'õ',lbl:'õ'},{k:'of',s:'ø',lbl:'ø'}],
  'u':[{k:'ua',s:'ù',lbl:'ù'},{k:'ub',s:'ú',lbl:'ú'},{k:'uc',s:'û',lbl:'û'},{k:'ud',s:'ü',lbl:'ü'}],
  'c':[{k:'ca',s:'ç',lbl:'ç'}],
  'n':[{k:'na',s:'ñ',lbl:'ñ'}],
  'A':[{k:'Aa',s:'À',lbl:'À'},{k:'Ab',s:'Á',lbl:'Á'},{k:'Ac',s:'Â',lbl:'Â'},{k:'Ad',s:'Ä',lbl:'Ä'},{k:'Ae',s:'Å',lbl:'Å'},{k:'Af',s:'Ã',lbl:'Ã'},{k:'Ag',s:'Æ',lbl:'Æ'}],
  'E':[{k:'Ea',s:'È',lbl:'È'},{k:'Eb',s:'É',lbl:'É'},{k:'Ec',s:'Ê',lbl:'Ê'},{k:'Ed',s:'Ë',lbl:'Ë'}],
  'I':[{k:'Ia',s:'Ì',lbl:'Ì'},{k:'Ib',s:'Í',lbl:'Í'},{k:'Ic',s:'Î',lbl:'Î'},{k:'Id',s:'Ï',lbl:'Ï'}],
  'O':[{k:'Oa',s:'Ò',lbl:'Ò'},{k:'Ob',s:'Ó',lbl:'Ó'},{k:'Oc',s:'Ô',lbl:'Ô'},{k:'Od',s:'Ö',lbl:'Ö'},{k:'Oe',s:'Õ',lbl:'Õ'},{k:'Of',s:'Ø',lbl:'Ø'}],
  'U':[{k:'Ua',s:'Ù',lbl:'Ù'},{k:'Ub',s:'Ú',lbl:'Ú'},{k:'Uc',s:'Û',lbl:'Û'},{k:'Ud',s:'Ü',lbl:'Ü'}],
  'C':[{k:'Ca',s:'Ç',lbl:'Ç'}],
  'N':[{k:'Na',s:'Ñ',lbl:'Ñ'}],
};

// ── Structure variants (long-press popup on paired delimiter keys) ────────────
// Parallel to ACCENT_VARIANTS. Each entry mirrors a KEY_DEFS key shape.
// `half:'L'|'R'` → single half-delimiter, reuses _half2 engine via bHDelim.
const STRUCT_VARIANTS = {
  'paren':[
    {k:'paren', s:'( )',lbl:'( )',str:true,open:'(',close:')',p:['MinConnectorOverlap'],lvl:0},
    {k:'parenL',s:'(',  lbl:'(',  str:true,half:'L',delim:'paren',p:['MinConnectorOverlap'],lvl:0},
    {k:'parenR',s:')',  lbl:')',  str:true,half:'R',delim:'paren',p:['MinConnectorOverlap'],lvl:0},
  ],
  'brack':[
    {k:'brack', s:'[ ]',lbl:'[ ]',str:true,open:'[',close:']',p:['MinConnectorOverlap'],lvl:1},
    {k:'brackL',s:'[',  lbl:'[',  str:true,half:'L',delim:'brack',p:['MinConnectorOverlap'],lvl:1},
    {k:'brackR',s:']',  lbl:']',  str:true,half:'R',delim:'brack',p:['MinConnectorOverlap'],lvl:1},
  ],
  'brace':[
    {k:'brace', s:'{ }',lbl:'{ }',str:true,open:'{',close:'}',p:['MinConnectorOverlap'],lvl:2},
    {k:'braceL',s:'{',  lbl:'{',  str:true,half:'L',delim:'brace',p:['MinConnectorOverlap'],lvl:2},
    {k:'braceR',s:'}',  lbl:'}',  str:true,half:'R',delim:'brace',p:['MinConnectorOverlap'],lvl:2},
  ],
};

const KEY_DEFS = {
  'Letters':{_sg:[
    {id:'lc',lbl:'Lowercase',def:true,keys:'abcdefghijklmnopqrstuvwxyz'.split('').map(c=>({k:'l_'+c,s:c,lbl:c,p:[],lvl:0}))},
    {id:'uc',lbl:'Uppercase',keys:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(c=>({k:'L_'+c,s:c,lbl:c,p:[],lvl:0}))}
  ]},
  'Numbers':{_sg:[
    {id:'ns',lbl:'Standard',def:true,keys:'0123456789'.split('').map(c=>({k:'n'+c,s:c,lbl:c,p:[],lvl:0}))},
    {id:'nb',lbl:'Subscript',keys:[
      {k:'ns0',s:'₀',lbl:'₀',p:[],lvl:0},{k:'ns1',s:'₁',lbl:'₁',p:[],lvl:0},{k:'ns2',s:'₂',lbl:'₂',p:[],lvl:0},
      {k:'ns3',s:'₃',lbl:'₃',p:[],lvl:0},{k:'ns4',s:'₄',lbl:'₄',p:[],lvl:0},{k:'ns5',s:'₅',lbl:'₅',p:[],lvl:0},
      {k:'ns6',s:'₆',lbl:'₆',p:[],lvl:0},{k:'ns7',s:'₇',lbl:'₇',p:[],lvl:0},{k:'ns8',s:'₈',lbl:'₈',p:[],lvl:0},{k:'ns9',s:'₉',lbl:'₉',p:[],lvl:0}
    ]},
    {id:'np',lbl:'Superscript',keys:[
      {k:'np0',s:'⁰',lbl:'⁰',p:[],lvl:1},{k:'np1',s:'¹',lbl:'¹',p:[],lvl:1},{k:'np2',s:'²',lbl:'²',p:[],lvl:1},
      {k:'np3',s:'³',lbl:'³',p:[],lvl:1},{k:'np4',s:'⁴',lbl:'⁴',p:[],lvl:1},{k:'np5',s:'⁵',lbl:'⁵',p:[],lvl:1},
      {k:'np6',s:'⁶',lbl:'⁶',p:[],lvl:1},{k:'np7',s:'⁷',lbl:'⁷',p:[],lvl:1},{k:'np8',s:'⁸',lbl:'⁸',p:[],lvl:1},{k:'np9',s:'⁹',lbl:'⁹',p:[],lvl:1}
    ]}
  ]},
  'Operators & Relations':[
    {k:'plus',s:'+',lbl:'+',p:[],lvl:0},{k:'minus',s:'−',lbl:'−',p:[],lvl:0},
    {k:'times',s:'×',lbl:'×',p:[],lvl:0},{k:'div',s:'÷',lbl:'÷',p:[],lvl:0},
    {k:'eq',s:'=',lbl:'=',p:[],lvl:0},{k:'ne',s:'≠',lbl:'≠',p:[],lvl:1},
    {k:'le',s:'≤',lbl:'≤',p:[],lvl:0},{k:'ge',s:'≥',lbl:'≥',p:[],lvl:0},
    {k:'pm',s:'±',lbl:'±',p:[],lvl:1},
    {k:'cdot',s:'·',lbl:'·',p:[],lvl:1},{k:'ap',s:'≈',lbl:'≈',p:[],lvl:1},
    {k:'inf',s:'∞',lbl:'∞',p:[],lvl:2},
    {k:'sum',s:'∑',lbl:'Sum',p:['DisplayOperatorMinHeight','UpperLimitGapMin','LowerLimitGapMin'],lvl:2},
    {k:'prod',s:'∏',lbl:'Product',p:['DisplayOperatorMinHeight'],lvl:3},
    {k:'int',s:'∫',lbl:'Integral',p:['DisplayOperatorMinHeight'],lvl:3},
    {k:'iint',s:'∬',lbl:'∬',p:[],lvl:3},
    {k:'lim',s:'lim',lbl:'Limit',p:['LowerLimitGapMin','UpperLimitGapMin'],lvl:3},
    {k:'pt',s:'∂',lbl:'∂',p:[],lvl:3},{k:'nab',s:'∇',lbl:'∇',p:[],lvl:3},
    {k:'in',s:'∈',lbl:'∈',p:[],lvl:2},{k:'sub',s:'⊂',lbl:'⊂',p:[],lvl:2},
    {k:'arr',s:'→',lbl:'→',p:[],lvl:2},{k:'ar',s:'⇒',lbl:'⇒',p:[],lvl:2},{k:'iff',s:'⟺',lbl:'⟺',p:[],lvl:3},
    {k:'and',s:'∧',lbl:'∧',p:[],lvl:3},{k:'or',s:'∨',lbl:'∨',p:[],lvl:3},{k:'not',s:'¬',lbl:'¬',p:[],lvl:3},
  ],
  'Greek':{_sg:[
    {id:'gl',lbl:'Lowercase',def:true,keys:[
      {k:'al',s:'α',lbl:'alpha',p:[],lvl:2},{k:'be',s:'β',lbl:'beta',p:[],lvl:2},{k:'ga',s:'γ',lbl:'gamma',p:[],lvl:2},
      {k:'de',s:'δ',lbl:'delta',p:[],lvl:2},{k:'ep',s:'ε',lbl:'epsilon',p:[],lvl:2},{k:'ze',s:'ζ',lbl:'zeta',p:[],lvl:3},
      {k:'et',s:'η',lbl:'eta',p:[],lvl:3},{k:'th',s:'θ',lbl:'theta',p:[],lvl:2},{k:'io',s:'ι',lbl:'iota',p:[],lvl:3},
      {k:'ka',s:'κ',lbl:'kappa',p:[],lvl:3},{k:'la',s:'λ',lbl:'lambda',p:[],lvl:2},{k:'mu',s:'μ',lbl:'mu',p:[],lvl:2},
      {k:'nu',s:'ν',lbl:'nu',p:[],lvl:3},{k:'xi',s:'ξ',lbl:'xi',p:[],lvl:3},{k:'pi',s:'π',lbl:'pi',p:[],lvl:1},
      {k:'rh',s:'ρ',lbl:'rho',p:[],lvl:3},{k:'si',s:'σ',lbl:'sigma',p:[],lvl:2},{k:'ta',s:'τ',lbl:'tau',p:[],lvl:3},
      {k:'up',s:'υ',lbl:'upsilon',p:[],lvl:3},{k:'ph',s:'φ',lbl:'phi',p:[],lvl:3},{k:'ch',s:'χ',lbl:'chi',p:[],lvl:3},
      {k:'ps',s:'ψ',lbl:'psi',p:[],lvl:3},{k:'om',s:'ω',lbl:'omega',p:[],lvl:2},
    ]},
    {id:'gu',lbl:'Uppercase',keys:[
      // Complete uppercase Greek alphabet (24 letters)
      {k:'AL',s:'Α',lbl:'Alpha',p:[],lvl:2},{k:'BE',s:'Β',lbl:'Beta',p:[],lvl:2},
      {k:'GA',s:'Γ',lbl:'Gamma',p:[],lvl:2},{k:'DE',s:'Δ',lbl:'Delta',p:[],lvl:2},
      {k:'EP2',s:'Ε',lbl:'Epsilon',p:[],lvl:2},{k:'ZE',s:'Ζ',lbl:'Zeta',p:[],lvl:3},
      {k:'ET',s:'Η',lbl:'Eta',p:[],lvl:3},{k:'TH',s:'Θ',lbl:'Theta',p:[],lvl:2},
      {k:'IO',s:'Ι',lbl:'Iota',p:[],lvl:3},{k:'KA',s:'Κ',lbl:'Kappa',p:[],lvl:3},
      {k:'LA',s:'Λ',lbl:'Lambda',p:[],lvl:2},{k:'MU',s:'Μ',lbl:'Mu',p:[],lvl:2},
      {k:'NU',s:'Ν',lbl:'Nu',p:[],lvl:3},{k:'XI',s:'Ξ',lbl:'Xi',p:[],lvl:3},
      {k:'OM2',s:'Ο',lbl:'Omicron',p:[],lvl:3},{k:'PI',s:'Π',lbl:'Pi',p:['DisplayOperatorMinHeight'],lvl:2},
      {k:'RH',s:'Ρ',lbl:'Rho',p:[],lvl:3},{k:'SI',s:'Σ',lbl:'Sigma',p:['DisplayOperatorMinHeight'],lvl:2},
      {k:'TA',s:'Τ',lbl:'Tau',p:[],lvl:3},{k:'UP',s:'Υ',lbl:'Upsilon',p:[],lvl:3},
      {k:'PH',s:'Φ',lbl:'Phi',p:[],lvl:3},{k:'CH',s:'Χ',lbl:'Chi',p:[],lvl:3},
      {k:'PS',s:'Ψ',lbl:'Psi',p:[],lvl:3},{k:'OM',s:'Ω',lbl:'Omega',p:[],lvl:2},
    ]}
  ]},
  'Structures':[
    {k:'frac',s:'a/b',lbl:'Fraction',str:true,p:['FractionRuleThickness','FractionNumeratorShiftUp','FractionDenominatorShiftDown'],lvl:1},
    {k:'sfrac',s:'a/b',lbl:'Oblique',str:true,obl:true,p:['SkewedFractionHorizontalGap'],lvl:2},
    {k:'sqrt',s:'√',lbl:'Radical',str:true,p:['RadicalRuleThickness','RadicalVerticalGap','RadicalExtraAscender'],lvl:1},
    {k:'cbrt',s:'∛',lbl:'Radical³',str:true,deg:3,p:['RadicalDegreeBottomRaisePercent'],lvl:2},
    {k:'paren',s:'( )',lbl:'( )',str:true,open:'(',close:')',p:['MinConnectorOverlap'],lvl:0},
    {k:'brack',s:'[ ]',lbl:'[ ]',str:true,open:'[',close:']',p:['MinConnectorOverlap'],lvl:1},
    {k:'brace',s:'{ }',lbl:'{ }',str:true,open:'{',close:'}',p:['MinConnectorOverlap'],lvl:2},
    {k:'abs',s:'| |',lbl:'| |',str:true,open:'|',close:'|',p:['MinConnectorOverlap'],lvl:2},
    {k:'norm',s:'‖‖',lbl:'‖ ‖',str:true,open:'‖',close:'‖',p:['MinConnectorOverlap'],lvl:3},
    {k:'floor',s:'⌊⌋',lbl:'⌊ ⌋',str:true,open:'⌊',close:'⌋',p:['MinConnectorOverlap'],lvl:3},
    {k:'ceil',s:'⌈⌉',lbl:'⌈ ⌉',str:true,open:'⌈',close:'⌉',p:['MinConnectorOverlap'],lvl:3},
  ],
  'Sets & Variables':[
    {k:'mix',s:'𝑥',lbl:'𝑥 (x)',p:[],lvl:0},{k:'miy',s:'𝑦',lbl:'𝑦 (y)',p:[],lvl:0},{k:'miz',s:'𝑧',lbl:'𝑧 (z)',p:[],lvl:1},
    {k:'min',s:'𝑛',lbl:'𝑛 (n)',p:[],lvl:1},{k:'mim',s:'𝑚',lbl:'𝑚 (m)',p:[],lvl:1},{k:'mik',s:'𝑘',lbl:'𝑘 (k)',p:[],lvl:1},
    {k:'mii',s:'𝑖',lbl:'𝑖 (i)',p:[],lvl:1},{k:'mij',s:'𝑗',lbl:'𝑗 (j)',p:[],lvl:1},{k:'mia',s:'𝑎',lbl:'𝑎 (a)',p:[],lvl:0},
    {k:'mib',s:'𝑏',lbl:'𝑏 (b)',p:[],lvl:0},{k:'mic',s:'𝑐',lbl:'𝑐 (c)',p:[],lvl:1},{k:'mid',s:'𝑑',lbl:'𝑑 (d)',p:[],lvl:1},
    {k:'mif',s:'𝑓',lbl:'𝑓 (f)',p:[],lvl:1},{k:'mig',s:'𝑔',lbl:'𝑔 (g)',p:[],lvl:1},{k:'mit',s:'𝑡',lbl:'𝑡 (t)',p:[],lvl:1},
    {k:'NN',s:'ℕ',lbl:'ℕ',p:[],lvl:2},{k:'ZZ',s:'ℤ',lbl:'ℤ',p:[],lvl:2},{k:'QQ',s:'ℚ',lbl:'ℚ',p:[],lvl:2},
    {k:'RR',s:'ℝ',lbl:'ℝ',p:[],lvl:2},{k:'CC',s:'ℂ',lbl:'ℂ',p:[],lvl:3},{k:'emp',s:'∅',lbl:'∅',p:[],lvl:2},
    {k:'uni',s:'∪',lbl:'∪',p:[],lvl:2},{k:'isec',s:'∩',lbl:'∩',p:[],lvl:2},
    {k:'fa',s:'∀',lbl:'∀',p:[],lvl:3},{k:'ex',s:'∃',lbl:'∃',p:[],lvl:3},
  ],
};


/* === css-gen.js === */

'use strict';
function genCSS(){
  const pw=getPW(),ph=getPH(),m=getMargins(),bleed=getBleed();
  const pt=getBodyPt(),lh=getLH(),font=getDocFont();
  const indMm=getIndentMm(),indMode=getIndentMode();
  const pnOn=hasPNum(),pnPos=getPNPos(),pnSty=getPNStyle(),pnPre=getPNPrefix(),pnSt=getPNStart();
  const crop=hasCropMarks(),cross=hasCrossMarks();
  const marks=[crop?'crop':'',cross?'cross':''].filter(Boolean).join(' ');
  const cSt=PN_CTR_STYLE[pnSty]||'decimal';
  const pnBox=PN_POS_MAP[pnPos]||'@bottom-center';
  const indCSS={none:'',first:`  text-indent: ${indMm}mm;\n`,
    hanging:`  padding-left: ${indMm}mm;\n  text-indent: -${indMm}mm;\n`,
    all:`  padding-left: ${indMm}mm;\n`}[indMode]||'';
  let css=`@page {\n  size: ${pw}mm ${ph}mm;\n  margin: ${m.t}mm ${m.r}mm ${m.b}mm ${m.l}mm;`;
  if(bleed>0)css+=`\n  bleed: ${bleed}mm;`;
  if(marks)css+=`\n  marks: ${marks};`;
  if(pnOn)css+=`\n\n  ${pnBox} {\n    content: "${pnPre}" counter(page, ${cSt});\n    font-size: 9pt;\n    font-family: ${font};\n    color: #555;\n  }`;
  if(pnSt>1)css+=`\n\n  counter-reset: page ${pnSt-1};`;
  css+=`\n}\n\nbody {\n  font-family: ${font};\n  font-size: ${pt}pt;\n  line-height: ${lh};\n  color: #111;\n}\n\n`;
  css+=`p {\n${indCSS}  margin-bottom: .5em;\n}\n\n`;
  css+=`h1 { font-size: ${Math.round(pt*1.9)}pt; font-weight: 700; margin-bottom: .5em; }\n`;
  css+=`h2 { font-size: ${Math.round(pt*1.3)}pt; font-weight: 600; margin: .8em 0 .3em; }\n`;
  css+=`.formula-block { text-align: center; margin: .8em 0; }`;
  const out=g('css-out');if(out)out.value=css;return css;
}


/* === doc-blocks.js === */

'use strict';
function addBlock(type,afterId){
  const id=uid();
  const b={id,type,text:'',stTop:0,stBot:4,indent:0};
  if(type==='title'){b.stBot=5;}
  else if(type==='h2'){b.stTop=3;b.stBot=2;}
  else if(type==='formula'){Object.assign(b,{elements:[],fontSize:24,align:'c',font:MFONT,fvs:'',floating:false,fx:80,fy:80});}
  if(afterId){const idx=docBlocks.findIndex(x=>x.id===afterId);if(idx>=0){docBlocks.splice(idx+1,0,b);}else docBlocks.push(b);}
  else docBlocks.push(b);
  docSnap();renderDocList();renderDocPage();selDocBlock(b.id);
  if(type!=='formula'){
    setTimeout(()=>{const el=g('e-'+b.id);if(el){el.focus();try{const r=document.createRange();r.selectNodeContents(el);r.collapse(false);const s=window.getSelection();s.removeAllRanges();s.addRange(r);}catch(_){}}},60);
  }
}
function delDocBlock(id){
  docBlocks=docBlocks.filter(b=>b.id!==id);
  if(docSelId===id){docSelId=null;updDocBlInsp();}
  renderDocList();renderDocPage();
}
function mvDocBlock(id,dir){
  const i=docBlocks.findIndex(b=>b.id===id);const j=i+dir;
  if(j<0||j>=docBlocks.length)return;
  [docBlocks[i],docBlocks[j]]=[docBlocks[j],docBlocks[i]];
  docSnap();renderDocList();renderDocPage();
}

function selDocBlock(id){
  docSelId=id;
  document.querySelectorAll('.bl-item').forEach(r=>r.classList.toggle('sel',r.dataset.id===id));
  document.querySelectorAll('.doc-pb').forEach(p=>p.classList.toggle('sel-pb',p.dataset.id===id));
  document.querySelectorAll('.disp-row').forEach(r=>r.classList.toggle('sel',r.dataset.id===id));
  updDocBlInsp();
  if(g('doc-pb-display')&&!g('doc-pb-display').classList.contains('hidden-pb'))_renderDocDisplayList();
}

function renderDocList(){
  const list=g('bl-list');if(!list)return;list.innerHTML='';
  docBlocks.forEach(b=>{
    const row=document.createElement('div');row.className='bl-item'+(docSelId===b.id?' sel':'');row.dataset.id=b.id;
    row.onclick=()=>{selDocBlock(b.id);propTab('bloc');};
    const icon=document.createElement('div');icon.className='bl-icon';
    icon.style.background=BLOCK_BG[b.type]||'#eee';icon.style.color=BLOCK_CLR[b.type]||'#aaa';
    icon.textContent=BLOCK_ICON[b.type]||'?';
    const info=document.createElement('div');info.className='bl-info';
    const tp=document.createElement('div');tp.className='bl-tp';tp.textContent=t('block-type-'+b.type)||b.type;
    const pv=document.createElement('div');pv.className='bl-pv';pv.textContent=(b.text||(b.type==='formula'?t('block-preview-formula'):b.type==='canvas-textbox'?'T…':'…')).slice(0,28);
    info.append(tp,pv);
    const acts=document.createElement('div');acts.className='bl-acts';
    const mkA=(label,fn)=>{const bt=document.createElement('button');bt.className='bl-a';bt.textContent=label;bt.onclick=ev=>{ev.stopPropagation();fn();};return bt;};
    acts.append(mkA('↑',()=>mvDocBlock(b.id,-1)),mkA('↓',()=>mvDocBlock(b.id,1)),mkA('×',()=>{docSnap();delDocBlock(b.id);}));
    row.append(icon,info,acts);list.appendChild(row);
  });
  const st=g('st-info');if(st&&appMode==='doc')st.textContent=docBlocks.length+(_lang==='fr'?' bloc(s)':' block(s)');
}


/* === doc-inspector.js === */

'use strict';
function applyPreset(v){g('custom-row')?.classList.toggle('hidden-pb',v!=='custom');docUpdate();}
function onMg(val){if(gvc('linked')){['mt','ml','mr','mb'].forEach(id=>{const el=g(id);if(el)el.value=val;});}docUpdate();}
function docUpdate(){renderDocPage();genCSS();updateDocStatus();}
function updateDocStatus(){
  const el=g('st-info');
  if(el&&appMode==='doc')el.textContent=`${getPW()}×${getPH()}mm · ${gvs('preset')} · ${gvs('orient')==='p'?'Portrait':'Paysage'}`;
}

function propTab(t){
  ['page','bloc','imp'].forEach(id=>{
    g('pt-'+id)?.classList.toggle('on',id===t);
    g('pb-'+id)?.classList.toggle('hidden-pb',id!==t);
  });
  if(t==='imp')genCSS();
}

function updDocBlInsp(){
  const b=docBlocks.find(b=>b.id===docSelId);
  g('no-sel').style.display=b?'none':'block';
  g('bloc-p').style.display=b?'block':'none';
  if(!b)return;
  g('bl-mt').value=b.stTop||0;g('bl-mb').value=b.stBot||4;g('bl-ind').value=b.indent||0;
  const _showFSec=b.type==='formula'||b.type==='canvas-textbox'||b.type==='eq-snapshot';
  g('doc-formula-sec').style.display=_showFSec?'block':'none';
  if(_showFSec){
    g('df-sz').value=b.fontSize||24;g('df-al').value=b.align||'c';
    g('df-float').checked=!!b.floating;
  }
}
function updBlSpc(){
  const b=docBlocks.find(b=>b.id===docSelId);if(!b)return;
  b.stTop=gv('bl-mt');b.stBot=gv('bl-mb');b.indent=gv('bl-ind');
  renderDocPage();
}
function updDocFormula(prop,val){
  const b=docBlocks.find(b=>b.id===docSelId);
  if(!b||!(b.type==='formula'||b.type==='eq-snapshot'))return;
  if(prop==='sz'){
    if(b.type==='eq-snapshot'){
      // fontSize is a uniform scale factor for eq-snapshot (1 = original)
      b.fontSize=Math.max(0.25,Math.min(4,val));
    } else {
      b.fontSize=val;b.elements?.forEach(e=>e.size=val);
    }
  }
  if(prop==='al')b.align=val;
  if(prop==='float'){b.floating=val;if(!val){b.fx=80;b.fy=80;}}
  renderDocPage();
}


/* === doc-render.js === */

'use strict';
function renderDocPage(){
  const wrap=g('zoom-wrap');if(!wrap)return;wrap.innerHTML='';
  const pw=getPW(),ph=getPH(),m=getMargins(),bleed=getBleed();
  const cropOn=hasCropMarks();
  const pxW=pw*MM,pxH=ph*MM;const blPx=bleed*MM;
  const mt=m.t*MM,mr=m.r*MM,mb=m.b*MM,ml=m.l*MM;const cW=pxW-ml-mr;
  const bodyPx=getBodyPt()*1.333,lh=getLH(),font=getDocFont();
  const indMm=getIndentMm(),indMode=getIndentMode();
  const pnOn=hasPNum(),pnPos=getPNPos(),pnSty=getPNStyle(),pnPre=getPNPrefix(),pnSt=getPNStart();

  const page=document.createElement('div');page.className='doc-page';
  page.style.cssText=`width:${pxW}px;height:${pxH}px;margin:${blPx+24}px ${blPx+28}px`;

  // Overlay
  const ov=document.createElement('div');ov.className='page-overlay';
  if(showBl&&bleed>0){const bd=document.createElement('div');bd.className='bleed-rect';bd.style.cssText=`left:${-blPx}px;top:${-blPx}px;width:${pxW+blPx*2}px;height:${pxH+blPx*2}px`;ov.appendChild(bd);}
  if(showMg){const mv=document.createElement('div');mv.className='margin-rect';mv.style.cssText=`left:${ml}px;top:${mt}px;width:${cW}px;height:${pxH-mt-mb}px`;ov.appendChild(mv);}
  if(cropOn&&bleed>0){
    const CL=10,CG=2;
    const ln=(x,y,w,h)=>{const l=document.createElement('div');l.className='crop-line';l.style.cssText=`left:${x}px;top:${y}px;width:${w}px;height:${h}px`;ov.appendChild(l);};
    [[-blPx-CG-CL,-blPx,CL,.5],[-blPx,-blPx-CG-CL,.5,CL],[pxW+blPx+CG,-blPx,CL,.5],[pxW+blPx,-blPx-CG-CL,.5,CL],
     [-blPx-CG-CL,pxH+blPx,CL,.5],[-blPx,pxH+blPx+CG,.5,CL],[pxW+blPx+CG,pxH+blPx,CL,.5],[pxW+blPx,pxH+blPx+CG,.5,CL]
    ].forEach(([x,y,w,h])=>ln(x,y,w,h));
  }
  page.appendChild(ov);

  // Contenu
  const cv=document.createElement('div');
  cv.style.cssText=`position:absolute;left:${ml}px;top:${mt}px;width:${cW}px;font-family:${font};font-size:${bodyPx}px;line-height:${lh}`;

  docBlocks.forEach(b=>{
    if(b.floating){
      if(b.type==='canvas-textbox')   renderFloatingTextBox(b,page);
      else if(b.type==='eq-snapshot') renderFloatingEqSnapshot(b,page);
      else                            renderFloatingFormula(b,page);
      return;
    }
    const bd=document.createElement('div');
    bd.className='doc-pb'+(docSelId===b.id?' sel-pb':'');bd.dataset.id=b.id;
    bd.style.marginTop=(b.stTop||0)*MM+'px';bd.style.marginBottom=(b.stBot||4)*MM+'px';bd.style.paddingLeft=(b.indent||0)*MM+'px';
    bd.onclick=ev=>{ev.stopPropagation();selDocBlock(b.id);propTab('bloc');};

    if(b.type==='title'||b.type==='h2'||b.type==='text'){
      const el=document.createElement('div');el.id='e-'+b.id;el.contentEditable='true';el.className='doc-editable';
      el.dataset.ph=b.type==='title'?'Titre…':b.type==='h2'?'Sous-titre…':'Écrire… $ pour formule';
      let fsz=bodyPx,fw='normal',flh=lh;
      if(b.type==='title'){fsz=bodyPx*1.9;fw='700';flh=1.25;}
      if(b.type==='h2'){fsz=bodyPx*1.3;fw='600';flh=1.35;}
      el.style.cssText=`font-size:${fsz}px;font-weight:${fw};line-height:${flh};font-family:${font}`;
      if(b.type==='text'){
        if(indMode==='first')el.style.textIndent=indMm*MM+'px';
        else if(indMode==='hanging'){el.style.paddingLeft=indMm*MM+'px';el.style.textIndent='-'+indMm*MM+'px';}
        else if(indMode==='all')el.style.paddingLeft=indMm*MM+'px';
      }
      el.textContent=b.text||'';
      el.oninput=()=>b.text=el.textContent;
      el.onfocus=()=>{selDocBlock(b.id);propTab('bloc');};
      el.onblur=()=>docSnap();
      el.onkeydown=ev=>{
        if(ev.key==='Enter'&&!ev.shiftKey){ev.preventDefault();addBlock('text',b.id);}
        if(ev.key==='$'&&b.type==='text'){ev.preventDefault();addBlock('formula',b.id);}
      };
      bd.appendChild(el);
    } else if(b.type==='formula'){
      const fw=document.createElement('div');
      fw.className='fw f'+(b.align||'c');fw.style.padding='6px 0';
      fw.ondragover=ev=>{ev.preventDefault();ev.stopPropagation();fw.style.background='rgba(29,158,117,.07)';};
      fw.ondragleave=()=>fw.style.background='';
      fw.ondrop=ev=>{
        ev.preventDefault();ev.stopPropagation();fw.style.background='';
        if(!dragKey)return;
        if(!b.elements)b.elements=[];
        b.elements.push({id:uid(),node:mkNode(dragKey),size:b.fontSize||24,font:b.font||MFONT,fvs:b.fvs||''});
        dragKey=null;if(ghost){ghost.remove();ghost=null;}
        docSnap();renderDocPage();
      };
      if(b.elements&&b.elements.length){
        b.elements.forEach(fel=>{
          const fw2=document.createElement('span');fw2.style.position='relative';fw2.style.display='inline-flex';fw2.style.alignItems='center';
          const del=document.createElement('span');del.className='f-el-del';del.textContent='×';
          del.onclick=ev=>{ev.stopPropagation();b.elements=b.elements.filter(e=>e.id!==fel.id);docSnap();renderDocPage();};
          fw2.append(del,bNode(fel.node,fel.size||b.fontSize||22,fel.font||b.font||MFONT,fel.fvs||b.fvs||''));
          fw.appendChild(fw2);
        });
      } else {
        const ph=document.createElement('span');ph.style.cssText=`font-size:${b.fontSize||22}px;font-family:${MFONT};color:rgba(29,158,117,.4)`;
        ph.textContent='∑ glissez des symboles';fw.appendChild(ph);
      }
      bd.appendChild(fw);
    } else if(b.type==='canvas-textbox'){
      // ── Inline text box with full editing support ──────────────────────
      const ctb=document.createElement('div');
      ctb.className='doc-canvas-tb';
      ctb.contentEditable='true';
      ctb.spellcheck=false;
      ctb.dataset.id=b.id;
      ctb.dataset.ph='Type here…';
      ctb.style.cssText=
        `min-width:${b.w||120}px;min-height:${b.h||28}px;`+
        `font-size:${b.fontSize||14}px;`+
        `font-family:${b.font||MFONT};`+
        `color:${b.textColor||'#000000'};`+
        `opacity:${(b.opacity??100)/100};`+
        `white-space:pre-wrap;word-break:break-word;line-height:1.5;`+
        `padding:3px 5px;border-radius:2px;outline:none;display:block;`;
      if(b.fvs) ctb.style.fontVariationSettings=b.fvs;
      if(b.text) ctb.textContent=b.text;
      ctb.addEventListener('input',()=>{
        b.text=ctb.textContent;
        clearTimeout(ctb._st);ctb._st=setTimeout(()=>docSnap(),600);
      });
      ctb.addEventListener('focus',()=>{selDocBlock(b.id);propTab('bloc');});
      ctb.addEventListener('blur',()=>docSnap());
      ctb.addEventListener('keydown',ev=>{
        if(ev.key==='Escape') ctb.blur();
        ev.stopPropagation();
      });
      bd.appendChild(ctb);
    } else if(b.type==='eq-snapshot'){
      bd.appendChild(_renderEqSnapshot(b));
    }

    // Contrôles flottants
    const acts=document.createElement('div');acts.className='doc-pb-acts';
    const mkA=(l,fn)=>{const bt=document.createElement('button');bt.className='doc-pb-act';bt.textContent=l;bt.onclick=ev=>{ev.stopPropagation();fn();};return bt;};
    acts.append(mkA('↑',()=>mvDocBlock(b.id,-1)),mkA('↓',()=>mvDocBlock(b.id,1)),mkA('×',()=>{docSnap();delDocBlock(b.id);}));
    bd.appendChild(acts);cv.appendChild(bd);
  });

  page.appendChild(cv);

  // Numéro de page
  if(pnOn){
    const pnEl=document.createElement('div');pnEl.className='pnum';
    const stMap={arabic:String(pnSt),roman:toRoman(pnSt),alpha:toAlpha(pnSt)};
    pnEl.textContent=pnPre+(stMap[pnSty]||pnSt);pnEl.style.fontFamily=font;
    const pp={bc:`bottom:${mb*.4}px;left:50%;transform:translateX(-50%)`,br:`bottom:${mb*.4}px;right:${mr}px`,
      bl:`bottom:${mb*.4}px;left:${ml}px`,tc:`top:${mt*.4}px;left:50%;transform:translateX(-50%)`};
    pnEl.style.cssText+=(';'+(pp[pnPos]||pp.bc));page.appendChild(pnEl);
  }
  wrap.appendChild(page);
}

function renderFloatingFormula(b,page){
  const wrap=document.createElement('div');
  wrap.className='floating-formula'+(docSelId===b.id?' sel-pb':'');
  wrap.style.cssText=`left:${b.fx||80}px;top:${b.fy||80}px`;
  const badge=document.createElement('div');badge.className='float-badge';badge.textContent='flottante';
  const fw=document.createElement('div');fw.className='fw fc';
  if(b.elements&&b.elements.length){
    b.elements.forEach(fel=>fw.appendChild(bNode(fel.node,fel.size||b.fontSize||22,fel.font||MFONT,fel.fvs||'')));
  } else {
    const ph=document.createElement('span');ph.style.cssText=`font-size:${b.fontSize||22}px;font-family:${MFONT};color:rgba(29,158,117,.4)`;
    ph.textContent='∑';fw.appendChild(ph);
  }
  wrap.append(badge,fw);
  wrap.onclick=ev=>{ev.stopPropagation();selDocBlock(b.id);propTab('bloc');};
  // Drag-move sur la page avec snap de 8px
  let ox,oy,bx,by,dr=false;
  wrap.addEventListener('mousedown',ev=>{dr=true;ox=ev.clientX;oy=ev.clientY;bx=b.fx;by=b.fy;ev.preventDefault();});
  window.addEventListener('mousemove',ev=>{
    if(!dr)return;
    b.fx=Math.round((bx+ev.clientX-ox)/8)*8;b.fy=Math.round((by+ev.clientY-oy)/8)*8;
    wrap.style.left=b.fx+'px';wrap.style.top=b.fy+'px';
  });
  window.addEventListener('mouseup',()=>{if(dr){docSnap();}dr=false;});
  page.appendChild(wrap);
}


// ── Floating canvas-textbox: draggable, editable, positioned on page ────────
function renderFloatingTextBox(b,page){
  const outer=document.createElement('div');
  outer.className='floating-formula'+(docSelId===b.id?' sel-pb':'');
  outer.style.cssText=`left:${b.fx||80}px;top:${b.fy||80}px`;

  const badge=document.createElement('div');badge.className='float-badge';badge.textContent='textbox';

  const ctb=document.createElement('div');
  ctb.className='doc-canvas-tb';
  ctb.contentEditable='true';
  ctb.spellcheck=false;
  ctb.dataset.id=b.id;
  ctb.dataset.ph='Type here…';
  ctb.style.cssText=
    `min-width:${b.w||120}px;min-height:${b.h||28}px;`+
    `font-size:${b.fontSize||14}px;`+
    `font-family:${b.font||MFONT};`+
    `color:${b.textColor||'#000000'};`+
    `opacity:${(b.opacity??100)/100};`+
    `white-space:pre-wrap;word-break:break-word;line-height:1.5;`+
    `padding:3px 5px;border-radius:2px;outline:none;display:block;cursor:text;`;
  if(b.fvs) ctb.style.fontVariationSettings=b.fvs;
  if(b.text) ctb.textContent=b.text;
  ctb.addEventListener('input',()=>{
    b.text=ctb.textContent;
    clearTimeout(ctb._st);ctb._st=setTimeout(()=>docSnap(),600);
  });
  ctb.addEventListener('focus',()=>{selDocBlock(b.id);propTab('bloc');});
  ctb.addEventListener('blur',()=>docSnap());
  ctb.addEventListener('keydown',ev=>ev.stopPropagation());

  outer.append(badge,ctb);
  outer.onclick=ev=>{
    // Allow click-to-edit: only select block if not clicking inside text area
    if(ev.target!==ctb){ev.stopPropagation();selDocBlock(b.id);propTab('bloc');}
  };

  // Drag-move only via the badge (not the text area)
  let ox,oy,bx,by,dr=false;
  badge.style.cursor='move';
  badge.addEventListener('mousedown',ev=>{
    dr=true;ox=ev.clientX;oy=ev.clientY;bx=b.fx;by=b.fy;
    ev.preventDefault();ev.stopPropagation();
  });
  window.addEventListener('mousemove',ev=>{
    if(!dr)return;
    b.fx=Math.round((bx+ev.clientX-ox)/8)*8;
    b.fy=Math.round((by+ev.clientY-oy)/8)*8;
    outer.style.left=b.fx+'px';outer.style.top=b.fy+'px';
  });
  window.addEventListener('mouseup',()=>{if(dr){docSnap();}dr=false;});

  page.appendChild(outer);
}


// ── Eq-snapshot renderer — inline (in document flow) ──────────────────────
// Renders a saved equation using exact per-element _rx/_ry coordinates
// inside a positioned container, preserving all user-created geometry.
function _renderEqSnapshot(b){
  const scale = b.fontSize || 1; // fontSize is used as a uniform scale factor
  const w = Math.ceil((b.bboxW || 200) * scale);
  const h = Math.ceil((b.bboxH || 80)  * scale);
  const alignMap = {c:'center', l:'left', r:'right'};
  const outer = document.createElement('div');
  outer.style.cssText =
    `display:flex;justify-content:${alignMap[b.align||'c']||'center'};`+
    `padding:6px 0;width:100%`;

  const container = document.createElement('div');
  container.className = 'eq-snapshot-wrap';
  container.style.cssText =
    `position:relative;width:${w}px;height:${h}px;`+
    `display:inline-block;overflow:visible;flex-shrink:0`;

  (b.elements||[]).forEach(fel => {
    const x = Math.round((fel.rx ?? 0) * scale);
    const y = Math.round((fel.ry ?? 0) * scale);
    const sz = Math.round((fel.size || 22) * scale);
    const op = (fel.opacity ?? 100) / 100;

    const slot = document.createElement('div');
    slot.style.cssText =
      `position:absolute;left:${x}px;top:${y}px;`+
      `opacity:${op};pointer-events:none`;

    if(fel.type === 'textbox'){
      const tw = Math.round((fel.w || 100) * scale);
      const th = Math.round((fel.h || 40)  * scale);
      const tb = document.createElement('div');
      tb.style.cssText =
        `width:${tw}px;min-height:${th}px;`+
        `font-size:${sz}px;font-family:${fel.font||MFONT};`+
        `color:${fel.color||'#000'};`+
        `white-space:pre-wrap;word-break:break-word;line-height:1.5;`+
        `box-sizing:border-box`;
      if(fel.fvs) tb.style.fontVariationSettings = fel.fvs;
      tb.textContent = fel.text || '';
      slot.appendChild(tb);
    } else if(fel.node){
      const n = bNode(fel.node, sz, fel.font||MFONT, fel.fvs||'');
      n.style.color = fel.color || '#000';
      slot.appendChild(n);
    }
    container.appendChild(slot);
  });

  outer.appendChild(container);
  return outer;
}

// ── Eq-snapshot floating renderer ──────────────────────────────────────────
function renderFloatingEqSnapshot(b, page){
  const outer = document.createElement('div');
  outer.className = 'floating-formula'+(docSelId===b.id?' sel-pb':'');
  outer.style.cssText = `left:${b.fx||80}px;top:${b.fy||80}px`;

  const badge = document.createElement('div');
  badge.className = 'float-badge';
  badge.textContent = b.name || 'eq';

  const snap = _renderEqSnapshot(b);
  snap.style.cssText = 'pointer-events:none'; // inner is read-only when floating

  outer.append(badge, snap);
  outer.onclick = ev => { ev.stopPropagation(); selDocBlock(b.id); propTab('bloc'); };

  let ox, oy, bx, by, dr = false;
  outer.addEventListener('mousedown', ev => {
    dr=true; ox=ev.clientX; oy=ev.clientY; bx=b.fx; by=b.fy; ev.preventDefault();
  });
  window.addEventListener('mousemove', ev => {
    if(!dr)return;
    b.fx=Math.round((bx+ev.clientX-ox)/8)*8;
    b.fy=Math.round((by+ev.clientY-oy)/8)*8;
    outer.style.left=b.fx+'px'; outer.style.top=b.fy+'px';
  });
  window.addEventListener('mouseup', () => { if(dr){ docSnap(); } dr=false; });

  page.appendChild(outer);
}



/* === equations.js === */

'use strict';
let _equations = [];
function _loadEq(){try{const r=localStorage.getItem('limou-eq');if(r)_equations=JSON.parse(r);}catch(_){_equations=[];}}
function _saveEq(){try{localStorage.setItem('limou-eq',JSON.stringify(_equations));}catch(_){}}

// ── Save current selection (or whole canvas if nothing selected) ──────────────
function saveEquation(){
  if(!_guestOK('equations'))return;
  const toSave = feSelIds.size
    ? feEls.filter(e => feSelIds.has(e.id))
    : feEls;
  if(!toSave.length){toast(t('canvas-empty'));return;}

  const name = prompt(t('eq-name-prompt'), t('eq-name-default') + ' ' + (_equations.length + 1));
  if(!name) return;

  const minX = Math.min(...toSave.map(e => e.x));
  const minY = Math.min(...toSave.map(e => e.y));
  const maxX = Math.max(...toSave.map(e => e.x));
  const maxY = Math.max(...toSave.map(e => e.y));

  const elements = JSON.parse(JSON.stringify(toSave)).map(e => {
    // Resolve layer typography at save time so the equation is self-contained.
    // If the layer is later deleted/renamed/refonted, the saved equation still
    // renders exactly as it looked when the user clicked Save.
    const layer = layerById(e.layerId);
    const resolved = {
      _savedLayerFont:  layer.font      || MFONT,
      _savedLayerFvs:   layer.fvs       || '',
      _savedLayerColor: layer.textColor || '#000000',
    };
    return { ...e, _rx: e.x - minX, _ry: e.y - minY, ...resolved };
  });

  _equations.push({
    id: 'eq_' + Date.now(),
    name,
    elements,
    bboxW: maxX - minX + 120,
    bboxH: maxY - minY + 80,
  });
  _saveEq();
  renderEquations();
  toast(t('eq-saved') + ' "' + name + '"');
}

// ── Render equation list with live previews ───────────────────────────────────
function renderEquations(){
  const list = g('equations-list'); if(!list) return;
  list.innerHTML = '';

  if(!_equations.length){
    list.innerHTML = '<div class="empty-msg" style="padding:6px">' + t('no-equations') + '</div>';
    return;
  }

  _equations.forEach(eq => {
    const card = document.createElement('div');
    card.className = 'eq-card';

    // Header: name + actions
    const head = document.createElement('div');
    head.className = 'eq-card-head';

    const nm = document.createElement('span');
    nm.className = 'eq-card-name';
    nm.contentEditable = 'true';
    nm.spellcheck = false;
    nm.textContent = eq.name;
    nm.onkeydown = ev => { if(ev.key==='Enter'){ev.preventDefault();nm.blur();} ev.stopPropagation(); };
    nm.onblur = () => { eq.name = nm.textContent.trim() || eq.name; _saveEq(); };
    nm.onclick = ev => ev.stopPropagation();

    const acts = document.createElement('div');
    acts.className = 'eq-card-acts';

    const insBtn = document.createElement('span');
    insBtn.className = 'l-ico';
    insBtn.textContent = '↩';
    insBtn.title = t('eq-insert-title');
    insBtn.onclick = ev => { ev.stopPropagation(); _insertEqCenter(eq.id); };

    const svgBtn = document.createElement('span');
    svgBtn.className = 'l-ico eq-svg-btn';
    svgBtn.textContent = 'SVG';
    svgBtn.title = t('eq-svg-title');
    svgBtn.dataset.guest = 'export';
    svgBtn.onclick = ev => { ev.stopPropagation(); exportEqSVG(eq.id); };

    const delBtn = document.createElement('span');
    delBtn.className = 'l-ico';
    delBtn.textContent = '×';
    delBtn.title = t('eq-delete-title');
    delBtn.onclick = ev => {
      ev.stopPropagation();
      _equations = _equations.filter(e => e.id !== eq.id);
      _saveEq(); renderEquations();
    };

    acts.append(insBtn, svgBtn, delBtn);
    head.append(nm, acts);

    // Preview
    const previewWrap = document.createElement('div');
    previewWrap.className = 'eq-preview';
    previewWrap.title = t('eq-drag-hint');
    _buildEqPreview(previewWrap, eq);

    // Drag preview to canvas
    previewWrap.draggable = true;
    previewWrap.addEventListener('dragstart', ev => {
      ev.dataTransfer.effectAllowed = 'copy';
      ev.dataTransfer.setData('text/plain', eq.id);
      _eqDragId = eq.id;
      ev.dataTransfer.setDragImage(previewWrap, previewWrap.offsetWidth / 2, previewWrap.offsetHeight / 2);
    });
    previewWrap.addEventListener('dragend', () => { _eqDragId = null; });
    previewWrap.addEventListener('click', () => _insertEqCenter(eq.id));

    const badge = document.createElement('div');
    badge.className = 'eq-count-badge';
    badge.textContent = eq.elements.length + ' ' + t('eq-elements-lbl');

    card.append(head, previewWrap, badge);
    list.appendChild(card);
  });
}

// ── Build scaled-down live DOM preview ────────────────────────────────────────
function _buildEqPreview(container, eq){
  container.innerHTML = '';
  const PREV_W = 210, PREV_H = 60;
  const bw = eq.bboxW || 200, bh = eq.bboxH || 80;
  const scale = Math.min(PREV_W / bw, PREV_H / bh, 1);

  const inner = document.createElement('div');
  inner.style.cssText = `position:relative;width:${Math.round(bw*scale)}px;height:${Math.round(bh*scale)}px;margin:auto;pointer-events:none`;

  eq.elements.forEach(rd => {
    const layer = layerById(rd.layerId);
    const wrap = document.createElement('div');
    wrap.style.cssText = `position:absolute;left:${Math.round((rd._rx??rd.x)*scale)}px;top:${Math.round((rd._ry??rd.y)*scale)}px;pointer-events:none`;

    if(rd.type === 'textbox'){
      // Render textbox as a scaled-down plain text preview
      const scaledSz = Math.max(6, Math.round((rd.fontSize||14) * scale));
      const scaledW  = Math.round((rd.w||100) * scale);
      const scaledH  = Math.round((rd.h||40) * scale);
      const prev = document.createElement('div');
      prev.style.cssText =
        `width:${scaledW}px;height:${scaledH}px;`+
        `font-size:${scaledSz}px;font-family:${rd.font||MFONT};`+
        `color:${rd.textColor||'#000'};opacity:${(rd.opacity??100)/100};`+
        `overflow:hidden;border:1px dashed rgba(0,0,0,.2);border-radius:1px;`+
        `padding:1px 2px;box-sizing:border-box;line-height:1.4;white-space:pre-wrap;word-break:break-word`;
      if(rd.fvs) prev.style.fontVariationSettings = rd.fvs;
      prev.textContent = rd.text || '';
      wrap.appendChild(prev);
    } else {
      const mei = document.createElement('div');
      const scaledSz = Math.max(8, Math.round(rd.size * scale));
      mei.style.cssText = `font-size:${scaledSz}px;font-family:${layer.font||MFONT};color:${layer.textColor||'#000'};opacity:${rd.opacity/100}`;
      if(layer.fvs) mei.style.fontVariationSettings = layer.fvs;
      mei.appendChild(bNode(rd.node, scaledSz, layer.font || MFONT, layer.fvs || ''));
      wrap.appendChild(mei);
    }

    inner.appendChild(wrap);
  });

  container.appendChild(inner);
}

// ── Drag-from-panel state ─────────────────────────────────────────────────────
let _eqDragId = null;

// Called from onFEDrop when an eq drag is detected
function onEqDrop(canvasX, canvasY){
  const eq = _equations.find(e => e.id === _eqDragId); _eqDragId = null;
  if(!eq) return;
  _insertEqAt(eq, canvasX, canvasY);
}

// Insert at center of visible canvas
function _insertEqCenter(id){
  const eq = _equations.find(e => e.id === id); if(!eq) return;
  const cv = g('fe-canvas'); if(!cv) return;
  const cx = Math.max(0, Math.round(cv.clientWidth / 2 - (eq.bboxW || 200) / 2));
  const cy = Math.max(0, Math.round(cv.clientHeight / 2 - (eq.bboxH || 80) / 2));
  _insertEqAt(eq, cx, cy);
}

// Core: place elements at (originX,originY), select them all
function _insertEqAt(eq, originX, originY){
  const layer = activeLayer();
  if(layer.locked){ toast(t('locked-layer')); return; }

  feSnap();

  const newIds = [];
  eq.elements.forEach(src => {
    const id = uid();
    let rd;

    if(src.type === 'textbox'){
      // Restore textbox — preserve all textbox-specific fields
      rd = {
        id,
        type: 'textbox',
        x: Math.round(originX + (src._rx ?? src.x)),
        y: Math.round(originY + (src._ry ?? src.y)),
        w: src.w,
        h: src.h,
        text: src.text || '',
        fontSize: src.fontSize,
        font: src.font,
        fvs: src.fvs || '',
        textColor: src.textColor || '#000000',
        opacity: src.opacity ?? 100,
        margin: src.margin ?? 3,
        layerId: activeLayerId,
        spans: src.spans ? JSON.parse(JSON.stringify(src.spans)) : [],
        _fontOverride: src._fontOverride,
        _fvsOverride: src._fvsOverride,
        _colorOverride: src._colorOverride,
        _sizeOverride: src._sizeOverride,
      };
    } else {
      // Standard math element
      rd = {
        id,
        x: Math.round(originX + (src._rx ?? src.x)),
        y: Math.round(originY + (src._ry ?? src.y)),
        size: src.size,
        opacity: src.opacity ?? 100,
        margin: src.margin ?? 5,
        layerId: activeLayerId,
        node: JSON.parse(JSON.stringify(src.node)),
      };
    }

    feEls.push(rd);
    feRenderEl(rd);
    newIds.push(id);
  });

  g('fe-hint').style.opacity = '0';
  feSyncZOrder();

  // Select all inserted elements as a group
  document.querySelectorAll('.fe-el').forEach(e => e.classList.remove('sel'));
  feSelIds.clear();
  newIds.forEach(id => {
    feSelIds.add(id);
    const el = document.getElementById(id); if(el) el.classList.add('sel');
  });
  feSelId = newIds.at(-1) ?? null;

  chkConflict(); if(showBB) renderBBs();
  feSnap();
  feInsUpdate();
  g('fe-canvas')?.focus({ preventScroll: true });
  toast(t('eq-inserted') + ' "' + eq.name + '"');
}

// ── SVG Export ────────────────────────────────────────────────────────────────
// Strategy: render equation at full size in an offscreen container, measure each
// element's real bounding box, then produce an SVG using <foreignObject> to embed
// the HTML math render verbatim. The SVG references STIX Two Math via a @font-face
// CDN declaration so it renders correctly in browsers. For Figma / Illustrator /
// Inkscape we also include a <text> fallback layer with the raw Unicode symbols.
function exportEqSVG(id){
  if(!_guestOK('export'))return;
  const eq = _equations.find(e => e.id === id); if(!eq) return;

  // ── 1. Render at 2× for sharp export ────────────────────────────────────────
  const SCALE = 2;
  const PAD   = 20 * SCALE; // padding around content

  // Offscreen container
  const host = document.createElement('div');
  host.style.cssText = 'position:fixed;left:-9999px;top:-9999px;visibility:hidden;pointer-events:none;z-index:-1';
  document.body.appendChild(host);

  // Render each element
  const rendered = eq.elements.map(rd => {
    const layer = layerById(rd.layerId);

    if(rd.type === 'textbox'){
      // Render textbox offscreen as a plain div
      const sz = Math.round((rd.fontSize||14) * SCALE);
      const wrap = document.createElement('div');
      wrap.style.cssText = `position:absolute;left:${Math.round((rd._rx??rd.x)*SCALE)}px;top:${Math.round((rd._ry??rd.y)*SCALE)}px`;
      const mei = document.createElement('div');
      mei.style.cssText =
        `width:${Math.round((rd.w||100)*SCALE)}px;`+
        `min-height:${Math.round((rd.h||40)*SCALE)}px;`+
        `font-size:${sz}px;font-family:${rd.font||MFONT};`+
        `color:${rd.textColor||'#000000'};opacity:${(rd.opacity??100)/100};`+
        `white-space:pre-wrap;word-break:break-word;display:inline-block;line-height:1.5`;
      if(rd.fvs) mei.style.fontVariationSettings = rd.fvs;
      mei.textContent = rd.text || '';
      wrap.appendChild(mei);
      host.appendChild(wrap);
      return { rd, layer, mei, wrap, isTextbox: true };
    }

    const sz    = Math.round(rd.size * SCALE);
    const wrap  = document.createElement('div');
    wrap.style.cssText = `position:absolute;left:${Math.round((rd._rx??rd.x)*SCALE)}px;top:${Math.round((rd._ry??rd.y)*SCALE)}px`;
    const mei = document.createElement('div');
    mei.style.cssText = `font-size:${sz}px;font-family:${layer.font||MFONT};color:${layer.textColor||'#000000'};opacity:${rd.opacity/100};display:inline-block`;
    if(layer.fvs) mei.style.fontVariationSettings = layer.fvs;
    mei.appendChild(bNode(rd.node, sz, layer.font||MFONT, layer.fvs||''));
    wrap.appendChild(mei);
    host.appendChild(wrap);
    return { rd, layer, mei, wrap, isTextbox: false };
  });

  // ── 2. Measure after a short render tick ─────────────────────────────────────
  setTimeout(() => {
    // Overall bounding box
    let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
    rendered.forEach(({wrap,mei}) => {
      const r = mei.getBoundingClientRect();
      const hr= host.getBoundingClientRect();
      const lx = r.left - hr.left, ty = r.top - hr.top;
      minX = Math.min(minX, lx); minY = Math.min(minY, ty);
      maxX = Math.max(maxX, lx + r.width); maxY = Math.max(maxY, ty + r.height);
    });
    document.body.removeChild(host);

    const W = Math.ceil(maxX - minX) + PAD * 2;
    const H = Math.ceil(maxY - minY) + PAD * 2;
    const offsetX = -minX + PAD;
    const offsetY = -minY + PAD;

    // ── 3. Build SVG ──────────────────────────────────────────────────────────
    // Font declaration — STIX Two Math from CDN
    const fontFace = `@font-face{font-family:'STIX Two Math';src:url('https://cdn.jsdelivr.net/npm/stix-two@1.0.0/fonts/STIXTwoMath-Regular.woff2') format('woff2');}`;

    // foreignObject layer: exact HTML render
    let foItems = '';
    rendered.forEach(({rd, layer, isTextbox}) => {
      const rx   = Math.round((rd._rx??rd.x)*SCALE + offsetX);
      const ry   = Math.round((rd._ry??rd.y)*SCALE + offsetY);
      const op   = (rd.opacity ?? 100) / 100;

      if(isTextbox){
        const sz     = Math.round((rd.fontSize||14) * SCALE);
        const color  = rd.textColor || '#000000';
        const font   = rd.font || MFONT;
        const fvs    = rd.fvs || '';
        const fvsCss = fvs ? `font-variation-settings:${fvs};` : '';
        const tw     = Math.round((rd.w||100)*SCALE);
        const th     = Math.round((rd.h||40)*SCALE);
        foItems += `<foreignObject x="${rx}" y="${ry}" width="${tw}" height="${th}" overflow="visible" opacity="${op}">` +
          `<div xmlns="http://www.w3.org/1999/xhtml" style="width:${tw}px;min-height:${th}px;font-size:${sz}px;font-family:${escH(font)};color:${color};${fvsCss}line-height:1.5;white-space:pre-wrap;word-break:break-word">` +
          escH(rd.text || '') +
          `</div></foreignObject>\n`;
      } else {
        const sz     = Math.round(rd.size * SCALE);
        const color  = layer.textColor || '#000000';
        const font   = layer.font || MFONT;
        const fvs    = layer.fvs || '';
        const fvsCss = fvs ? `font-variation-settings:${fvs};` : '';
        const html   = nodeHTML(rd.node, sz);
        foItems += `<foreignObject x="${rx}" y="${ry}" width="${W}" height="${H}" overflow="visible" opacity="${op}">` +
          `<div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;font-size:${sz}px;font-family:${escH(font)};color:${color};${fvsCss}line-height:1">` +
          html +
          `</div></foreignObject>\n`;
      }
    });

    // <text> fallback layer (raw Unicode, invisible by default)
    let textItems = '';
    rendered.forEach(({rd, layer, isTextbox}) => {
      const rx  = Math.round((rd._rx??rd.x)*SCALE + offsetX);
      const op  = (rd.opacity ?? 100) / 100;

      if(isTextbox){
        const sz    = Math.round((rd.fontSize||14) * SCALE);
        const ry    = Math.round((rd._ry??rd.y)*SCALE + offsetY + sz * 0.85);
        const color = rd.textColor || '#000000';
        const font  = rd.font || MFONT;
        textItems += `<text x="${rx}" y="${ry}" font-family="${escH(font)}" font-size="${sz}" fill="${color}" opacity="${op}" display="none">${escH(rd.text||'')}</text>\n`;
      } else {
        const sz    = Math.round(rd.size * SCALE);
        const ry    = Math.round((rd._ry??rd.y)*SCALE + offsetY + sz * 0.85);
        const color = layer.textColor || '#000000';
        const font  = layer.font || MFONT;
        const sym   = _nodeRawText(rd.node);
        textItems += `<text x="${rx}" y="${ry}" font-family="${escH(font)}" font-size="${sz}" fill="${color}" opacity="${op}" display="none">${escH(sym)}</text>\n`;
      }
    });

    const svgStr =
`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <style>${fontFace}</style>
  </defs>
  <!-- Math render (foreignObject — HTML) -->
${foItems}
  <!-- Text fallback (Unicode symbols, display:none by default) -->
${textItems}
</svg>`;

    // ── 4. Download ──────────────────────────────────────────────────────────
    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const a    = document.createElement('a');
    a.href     = URL.createObjectURL(blob);
    a.download = (eq.name.replace(/[^a-z0-9_\-]/gi, '_') || 'equation') + '.svg';
    a.click();
    URL.revokeObjectURL(a.href);
    toast(t('eq-svg-exported') + ' ' + a.download);
  }, 80); // allow DOM + fonts to settle
}

// Flatten node to raw Unicode text (for SVG text fallback)
function _nodeRawText(node){
  if(!node) return '';
  if(node.type==='free'||node.type==='op') return node.text||node.s||'';
  if(node.type==='frac'){
    const num = (node.ns||[]).map(i=>i.type==='text'?i.text:_nodeRawText(i)).join('');
    const den = (node.ds||[]).map(i=>i.type==='text'?i.text:_nodeRawText(i)).join('');
    return `(${num})/(${den})`;
  }
  if(node.type==='rad'){
    const body = (node.bs||[]).map(i=>i.type==='text'?i.text:_nodeRawText(i)).join('');
    return node.deg ? `${node.deg}√(${body})` : `√(${body})`;
  }
  if(node.type==='delim'){
    return (node.open||'(') + (node.bodyText||'') + (node.close||')');
  }
  return node.s || '';
}

document.addEventListener('DOMContentLoaded', _loadEq);


/* === fe-canvas.js === */

'use strict';
// Initialisation du canvas formula editor
function initFECanvas(){
  drawRulers();
  window.addEventListener('resize',()=>{
    drawRulers();
    if(showGrid)drawGrid();
  });
  updateSnapLabel();
}


/* === fe-elements.js === */

'use strict';
// ── Drop sur le canvas ──
function onFEDrop(ev){
  ev.preventDefault();
  const cv=g('fe-canvas');const r=cv.getBoundingClientRect();
  const x=snapVal(ev.clientX-r.left),y=snapVal(ev.clientY-r.top);
  // Equation drag from panel takes priority
  if(_eqDragId){onEqDrop(x,y);if(ghost){ghost.remove();ghost=null;}return;}
  if(!dragKey)return;
  _dropKeyOnCanvas(dragKey,x,y);
  dragKey=null;if(ghost){ghost.remove();ghost=null;}
}

// ── Core drop logic — shared by HTML5 drag and accent pointer drag ──
function _dropKeyOnCanvas(key,x,y){
  const layer=activeLayer();
  if(layer.locked){toast(t('locked-layer'));return false;}
  const id=uid();
  const rd={id,x,y,size:layer.fontSize||defaultFontSize,opacity:100,margin:5,layerId:activeLayerId,node:mkNode(key)};
  feEls.push(rd);feRenderEl(rd);feSelect(id);
  g('fe-hint').style.opacity='0';
  feSnap();
  return true;
}

// ── Rendu d'un élément root ──
function feRenderEl(rd){
  // Dispatch textbox to its own renderer
  if(rd.type==='textbox'){_renderTextBox(rd);return;}
  const old=document.getElementById(rd.id);if(old)old.remove();
  const layer=layerById(rd.layerId);
  const ed=canEdit(rd.layerId);
  const wrap=document.createElement('div');
  wrap.className='fe-el'+(feSelIds.has(rd.id)?' sel':'')+(ed?'':' locked-el')+(feLayerHighlight===rd.layerId?' layer-highlight':'');
  wrap.id=rd.id;
  wrap.style.cssText=`left:${rd.x}px;top:${rd.y}px;opacity:${(rd.opacity/100)*(layer.visible?1:0)}`;
  // Badge verrou
  const lockBadge=document.createElement('div');lockBadge.className='lock-badge';
  lockBadge.innerHTML=_SVG_LOCK+'<span style="margin-left:3px">'+layer.name+'</span>';
  // Bouton supprimer
  const dx=document.createElement('div');dx.className='fe-el-del';dx.textContent='×';
  dx.addEventListener('click',ev=>{ev.stopPropagation();if(ed){feSnap();feDelById(rd.id);}});
  // Contenu math
  const mei=document.createElement('div');mei.className='fe-mei';
  mei.style.cssText=`font-size:${rd.size}px;font-family:${layer.font||MFONT};color:${layer.textColor||'#000000'}`;
  if(layer.fvs)mei.style.fontVariationSettings=layer.fvs;
  mei.appendChild(bNode(rd.node,rd.size,layer.font||MFONT,layer.fvs||''));
  wrap.append(lockBadge,dx,mei);

  // La sélection est gérée exclusivement dans mousedown pour éviter
  // que le event 'click' (déclenché après mouseup) ne lise un état
  // incorrect du modificateur Cmd/Ctrl (déjà relâché à ce moment-là).
  wrap.addEventListener('mousedown',ev=>{
    if(ev.target.classList.contains('fe-el-del'))return;
    if(ev.target.closest('.seq-slot,.delim-body,.tnode,.sn-del'))return;
    ev.stopPropagation();
    const additive=ev.metaKey||ev.ctrlKey;
    if(feSelIds.has(rd.id)&&additive) feSelect(rd.id,true);   // toggle OUT
    else if(!feSelIds.has(rd.id))     feSelect(rd.id,additive);// add or replace
    // else : clic simple sur un élément déjà sélectionné sans modificateur
    // → on ne change pas la sélection ici, le drag va démarrer normalement

    if(!ed)return; // élément verrouillé : sélection ok, pas de drag

    // Drag-move — supporte la multi-sélection
    let ox=ev.clientX,oy=ev.clientY,dragging=true,moved=false;
    let dragSnapshot=feEls.filter(e=>feSelIds.has(e.id)).map(e=>({rd:e,x0:e.x,y0:e.y}));
    wrap.classList.add('being-moved');
    ev.preventDefault();

    function onMove(e){
      if(!dragging)return;
      moved=true;
      const dx=e.clientX-ox,dy=e.clientY-oy;
      dragSnapshot.forEach(({rd:r,x0,y0})=>{
        r.x=showGrid?snapVal(x0+dx):Math.round(x0+dx);
        r.y=showGrid?snapVal(y0+dy):Math.round(y0+dy);
        const el=document.getElementById(r.id);
        if(el){el.style.left=r.x+'px';el.style.top=r.y+'px';}
        feInsUpdatePos(r);
      });
      chkConflict();if(showBB)renderBBs();
    }
    function onUp(e){
      // Clic simple (pas de drag) sur un élément déjà sélectionné sans Cmd/Ctrl
      // → réduire la sélection à cet élément seul (comportement Figma/Illustrator)
      if(!moved && feSelIds.size>1 && !(e.metaKey||e.ctrlKey)){
        feSelect(rd.id,false);
      }
      if(dragging&&moved)feSnap();
      dragging=false;moved=false;
      wrap.classList.remove('being-moved');
      dragSnapshot=[];
      window.removeEventListener('mousemove',onMove);
      window.removeEventListener('mouseup',onUp);
    }
    window.addEventListener('mousemove',onMove);
    window.addEventListener('mouseup',onUp);
  });
  g('fe-canvas').appendChild(wrap);
  chkConflict();if(showBB)renderBBs();
}

// ── Sync z-order DOM → ordre des layers (layers[0] = fond, layers[last] = dessus) ──
// Appelé après tout reorder de layers. Ne re-render rien, juste réordonne les nœuds DOM.
function feSyncZOrder(){
  const cv=g('fe-canvas');if(!cv)return;
  // Pour chaque layer dans l'ordre (index 0 = fond), puis par ordre d'insertion dans feEls
  layers.forEach(layer=>{
    feEls.filter(rd=>rd.layerId===layer.id).forEach(rd=>{
      const el=document.getElementById(rd.id);
      if(el)cv.appendChild(el); // déplace à la fin = au-dessus
    });
  });
  // Les éléments non-.fe-el (grid-svg, axis-svg, custom-axis, bb-ov) doivent rester au-dessus
  cv.querySelectorAll('.bb-ov,.custom-axis').forEach(el=>cv.appendChild(el));
}

// ── Sélection ──
// feSelect(id)           → sélection simple (remplace tout)
// feSelect(id, true)     → toggle cet id dans la sélection courante (Cmd/Ctrl+clic)
function feSelect(id, additive=false){
  // Exit text-edit mode on any textbox that is losing selection
  const _exitTbIfDeselecting=(tid)=>{
    const w=document.getElementById(tid);
    if(w&&w._exitEditMode) w._exitEditMode();
  };
  feLayerHighlight=null;
  if(additive && id){
    if(feSelIds.has(id)){
      _exitTbIfDeselecting(id);
      feSelIds.delete(id);
      const el=document.getElementById(id);if(el)el.classList.remove('sel');
      feSelId=feSelIds.size ? [...feSelIds].at(-1) : null;
    } else {
      feSelIds.add(id);
      feSelId=id;
      const el=document.getElementById(id);if(el)el.classList.add('sel');
    }
  } else {
    // Simple selection — exit edit mode on all previously selected textboxes
    feSelIds.forEach(tid=>{ if(tid!==id) _exitTbIfDeselecting(tid); });
    document.querySelectorAll('.fe-el').forEach(e=>e.classList.remove('sel','layer-highlight'));
    feSelIds.clear();
    feSelId=id;
    if(id){
      feSelIds.add(id);
      const el=document.getElementById(id);if(el)el.classList.add('sel');
    }
  }
  g('fe-canvas').focus({preventScroll:true});
  feInsUpdate();
}

// Sélectionner tous les éléments éditables du canvas
function feSelectAll(){
  feLayerHighlight=null;
  document.querySelectorAll('.fe-el').forEach(e=>e.classList.remove('sel','layer-highlight'));
  feSelIds.clear();
  feEls.forEach(rd=>{
    if(canEdit(rd.layerId)){
      feSelIds.add(rd.id);
      const el=document.getElementById(rd.id);if(el)el.classList.add('sel');
    }
  });
  feSelId=feSelIds.size ? [...feSelIds].at(-1) : null;
  g('fe-canvas').focus({preventScroll:true});
  feInsUpdate();
}

// ── Surbrillance de tous les éléments d'un layer (clic sur layer panel) ──
function feHighlightLayer(layerId){
  document.querySelectorAll('.fe-el').forEach(e=>e.classList.remove('sel','layer-highlight'));
  feSelId=null;feSelIds.clear();
  feLayerHighlight=layerId;
  feEls.filter(e=>e.layerId===layerId).forEach(rd=>{
    const el=document.getElementById(rd.id);
    if(el)el.classList.add('layer-highlight');
  });
  feInsClear();
  if(showBB)renderBBs();
}

// ── Suppression ──
function feDelById(id){
  const el=document.getElementById(id);if(el)el.remove();
  feEls=feEls.filter(e=>e.id!==id);
  feSelIds.delete(id);
  if(feSelId===id){feSelId=feSelIds.size?[...feSelIds].at(-1):null;}
  if(!feSelId)feInsClear();
  if(!feEls.length)g('fe-hint').style.opacity='1';
  renderBBs();chkConflict();
}
function feDelete(){
  if(!feSelIds.size)return;
  feSnap();
  // Supprimer tous les éléments sélectionnés
  [...feSelIds].forEach(id=>feDelById(id));
  toast(t('deleted'));
}
function feDup(){
  if(!feSelIds.size)return;
  feSnap();
  const step=arrowStep(false);
  const newIds=[];
  feEls.filter(e=>feSelIds.has(e.id)&&canEdit(e.layerId)).forEach(rd=>{
    const id=uid();
    const cl=JSON.parse(JSON.stringify(rd));cl.id=id;
    cl.x+=step;cl.y+=step;
    feEls.push(cl);feRenderEl(cl);
    newIds.push(id);
  });
  if(!newIds.length)return;
  // Sélectionner les nouveaux éléments
  document.querySelectorAll('.fe-el').forEach(e=>e.classList.remove('sel'));
  feSelIds.clear();
  newIds.forEach(id=>{feSelIds.add(id);const el=document.getElementById(id);if(el)el.classList.add('sel');});
  feSelId=newIds.at(-1);
  feInsUpdate();feSnap();toast(t('duplicated'));
}

// ── Keyboard: flèches, Alt+flèches ──
function onFEKey(ev){
  if(ev.target.contentEditable==='true')return;
  const ctrl=ev.ctrlKey||ev.metaKey;
  if(ev.key==='p'||ev.key==='P'){return;} // Aperçu géré ailleurs
  if(ctrl&&ev.key==='z'&&!ev.shiftKey){ev.preventDefault();feUndo();return;}
  if(ctrl&&(ev.key==='y'||(ev.key==='z'&&ev.shiftKey))){ev.preventDefault();feRedo();return;}
  if(ctrl&&ev.key==='d'){ev.preventDefault();feDup();return;}
  if(ev.key==='?'){return;}
  if(!feSelIds.size)return;
  if(ev.key==='Delete'||ev.key==='Backspace'){
    if(!document.activeElement.closest('.seq-slot,.delim-body')){
      ev.preventDefault();feSnap();[...feSelIds].forEach(id=>feDelById(id));return;
    }
  }
  const isArrow=['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(ev.key);
  if(!isArrow)return;
  ev.preventDefault();
  // Flèches — appliquer à tous les éléments sélectionnés éditables
  const editableRds=feEls.filter(e=>feSelIds.has(e.id)&&canEdit(e.layerId));
  if(!editableRds.length)return;
  if(ev.altKey){
    // Alt+arrows = font size seulement (primary uniquement)
    const rd=feEls.find(e=>e.id===feSelId);if(!rd||!canEdit(rd.layerId))return;
    if(ev.key==='ArrowUp'){rd.size=Math.min(rd.size+2,120);feRenderEl(rd);feInsUpdate();}
    else if(ev.key==='ArrowDown'){rd.size=Math.max(rd.size-2,12);feRenderEl(rd);feInsUpdate();}
    else if(ev.key==='ArrowRight'&&rd.node.type==='free'&&_nodeCanStretchX(rd.node)){rd.node.stretch=Math.min((rd.node.stretch||100)+5,220);feRenderEl(rd);feInsUpdate();}
    else if(ev.key==='ArrowLeft'&&rd.node.type==='free'&&_nodeCanStretchX(rd.node)){rd.node.stretch=Math.max((rd.node.stretch||100)-5,30);feRenderEl(rd);feInsUpdate();}
    clearTimeout(onFEKey._t);onFEKey._t=setTimeout(()=>feSnap(),400);
  } else {
    // Flèches = déplacement de tous les sélectionnés
    const step=arrowStep(ev.shiftKey);
    editableRds.forEach(rd=>{
      if(ev.key==='ArrowLeft')  rd.x=Math.max(0,rd.x-step);
      if(ev.key==='ArrowRight') rd.x=rd.x+step;
      if(ev.key==='ArrowUp')    rd.y=Math.max(0,rd.y-step);
      if(ev.key==='ArrowDown')  rd.y=rd.y+step;
      if(showGrid){rd.x=snapVal(rd.x);rd.y=snapVal(rd.y);}
      const wrap=document.getElementById(rd.id);
      if(wrap){wrap.style.left=rd.x+'px';wrap.style.top=rd.y+'px';}
      feInsUpdatePos(rd);
    });
    chkConflict();if(showBB)renderBBs();
    clearTimeout(onFEKey._t);onFEKey._t=setTimeout(()=>feSnap(),400);
  }
}

// ── Click sur le canvas (désélection) ──
function onFEClick(ev){
  if(ev.target===g('fe-canvas')||ev.target.id==='grid-svg'||ev.target.id==='axis-svg'){
    // Exit edit mode on any editing textbox
    feSelIds.forEach(id=>{ const w=document.getElementById(id);if(w&&w._exitEditMode)w._exitEditMode(); });
    feSelId=null;feSelIds.clear();feLayerHighlight=null;
    document.querySelectorAll('.fe-el').forEach(e=>e.classList.remove('sel','layer-highlight'));
    feInsClear();
  }
}

// ── Marquee selection (click-and-drag sur fond vide) ──────────────────────────
// Déclenché par onmousedown sur #fe-canvas.
// Ne s'active que si le clic tombe sur le fond (pas sur un .fe-el).
function onFECanvasMouseDown(ev){
  // Ignorer si clic sur un élément, une règle, ou bouton autre que gauche
  if(ev.button!==0)return;
  if(ev.target.closest('.fe-el,.custom-axis,.seq-slot,.delim-body,.tnode,.sn-del'))return;
  if(ev.target.id==='h-ruler'||ev.target.id==='v-ruler')return;

  // ── Text tool: drag-to-create ──
  if(feTool==='text'){_startTextBoxDrag(ev);return;}

  const cv=g('fe-canvas');if(!cv)return;
  // Recapturer cvRect dans chaque callback pour éviter les décalages post-scroll
  const cvRect=cv.getBoundingClientRect();
  const startX=ev.clientX-cvRect.left;
  const startY=ev.clientY-cvRect.top;
  const additive=ev.metaKey||ev.ctrlKey;

  // Créer le rectangle de marquee (invisible tant que w/h = 0)
  const marquee=document.createElement('div');
  marquee.id='fe-marquee';
  marquee.style.cssText=`position:absolute;left:${startX}px;top:${startY}px;width:0;height:0;pointer-events:none;z-index:9998`;
  cv.appendChild(marquee);

  let moved=false;

  function onMove(e){
    const r=cv.getBoundingClientRect(); // re-mesure au cas où le layout aurait bougé
    const cx=e.clientX-r.left;
    const cy=e.clientY-r.top;
    const x=Math.min(startX,cx),y=Math.min(startY,cy);
    const w=Math.abs(cx-startX),h=Math.abs(cy-startY);
    marquee.style.left=x+'px';marquee.style.top=y+'px';
    marquee.style.width=w+'px';marquee.style.height=h+'px';
    if(w>4||h>4)moved=true;
  }

  function onUp(e){
    document.removeEventListener('mousemove',onMove);
    document.removeEventListener('mouseup',onUp);
    marquee.remove();

    if(!moved){
      // Clic simple sur fond vide sans drag → désélectionner
      if(!additive){
        feSelId=null;feSelIds.clear();feLayerHighlight=null;
        document.querySelectorAll('.fe-el').forEach(el=>el.classList.remove('sel','layer-highlight'));
        feInsClear();
      }
      // Bloquer le 'click' qui va suivre pour éviter double-traitement
      cv.addEventListener('click',stopClick,{capture:true,once:true});
      return;
    }

    // ── Drag réel : appliquer la sélection marquee ──
    // Bloquer le 'click' qui suit systématiquement le mouseup
    cv.addEventListener('click',stopClick,{capture:true,once:true});

    // Si pas additif, vider la sélection courante
    if(!additive){
      feSelId=null;feSelIds.clear();feLayerHighlight=null;
      document.querySelectorAll('.fe-el').forEach(el=>el.classList.remove('sel','layer-highlight'));
    }

    // Rectangle de sélection final en coords canvas
    const r=cv.getBoundingClientRect();
    const cx=e.clientX-r.left, cy=e.clientY-r.top;
    const selX1=Math.min(startX,cx), selY1=Math.min(startY,cy);
    const selX2=Math.max(startX,cx), selY2=Math.max(startY,cy);

    let anyHit=false;
    feEls.forEach(rd=>{
      // Inclure les éléments de toutes les couches visibles et non verrouillées
      const layer=layerById(rd.layerId);
      if(!layer.visible||layer.locked)return;
      const el=document.getElementById(rd.id);if(!el)return;
      // Position de l'élément en coords canvas (rd.x/rd.y sont déjà en px canvas)
      const elRect=el.getBoundingClientRect();
      const cvR=cv.getBoundingClientRect();
      const ex1=elRect.left-cvR.left, ey1=elRect.top-cvR.top;
      const ex2=elRect.right-cvR.left, ey2=elRect.bottom-cvR.top;
      // Intersection
      if(ex1<selX2&&ex2>selX1&&ey1<selY2&&ey2>selY1){
        feSelIds.add(rd.id);
        el.classList.add('sel');
        feSelId=rd.id;
        anyHit=true;
      }
    });

    if(anyHit)feInsUpdate();
    else feInsClear();
    cv.focus({preventScroll:true});
  }

  document.addEventListener('mousemove',onMove);
  document.addEventListener('mouseup',onUp);
  ev.preventDefault();
}

// Absorbe le 'click' qui suit le mouseup après un marquee drag
// pour qu'onFEClick ne vide pas la sélection qu'on vient d'établir.
function stopClick(ev){ ev.stopImmediatePropagation(); }

// ── Coord display ──
function onFEMouseMove(ev){
  const cv=g('fe-canvas');if(!cv)return;
  const r=cv.getBoundingClientRect();
  const x=snapVal(ev.clientX-r.left),y=snapVal(ev.clientY-r.top);
  const el=g('coord-display');if(el)el.textContent=`x:${x} y:${y}`;
}
function onFEMouseLeave(){const el=g('coord-display');if(el)el.textContent='';}

// ═══════════════════════════════════════════════════════════════════════════
// CANVAS → DOCUMENT SYNCHRONIZATION
// ═══════════════════════════════════════════════════════════════════════════
// _syncMap: Map<feEl.id → docBlock.id>  — persists across calls.
// First call creates blocks; later calls update in-place or add new ones.
// No element is ever duplicated.

let _syncMap = new Map();

function _feFingerprint(rd){
  const layer=layerById(rd.layerId);
  if(rd.type==='textbox'){
    return JSON.stringify({t:rd.text,fs:rd.fontSize,f:rd.font,fvs:rd.fvs,
      c:rd.textColor,op:rd.opacity,w:rd.w,h:rd.h,x:rd.x,y:rd.y});
  }
  return JSON.stringify({n:rd.node,sz:rd.size,op:rd.opacity,
    f:layer.font,fvs:layer.fvs,c:layer.textColor,x:rd.x,y:rd.y});
}

function _groupMathEls(mathEls){
  const sorted=[...mathEls].sort((a,b)=>a.y!==b.y?a.y-b.y:a.x-b.x);
  const lines=[];
  sorted.forEach(el=>{
    const center=el.y+el.size/2;
    const last=lines[lines.length-1];
    if(last){
      const lc=last[0].y+last[0].size/2;
      const thr=Math.max(last[0].size,el.size)*0.55;
      if(Math.abs(center-lc)<=thr){last.push(el);return;}
    }
    lines.push([el]);
  });
  return lines;
}

function _groupToDocBlock(group,existingId){
  const id=existingId||uid();
  const layer=layerById(group[0].layerId);
  const sorted=[...group].sort((a,b)=>a.x-b.x);
  const elements=sorted.map(rd=>({
    id:uid(),
    node:JSON.parse(JSON.stringify(rd.node)),
    size:rd.size,
    font:layer.font||MFONT,
    fvs:layer.fvs||'',
    color:layer.textColor||'#000000',
    opacity:rd.opacity??100,
    _feId:rd.id,
  }));
  return {
    id,type:'formula',elements,
    fontSize:sorted[0].size||32,align:'c',
    font:layer.font||MFONT,fvs:layer.fvs||'',
    color:layer.textColor||'#000000',
    floating:false,fx:80,fy:80,stTop:2,stBot:2,indent:0,
    _feIds:sorted.map(rd=>rd.id),
    _fps:Object.fromEntries(sorted.map(rd=>[rd.id,_feFingerprint(rd)])),
  };
}

function _textboxToDocBlock(rd,existingId){
  const id=existingId||uid();
  return {
    id,type:'canvas-textbox',
    text:rd.text||'',
    fontSize:rd.fontSize,font:rd.font||MFONT,fvs:rd.fvs||'',
    textColor:rd.textColor||'#000000',opacity:rd.opacity??100,
    w:rd.w,h:rd.h,
    align:'l',stTop:2,stBot:2,indent:0,
    floating:false,fx:80,fy:80,
    _feId:rd.id,_fp:_feFingerprint(rd),
  };
}

function insertToDoc(){
  if(!_guestOK('document'))return;
  if(!feEls.length){toast(t('canvas-empty'));return;}

  docSnap(); // save pre-sync state for undo

  const mathEls=feEls.filter(rd=>rd.type!=='textbox');
  const textEls=feEls.filter(rd=>rd.type==='textbox');
  let created=0,updated=0;

  // ── Math elements grouped into visual lines ───────────────────────────
  _groupMathEls(mathEls).forEach(group=>{
    const existingDocId=group.reduce((found,rd)=>{
      return found||((_syncMap.has(rd.id))?_syncMap.get(rd.id):null);
    },null);
    const existingBlock=existingDocId?docBlocks.find(b=>b.id===existingDocId):null;

    if(existingBlock){
      const anyChanged=group.some(rd=>{
        const storedFp=existingBlock._fps?.[rd.id];
        return !storedFp||storedFp!==_feFingerprint(rd);
      });
      const membershipChanged=
        !existingBlock._feIds||
        existingBlock._feIds.length!==group.length||
        group.some(rd=>!existingBlock._feIds.includes(rd.id));
      if(anyChanged||membershipChanged){
        Object.assign(existingBlock,_groupToDocBlock(group,existingBlock.id));
        updated++;
      }
      group.forEach(rd=>_syncMap.set(rd.id,existingBlock.id));
    } else {
      const nb=_groupToDocBlock(group,null);
      docBlocks.push(nb);
      group.forEach(rd=>_syncMap.set(rd.id,nb.id));
      created++;
    }
  });

  // ── Text boxes ────────────────────────────────────────────────────────
  textEls.forEach(rd=>{
    const existingDocId=_syncMap.get(rd.id);
    const existingBlock=existingDocId?docBlocks.find(b=>b.id===existingDocId):null;
    if(existingBlock){
      if(existingBlock._fp!==_feFingerprint(rd)){
        Object.assign(existingBlock,_textboxToDocBlock(rd,existingBlock.id));
        updated++;
      }
    } else {
      const nb=_textboxToDocBlock(rd,null);
      docBlocks.push(nb);
      _syncMap.set(rd.id,nb.id);
      created++;
    }
  });

  // ── Prune dead sync entries ───────────────────────────────────────────
  const liveIds=new Set(feEls.map(e=>e.id));
  for(const [feId] of _syncMap){if(!liveIds.has(feId))_syncMap.delete(feId);}

  docSnap();
  renderDocList();
  renderDocPage();
  switchMode('doc');

  const msg=created>0&&updated>0
    ?`${t('sync-created')} ${created} · ${t('sync-updated')} ${updated}`
    :created>0?`${t('sync-created')} ${created}`
    :updated>0?`${t('sync-updated')} ${updated}`
    :t('sync-no-changes');
  toast(msg);
}


/* === fe-textbox.js === */

'use strict';

// ── Tool activation ──────────────────────────────────────────────────────────
function setFETool(tool){
  feTool=tool;
  const cv=g('fe-canvas');
  if(cv)cv.style.cursor=tool==='text'?'crosshair':'default';
  const btn=g('tbText');
  if(btn)btn.classList.toggle('on',tool==='text');
}

// ── Drag-to-create text box ──────────────────────────────────────────────────
// Called from onFECanvasMouseDown when feTool==='text'
function _startTextBoxDrag(ev){
  const layer=activeLayer();
  if(layer.locked){toast(t('locked-layer'));return;}
  const cv=g('fe-canvas');if(!cv)return;
  const cvRect=cv.getBoundingClientRect();
  const startX=snapVal(ev.clientX-cvRect.left);
  const startY=snapVal(ev.clientY-cvRect.top);

  // Ghost rectangle shown during drag
  const ghost=document.createElement('div');
  ghost.id='tb-ghost';
  ghost.style.cssText=`position:absolute;left:${startX}px;top:${startY}px;width:0;height:0;`+
    `border:1.5px dashed var(--accent);background:color-mix(in srgb,var(--accent) 6%,transparent);`+
    `border-radius:2px;box-sizing:border-box;pointer-events:none;z-index:9998`;
  cv.appendChild(ghost);

  let moved=false;

  function onMove(e){
    const r=cv.getBoundingClientRect();
    const cx=snapVal(e.clientX-r.left);
    const cy=snapVal(e.clientY-r.top);
    const x=Math.min(startX,cx),y=Math.min(startY,cy);
    const w=Math.abs(cx-startX),h=Math.abs(cy-startY);
    ghost.style.left=x+'px';ghost.style.top=y+'px';
    ghost.style.width=w+'px';ghost.style.height=h+'px';
    if(w>4||h>4)moved=true;
  }

  function onUp(e){
    document.removeEventListener('mousemove',onMove);
    document.removeEventListener('mouseup',onUp);
    ghost.remove();

    const r=cv.getBoundingClientRect();
    const cx=snapVal(e.clientX-r.left);
    const cy=snapVal(e.clientY-r.top);
    const x=Math.min(startX,cx), y=Math.min(startY,cy);
    const w=Math.abs(cx-startX), h=Math.abs(cy-startY);

    // Minimum viable size: single click without drag = default 200×60
    const finalW=moved&&w>20?w:200;
    const finalH=moved&&h>16?h:60;

    _createTextBox(x,y,finalW,finalH);

    // Return to select tool after creation
    setFETool('select');
    // Block the following click from clearing selection
    cv.addEventListener('click',stopClick,{capture:true,once:true});
  }

  document.addEventListener('mousemove',onMove);
  document.addEventListener('mouseup',onUp);
  ev.preventDefault();
}

// ── Create textbox element ───────────────────────────────────────────────────
function _createTextBox(x,y,w,h){
  const layer=activeLayer();
  if(layer.locked){toast(t('locked-layer'));return;}
  const id=uid();
  const rd={
    id, type:'textbox',
    x, y, w, h,
    text:'',
    // Typography: inherit from active layer at creation time; can be overridden locally
    fontSize:layer.fontSize||defaultFontSize,
    font:layer.font||MFONT,
    fvs:layer.fvs||'',
    textColor:layer.textColor||'#000000',
    opacity:100,
    margin:3,
    layerId:activeLayerId,
    // Per-span overrides: [{start,end,fontSize}] — for partial text formatting
    spans:[],
  };
  feEls.push(rd);
  feRenderEl(rd);
  feSelect(id);
  g('fe-hint').style.opacity='0';
  feSnap();

  // Auto-focus the textarea after a tick
  setTimeout(()=>{
    const el=document.getElementById(id);
    if(el){const ta=el.querySelector('.tb-editor');if(ta)ta.focus();}
  },30);
}

// ── Render a textbox element ─────────────────────────────────────────────────
// The .tb-editor is architecturally equivalent to .delim-body: always
// contenteditable, receives drag-drop from dragKey, part of tabSlot cycle.
function _renderTextBox(rd){
  const old=document.getElementById(rd.id);if(old)old.remove();
  const layer=layerById(rd.layerId);
  const ed=canEdit(rd.layerId);

  // ── Outer wrapper — identical to feRenderEl ──
  const wrap=document.createElement('div');
  wrap.className='fe-el'+(feSelIds.has(rd.id)?' sel':'')+(ed?'':' locked-el')+(feLayerHighlight===rd.layerId?' layer-highlight':'');
  wrap.id=rd.id;
  wrap.style.cssText=`left:${rd.x}px;top:${rd.y}px;opacity:${(rd.opacity/100)*(layer.visible?1:0)}`;

  // Lock badge
  const lockBadge=document.createElement('div');lockBadge.className='lock-badge';
  lockBadge.innerHTML=_SVG_LOCK+'<span style="margin-left:3px">'+layer.name+'</span>';

  // Delete button
  const dx=document.createElement('div');dx.className='fe-el-del';dx.textContent='×';
  dx.addEventListener('click',ev=>{ev.stopPropagation();if(ed){feSnap();feDelById(rd.id);}});

  // ── fe-mei content container (same as math elements) ──
  const mei=document.createElement('div');
  mei.className='fe-mei tb-mei';
  mei.style.cssText=
    `width:${rd.w}px;min-height:${rd.h}px;`+
    `font-size:${rd.fontSize}px;`+
    `font-family:${rd.font||layer.font||MFONT};`+
    `color:${rd.textColor||layer.textColor||'#000000'};`;
  if(rd.fvs||layer.fvs) mei.style.fontVariationSettings=rd.fvs||layer.fvs;

  // ── Editable area — uses the same class as delim-body so it participates
  //    in tabSlot(), dragover/drop (via dragKey), and kb-key insertion natively.
  const ta=document.createElement('div');
  ta.className='tb-editor';   // NOT delim-body — that class forces cursor:text via CSS
  ta.contentEditable=ed?'true':'false';
  ta.spellcheck=false;
  ta.dataset.ph='text…';
  ta.style.cssText=
    `width:100%;min-height:${rd.h}px;display:block;`+
    `outline:none;white-space:pre-wrap;word-break:break-word;`+
    `line-height:1.5;padding:4px 6px;box-sizing:border-box;`+
    `font-size:inherit;font-family:inherit;color:inherit;`;
  if(rd.text) ta.textContent=rd.text;

  ta.addEventListener('input',()=>{
    rd.text=ta.textContent;
    clearTimeout(ta._saveT);ta._saveT=setTimeout(()=>feSnap(),600);
  });
  ta.addEventListener('keydown',ev=>{
    if(ev.key==='Escape'){ta.blur();g('fe-canvas').focus({preventScroll:true});}
    if(ev.key==='Tab'){ev.preventDefault();tabSlot(ev.shiftKey?-1:1);}
    ev.stopPropagation();
  });
  ta.addEventListener('focus',()=>{
    if(!feSelIds.has(rd.id)) feSelect(rd.id);
  });

  // ── Drag-drop: same as seq-slot, inserts char at end (like delim-body) ──
  ta.addEventListener('dragover',ev=>{ev.preventDefault();ev.stopPropagation();ta.classList.add('dov');});
  ta.addEventListener('dragleave',()=>ta.classList.remove('dov'));
  ta.addEventListener('drop',ev=>{
    ev.preventDefault();ev.stopPropagation();ta.classList.remove('dov');
    if(!dragKey)return;
    const char=dragKey.s||'';
    dragKey=null;if(ghost){ghost.remove();ghost=null;}
    // Insert at drop position using caretRangeFromPoint
    ta.focus();
    let inserted=false;
    const methods=[
      ()=>document.caretPositionFromPoint&&(r=>{const cp=document.caretPositionFromPoint(ev.clientX,ev.clientY);if(!cp)return false;const range=document.createRange();range.setStart(cp.offsetNode,cp.offset);range.collapse(true);const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);return true;})(),
      ()=>document.caretRangeFromPoint&&(()=>{const range=document.caretRangeFromPoint(ev.clientX,ev.clientY);if(!range)return false;const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);return true;})(),
    ];
    for(const m of methods){if(m){inserted=true;break;}}
    // Insert the character
    const sel=window.getSelection();
    if(sel&&sel.rangeCount){
      const range=sel.getRangeAt(0);
      if(ta.contains(range.commonAncestorContainer)){
        range.deleteContents();
        const txt=document.createTextNode(char);
        range.insertNode(txt);
        range.setStartAfter(txt);range.setEndAfter(txt);
        sel.removeAllRanges();sel.addRange(range);
      } else {
        ta.textContent=(ta.textContent||'')+char;
      }
    } else {
      ta.textContent=(ta.textContent||'')+char;
    }
    rd.text=ta.textContent;
    clearTimeout(ta._saveT);ta._saveT=setTimeout(()=>feSnap(),300);
  });

  // Resize handle
  const rh=document.createElement('div');rh.className='tb-resize-handle';
  rh.addEventListener('mousedown',ev=>{
    if(!ed)return;
    ev.stopPropagation();ev.preventDefault();
    const ox=ev.clientX,oy=ev.clientY,ow=rd.w,oh=rd.h;
    function onMove(e){
      rd.w=Math.max(60,ow+(e.clientX-ox));
      rd.h=Math.max(24,oh+(e.clientY-oy));
      mei.style.width=rd.w+'px';
      mei.style.minHeight=rd.h+'px';
      ta.style.minHeight=rd.h+'px';
    }
    function onUp(){feSnap();document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseup',onUp);}
    document.addEventListener('mousemove',onMove);document.addEventListener('mouseup',onUp);
  });

  mei.appendChild(ta);
  wrap.append(lockBadge,dx,mei,rh);
  wrap._exitEditMode=()=>{ta.blur();};

  // ── Single unified mousedown — drag = move, click = edit (same as feRenderEl) ──
  ta.addEventListener('mousedown',ev=>{
    if(ev.button!==0)return;
    ev.stopPropagation();

    const additive=ev.metaKey||ev.ctrlKey;
    if(feSelIds.has(rd.id)&&additive){ feSelect(rd.id,true); return; }
    if(!feSelIds.has(rd.id)) feSelect(rd.id,additive);

    if(!ed)return;

    let ox=ev.clientX,oy=ev.clientY,moved=false;
    let snap=feEls.filter(e=>feSelIds.has(e.id)).map(e=>({rd:e,x0:e.x,y0:e.y}));

    // Prevent the browser from placing a text caret until we know it's a click not a drag
    ev.preventDefault();

    function onMove(e){
      if(!moved&&Math.abs(e.clientX-ox)+Math.abs(e.clientY-oy)<5)return;
      if(!moved){ moved=true; wrap.classList.add('being-moved'); }
      const ddx=e.clientX-ox,ddy=e.clientY-oy;
      snap.forEach(({rd:r,x0,y0})=>{
        r.x=showGrid?snapVal(x0+ddx):Math.round(x0+ddx);
        r.y=showGrid?snapVal(y0+ddy):Math.round(y0+ddy);
        const el=document.getElementById(r.id);
        if(el){el.style.left=r.x+'px';el.style.top=r.y+'px';}
        feInsUpdatePos(r);
      });
      chkConflict();if(showBB)renderBBs();
    }

    function onUp(e){
      window.removeEventListener('mousemove',onMove);
      window.removeEventListener('mouseup',onUp);
      wrap.classList.remove('being-moved');
      snap=[];

      if(moved){ feSnap(); return; }

      // Pure click (no drag): place caret at exact click position
      ta.focus();
      if(document.caretPositionFromPoint){
        const cp=document.caretPositionFromPoint(e.clientX,e.clientY);
        if(cp){
          const range=document.createRange();
          range.setStart(cp.offsetNode,cp.offset);
          range.collapse(true);
          const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);
        }
      } else if(document.caretRangeFromPoint){
        const range=document.caretRangeFromPoint(e.clientX,e.clientY);
        if(range){ const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range); }
      }
    }

    window.addEventListener('mousemove',onMove);
    window.addEventListener('mouseup',onUp);
  });

  g('fe-canvas').appendChild(wrap);
  chkConflict();if(showBB)renderBBs();
}

// ── Sync textbox typography from layer (called when layer font/color changes) ──
function _syncTextBoxes(layerId){
  feEls.filter(e=>e.type==='textbox'&&e.layerId===layerId).forEach(rd=>{
    const layer=layerById(rd.layerId);
    if(!rd._fontOverride) rd.font=layer.font||MFONT;
    if(!rd._fvsOverride)  rd.fvs=layer.fvs||'';
    if(!rd._colorOverride)rd.textColor=layer.textColor||'#000000';
    if(!rd._sizeOverride) rd.fontSize=layer.fontSize||defaultFontSize;
    // Live-update DOM without full re-render (avoids losing caret position)
    const el=document.getElementById(rd.id);
    if(el){
      const mei=el.querySelector('.tb-mei');
      const ta=el.querySelector('.tb-editor');
      if(mei){
        mei.style.fontFamily=rd.font;
        mei.style.color=rd.textColor;
        mei.style.fontSize=rd.fontSize+'px';
        if(rd.fvs) mei.style.fontVariationSettings=rd.fvs;
        else       mei.style.removeProperty('font-variation-settings');
      }
      if(ta){
        ta.style.fontFamily=rd.font;
        ta.style.color=rd.textColor;
        ta.style.fontSize=rd.fontSize+'px';
      }
    }
  });
}

// ── Inspector section for textbox ────────────────────────────────────────────
function _feInsTextBox(rd){
  const layer=layerById(rd.layerId);
  const ed=canEdit(rd.layerId);

  g('fe-ins-empty').style.display='none';
  g('fe-ins-multi').style.display='none';
  g('fe-ins-body').style.display='block';

  // Use "elem" tab
  const nameEl=g('ins-name');if(nameEl)nameEl.textContent='T';

  // Position
  feInsUpdatePos(rd);

  // Size slider — shows textbox font size
  const szSlider=g('ins-sz'),szNum=g('ins-sz-num');
  if(szSlider){szSlider.value=rd.fontSize;szSlider.disabled=!ed;}
  if(szNum){szNum.value=rd.fontSize;szNum.disabled=!ed;}

  // Opacity
  _setR('ins-op',rd.opacity,'ins-op-lbl',v=>v+'%');
  _setRangeDisabled('ins-op',!ed);

  // Hide free-sym section; show textbox-specific section
  g('ins-free-sec').style.display='none';
  g('math-frac-sec').style.display='none';
  g('math-rad-sec').style.display='none';
  g('math-delim-sec').style.display='none';
  g('math-op-sec').style.display='none';

  const tbSec=g('ins-tb-sec');
  if(tbSec){
    tbSec.style.display='block';
    // Width / Height inputs
    const wInp=g('ins-tb-w'),hInp=g('ins-tb-h');
    if(wInp)wInp.value=rd.w;
    if(hInp)hInp.value=rd.h;
  }

  // Active params (empty for textbox)
  const pc=g('active-params');if(pc)pc.innerHTML='<span style="font-size:10px;color:#bbb">—</span>';

  // Collision margin
  _setR('ins-mg',rd.margin||3,'ins-mg-lbl',v=>v+'px');
}



'use strict';
// ── Grille ──
function toggleGrid(){
  showGrid=!showGrid;g('tbGrid').classList.toggle('on',showGrid);
  g('gc-bar').style.display=showGrid?'flex':'none';
  if(showGrid)drawGrid();else{const s=g('grid-svg');if(s)s.style.opacity='0';}
  updateSnapLabel();
}
function setGridSz(sz){
  gridSz=sz;const lbl=g('gc-lbl');if(lbl)lbl.textContent=sz+'px';
  updateSnapLabel();if(showGrid)drawGrid();drawRulers();
}
function drawGrid(){
  const svg=g('grid-svg');if(!svg)return;
  const w=svg.clientWidth||800,h=svg.clientHeight||700;
  svg.style.opacity='1';
  let ln='';
  for(let x=0;x<=w;x+=gridSz)ln+=`<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="#e0e0e0" stroke-width="0.5"/>`;
  for(let y=0;y<=h;y+=gridSz)ln+=`<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="#e0e0e0" stroke-width="0.5"/>`;
  svg.innerHTML=ln;
}
function updateSnapLabel(){
  const m=gvs('snap-sel');
  const labels={s:`Fort — ${gridSz}px`,m:`Doux — ${gridSz/2}px`,n:'Libre — 1px'};
  const el=g('snap-desc');if(el)el.textContent=labels[m]||'';
}

// ── Axe MATH — removed from toolbar, function kept as no-op for compatibility ──
function toggleAxis(){ /* removed */ }

// ── Zones de collision ──
function toggleBB(){showBB=!showBB;g('tbBB').classList.toggle('on',showBB);renderBBs();}
function getBox(rd){
  const el=document.getElementById(rd.id);if(!el)return null;
  const cv=g('fe-canvas').getBoundingClientRect();
  const r=el.getBoundingClientRect();const m=rd.margin||5;
  return{x1:r.left-cv.left-m,y1:r.top-cv.top-m,x2:r.right-cv.left+m,y2:r.bottom-cv.top+m};
}
function ovlp(a,b){return a.x1<b.x2&&a.x2>b.x1&&a.y1<b.y2&&a.y2>b.y1;}
function chkConflict(){
  const bxs=feEls.map(d=>({d,box:getBox(d)})).filter(x=>x.box);
  feEls.forEach(d=>{
    const el=document.getElementById(d.id);if(!el)return;
    const mb=bxs.find(x=>x.d.id===d.id)?.box;if(!mb)return;
    const cf=bxs.some(x=>x.d.id!==d.id&&ovlp(mb,x.box));
    el.classList.toggle('conflict',cf&&feSelId===d.id);
  });
}
function renderBBs(){
  document.querySelectorAll('.bb-ov').forEach(b=>b.remove());
  if(!showBB)return;
  const cv=g('fe-canvas');if(!cv)return;
  feEls.forEach(d=>{
    const box=getBox(d);if(!box)return;
    const layer=layerById(d.layerId);
    const div=document.createElement('div');div.className='bb-ov';
    div.style.cssText=`left:${box.x1}px;top:${box.y1}px;width:${box.x2-box.x1}px;height:${box.y2-box.y1}px;border:1px dashed ${layer.color};opacity:.4`;
    cv.appendChild(div);
  });
}

// ── Axes personnalisés InDesign-style ──
// Tirer depuis la règle horizontale → axe horizontal
// Tirer depuis la règle verticale → axe vertical
function startGuide(type,ev){
  ev.preventDefault();
  const cv=g('fe-canvas');if(!cv)return;
  const cvRect=cv.getBoundingClientRect();
  const ghostAx=document.createElement('div');
  ghostAx.style.cssText=type==='h'
    ?`position:fixed;left:${cvRect.left}px;right:${window.innerWidth-cvRect.right}px;height:1px;background:rgba(216,90,48,.55);pointer-events:none;z-index:9999;top:${ev.clientY}px`
    :`position:fixed;top:${cvRect.top}px;bottom:${window.innerHeight-cvRect.bottom}px;width:1px;background:rgba(216,90,48,.55);pointer-events:none;z-index:9999;left:${ev.clientX}px`;
  document.body.appendChild(ghostAx);
  const onMove=e=>{
    if(type==='h')ghostAx.style.top=e.clientY+'px';
    else ghostAx.style.left=e.clientX+'px';
  };
  const onUp=e=>{
    ghostAx.remove();
    window.removeEventListener('mousemove',onMove);
    window.removeEventListener('mouseup',onUp);
    const pos=type==='h'
      ?Math.round(e.clientY-cvRect.top)
      :Math.round(e.clientX-cvRect.left);
    if(pos>0&&(type==='h'?pos<cvRect.height:pos<cvRect.width)){
      addCustomAxis(type,pos);
    }
  };
  window.addEventListener('mousemove',onMove);
  window.addEventListener('mouseup',onUp);
}

function addCustomAxis(type,pos){
  const id=uid();customAxes.push({id,type,pos});renderCustomAxes();
}

function renderCustomAxes(){
  document.querySelectorAll('.custom-axis').forEach(a=>a.remove());
  const cv=g('fe-canvas');if(!cv)return;
  customAxes.forEach(ax=>{
    const div=document.createElement('div');
    div.className='custom-axis '+(ax.type==='h'?'h-axis':'v-axis');
    div.id='cax-'+ax.id;
    if(ax.type==='h')div.style.top=ax.pos+'px';else div.style.left=ax.pos+'px';
    // Label de position
    const lbl=document.createElement('div');lbl.className='ax-lbl';lbl.textContent=ax.pos+'px';
    if(ax.type==='h')lbl.style.cssText='left:4px;top:-14px';
    else lbl.style.cssText='left:3px;top:4px;writing-mode:vertical-rl;font-size:7px';
    div.appendChild(lbl);
    // Drag pour repositionner
    let sp,sa,dragging=false;
    div.addEventListener('mousedown',ev=>{ev.stopPropagation();dragging=true;sp=ax.type==='h'?ev.clientY:ev.clientX;sa=ax.pos;});
    window.addEventListener('mousemove',ev=>{
      if(!dragging)return;
      const delta=(ax.type==='h'?ev.clientY:ev.clientX)-sp;
      ax.pos=Math.max(0,Math.round(sa+delta));
      div.style[ax.type==='h'?'top':'left']=ax.pos+'px';
      lbl.textContent=ax.pos+'px';
    });
    window.addEventListener('mouseup',()=>{dragging=false;});
    // Double-clic pour supprimer
    div.addEventListener('dblclick',ev=>{
      ev.stopPropagation();
      customAxes=customAxes.filter(a=>a.id!==ax.id);
      div.remove();toast(t('axis-deleted'));
    });
    div.title='Glisser = déplacer · Double-clic = supprimer';
    cv.appendChild(div);
  });
}

// ── Règles ──
function drawRulers(){
  drawRuler('h-ruler','h');drawRuler('v-ruler','v');
}
function drawRuler(canvasId,type){
  const canvas=g(canvasId);if(!canvas)return;
  const dpr=window.devicePixelRatio||1;
  const W=canvas.offsetWidth,H=canvas.offsetHeight;
  if(!W||!H)return;
  canvas.width=W*dpr;canvas.height=H*dpr;
  const ctx=canvas.getContext('2d');ctx.scale(dpr,dpr);
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle='#f0f0f0';ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='#d0d0d0';ctx.lineWidth=.5;
  ctx.fillStyle='#aaa';ctx.font='7px monospace';ctx.textAlign='center';
  const step=gridSz*2;
  if(type==='h'){
    ctx.beginPath();ctx.moveTo(0,H);ctx.lineTo(W,H);ctx.stroke();
    for(let x=0;x<W;x+=step){
      ctx.beginPath();ctx.moveTo(x,H);ctx.lineTo(x,H-4);ctx.stroke();
      if(x>0&&x%100===0)ctx.fillText(x,x,H-5);
    }
  } else {
    ctx.beginPath();ctx.moveTo(W,0);ctx.lineTo(W,H);ctx.stroke();
    for(let y=0;y<H;y+=step){
      ctx.beginPath();ctx.moveTo(W,y);ctx.lineTo(W-4,y);ctx.stroke();
      if(y>0&&y%100===0){ctx.save();ctx.translate(W-5,y);ctx.rotate(-Math.PI/2);ctx.fillText(y,0,0);ctx.restore();}
    }
  }
}


/* === fe-inspector.js === */

'use strict';

// Symbols that support horizontal stretch (scaleX)
const _SX_KEYS = new Set(['sqrt','cbrt','frac','sfrac','ar','iff','arr','lc_r','lc_l','lc_lr',
  '⇒','⟺','→','⟸','⟷','⟵','⟶','⟻','⟼','⟽','⟾','⟿']);
// Free-symbol chars that support horizontal stretch
const _SX_CHARS = new Set(['√','∛','⇒','⟺','→','⟸','⟷','⟵','⟶','⟻','⟼','⟽','⟾','⟿',
  '←','↔','↕','⟵','⟶','⟷','↦','↤','⟼','⟻','⟽','⟾','⟿',
  '─','━','═','—','―','‾','_','-']);
// Symbols that support vertical stretch (stretchY) — formerly size-driven for delimiters/integral
const _SY_KEYS  = new Set(['paren','brack','brace','abs','norm','floor','ceil','int']);

function _nodeCanStretchX(n){
  if(!n||n.type!=='free')return false;
  if(_SX_KEYS.has(n.k))return true;
  return _SX_CHARS.has(n.text||n.s||'');
}
function _nodeCanStretchY(n){
  if(!n)return false;
  // delim nodes, half-delim nodes, or integral op
  if(n.type==='delim'||n.type==='hdelim')return true;
  if(n.type==='op'&&n.k==='int')return true;
  return false;
}

function feInsClear(){
  g('fe-ins-empty').style.display='block';
  g('fe-ins-body').style.display='none';
  g('fe-ins-multi').style.display='none';
  const tbSec=g('ins-tb-sec');if(tbSec)tbSec.style.display='none';
  const eqBtn=g('eq-save-btn');
  if(eqBtn)eqBtn.textContent=t('eq-save-all-btn');
}
function feInsTab(t){
  ['elem','math'].forEach(id=>{
    g('fit-'+id).classList.toggle('on',id===t);
    g('fe-it-'+id).classList.toggle('hidden-pb',id!==t);
  });
}
function feInsUpdate(){
  // Update "Save selection" button label based on current selection
  const eqBtn=g('eq-save-btn');
  if(eqBtn)eqBtn.textContent=feSelIds.size
    ? t('eq-save-sel-btn')
    : t('eq-save-all-btn');

  const rd=feEls.find(e=>e.id===feSelId);
  // Multi-sélection (2+ éléments) → afficher le panneau multi
  if(feSelIds.size>1){
    g('fe-ins-empty').style.display='none';
    g('fe-ins-body').style.display='none';
    g('fe-ins-multi').style.display='block';
    _updMultiInsPanel();
    return;
  }
  if(!rd){feInsClear();return;}

  // Textbox has its own inspector
  if(rd.type==='textbox'){_feInsTextBox(rd);return;}
  g('fe-ins-empty').style.display='none';
  g('fe-ins-multi').style.display='none';
  g('fe-ins-body').style.display='block';
  const tbSec=g('ins-tb-sec');if(tbSec)tbSec.style.display='none';
  const ed=canEdit(rd.layerId);
  const n=rd.node;

  // Symbol name
  g('ins-name').textContent=n.lbl||n.s||'?';

  // Position — numeric inputs
  feInsUpdatePos(rd);

  // Size — slider + number in sync
  const szSlider=g('ins-sz'),szNum=g('ins-sz-num');
  if(szSlider){szSlider.value=rd.size;szSlider.disabled=!ed;}
  if(szNum){szNum.value=rd.size;szNum.disabled=!ed;}

  // Opacity
  _setR('ins-op',rd.opacity,'ins-op-lbl',v=>v+'%');
  _setRangeDisabled('ins-op',!ed);

  // Free symbol section
  const isFree=n.type==='free';
  g('ins-free-sec').style.display=isFree?'block':'none';
  if(isFree){
    // Étirement X — conditional
    const canX=_nodeCanStretchX(n);
    g('ins-sx-row').style.display=canX?'':'none';
    if(canX) _setR('ins-sx',n.stretch||100,'ins-sx-lbl',v=>v+'%');

    // Étirement Y — shown only for free nodes that are delim-like
    // (for free nodes this is n.stretchY; delim/op handled separately below)
    g('ins-sy-row').style.display='none';

    _setR('ins-ax',n.axis||0,'ins-ax-lbl',v=>v+'px');
    _setR('ins-ic',n.ic||0,'ins-ic-lbl',v=>v+'px');
  }

  // Étirement Y for delim / integral (shown inside free-sec area but controlled via ins-sy-row)
  // We show the section even for non-free nodes when stretchY applies
  const canY=_nodeCanStretchY(n);
  if(canY){
    g('ins-free-sec').style.display='block';
    g('ins-sy-row').style.display='';
    const syVal=n.stretchY||100;
    const sySlider=g('ins-sy'),syNum=g('ins-sy-num');
    if(sySlider)sySlider.value=syVal;
    if(syNum)syNum.value=syVal;
  }

  // MATH Table sections
  g('math-frac-sec').style.display=(n.type==='frac')?'block':'none';
  g('math-rad-sec').style.display=(n.type==='rad')?'block':'none';
  g('math-delim-sec').style.display=(n.type==='delim'||n.type==='hdelim')?'block':'none';
  g('math-op-sec').style.display=(n.type==='op')?'block':'none';
  if(n.type==='frac'){
    _setR('mp-frt',n.frt,.060,'mp-frt-l',v=>v.toFixed(3)+'em');
    _setR('mp-fnu',n.fnumerUp,.35,'mp-fnu-l',v=>v.toFixed(2)+'em');
    _setR('mp-fdd',n.fdenomDown,.35,'mp-fdd-l',v=>v.toFixed(2)+'em');
    _setR('mp-fng',n.fnumGap||.09,.09,'mp-fng-l',v=>v.toFixed(3)+'em');
    _setR('mp-fdg',n.fdenGap||.09,.09,'mp-fdg-l',v=>v.toFixed(3)+'em');
  }
  if(n.type==='rad'){
    _setR('mp-rrt',n.rrt,.05,'mp-rrt-l',v=>v.toFixed(3)+'em');
    _setR('mp-rvg',n.rvg,.12,'mp-rvg-l',v=>v.toFixed(2)+'em');
    _setR('mp-rxa',n.rxa||.05,.05,'mp-rxa-l',v=>v.toFixed(2)+'em');
  }
  if(n.type==='delim'||n.type==='hdelim'){
    _setR('mp-mco',n.minOv||2,2,'mp-mco-l',v=>v+'px');
  }
  if(n.type==='op'){
    _setR('mp-dom',n.dispOpH||55,55,'mp-dom-l',v=>v+'px');
    _setR('mp-ulg',n.upperGap||.05,.05,'mp-ulg-l',v=>v.toFixed(2)+'em');
    _setR('mp-llg',n.lowerGap||.05,.05,'mp-llg-l',v=>v.toFixed(2)+'em');
  }

  // Active params
  const pc=g('active-params');if(pc){
    pc.innerHTML='';
    (n.p||[]).forEach(p=>{const t=document.createElement('div');t.className='ptag';t.textContent=p;pc.appendChild(t);});
    if(!(n.p||[]).length)pc.innerHTML='<span style="font-size:10px;color:#bbb">—</span>';
  }

  // Collision margin
  _setR('ins-mg',rd.margin||5,'ins-mg-lbl',v=>v+'px');
}

function feInsUpdatePos(rd){
  const px=g('ins-px'),py=g('ins-py');
  if(px)px.value=rd.x;
  if(py)py.value=rd.y;
}

// ── Panneau multi-sélection ──────────────────────────────────────────────────
function _updMultiInsPanel(){
  const panel=g('fe-ins-multi');if(!panel)return;
  const sel=feEls.filter(e=>feSelIds.has(e.id));
  const cnt=g('multi-sel-count');if(cnt)cnt.textContent=sel.length;
  // Récupérer la taille de l'élément primary pour les sliders
  const primary=feEls.find(e=>e.id===feSelId);
  const szSlider=g('multi-sz'),szNum=g('multi-sz-num');
  if(primary){
    if(szSlider)szSlider.value=primary.size;
    if(szNum)szNum.value=primary.size;
  }
  const opSlider=g('multi-op'),opLbl=g('multi-op-lbl');
  if(primary){
    if(opSlider)opSlider.value=primary.opacity;
    if(opLbl)opLbl.textContent=primary.opacity+'%';
  }
  // Afficher les couches disponibles pour le changement
  const layerSel=g('multi-layer-sel');
  if(layerSel){
    layerSel.innerHTML='';
    const mixedOpt=document.createElement('option');mixedOpt.value='';mixedOpt.textContent=t('multi-mixed');layerSel.appendChild(mixedOpt);
    layers.forEach(l=>{const opt=document.createElement('option');opt.value=l.id;opt.textContent=l.name;layerSel.appendChild(opt);});
    // Si tous dans le même layer, pré-sélectionner
    const layerIds=new Set(sel.map(e=>e.layerId));
    if(layerIds.size===1)layerSel.value=[...layerIds][0];
    else layerSel.value='';
  }
}

// Appliquer taille à toute la sélection (multi)
function uMultiSz(v){
  v=Math.max(14,Math.min(120,v));
  const sl=g('multi-sz'),nm=g('multi-sz-num');
  if(sl)sl.value=v;if(nm)nm.value=v;
  feEls.filter(e=>feSelIds.has(e.id)&&canEdit(e.layerId)).forEach(rd=>{rd.size=v;feRenderEl(rd);});
  clearTimeout(uMultiSz._t);uMultiSz._t=setTimeout(()=>feSnap(),400);
}

// Appliquer opacité à toute la sélection (multi)
function uMultiOp(v){
  const lbl=g('multi-op-lbl');if(lbl)lbl.textContent=v+'%';
  feEls.filter(e=>feSelIds.has(e.id)&&canEdit(e.layerId)).forEach(rd=>{
    rd.opacity=v;const el=document.getElementById(rd.id);if(el)el.style.opacity=v/100;
  });
}

// Changer le layer de tous les éléments sélectionnés
function uMultiLayer(layerId){
  if(!layerId)return;
  feSnap();
  feEls.filter(e=>feSelIds.has(e.id)).forEach(rd=>{
    rd.layerId=layerId;feRenderEl(rd);
  });
  feSnap();
}

// helpers
function _setR(sliderId,val,labelId,fmt){
  // Handle both 4-arg (sliderId,val,labelId,fmt) and legacy 5-arg calls
  if(typeof labelId==='function'){fmt=labelId;labelId=null;}
  const sl=g(sliderId);if(!sl)return;
  if(typeof val==='number'){
    sl.value=val;
    if(typeof labelId==='string'){const lbl=g(labelId);if(lbl&&fmt)lbl.textContent=fmt(val);}
  }
}
function _setRangeDisabled(id,disabled){const el=g(id);if(el)el.disabled=disabled;}

// ── Helpers sélection targets ──
function _selTargets(){
  return feSelIds.size>1
    ? feEls.filter(e=>feSelIds.has(e.id)&&canEdit(e.layerId))
    : feEls.filter(e=>e.id===feSelId&&canEdit(e.layerId));
}

// Update from sliders/inputs
function uElSz(v){
  v=Math.max(14,Math.min(120,v));
  _selTargets().forEach(rd=>{
    rd.size=v;
    // textboxes store font size separately
    if(rd.type==='textbox'){rd.fontSize=v;rd._sizeOverride=true;}
    feRenderEl(rd);
  });
  const sl=g('ins-sz'),nm=g('ins-sz-num');
  if(sl)sl.value=v;if(nm)nm.value=v;
  if(feSelIds.size<=1)feInsUpdate();
}
function uElPosX(v){
  const rd=feEls.find(e=>e.id===feSelId);if(!rd||!canEdit(rd.layerId))return;
  rd.x=Math.max(0,Math.round(v));
  const el=document.getElementById(rd.id);if(el)el.style.left=rd.x+'px';
  feInsUpdatePos(rd);chkConflict();if(showBB)renderBBs();
  clearTimeout(uElPosX._t);uElPosX._t=setTimeout(()=>feSnap(),400);
}
function uElPosY(v){
  const rd=feEls.find(e=>e.id===feSelId);if(!rd||!canEdit(rd.layerId))return;
  rd.y=Math.max(0,Math.round(v));
  const el=document.getElementById(rd.id);if(el)el.style.top=rd.y+'px';
  feInsUpdatePos(rd);chkConflict();if(showBB)renderBBs();
  clearTimeout(uElPosY._t);uElPosY._t=setTimeout(()=>feSnap(),400);
}
function uElOp(v){
  const lbl=g('ins-op-lbl');if(lbl)lbl.textContent=v+'%';
  _selTargets().forEach(rd=>{
    rd.opacity=v;const el=document.getElementById(rd.id);if(el)el.style.opacity=v/100;
  });
}
function uElMg(v){
  const rd=feEls.find(e=>e.id===feSelId);if(!rd||!canEdit(rd.layerId))return;
  rd.margin=v;g('ins-mg-lbl').textContent=v+'px';chkConflict();if(showBB)renderBBs();
}

// Textbox dimension update from inspector
function uTbDim(prop,v){
  const rd=feEls.find(e=>e.id===feSelId);if(!rd||rd.type!=='textbox'||!canEdit(rd.layerId))return;
  v=Math.max(prop==='w'?40:20,Math.round(v));
  rd[prop]=v;
  const el=document.getElementById(rd.id);
  if(el){
    const mei=el.querySelector('.tb-mei');
    const ta=el.querySelector('.tb-editor');
    if(prop==='w'){
      if(mei)mei.style.width=v+'px';
      if(ta)ta.style.width=v+'px';
    } else {
      if(mei)mei.style.minHeight=v+'px';
      if(ta)ta.style.minHeight=v+'px';
    }
  }
  clearTimeout(uTbDim._t);uTbDim._t=setTimeout(()=>feSnap(),400);
}
// Étirement Y — applies to delim / integral via stretchY property
function uElStretchY(v){
  const rd=feEls.find(e=>e.id===feSelId);if(!rd||!canEdit(rd.layerId))return;
  v=Math.max(100,Math.min(600,v));
  rd.node.stretchY=v;
  const sl=g('ins-sy'),nm=g('ins-sy-num');
  if(sl)sl.value=v;if(nm)nm.value=v;
  feRenderEl(rd);
  clearTimeout(uElStretchY._t);uElStretchY._t=setTimeout(()=>feSnap(),400);
}
function uElNode(prop,v){
  const rd=feEls.find(e=>e.id===feSelId);if(!rd||!canEdit(rd.layerId))return;
  rd.node[prop]=v;
  const labelMap={
    stretch:'ins-sx-lbl',axis:'ins-ax-lbl',ic:'ins-ic-lbl',
    frt:'mp-frt-l',fnumerUp:'mp-fnu-l',fdenomDown:'mp-fdd-l',fnumGap:'mp-fng-l',fdenGap:'mp-fdg-l',
    rrt:'mp-rrt-l',rvg:'mp-rvg-l',rxa:'mp-rxa-l',
    minOv:'mp-mco-l',dispOpH:'mp-dom-l',upperGap:'mp-ulg-l',lowerGap:'mp-llg-l',
  };
  const fmtMap={
    stretch:x=>x+'%',axis:x=>x+'px',ic:x=>x+'px',
    frt:x=>x.toFixed(3)+'em',fnumerUp:x=>x.toFixed(2)+'em',fdenomDown:x=>x.toFixed(2)+'em',
    fnumGap:x=>x.toFixed(3)+'em',fdenGap:x=>x.toFixed(3)+'em',
    rrt:x=>x.toFixed(3)+'em',rvg:x=>x.toFixed(2)+'em',rxa:x=>x.toFixed(2)+'em',
    minOv:x=>x+'px',dispOpH:x=>x+'px',upperGap:x=>x.toFixed(2)+'em',lowerGap:x=>x.toFixed(2)+'em',
  };
  if(labelMap[prop]){const el=g(labelMap[prop]);if(el&&fmtMap[prop])el.textContent=fmtMap[prop](v);}
  feRenderEl(rd);
}


/* === fonts.js === */

'use strict';
function fontDrop(ev){
  ev.preventDefault();g('font-dz')?.classList.remove('dov');
  const f=ev.dataTransfer?.files?.[0];if(f)processFont(f);
}
// Click on a font drop zone → file picker (only if fonts are allowed)
function fontPick(){if(_guestOK('fonts'))g('font-file-inp').click();}
function loadFontFile(inp){
  const f=inp?.files?.[0];if(f)processFont(f);inp.value='';
}

// opts (all optional) — used when a font is restored from the user's account:
//   name   → reuse the saved CSS family name, so layers/equations that reference it keep working
//   label  → display name;  silent → no toast;  cloud → already stored online
// Returns the font entry (or null on duplicate/error).
async function processFont(file,opts={}){
  if(!opts.cloud&&!_guestOK('fonts'))return null; // fonts restored from the account are never blocked
  try{
    const ab=await file.arrayBuffer();
    // Same file imported twice → reuse (content hash, not file name)
    const hash=await _sha256Hex(ab);
    if(loadedFonts.some(f=>f.hash===hash)){if(!opts.silent)toast(t('font-dup'));return null;}
    // Deux copies : une pour FontFace (sera consumée), une pour opentype.js
    const abForFace=ab.slice(0);
    const abForParse=ab.slice(0);

    const name=opts.name||'CF_'+Date.now();
    const ff=new FontFace(name,abForFace);
    await ff.load();
    document.fonts.add(ff);

    const fd={
      name,
      label:opts.label||file.name.replace(/\.[^.]+$/,''),
      css:`'${name}',serif`,
      axes:[],   // [{tag, label, min, max, def, val}]
      fvs:'',
      hash,
      _cloud:!!opts.cloud, // true once the file is stored in the user's account
      _otf:null  // référence opentype.js — stockée par fonte, pas globale
    };

    // ── Parse via opentype.js (source de vérité pour les axes) ──────────────
    if(typeof opentype!=='undefined'){
      try{
        const otf=opentype.parse(abForParse);
        fd._otf=otf;
        // Met aussi à jour le global pour bIntegral (dernier chargé)
        window._limouOTFont=otf;

        if(otf.tables&&otf.tables.fvar&&otf.tables.fvar.axes){
          fd.axes=otf.tables.fvar.axes.map(ax=>{
            // opentype.js expose minValue / defaultValue / maxValue comme nombres JS
            const mn=ax.minValue??ax.min??0;
            const df=ax.defaultValue??ax.def??mn;
            const mx=ax.maxValue??ax.max??mn;
            // Nom lisible : cherche dans la table name si dispo
            let lbl=ax.tag;
            if(ax.name&&typeof ax.name==='object'){
              lbl=ax.name.en||ax.name[Object.keys(ax.name)[0]]||ax.tag;
            } else if(typeof ax.name==='string'&&ax.name){
              lbl=ax.name;
            }
            console.log(`[Limou] Axis: tag="${ax.tag}" label="${lbl}" min=${mn} def=${df} max=${mx}`);
            return{tag:ax.tag,label:lbl,min:Math.round(mn),max:Math.round(mx),def:Math.round(df),val:Math.round(df)};
          });
          console.log(`[Limou] Variable font "${fd.label}" — ${fd.axes.length} axis(es) found:`,fd.axes.map(a=>a.tag));
        } else {
          console.log(`[Limou] Font "${fd.label}" — no fvar table (static font)`);
        }
      }catch(e){
        console.warn('[Limou] opentype.js parse error:',e);
        // Fallback : parseur binaire maison
        fd.axes=_parseFvarFallback(new Uint8Array(abForParse));
        if(fd.axes.length)console.log(`[Limou] Fallback parser found ${fd.axes.length} axes`);
      }
    } else {
      // opentype.js non chargé : fallback binaire
      fd.axes=_parseFvarFallback(new Uint8Array(abForParse));
    }

    // FVS initial depuis les valeurs par défaut
    fd.fvs=axFVS(fd.axes);

    if(typeof _clearDelimCaches==='function')_clearDelimCaches();
    loadedFonts.push(fd);
    renderFontList();
    if(!opts.silent)toast(t('font-imported')+' '+fd.label+(fd.axes.length?' ('+fd.axes.length+' axes)':''));
    if(!fd._cloud)_cloudFontAdded(fd,ab);
    return fd;
  }catch(e){
    console.error('[Limou] processFont error:',e);
    if(!opts.silent)toast(t('font-error')+' '+e.message);
    return null;
  }
}

// SHA-256 of a font file, as hex — identifies a font by its content
async function _sha256Hex(ab){
  const h=await crypto.subtle.digest('SHA-256',ab);
  return [...new Uint8Array(h)].map(b=>b.toString(16).padStart(2,'0')).join('');
}

// ── Fallback parseur fvar binaire (Fixed 16.16 correctement lu) ─────────────
// Utilisé uniquement si opentype.js n'est pas disponible.
function _parseFvarFallback(bytes){
  const view=new DataView(bytes.buffer);
  const axes=[];
  try{
    const numTables=view.getUint16(4);
    for(let i=0;i<numTables;i++){
      const o=12+i*16;
      const tag=String.fromCharCode(bytes[o],bytes[o+1],bytes[o+2],bytes[o+3]);
      if(tag==='fvar'){
        const fvarOff=view.getUint32(o+8);
        const axesOff=fvarOff+view.getUint16(fvarOff+4);  // axesArrayOffset
        const axisCount=view.getUint16(fvarOff+8);
        const axisSize=view.getUint16(fvarOff+10)||20;
        for(let a=0;a<axisCount;a++){
          const ao=axesOff+a*axisSize;
          const atag=String.fromCharCode(bytes[ao],bytes[ao+1],bytes[ao+2],bytes[ao+3]);
          // Fixed 16.16 → diviser par 65536
          const mn=view.getInt32(ao+4)/65536;
          const df=view.getInt32(ao+8)/65536;
          const mx=view.getInt32(ao+12)/65536;
          axes.push({tag:atag,label:atag,min:Math.round(mn),max:Math.round(mx),def:Math.round(df),val:Math.round(df)});
        }
        break;
      }
    }
  }catch(e){console.warn('[Limou] fvar fallback parse error:',e);}
  return axes;
}

function axFVS(axes){
  if(!axes.length)return'';
  return axes.map(a=>`'${a.tag}' ${a.val}`).join(', ');
}

// Resync l'onglet Font (couleur + taille) quand la couche active change
function _syncFontTabColor(){
  const fontPanel=g('fe-pb-font');
  if(fontPanel&&!fontPanel.classList.contains('hidden-pb'))renderFontList();
}

// ── Noms lisibles pour axes standard (fallback si le nom n'est pas dans la fonte) ──
const _AXIS_DISPLAY={
  'wght':'Weight','wdth':'Width','ital':'Italic','slnt':'Slant',
  'opsz':'Optical Size','GRAD':'Grade','XTRA':'X Transparent',
  'XOPQ':'X Opaque','YOPQ':'Y Opaque','YTLC':'LC Y Transparent',
  'YTUC':'UC Y Transparent','YTAS':'Ascender','YTDE':'Descender',
  'YTFI':'Figure Height'
};
function _axisDisplayName(ax){
  // Priorité : nom dans la fonte → dictionnaire → tag brut
  if(ax.label&&ax.label!==ax.tag)return ax.label;
  return _AXIS_DISPLAY[ax.tag]||ax.tag;
}

// ── Styles statiques potentiels ──────────────────────────────────────────────
const STATIC_STYLES=[
  {label:'Thin',       weight:'100',style:'normal'},
  {label:'ExtraLight', weight:'200',style:'normal'},
  {label:'Light',      weight:'300',style:'normal'},
  {label:'Regular',    weight:'400',style:'normal'},
  {label:'Medium',     weight:'500',style:'normal'},
  {label:'SemiBold',   weight:'600',style:'normal'},
  {label:'Bold',       weight:'700',style:'normal'},
  {label:'ExtraBold',  weight:'800',style:'normal'},
  {label:'Black',      weight:'900',style:'normal'},
  {label:'Italic',     weight:'400',style:'italic'},
  {label:'Bold Italic',weight:'700',style:'italic'},
];

function renderFontList(){
  const list=g('font-list');if(!list)return;list.innerHTML='';
  const al=activeLayer();

  // ── Taille par défaut ─────────────────────────────────────────────────────
  const szSec=document.createElement('div');szSec.className='font-ctrl-sec';
  const szLblRow=document.createElement('div');szLblRow.className='axis-lbl-row';
  const szLblTxt=document.createElement('span');szLblTxt.textContent=t('font-default-size');
  const szValTxt=document.createElement('span');szValTxt.style.fontFamily='monospace';
  const curSz=al.fontSize||defaultFontSize;
  szValTxt.textContent=curSz+'px';
  szLblRow.append(szLblTxt,szValTxt);
  const szSlider=document.createElement('input');szSlider.type='range';szSlider.className='font-axis-slider';
  szSlider.min=14;szSlider.max=120;szSlider.step=2;szSlider.value=curSz;
  const szNum=document.createElement('input');szNum.type='number';szNum.min=14;szNum.max=120;szNum.step=2;szNum.value=curSz;
  szNum.className='font-sz-num';
  const szRow=document.createElement('div');szRow.className='font-sz-row';szRow.append(szSlider,szNum);
  const syncSz=(v)=>{
    v=Math.min(120,Math.max(14,+v||50));
    const layer=activeLayer();
    layer.fontSize=v;
    defaultFontSize=v;
    szSlider.value=v;szNum.value=v;szValTxt.textContent=v+'px';
    localStorage.setItem('limou-default-sz',v);
    feEls.filter(e=>e.layerId===layer.id).forEach(rd=>{rd.size=v;feRenderEl(rd);});
    _syncTextBoxes(layer.id);
    if(feSelId)feInsUpdate();
  };
  szSlider.oninput=()=>syncSz(+szSlider.value);
  szNum.oninput=()=>syncSz(+szNum.value);
  szSec.append(szLblRow,szRow);list.appendChild(szSec);

  // ── Couleur de texte ──────────────────────────────────────────────────────
  const clrSec=document.createElement('div');clrSec.className='font-ctrl-sec';
  const clrLblRow=document.createElement('div');clrLblRow.className='axis-lbl-row';
  clrLblRow.appendChild(Object.assign(document.createElement('span'),{textContent:t('font-text-color')}));
  const clrRow=document.createElement('div');clrRow.className='font-color-row';
  const clrPicker=document.createElement('input');clrPicker.type='color';clrPicker.id='font-color-pick';
  clrPicker.className='font-color-pick';clrPicker.value=al.textColor||'#000000';
  const clrHex=document.createElement('span');clrHex.className='font-color-hex';clrHex.style.fontFamily='monospace';clrHex.textContent=clrPicker.value;
  const clrReset=document.createElement('button');clrReset.className='font-color-reset';clrReset.textContent='↺';clrReset.title=t('font-color-reset');
  clrPicker.oninput=()=>{
    clrHex.textContent=clrPicker.value;
    const layer=activeLayer();layer.textColor=clrPicker.value;
    feEls.filter(e=>e.layerId===layer.id).forEach(feRenderEl);
    _syncTextBoxes(layer.id);
  };
  clrReset.onclick=()=>{clrPicker.value='#000000';clrPicker.oninput();};
  clrRow.append(clrPicker,clrHex,clrReset);
  clrSec.append(clrLblRow,clrRow);list.appendChild(clrSec);

  if(!loadedFonts.length){
    list.appendChild(Object.assign(document.createElement('div'),{className:'font-empty-note',textContent:t('font-no-fonts')}));
    return;
  }

  list.appendChild(Object.assign(document.createElement('div'),{className:'font-sec-sep'}));

  loadedFonts.forEach(font=>{
    const item=document.createElement('div');item.className='font-item';
    const nm=document.createElement('div');nm.className='font-name-lbl';nm.textContent=font.label;

    // Badge variable / statique
    const badge=document.createElement('span');badge.className='font-type-badge';
    badge.textContent=font.axes.length?t('font-badge-variable'):t('font-badge-static');
    badge.classList.toggle('variable',font.axes.length>0);

    const nmRow=document.createElement('div');nmRow.style.cssText='display:flex;align-items:center;justify-content:space-between;margin-bottom:3px';
    nmRow.append(nm,badge);

    const pv=document.createElement('div');pv.className='font-preview';
    pv.style.fontFamily=font.css;
    pv.textContent='f(x) = ∑αᵢ/π';
    // Appliquer le fvs courant de la fonte au preview
    if(font.fvs)pv.style.fontVariationSettings=font.fvs;
    item.append(nmRow,pv);

    if(font.axes.length>0){
      // ── Police variable : un slider par axe ────────────────────────────
      // Lire les valeurs actuelles depuis la couche active si elle utilise cette fonte
      const layer=activeLayer();
      if(layer.font===font.css&&layer.fvs){
        // Resync les ax.val depuis layer.fvs pour que les sliders reflètent l'état courant
        _syncAxesFromFVS(font.axes,layer.fvs);
        if(font.fvs)pv.style.fontVariationSettings=font.fvs;
      }

      font.axes.forEach(ax=>{
        const axRow=document.createElement('div');axRow.style.marginTop='5px';
        const lrow=document.createElement('div');lrow.className='axis-lbl-row';
        const name=_axisDisplayName(ax);
        const ls=document.createElement('span');ls.textContent=`${name}`;
        const tagBadge=document.createElement('span');tagBadge.className='axis-tag-badge';tagBadge.textContent=ax.tag;
        const lsWrap=document.createElement('span');lsWrap.style.cssText='display:flex;align-items:center;gap:4px';lsWrap.append(ls,tagBadge);
        const vs=document.createElement('span');vs.style.fontFamily='monospace';vs.textContent=ax.val;
        lrow.append(lsWrap,vs);

        const sl=document.createElement('input');sl.type='range';sl.className='font-axis-slider';
        sl.min=ax.min;sl.max=ax.max;
        // Pas adaptatif : 1 pour les axes entiers, décimal pour des axes à plage <10
        sl.step=(ax.max-ax.min)<=10?0.1:1;
        sl.value=ax.val;

        sl.oninput=()=>{
          const v=+sl.value;
          ax.val=v;
          vs.textContent=Number.isInteger(v)?v:v.toFixed(1);
          // Recalcule le fvs complet de la fonte
          font.fvs=axFVS(font.axes);
          // Met à jour le preview
          pv.style.fontVariationSettings=font.fvs;
          // ── Propagation vers la couche active si elle utilise cette fonte ──
          const layer=activeLayer();
          if(layer.font===font.css){
            layer.fvs=font.fvs;
            console.log(`[Limou] FVS update → layer "${layer.name}": ${font.fvs}`);
            feEls.filter(e=>e.layerId===layer.id).forEach(rd=>feRenderEl(rd));
            buildKb();
          }
        };
        axRow.append(lrow,sl);item.appendChild(axRow);
      });

    } else {
      // ── Police statique ────────────────────────────────────────────────
      const styRow=document.createElement('div');styRow.className='font-style-row';
      const styLbl=document.createElement('div');styLbl.className='axis-lbl-row';
      styLbl.appendChild(Object.assign(document.createElement('span'),{textContent:t('font-styles')}));
      const styGrid=document.createElement('div');styGrid.className='font-style-grid';
      _buildStaticStyleBtns(styGrid,font,pv);
      styRow.append(styLbl,styGrid);item.appendChild(styRow);
    }

    const applyBtn=document.createElement('div');applyBtn.className='font-apply';
    applyBtn.textContent=t('font-apply-text');
    applyBtn.onclick=()=>{
      const layer=activeLayer();
      layer.font=font.css;
      layer.fvs=font.axes.length?axFVS(font.axes):'';
      layer.name=font.label;
      // Met aussi à jour _otf global pour bIntegral
      if(font._otf)window._limouOTFont=font._otf;
      if(typeof _clearDelimCaches==='function')_clearDelimCaches();
      buildKb();renderLayers();
      feEls.filter(e=>e.layerId===activeLayerId).forEach(rd=>feRenderEl(rd));
      // Sync textboxes that haven't been locally overridden
      _syncTextBoxes(activeLayerId);
      console.log(`[Limou] Font applied: "${layer.name}", fvs="${layer.fvs}"`);
      toast(t('font-applied')+' "'+layer.name+'"');
    };
    item.appendChild(applyBtn);list.appendChild(item);
  });
}

// ── Lit le fvs d'une couche et remet les ax.val en sync ─────────────────────
function _syncAxesFromFVS(axes,fvs){
  if(!fvs)return;
  // Format: "'wght' 400, 'wdth' 100" → on extrait chaque paire tag/valeur
  fvs.split(',').forEach(part=>{
    const m=part.trim().match(/^'([^']+)'\s+([\d.]+)$/);
    if(!m)return;
    const [,tag,val]=m;
    const ax=axes.find(a=>a.tag===tag);
    if(ax)ax.val=+val;
  });
}

// ── Détection des styles statiques disponibles ───────────────────────────────
function _buildStaticStyleBtns(grid,font,preview){
  if(!font._activeStyle)font._activeStyle=STATIC_STYLES[3];
  const setStyle=(sty)=>{
    font._activeStyle=sty;
    preview.style.fontWeight=sty.weight;
    preview.style.fontStyle=sty.style;
    grid.querySelectorAll('.font-sty-btn').forEach(b=>{
      b.classList.toggle('on',b.dataset.w===sty.weight&&b.dataset.s===sty.style);
    });
  };
  STATIC_STYLES.forEach(sty=>{
    const btn=document.createElement('button');
    btn.className='font-sty-btn';
    btn.dataset.w=sty.weight;btn.dataset.s=sty.style;
    btn.textContent=sty.label;
    btn.style.cssText=`font-family:${font.css};font-weight:${sty.weight};font-style:${sty.style}`;
    const check=`${sty.style} ${sty.weight} 12px ${font.css}`;
    if(!document.fonts.check(check))btn.classList.add('unavailable');
    if(sty.weight===font._activeStyle.weight&&sty.style===font._activeStyle.style)btn.classList.add('on');
    btn.onclick=()=>setStyle(sty);
    grid.appendChild(btn);
  });
}


/* === history.js === */

'use strict';
// Undo/Redo séparé pour FE et Document
const MAX_H = 50;
let feHistory=[],feHistIdx=-1;
let docHistory=[],docHistIdx=-1;

// ── Helpers partagés ──
function _snap(history,idx,data){
  history.splice(idx+1);
  history.push(JSON.stringify(data));
  if(history.length>MAX_H)history.shift();
  return history.length-1;
}
function feSnap(){feHistIdx=_snap(feHistory,feHistIdx,feEls);_updHist();}
function docSnap(){docHistIdx=_snap(docHistory,docHistIdx,docBlocks);_updHist();}

function feUndo(){
  if(feHistIdx<=0)return;feHistIdx--;
  _feRestore(feHistory[feHistIdx]);toast(t('undo'));
}
function feRedo(){
  if(feHistIdx>=feHistory.length-1)return;feHistIdx++;
  _feRestore(feHistory[feHistIdx]);toast(t('redo'));
}
function _feRestore(json){
  document.querySelectorAll('.fe-el').forEach(e=>e.remove());
  feEls=JSON.parse(json);
  feEls.forEach(rd=>feRenderEl(rd));
  feSyncZOrder();
  if(feSelId&&!feEls.find(e=>e.id===feSelId)){feSelId=null;feSelIds.clear();feInsClear();}
  else if(feSelId){feSelIds=new Set([feSelId]);feInsUpdate();}
  chkConflict();if(showBB)renderBBs();_updHist();
}

function docUndo(){
  if(docHistIdx<=0)return;docHistIdx--;
  _docRestore(docHistory[docHistIdx]);toast(t('undo'));
}
function docRedo(){
  if(docHistIdx>=docHistory.length-1)return;docHistIdx++;
  _docRestore(docHistory[docHistIdx]);toast(t('redo'));
}
function _docRestore(json){
  docBlocks=JSON.parse(json);
  renderDocList();renderDocPage();_updHist();
}

function _updHist(){
  const fe=appMode==='fe';
  const el=g('st-hist');
  if(el){const idx=fe?feHistIdx:docHistIdx;const h=fe?feHistory:docHistory;el.textContent=`${idx+1}/${h.length}`;}
}


/* === init.js === */

'use strict';
document.addEventListener('DOMContentLoaded',()=>{
  // Start in Formulas mode
  switchMode('fe');
  // Initial layers
  renderLayers();
  // FE Canvas
  initFECanvas();
  // Snap label
  updateSnapLabel();
  // Grid off by default
  g('tbGrid').classList.remove('on');
  // Apply language on load
  _applyLang();
  // Doc text tool drag handler
  _initDocTextTool();

  // ── Global ghost tracking — registered ONCE here so it works for both
  //    regular keyboard keys AND accent popup keys (which live in document.body)
  document.addEventListener('dragover',ev=>{
    if(ghost){ghost.style.left=ev.clientX+'px';ghost.style.top=ev.clientY+'px';}
  });
});


/* === keyboard.js === */

'use strict';
const _kbSgState={};
let _kbAccentPopup=null;

// ── Missing glyph detection via opentype.js ──────────────────────────────────
function _hasGlyph(char, font){
  try{
    const otf=window._limouOTFont;
    if(!otf)return true; // no font loaded → assume present
    const cp=char.codePointAt(0);
    const g=otf.glyphs.glyphs;
    for(const id in g){const gl=g[id];if(gl.unicodes&&gl.unicodes.includes(cp))return true;}
    return false;
  }catch(_){return true;}
}

// ── Build level selector bar ──────────────────────────────────────────────────
function _buildLevelBar(){
  const bar=document.createElement('div');bar.className='kb-level-bar';
  KB_LEVELS_KEYS.forEach((key,i)=>{
    const btn=document.createElement('button');
    btn.className='kb-level-btn'+(i===kbLevel?' on':'');
    const lbl=t('kb-level-'+key);
    btn.textContent=lbl;btn.title=lbl;
    btn.onclick=()=>setKbLevel(i);
    bar.appendChild(btn);
  });
  return bar;
}

function buildKb(){
  const root=g('kb-root');if(!root)return;root.innerHTML='';
  const al=activeLayer();
  const font=al.font||MFONT;

  // Level selector
  root.appendChild(_buildLevelBar());

  Object.entries(KEY_DEFS).forEach(([cat,catDef])=>{
    const section=document.createElement('div');section.className='kb-section';

    const lbl=document.createElement('div');lbl.className='kb-cat';
    lbl.textContent=t('kbcat-'+cat)||cat;
    section.appendChild(lbl);

    // Plain array
    if(Array.isArray(catDef)){
      const filtered=catDef.filter(k=>(k.lvl??0)<=kbLevel);
      if(!filtered.length){section.style.display='none';}
      else{
        const scroll=document.createElement('div');scroll.className='kb-scroll';
        scroll.appendChild(_buildKbGrid(filtered,font,al));
        section.appendChild(scroll);
      }
      root.appendChild(section);
      return;
    }

    // Subgroup category (_sg)
    if(catDef._sg){
      const sgs=catDef._sg;
      if(!_kbSgState[cat])_kbSgState[cat]=(sgs.find(s=>s.def)||sgs[0]).id;

      const pills=document.createElement('div');pills.className='kb-pills';
      const scroll=document.createElement('div');scroll.className='kb-scroll';
      const gridWrap=document.createElement('div');
      scroll.appendChild(gridWrap);

      sgs.forEach(sg=>{
        const pill=document.createElement('button');
        pill.className='kb-pill'+(sg.id===_kbSgState[cat]?' on':'');
        pill.textContent=sg.lbl;pill.dataset.sgId=sg.id;
        pill.onclick=()=>{
          _kbSgState[cat]=sg.id;
          pills.querySelectorAll('.kb-pill').forEach(p=>p.classList.toggle('on',p.dataset.sgId===sg.id));
          gridWrap.innerHTML='';
          const filtered=sg.keys.filter(k=>(k.lvl??0)<=kbLevel);
          gridWrap.appendChild(_buildKbGrid(filtered,font,al));
          const q=g('kb-search')?.value||'';if(q)filterKb(q);
        };
        pills.appendChild(pill);
      });
      section.appendChild(pills);

      const activeSg=sgs.find(s=>s.id===_kbSgState[cat])||(sgs.find(s=>s.def)||sgs[0]);
      const filtered=activeSg.keys.filter(k=>(k.lvl??0)<=kbLevel);
      gridWrap.appendChild(_buildKbGrid(filtered,font,al));
      section.appendChild(scroll);
    }

    root.appendChild(section);
  });
}


function _buildKbGrid(keys,font,al){
  const grid=document.createElement('div');grid.className='kb-grid';
  keys.forEach(k=>{
    const el=document.createElement('div');
    const hasAccents=!!ACCENT_VARIANTS[k.s];
    const hasStructVariants=!!STRUCT_VARIANTS[k.k];
    const missing=!_hasGlyph(k.s,font);

    el.className='kb-key'+(k.str?' str':'')+(missing?' missing':'')+(hasAccents?' has-accents':'')+(hasStructVariants?' has-struct-variants':'');
    el.title=missing?(k.lbl+' — '+t('missing-glyph-tooltip')):k.lbl;
    if(missing)el.setAttribute('aria-disabled','true');

    const sym=document.createElement('span');sym.className='kb-sym';sym.textContent=k.s;sym.style.fontFamily=font;
    if(al.fvs)sym.style.fontVariationSettings=al.fvs;
    const sub=document.createElement('div');sub.className='kb-sub';sub.textContent=k.lbl;
    el.append(sym,sub);

    if(!missing){
      el.draggable=true;
      el.addEventListener('dragstart',ev=>{
        dragKey=Object.assign({},k);
        ghost=document.createElement('div');ghost.className='drag-ghost';
        ghost.textContent=k.s;ghost.style.fontFamily=font;
        if(al.fvs)ghost.style.fontVariationSettings=al.fvs;
        document.body.appendChild(ghost);
        ev.dataTransfer.setDragImage(new Image(),0,0);
        ev.dataTransfer.effectAllowed='copy';
      });
      el.addEventListener('dragend',()=>{if(ghost){ghost.remove();ghost=null;}});

      // ── Click: insert char into active editable container (tb-editor OR delim-body) ──
      // mousedown + preventDefault keeps focus in the editable area (same browser behaviour
      // relied on by .delim-body and .tnode — the browser never loses the caret).
      el.addEventListener('mousedown',ev=>{
        const active=document.activeElement;
        // Only intercept when an editable container inside the canvas has focus
        if(!active)return;
        const isTbEditor=active.classList.contains('tb-editor');
        const isDelimBody=active.classList.contains('delim-body');
        const isTnode=active.classList.contains('tnode');
        if(!isTbEditor&&!isDelimBody&&!isTnode)return;
        // Prevent blur of the focused editable element
        ev.preventDefault();
        ev.stopPropagation();
        const char=k.s;
        // Use execCommand for maximum cross-browser compatibility with contenteditable
        // (This is what most rich-text editors use; it works in Chrome, Firefox, Safari)
        if(document.execCommand){
          document.execCommand('insertText',false,char);
        } else {
          // Fallback via Selection API
          const sel=window.getSelection();
          if(sel&&sel.rangeCount){
            const range=sel.getRangeAt(0);
            range.deleteContents();
            const txt=document.createTextNode(char);
            range.insertNode(txt);
            range.setStartAfter(txt);range.setEndAfter(txt);
            sel.removeAllRanges();sel.addRange(range);
          }
        }
        // Sync rd.text if it's a textbox
        if(isTbEditor){
          const rdId=active.closest('.fe-el')?.id;
          const rd=rdId?feEls.find(e=>e.id===rdId):null;
          if(rd){rd.text=active.textContent;clearTimeout(active._saveT);active._saveT=setTimeout(()=>feSnap(),600);}
        }
      });

      // Long-press for accent popup
      if(hasAccents){
        let _pressTimer=null;
        const _cancelPress=()=>{if(_pressTimer){clearTimeout(_pressTimer);_pressTimer=null;}};
        el.addEventListener('mousedown',ev=>{
          _pressTimer=setTimeout(()=>{_pressTimer=null;_showAccentPopup(k.s,el,font,al);},480);
        });
        el.addEventListener('mouseup',_cancelPress);
        el.addEventListener('mouseleave',_cancelPress);
        // Touch support
        el.addEventListener('touchstart',ev=>{
          _pressTimer=setTimeout(()=>{_pressTimer=null;_showAccentPopup(k.s,el,font,al);ev.preventDefault();},480);
        },{passive:true});
        el.addEventListener('touchend',_cancelPress);
      }

      // Long-press for structure variants popup (paired ↔ single half-delimiters)
      if(hasStructVariants){
        let _pressTimer=null;
        const _cancelPress=()=>{if(_pressTimer){clearTimeout(_pressTimer);_pressTimer=null;}};
        el.addEventListener('mousedown',()=>{
          _pressTimer=setTimeout(()=>{_pressTimer=null;_showStructVariantPopup(k.k,el,font,al);},480);
        });
        el.addEventListener('mouseup',_cancelPress);
        el.addEventListener('mouseleave',_cancelPress);
        el.addEventListener('touchstart',ev=>{
          _pressTimer=setTimeout(()=>{_pressTimer=null;_showStructVariantPopup(k.k,el,font,al);ev.preventDefault();},480);
        },{passive:true});
        el.addEventListener('touchend',_cancelPress);
      }
    }

    grid.appendChild(el);
  });
  return grid;
}

function _showAccentPopup(baseChar,anchor,font,al){
  _closeAccentPopup();
  const variants=ACCENT_VARIANTS[baseChar];if(!variants||!variants.length)return;

  const popup=document.createElement('div');popup.className='kb-accent-popup';
  _kbAccentPopup=popup;

  variants.forEach(v=>{
    const el=document.createElement('div');
    el.className='kb-key';
    el.title=v.lbl;

    const sym=document.createElement('span');sym.className='kb-sym';
    sym.textContent=v.s;sym.style.fontFamily=font;
    if(al.fvs)sym.style.fontVariationSettings=al.fvs;

    const sub=document.createElement('div');sub.className='kb-sub';
    sub.textContent=v.lbl;

    el.append(sym,sub);

    // ── Pointer-event drag (works after long-press, no HTML5 drag API needed) ──
    el.addEventListener('mousedown',ev=>{
      ev.preventDefault();
      ev.stopPropagation();
      _startAccentDrag(v,font,al,ev.clientX,ev.clientY);
    });

    popup.appendChild(el);
  });

  document.body.appendChild(popup);

  requestAnimationFrame(()=>{
    const rect=anchor.getBoundingClientRect();
    const popH=popup.offsetHeight||60;
    const popW=popup.offsetWidth||200;
    const left=Math.max(4,Math.min(rect.left,window.innerWidth-popW-4));
    const top=rect.top-popH-6;
    popup.style.left=left+'px';
    popup.style.top=(top<4?rect.bottom+6:top)+'px';
  });

  setTimeout(()=>document.addEventListener('mousedown',_closeAccentPopupOutside,{once:true}),80);
}

// ── Pointer-based drag for accent keys ──────────────────────────────────────
// Mimics HTML5 drag: creates ghost, tracks mouse, drops on canvas on mouseup.
function _startAccentDrag(v,font,al,startX,startY){
  // Close popup immediately — we have what we need
  _closeAccentPopup();

  // Set dragKey so ghost creation is consistent with HTML5 drag
  dragKey=Object.assign({},v);

  // Create ghost
  if(ghost){ghost.remove();ghost=null;}
  ghost=document.createElement('div');
  ghost.className='drag-ghost';
  ghost.textContent=v.s;
  ghost.style.fontFamily=font;
  ghost.style.left=startX+'px';
  ghost.style.top=startY+'px';
  if(al.fvs)ghost.style.fontVariationSettings=al.fvs;
  document.body.appendChild(ghost);

  // Highlight canvas as drop target when cursor is over it
  const canvas=g('fe-canvas');

  function onMove(ev){
    ghost.style.left=ev.clientX+'px';
    ghost.style.top=ev.clientY+'px';
    if(canvas){
      const r=canvas.getBoundingClientRect();
      const over=ev.clientX>=r.left&&ev.clientX<=r.right&&ev.clientY>=r.top&&ev.clientY<=r.bottom;
      canvas.style.outline=over?'2px solid var(--accent)':'';
    }
  }

  function onUp(ev){
    document.removeEventListener('mousemove',onMove);
    document.removeEventListener('mouseup',onUp);

    if(ghost){ghost.remove();ghost=null;}
    if(canvas)canvas.style.outline='';

    if(canvas){
      const r=canvas.getBoundingClientRect();
      if(ev.clientX>=r.left&&ev.clientX<=r.right&&ev.clientY>=r.top&&ev.clientY<=r.bottom){
        const x=snapVal(ev.clientX-r.left),y=snapVal(ev.clientY-r.top);
        _dropKeyOnCanvas(v,x,y);
      }
    }
    dragKey=null;
  }

  document.addEventListener('mousemove',onMove);
  document.addEventListener('mouseup',onUp);
}

function _closeAccentPopup(){
  if(_kbAccentPopup){_kbAccentPopup.remove();_kbAccentPopup=null;}
}
function _closeAccentPopupOutside(ev){
  if(_kbAccentPopup&&!_kbAccentPopup.contains(ev.target))_closeAccentPopup();
}

// ── Structure variant popup (long-press on paired delimiter keys) ────────────
let _kbStructPopup=null;
function _showStructVariantPopup(keyId,anchor,font,al){
  _closeStructVariantPopup();
  const variants=STRUCT_VARIANTS[keyId];if(!variants||!variants.length)return;

  const popup=document.createElement('div');popup.className='kb-accent-popup';
  _kbStructPopup=popup;

  variants.forEach(v=>{
    const el=document.createElement('div');
    el.className='kb-key'+(v.str?' str':'');
    el.title=v.lbl;
    const sym=document.createElement('span');sym.className='kb-sym';
    sym.textContent=v.s;sym.style.fontFamily=font;
    if(al.fvs)sym.style.fontVariationSettings=al.fvs;
    const sub=document.createElement('div');sub.className='kb-sub';sub.textContent=v.lbl;
    el.append(sym,sub);
    el.addEventListener('mousedown',ev=>{
      ev.preventDefault();ev.stopPropagation();
      _closeStructVariantPopup();
      _startStructDrag(v,font,al,ev.clientX,ev.clientY);
    });
    popup.appendChild(el);
  });

  document.body.appendChild(popup);
  requestAnimationFrame(()=>{
    const rect=anchor.getBoundingClientRect();
    const popH=popup.offsetHeight||60,popW=popup.offsetWidth||220;
    const left=Math.max(4,Math.min(rect.left,window.innerWidth-popW-4));
    const top=rect.top-popH-6;
    popup.style.left=left+'px';popup.style.top=(top<4?rect.bottom+6:top)+'px';
  });
  setTimeout(()=>document.addEventListener('mousedown',_closeStructVariantPopupOutside,{once:true}),80);
}
function _closeStructVariantPopup(){
  if(_kbStructPopup){_kbStructPopup.remove();_kbStructPopup=null;}
}
function _closeStructVariantPopupOutside(ev){
  if(_kbStructPopup&&!_kbStructPopup.contains(ev.target))_closeStructVariantPopup();
}

// ── Pointer drag for struct variant keys — mirrors _startAccentDrag ──────────
function _startStructDrag(v,font,al,startX,startY){
  dragKey=Object.assign({},v);
  if(ghost){ghost.remove();ghost=null;}
  ghost=document.createElement('div');ghost.className='drag-ghost';
  ghost.textContent=v.s;ghost.style.fontFamily=font;
  ghost.style.left=startX+'px';ghost.style.top=startY+'px';
  if(al.fvs)ghost.style.fontVariationSettings=al.fvs;
  document.body.appendChild(ghost);
  const canvas=g('fe-canvas');if(!canvas)return;
  function onMove(ev){
    ghost.style.left=ev.clientX+'px';ghost.style.top=ev.clientY+'px';
    const r=canvas.getBoundingClientRect();
    canvas.style.outline=(ev.clientX>=r.left&&ev.clientX<=r.right&&ev.clientY>=r.top&&ev.clientY<=r.bottom)?'2px solid var(--accent)':'';
  }
  function onUp(ev){
    document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseup',onUp);
    if(ghost){ghost.remove();ghost=null;}
    canvas.style.outline='';
    const r=canvas.getBoundingClientRect();
    if(ev.clientX>=r.left&&ev.clientX<=r.right&&ev.clientY>=r.top&&ev.clientY<=r.bottom){
      _dropKeyOnCanvas(v,snapVal(ev.clientX-r.left),snapVal(ev.clientY-r.top));
    }
    dragKey=null;
  }
  document.addEventListener('mousemove',onMove);document.addEventListener('mouseup',onUp);
}

function filterKb(q){
  q=q.toLowerCase();
  document.querySelectorAll('.kb-section').forEach(sec=>{
    let anyVisible=false;
    sec.querySelectorAll('.kb-key').forEach(k=>{
      const match=k.title.toLowerCase().includes(q)||
        k.querySelector('.kb-sym')?.textContent.toLowerCase().includes(q);
      k.style.display=match?'':'none';
      if(match)anyVisible=true;
    });
    sec.style.display=anyVisible?'':'none';
  });
}


/* === layers.js === */

'use strict';

// SVG icons for lock (no emoji)
const _SVG_LOCK   = `<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1.5" y="4.5" width="8" height="6" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M3.5 4.5V3a2 2 0 0 1 4 0v1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`;
const _SVG_UNLOCK = `<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1.5" y="4.5" width="8" height="6" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M3.5 4.5V3a2 2 0 0 1 4 0" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`;

let _layerDragId = null; // id of the layer being dragged

function renderLayers(){
  const list=g('layers-list');if(!list)return;list.innerHTML='';
  [...layers].reverse().forEach(layer=>{
    const row=document.createElement('div');
    row.className='layer-row'+(layer.id===activeLayerId?' active-l':'');
    row.draggable=true;
    row.dataset.id=layer.id;
    row.onclick=()=>{activeLayerId=layer.id;renderLayers();buildKb();_syncFontTabColor();feHighlightLayer(layer.id);};

    // ── Drag & drop reorder ──
    row.addEventListener('dragstart',ev=>{
      _layerDragId=layer.id;
      row.classList.add('l-dragging');
      ev.dataTransfer.effectAllowed='move';
    });
    row.addEventListener('dragend',()=>{
      _layerDragId=null;
      document.querySelectorAll('.layer-row').forEach(r=>r.classList.remove('l-dragging','l-drag-over-top','l-drag-over-bot'));
    });
    row.addEventListener('dragover',ev=>{
      if(!_layerDragId||_layerDragId===layer.id)return;
      ev.preventDefault();ev.dataTransfer.dropEffect='move';
      const mid=row.getBoundingClientRect().top+row.getBoundingClientRect().height/2;
      document.querySelectorAll('.layer-row').forEach(r=>r.classList.remove('l-drag-over-top','l-drag-over-bot'));
      row.classList.add(ev.clientY<mid?'l-drag-over-top':'l-drag-over-bot');
    });
    row.addEventListener('dragleave',()=>{
      row.classList.remove('l-drag-over-top','l-drag-over-bot');
    });
    row.addEventListener('drop',ev=>{
      ev.preventDefault();
      if(!_layerDragId||_layerDragId===layer.id)return;
      row.classList.remove('l-drag-over-top','l-drag-over-bot');
      const fromIdx=layers.findIndex(l=>l.id===_layerDragId);
      const toIdx  =layers.findIndex(l=>l.id===layer.id);
      if(fromIdx<0||toIdx<0)return;
      // Visual list is reversed: top of list = end of array.
      // "above" in visual list = insert after toIdx in array; "below" = insert before toIdx.
      const mid=row.getBoundingClientRect().top+row.getBoundingClientRect().height/2;
      const insertBefore = ev.clientY < mid ? toIdx : toIdx + 1;
      const [moved]=layers.splice(fromIdx,1);
      const dest = insertBefore > fromIdx ? insertBefore - 1 : insertBefore;
      layers.splice(dest,0,moved);
      feSyncZOrder();
      renderLayers();
    });

    // ── Dot (layer color indicator) ──
    const dot=document.createElement('div');dot.className='l-dot';
    dot.style.background=layer.color;dot.style.opacity=layer.visible?1:.35;

    // ── Name ──
    const nm=document.createElement('div');nm.className='l-name';nm.textContent=layer.name;
    nm.contentEditable='true';nm.spellcheck=false;nm.style.outline='none';
    nm.oninput=()=>layer.name=nm.textContent;
    nm.onkeydown=ev=>{if(ev.key==='Enter'){ev.preventDefault();nm.blur();}ev.stopPropagation();};
    nm.onclick=ev=>ev.stopPropagation();

    // ── Color picker (hidden, triggered by dot) ──
    const colorPick=document.createElement('input');colorPick.type='color';colorPick.value=layer.color;
    colorPick.style.cssText='position:absolute;width:0;height:0;opacity:0;pointer-events:none';
    colorPick.oninput=()=>{
      layer.color=colorPick.value;dot.style.background=layer.color;
      feEls.filter(e=>e.layerId===layer.id).forEach(feRenderEl);
    };
    dot.style.cursor='pointer';dot.title='Couleur';
    dot.onclick=ev=>{ev.stopPropagation();colorPick.click();};

    // ── Visibility ──
    const vis=document.createElement('span');vis.className='l-ico';vis.title='Visibilité';
    vis.textContent=layer.visible?'○':'●';
    vis.onclick=ev=>{ev.stopPropagation();layer.visible=!layer.visible;renderLayers();feEls.forEach(feRenderEl);};

    // ── Lock (SVG, no emoji) ──
    const lk=document.createElement('span');lk.className='l-ico l-ico-lock'+(layer.locked?' locked':'');
    lk.title='Verrou';lk.innerHTML=layer.locked?_SVG_LOCK:_SVG_UNLOCK;
    lk.onclick=ev=>{ev.stopPropagation();layer.locked=!layer.locked;renderLayers();feEls.forEach(feRenderEl);};

    // ── Delete ──
    const del=document.createElement('span');del.className='l-ico';del.textContent='×';del.title=t('layer-delete-title');
    del.onclick=ev=>{ev.stopPropagation();rmLayer(layer.id);};

    row.append(dot,colorPick,nm,vis,lk,del);list.appendChild(row);
  });
}

function addLayer(){
  const ci=layers.length%LAYER_COLORS.length;
  const id=uid();
  layers.push({id,name:(_lang==='fr'?'Couche ':'Layer ')+(layers.length+1),font:MFONT,color:LAYER_COLORS[ci],textColor:'#000000',fontSize:defaultFontSize,visible:true,locked:false,fvs:''});
  activeLayerId=id;renderLayers();buildKb();feLTab('layers');
}

function rmLayer(id){
  if(layers.length<=1)return;
  feEls=feEls.filter(e=>{
    if(e.layerId===id){const el=document.getElementById(e.id);if(el)el.remove();return false;}
    return true;
  });
  layers=layers.filter(l=>l.id!==id);
  if(activeLayerId===id)activeLayerId=layers[layers.length-1].id;
  renderLayers();buildKb();
}


/* === math-nodes.js === */

'use strict';
// ── Factory de nœuds ──
function mkNode(key){
  const b={k:key.k,s:key.s,lbl:key.lbl,p:key.p||[]};
  if(key.k==='frac'||key.k==='sfrac')
    return{...b,type:'frac',obl:!!key.obl,frt:.06,fnumerUp:.35,fdenomDown:.35,fnumGap:.09,fdenGap:.09,ns:[],ds:[]};
  if(key.k==='sqrt'||key.k==='cbrt')
    return{...b,type:'rad',deg:key.deg||null,rrt:.05,rvg:.12,rxa:.05,bs:[]};
  // Single half-delimiter — reuses _half2 engine, no content slot
  if(key.half)
    return{...b,type:'hdelim',delim:key.delim,half:key.half,minOv:2,stretchY:100};
  if(key.open!==undefined)
    return{...b,type:'delim',open:key.open,close:key.close,minOv:2,bodyText:''};
  // opérateur display
  if(key.p&&key.p.includes('DisplayOperatorMinHeight'))
    return{...b,type:'op',text:key.s,dispOpH:55,upperGap:.05,lowerGap:.05};
  return{...b,type:'free',text:key.s,stretch:100,axis:0,ic:0};
}

// ── bIntegral — shaft-stretch via opentype.js ──
const _IC=0.28,_IF=72;
function bIntegral(node,sz,font,otf){
  if(!otf){const sp=document.createElement('span');sp.textContent='∫';sp.style.cssText=`font-size:${sz}px;font-family:${font};display:inline-block`;return sp;}
  const g=otf.charToGlyph('∫');
  if(!g?.path?.commands?.length){const sp=document.createElement('span');sp.textContent='∫';sp.style.cssText=`font-size:${sz}px;font-family:${font};display:inline-block`;return sp;}
  const bb=g.getBoundingBox(),sc0=_IF/otf.unitsPerEm,nH=bb.h*sc0;
  let svg,W,H;
  if(sz<=nH){const sc=sz/bb.h;W=Math.ceil(bb.w*sc)+2;H=Math.ceil(bb.h*sc)+2;svg=`<path d="${_otd(g,sc,-(bb.x1*sc),bb.y2*sc)}" fill="currentColor"/>`;}
  else{const sc=sc0,tT=bb.y2-bb.h*_IC,bT=bb.y1+bb.h*_IC,sH=(tT-bT)*sc,ex=sz-nH,sm=sH>0?(sH+ex)/sH:1,pv=(bb.y2-tT)*sc;
    const ty=y=>{const y0=(bb.y2-y)*sc;if(y>=tT)return y0;if(y<=bT)return y0+ex;return pv+(y0-pv)*sm;};
    const tx=x=>(x-bb.x1)*sc;let d='';
    g.path.commands.forEach(c=>{if(c.type==='M')d+=`M${tx(c.x).toFixed(2)} ${ty(c.y).toFixed(2)} `;else if(c.type==='L')d+=`L${tx(c.x).toFixed(2)} ${ty(c.y).toFixed(2)} `;else if(c.type==='C')d+=`C${tx(c.x1).toFixed(2)} ${ty(c.y1).toFixed(2)},${tx(c.x2).toFixed(2)} ${ty(c.y2).toFixed(2)},${tx(c.x).toFixed(2)} ${ty(c.y).toFixed(2)} `;else if(c.type==='Q')d+=`Q${tx(c.x1).toFixed(2)} ${ty(c.y1).toFixed(2)},${tx(c.x).toFixed(2)} ${ty(c.y).toFixed(2)} `;else if(c.type==='Z')d+='Z ';});
    W=Math.ceil(bb.w*sc)+4;H=Math.ceil(sz)+2;svg=`<path d="${d.trim()}" fill="currentColor"/>`;}
  const div=document.createElement('div');div.style.cssText='display:inline-block;line-height:0;pointer-events:none';
  div.innerHTML=`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="color:currentColor;display:block;overflow:visible;pointer-events:none">${svg}</svg>`;
  return div;
}
function _otd(g,sc,dx,dy){let d='';g.path.commands.forEach(c=>{if(c.type==='M')d+=`M${(c.x*sc+dx).toFixed(2)} ${(dy-c.y*sc).toFixed(2)} `;else if(c.type==='L')d+=`L${(c.x*sc+dx).toFixed(2)} ${(dy-c.y*sc).toFixed(2)} `;else if(c.type==='C')d+=`C${(c.x1*sc+dx).toFixed(2)} ${(dy-c.y1*sc).toFixed(2)},${(c.x2*sc+dx).toFixed(2)} ${(dy-c.y2*sc).toFixed(2)},${(c.x*sc+dx).toFixed(2)} ${(dy-c.y*sc).toFixed(2)} `;else if(c.type==='Q')d+=`Q${(c.x1*sc+dx).toFixed(2)} ${(dy-c.y1*sc).toFixed(2)},${(c.x*sc+dx).toFixed(2)} ${(dy-c.y*sc).toFixed(2)} `;else if(c.type==='Z')d+='Z ';});return d.trim();}

// ── bHDelim — single half-delimiter (reuses _half2 + _svgEl2, bDelim untouched) ─
function bHDelim(node,sz,font,fvs){
  const def=_DS[node.delim];
  if(!def)return document.createTextNode(node.s||'?');
  const isL=node.half==='L';
  const side=def.paired?(isL?def.L:def.R):def.O;
  if(!side)return document.createTextNode(node.s||'?');
  const sw=node.strokeW||0;
  const pid='hd'+Math.random().toString(36).slice(2,7);
  if(_hg2(side.ext,font)){
    const half=_half2(side,isL,font,sz,sw,def.isBrace,pid);
    return _svgEl2(half.markup,half.w,half.h);
  }
  // Fallback: plain glyph
  const sp=document.createElement('span');
  sp.style.cssText=`font-size:${sz}px;font-family:${font};display:inline-block;vertical-align:middle`;
  if(fvs)sp.style.fontVariationSettings=fvs;
  sp.textContent=side.nat;
  return sp;
}

// ── Dispatcher ──
function bNode(node,px,font,fvs){
  const el=document.createElement('div');
  el.className='mnode';
  if(!node){el.textContent='□';return el;}
  font=font||MFONT;fvs=fvs||'';
  if(node.type==='frac')  el.appendChild(bFrac(node,px,font,fvs));
  else if(node.type==='rad')   el.appendChild(bRad(node,px,font,fvs));
  else if(node.type==='hdelim'){
    // stretchY drives height; reuses _half2 engine via bHDelim
    const sy=(node.stretchY||100)/100;
    const effectiveSz=Math.round(px*sy);
    el.appendChild(bHDelim(node,effectiveSz,font,fvs));
  }
  else if(node.type==='delim'){
    // stretchY drives the effective height; px is pure font size for content
    const sy=(node.stretchY||100)/100;
    const effectiveSz=Math.round(px*sy);
    el.appendChild(bDelim(node,effectiveSz,font,fvs));
  }
  else if(node.type==='op'){
    if(node.k==='int'){
      // stretchY drives integral height; px is base font size
      const sy=(node.stretchY||100)/100;
      const effectiveSz=Math.round(px*sy);
      el.appendChild(bIntegral(node,effectiveSz,font,window._limouOTFont||null));
    } else {
      const sp=document.createElement('span');
      sp.textContent=node.text||node.s;
      sp.style.cssText=`font-size:${Math.max(px,node.dispOpH||px)}px;font-family:${font};display:inline-block`;
      if(fvs)sp.style.fontVariationSettings=fvs;
      el.appendChild(sp);
    }
  } else {
    const sp=document.createElement('span');
    sp.textContent=node.text||node.s||'□';
    sp.style.cssText=`font-size:${px}px;font-family:${font};display:inline-block;`+
      `transform:scaleX(${(node.stretch||100)/100}) translateY(${-(node.axis||0)}px);`+
      `letter-spacing:${node.ic||0}px`;
    if(fvs)sp.style.fontVariationSettings=fvs;
    el.appendChild(sp);
  }
  return el;
}

// ── Fraction ──
function bFrac(node,sz,font,fvs){
  const wrap=document.createElement('div');wrap.className='frac-node';
  const barPx=Math.max(1,sz*node.frt);
  const numGap=Math.round(sz*(node.fnumGap||node.fnumerUp*.25));
  const denGap=Math.round(sz*(node.fdenGap||node.fdenomDown*.25));
  const cSz=sz*SS;
  if(node.obl){
    wrap.style.cssText='display:inline-flex;flex-direction:row;align-items:center;gap:2px';
    const sl=document.createElement('span');sl.textContent='/';sl.style.fontSize=sz+'px';
    wrap.append(bSeq(node.ns,'a',cSz,font,fvs),sl,bSeq(node.ds,'b',cSz,font,fvs));
    return wrap;
  }
  const nw=document.createElement('div');nw.className='fnw';nw.style.paddingBottom=numGap+'px';
  const ns=bSeq(node.ns,'numérateur',cSz,font,fvs);nw.appendChild(ns);
  const bar=document.createElement('div');bar.className='fbar';
  bar.style.cssText=`height:${barPx}px;min-width:${Math.round(sz*.5)}px;margin:${Math.round(sz*.025)}px 0`;
  const dw=document.createElement('div');dw.className='fdw';dw.style.paddingTop=denGap+'px';
  const ds=bSeq(node.ds,'dénominateur',cSz,font,fvs);dw.appendChild(ds);
  wrap.append(nw,bar,dw);
  const sync=()=>requestAnimationFrame(()=>{
    const w=Math.max(ns.offsetWidth,ds.offsetWidth,Math.round(sz*.5));
    bar.style.width=w+'px';nw.style.minWidth=w+'px';dw.style.minWidth=w+'px';
  });
  setTimeout(sync,20);
  new MutationObserver(sync).observe(wrap,{subtree:true,childList:true,characterData:true});
  return wrap;
}

// ── Radical ──
function bRad(node,sz,font,fvs){
  const wrap=document.createElement('div');wrap.className='rad-node';

  const barPx = Math.max(1, sz * node.rrt);
  const gapPx = Math.round(sz * node.rvg);
  const cSz   = sz * 0.88;

  // ── Signe √ ──
  // align-items:flex-end → le bas du glyphe s'aligne avec le bas du radicande
  const surd = document.createElement('div');
  surd.className = 'rad-surd';
  surd.style.cssText =
    `font-size:${Math.round(sz * 1.05)}px;font-family:${font};` +
    `display:flex;align-items:flex-end;flex-shrink:0;line-height:1`;
  if(fvs) surd.style.fontVariationSettings = fvs;

  // Degré (√³ etc.) — positionné en haut à gauche du signe
  if(node.deg){
    const dg = document.createElement('sup');
    dg.textContent = node.deg;
    dg.style.cssText =
      `font-size:${Math.round(sz * .42)}px;` +
      `align-self:flex-start;margin-bottom:${Math.round(sz * .18)}px;` +
      `margin-right:${Math.round(sz * .02)}px`;
    surd.appendChild(dg);
  }

  // Glyphe √ — on garde la référence pour mesurer son coin supérieur droit
  const sqrtChar = document.createElement('span');
  sqrtChar.textContent = '√';
  sqrtChar.style.lineHeight = '1';
  surd.appendChild(sqrtChar);

  // ── Partie droite : barre + radicande ──
  const right = document.createElement('div');
  right.className = 'rad-right';
  right.style.cssText = 'display:inline-flex;flex-direction:column;align-items:stretch';

  // La barre — pas de margin-top statique, calculé dynamiquement ci-dessous
  const tb = document.createElement('div');
  tb.className = 'rbar';
  tb.style.cssText =
    `height:${barPx}px;` +
    `min-width:${Math.round(sz * .5)}px;` +
    `margin-bottom:${gapPx}px;` +
    `margin-left:-1px`; // recouvrement sub-pixel avec le bord du glyphe √

  const bs = bSeq(node.bs, 'radicande', cSz, font, fvs);
  bs.style.padding = '0 4px';
  right.append(tb, bs);
  wrap.append(surd, right);

  // ── Alignement géométrique après rendu ──
  // On mesure où se trouve le bord supérieur du glyphe √ dans le wrap,
  // puis on pousse .rad-right vers le bas exactement jusqu'à ce point.
  // C'est la seule approche fiable car les métriques varient selon la
  // police (STIX, Latin Modern…) et la taille.
  const alignBar = () => {
    requestAnimationFrame(() => {
      const surdRect = sqrtChar.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      if(!wrapRect.height) return; // pas encore dans le DOM
      // Distance entre le top du wrap et le top du glyphe √
      const topOffset = Math.max(0, Math.round(surdRect.top - wrapRect.top));
      right.style.marginTop = topOffset + 'px';
      // Sync largeur barre avec le radicande
      const w = Math.max(bs.offsetWidth + 8, Math.round(sz * .5));
      tb.style.width    = w + 'px';
      tb.style.minWidth = w + 'px';
    });
  };

  // Premier appel après rendu initial
  setTimeout(alignBar, 20);

  // Resync si le contenu du slot change (frappe, drop de structure)
  new MutationObserver(alignBar).observe(bs, {
    subtree: true, childList: true, characterData: true,
  });

  return wrap;
}

// ── Délimiteur — assemblage segments Unicode ──
const _MC2={},_GC2={};
function _M2(ch,ff){const k=ch+'|'+ff;if(_MC2[k])return _MC2[k];const cv=document.createElement('canvas');cv.width=80;cv.height=80;const ctx=cv.getContext('2d');ctx.font='32px '+ff;const m=ctx.measureText(ch);const a=m.actualBoundingBoxAscent||24,d=m.actualBoundingBoxDescent||4;return(_MC2[k]={asc:a,dsc:d,tot:a+d,w:m.width});}
function _hg2(ch,ff){const k=ch+'|'+ff;if(_GC2[k]!==undefined)return _GC2[k];const cv=document.createElement('canvas');cv.width=32;cv.height=32;const ctx=cv.getContext('2d');ctx.font='24px '+ff;ctx.fillStyle='#000';ctx.fillText(ch,4,24);const px=ctx.getImageData(0,0,32,32).data;let n=0;for(let i=3;i<px.length;i+=4)if(px[i]>30)n++;return(_GC2[k]=n>=2);}
function _clearDelimCaches(){Object.keys(_MC2).forEach(k=>delete _MC2[k]);Object.keys(_GC2).forEach(k=>delete _GC2[k]);}
const _DS={
  paren:{L:{nat:'(',top:'⎛',ext:'⎜',bot:'⎝'},R:{nat:')',top:'⎞',ext:'⎟',bot:'⎠'},paired:true,isBrace:false},
  brack:{L:{nat:'[',top:'⎡',ext:'⎢',bot:'⎣'},R:{nat:']',top:'⎤',ext:'⎥',bot:'⎦'},paired:true,isBrace:false},
  brace:{L:{nat:'{',top:'⎧',mid:'⎨',bot:'⎩',ext:'⎪'},R:{nat:'}',top:'⎫',mid:'⎬',bot:'⎭',ext:'⎪'},paired:true,isBrace:true},
  abs:  {O:{nat:'|', top:'⏐',ext:'⏐',bot:'⏐'},paired:false,isBrace:false},
  norm: {O:{nat:'‖',top:'‖',ext:'‖',bot:'‖'},paired:false,isBrace:false},
  floor:{L:{nat:'⌊',top:'⎢',ext:'⎢',bot:'⎣'},R:{nat:'⌋',top:'⎥',ext:'⎥',bot:'⎦'},paired:true,isBrace:false},
  ceil: {L:{nat:'⌈',top:'⎡',ext:'⎢',bot:'⎢'},R:{nat:'⌉',top:'⎤',ext:'⎥',bot:'⎥'},paired:true,isBrace:false},
};
function _svgEl2(markup,w,h){const d=document.createElement('div');d.style.cssText='display:inline-block;flex-shrink:0;line-height:0;pointer-events:none';d.innerHTML=`<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="font-family:'STIX Two Math','Latin Modern Math',Georgia,serif;color:currentColor;display:block;overflow:visible;pointer-events:none">${markup}</svg>`;return d;}
function _half2(s,isL,ff,sz,sw,isBrace,pid){
  const mT=_M2(s.top,ff),mE=_M2(s.ext,ff),mB=_M2(s.bot,ff),mM=s.mid?_M2(s.mid,ff):null,mN=_M2(s.nat,ff);
  const thr=mT.tot+mB.tot+(isBrace&&mM?mM.tot:0);
  if(sz<=thr){const W=Math.ceil(mN.w)+sw+4,cx=(W/2).toFixed(1),bl=mN.asc.toFixed(2);return{markup:`<text x="${cx}" y="${bl}" font-size="32" text-anchor="middle" fill="currentColor">${s.nat}</text>`,w:W,h:Math.ceil(mN.tot)};}
  const ov=Math.round(mE.tot*0.30),step=Math.max(1,mE.tot-ov);
  const parts=[];let cur=mT.tot;
  parts.push({ch:s.top,bl:mT.asc,zT:0,zB:mT.tot});
  if(isBrace){
    const fH=mT.tot+(mM?mM.tot:0)+mB.tot-ov*2,nH=Math.max(0,Math.ceil(Math.max(0,sz-fH)/step/2));
    for(let i=0;i<nH;i++){const bl=cur-ov+mE.asc,zT=cur-ov,zB=zT+mE.tot;parts.push({ch:s.ext,bl,zT,zB});cur=zB;}
    if(mM){parts.push({ch:s.mid,bl:cur-ov+mM.asc,zT:cur-ov,zB:cur-ov+mM.tot});cur=cur-ov+mM.tot;}
    for(let i=0;i<nH;i++){const bl=cur-ov+mE.asc,zT=cur-ov,zB=zT+mE.tot;parts.push({ch:s.ext,bl,zT,zB});cur=zB;}
  } else {
    const n=Math.ceil(Math.max(0,sz-mT.tot-mB.tot+ov)/step);
    for(let i=0;i<n;i++){const bl=cur-ov+mE.asc,zT=cur-ov,zB=zT+mE.tot;parts.push({ch:s.ext,bl,zT,zB});cur=zB;}
  }
  parts.push({ch:s.bot,bl:cur-ov+mB.asc,zT:cur-ov,zB:cur-ov+mB.tot});
  const tH=parts[parts.length-1].zB,SW=Math.ceil(Math.max(...parts.map(p=>_M2(p.ch,ff).w)))+2,tW=SW+sw+4,cx=(SW/2).toFixed(1),SP=SW*.5;
  let defs='<defs>';parts.forEach((p,i)=>{defs+=`<clipPath id="${pid}c${i}"><rect x="-4" y="${(p.zT-.5).toFixed(1)}" width="${tW+8}" height="${(p.zB-p.zT+1).toFixed(1)}"/></clipPath>`;});
  if(sw>0){const sx=isL?-(sw+2):SP,sk=isL?SP+sw+4:SW-SP+sw+4;defs+=`<clipPath id="${pid}sk"><rect x="${sx.toFixed(1)}" y="-4" width="${sk.toFixed(1)}" height="${tH+8}"/></clipPath>`;}
  defs+='</defs>';
  let stk='';if(sw>0)parts.forEach(p=>{stk+=`<text x="${cx}" y="${p.bl.toFixed(2)}" font-size="32" text-anchor="middle" fill="currentColor" stroke="currentColor" stroke-width="${(sw*2).toFixed(1)}" stroke-linejoin="round" paint-order="stroke fill" clip-path="url(#${pid}sk)">${p.ch}</text>`;});
  let fl='';parts.forEach((p,i)=>{fl+=`<text x="${cx}" y="${p.bl.toFixed(2)}" font-size="32" text-anchor="middle" fill="currentColor" clip-path="url(#${pid}c${i})">${p.ch}</text>`;});
  return{markup:defs+stk+fl,w:tW,h:Math.ceil(tH)};
}
function bDelim(node,sz,font,fvs){
  const wrap=document.createElement('div');wrap.className='delim-node';const def=_DS[node.k];const cSz=sz*.9;
  if(!def||!(def.paired?_hg2(def.L.ext,font):_hg2(def.O.ext,font))){
    const mkSym=ch=>{const d=document.createElement('div');d.className='dsym';d.style.cssText=`font-size:${sz}px;width:${Math.round(sz*.38)}px;text-align:center;font-family:${font}`;if(fvs)d.style.fontVariationSettings=fvs;d.textContent=ch;return d;};
    const openEl=mkSym(node.open),closeEl=mkSym(node.close);
    const body=document.createElement('div');body.className='delim-body';body.contentEditable='true';body.spellcheck=false;body.dataset.ph='contenu';body.style.cssText=`font-size:${cSz}px;font-family:${font};min-width:${Math.round(cSz*.6)}px`;if(fvs)body.style.fontVariationSettings=fvs;if(node.bodyText)body.textContent=node.bodyText;
    body.addEventListener('input',()=>{node.bodyText=body.textContent;syncH();});body.addEventListener('keydown',ev=>{if(ev.key==='Tab'){ev.preventDefault();tabSlot(ev.shiftKey?-1:1);}if(ev.key==='Escape')body.blur();ev.stopPropagation();});
    const syncH=()=>requestAnimationFrame(()=>{const h=Math.max(body.offsetHeight,sz*.85);const em=h/sz;const step=DELIM_STEPS.find(s=>s>=em)||DELIM_STEPS[DELIM_STEPS.length-1];const fsz=Math.round(step*sz);openEl.style.fontSize=fsz+'px';openEl.style.lineHeight=h+'px';closeEl.style.fontSize=fsz+'px';closeEl.style.lineHeight=h+'px';});
    setTimeout(syncH,20);new MutationObserver(syncH).observe(body,{subtree:true,childList:true,characterData:true});
    wrap.append(openEl,body,closeEl);return wrap;
  }
  const sw=node.strokeW||0,pid='d'+Math.random().toString(36).slice(2,7);
  const body=document.createElement('div');body.className='delim-body';body.contentEditable='true';body.spellcheck=false;body.dataset.ph='contenu';body.style.cssText=`font-size:${cSz}px;font-family:${font};min-width:${Math.round(cSz*.6)}px;display:inline-block;pointer-events:auto`;if(fvs)body.style.fontVariationSettings=fvs;if(node.bodyText)body.textContent=node.bodyText;
  body.addEventListener('input',()=>{node.bodyText=body.textContent;});body.addEventListener('keydown',ev=>{if(ev.key==='Tab'){ev.preventDefault();tabSlot(ev.shiftKey?-1:1);}if(ev.key==='Escape')body.blur();ev.stopPropagation();});
  if(def.paired){const L=_half2(def.L,true,font,sz,sw,def.isBrace,pid+'L'),R=_half2(def.R,false,font,sz,sw,def.isBrace,pid+'R');wrap.style.cssText='display:inline-flex;align-items:center;vertical-align:middle;pointer-events:none';wrap.append(_svgEl2(L.markup,L.w,L.h),body,_svgEl2(R.markup,R.w,R.h));}
  else{const O=_half2(def.O,true,font,sz,sw,false,pid+'O');wrap.style.cssText='display:inline-flex;align-items:center;vertical-align:middle;pointer-events:none';wrap.appendChild(_svgEl2(O.markup,O.w,O.h));}
  return wrap;
}

// ── Sequence slot ──
function bSeq(seqArr,ph,cSz,font,fvs){
  const slot=document.createElement('div');
  slot.className='seq-slot';slot.dataset.ph=ph;
  if(!seqArr.length)slot.classList.add('empty-s');
  function fullRender(){
    slot.innerHTML='';
    slot.classList.toggle('empty-s',seqArr.length===0);
    seqArr.forEach((item,idx)=>{
      if(item.type==='text'){
        slot.appendChild(mkTnode(item,cSz,font,fvs,slot,seqArr));
      } else {
        const sw=document.createElement('div');sw.className='sn-wrap';
        const sd=document.createElement('div');sd.className='sn-del';sd.textContent='×';
        sd.addEventListener('click',ev=>{ev.stopPropagation();seqArr.splice(idx,1);fullRender();});
        sw.append(sd,bNode(item,cSz,font,fvs));
        slot.appendChild(sw);
      }
    });
    slot.appendChild(mkTerminal(cSz,font,fvs,slot,seqArr));
  }
  fullRender();
  slot._fullRender=fullRender;
  slot.addEventListener('dragover',ev=>{ev.preventDefault();ev.stopPropagation();slot.classList.add('dov');});
  slot.addEventListener('dragleave',()=>slot.classList.remove('dov'));
  slot.addEventListener('drop',ev=>{
    ev.preventDefault();ev.stopPropagation();slot.classList.remove('dov');
    if(!dragKey)return;
    seqArr.push(mkNode(dragKey));
    dragKey=null;if(ghost){ghost.remove();ghost=null;}
    fullRender();
    setTimeout(()=>{const t=slot.querySelector('.tnode:last-child');if(t)t.focus();},20);
  });
  slot.addEventListener('click',ev=>{
    if(ev.target===slot){const t=slot.querySelector('.tnode:last-child');if(t)t.focus();}
  });
  return slot;
}

function mkTnode(item,cSz,font,fvs,slot,seqArr){
  const tn=document.createElement('span');
  tn.className='tnode';tn.contentEditable='true';tn.spellcheck=false;
  tn.style.cssText=`font-size:${cSz}px;font-family:${font}`;
  if(fvs)tn.style.fontVariationSettings=fvs;
  tn.textContent=item.text||'';
  tn.addEventListener('input',()=>{
    item.text=tn.textContent;
    slot.classList.toggle('empty-s',seqArr.every(i=>i.type==='text'&&!i.text));
  });
  _bindTnodeKeys(tn,slot);
  return tn;
}
function mkTerminal(cSz,font,fvs,slot,seqArr){
  const tn=document.createElement('span');
  tn.className='tnode';tn.contentEditable='true';tn.spellcheck=false;
  tn.style.cssText=`font-size:${cSz}px;font-family:${font};min-width:2px`;
  if(fvs)tn.style.fontVariationSettings=fvs;
  tn.addEventListener('input',()=>{
    const txt=tn.textContent;
    if(txt){seqArr.push({type:'text',text:txt});tn.textContent='';
      slot._fullRender?.();
      setTimeout(()=>{const t=slot.querySelector('.tnode:last-child');if(t)t.focus();},10);}
  });
  _bindTnodeKeys(tn,slot);
  return tn;
}
function _bindTnodeKeys(tn,slot){
  tn.addEventListener('keydown',ev=>{
    if(ev.key==='Tab'){ev.preventDefault();tabSlot(ev.shiftKey?-1:1);}
    if(ev.key==='Escape')tn.blur();
    ev.stopPropagation();
  });
  tn.addEventListener('focus',()=>slot.classList.add('sf'));
  tn.addEventListener('blur',()=>{
    setTimeout(()=>{if(!slot.contains(document.activeElement))slot.classList.remove('sf');},80);
  });
}

function tabSlot(dir){
  const all=[...document.querySelectorAll('.seq-slot,.delim-body,.tb-editor')];
  if(!all.length)return;
  const cur=document.activeElement.closest('.seq-slot,.delim-body,.tb-editor')||document.activeElement;
  const idx=all.indexOf(cur);
  const next=all[(idx+dir+all.length)%all.length];
  if(!next)return;
  if(next.classList.contains('delim-body')||next.classList.contains('tb-editor')){next.focus();}
  else{const t=next.querySelector('.tnode:last-child');if(t)t.focus();}
}

// Helpers export HTML
function toRoman(n){
  const v=[1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const s=['m','cm','d','cd','c','xc','l','xl','x','ix','v','iv','i'];
  let r='';v.forEach((val,i)=>{while(n>=val){r+=s[i];n-=val;}});return r;
}
function toAlpha(n){
  let r='';while(n>0){r=String.fromCharCode(96+(n%26||26))+r;n=Math.floor((n-1)/26);}return r;
}
function escH(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function nodeHTML(node,px){
  if(!node)return'';
  if(node.type==='free'||node.type==='op')
    return`<span style="font-family:${MFONT};font-size:${px}px">${escH(node.text||node.s)}</span>`;
  if(node.type==='frac'){
    const c=Math.round(px*SS);const bh=Math.max(1,Math.round(px*(node.frt||.06)));
    return`<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle">`+
      `<span>${seqHTML(node.ns||[],c)}</span>`+
      `<span style="height:${bh}px;background:#111;min-width:${Math.round(px*.5)}px;display:block"></span>`+
      `<span>${seqHTML(node.ds||[],c)}</span></span>`;
  }
  if(node.type==='rad'){
    const c=Math.round(px*.88);const bh=Math.max(1,Math.round(px*(node.rrt||.05)));
    return`<span style="display:inline-flex;align-items:flex-start;vertical-align:middle">`+
      `<span style="font-size:${Math.round(px*1.05)}px;font-family:${MFONT};align-self:flex-end">√</span>`+
      `<span style="display:inline-flex;flex-direction:column">`+
      `<span style="height:${bh}px;background:#111;min-width:${Math.round(px*.5)}px;display:block"></span>`+
      `<span style="padding:0 4px;font-size:${c}px">${seqHTML(node.bs||[],c)}</span>`+
      `</span></span>`;
  }
  if(node.type==='delim'){
    const c=Math.round(px*.9);
    return`<span style="font-family:${MFONT};font-size:${px}px;vertical-align:middle">${escH(node.open||'(')}</span>`+
      `<span style="font-size:${c}px;font-family:${MFONT}">${escH(node.bodyText||'')}</span>`+
      `<span style="font-family:${MFONT};font-size:${px}px;vertical-align:middle">${escH(node.close||')')}</span>`;
  }
  if(node.type==='hdelim'){
    const def=_DS[node.delim];
    const side=def?(def.paired?(node.half==='L'?def.L:def.R):def.O):null;
    const ch=side?side.nat:(node.s||'?');
    const sy=(node.stretchY||100)/100;
    return`<span style="font-family:${MFONT};font-size:${Math.round(px*sy)}px;vertical-align:middle">${escH(ch)}</span>`;
  }
  return`<span style="font-family:${MFONT};font-size:${px}px">${escH(node.s||'')}</span>`;
}
function seqHTML(arr,sz){
  return arr.map(i=>i.type==='text'?escH(i.text||''):nodeHTML(i,sz)).join('');
}


/* === panels.js === */

'use strict';
function switchMode(m){
  appMode=m;

  // ── Thème couleur Limou ──────────────────────────────────────────────────
  document.body.classList.toggle('mode-doc', m === 'doc');
  const logoMark = document.querySelector('.logo-mark');
  if (logoMark) {
    logoMark.style.background = m === 'fe'
      ? '#E8D800'  // Jaune ∑ Formules
      : '#7BC800'; // Vert ¶ Document
  }
  // ────────────────────────────────────────────────────────────────────────

  g('mtab-fe').classList.toggle('on',m==='fe');
  g('mtab-doc').classList.toggle('on',m==='doc');
  g('fe-wrap').style.display=m==='fe'?'flex':'none';
  g('doc-wrap').style.display=m==='doc'?'flex':'none';
  g('fe-tools').style.display=m==='fe'?'flex':'none';
  g('doc-tools').style.display=m==='doc'?'flex':'none';
  g('fe-inspector').style.display=m==='fe'?'block':'none';
  g('doc-inspector').style.display=m==='doc'?'block':'none';

  // ── FE left panel tabs: shown only in FE mode ─────────────────────────
  g('fe-ltabs').style.display=m==='fe'?'flex':'none';
  // Hide ALL FE panel bodies when switching (prevents leakage)
  ['kb','font','profiles','layers','equations'].forEach(id=>{
    g('fe-pb-'+id)?.classList.toggle('hidden-pb', m==='doc');
  });

  // ── DOC left panel tabs: shown only in DOC mode ───────────────────────
  const docTabs=g('doc-ltabs');
  if(docTabs){
    docTabs.classList.toggle('hidden-pb', m!=='doc');
    // Hide all doc panel bodies initially; docLTab will show the right one
    ['blocks','font','eq','display'].forEach(id=>{
      g('doc-pb-'+id)?.classList.add('hidden-pb');
    });
    g('doc-foot-blocks')?.classList.add('hidden-pb');
  }

  if(m==='fe'){
    feLTab('kb');
    setFETool('select');
    const st=g('st-mode');if(st)st.textContent=t('st-mode-fe');
    const si=g('st-info');if(si)si.textContent=feEls.length+' element(s)';
  } else {
    setDocTool('select');
    docLTab('blocks');
    const st=g('st-mode');if(st)st.textContent=t('st-mode-doc');
    renderDocList();renderDocPage();updateDocStatus();
    if(g('doc-wrap'))g('doc-wrap').style.display='flex';
    setTimeout(fitPage,60);
  }
  _applyLang();
}

// ── Doc tool (T = text box drag-create) ──────────────────────────────────────
function setDocTool(tool){
  docTool=tool;
  const btn=g('tbDocText');
  if(btn)btn.classList.toggle('on',tool==='text');
  const dw=g('doc-wrap');
  if(dw)dw.classList.toggle('doc-crosshair',tool==='text');
}

// ── Doc left tab switcher ─────────────────────────────────────────────────────
// STRICT ISOLATION: each tab writes ONLY to its own container.
// No FE container IDs (kb-root, font-list, equations-list…) are ever touched here.
function docLTab(tab){
  ['blocks','font','eq','display'].forEach(id=>{
    g('dlt-'+id)?.classList.toggle('on',id===tab);
    g('doc-pb-'+id)?.classList.toggle('hidden-pb',id!==tab);
    if(id==='blocks') g('doc-foot-blocks')?.classList.toggle('hidden-pb',id!==tab);
  });
  // Render into isolated doc containers only
  if(tab==='font')    _renderDocFontList();
  if(tab==='eq')      _renderDocEqList();
  if(tab==='display') _renderDocDisplayList();
}

function feLTab(t){
  ['kb','font','profiles','layers','equations'].forEach(id=>{
    g('plt-'+id)?.classList.toggle('on',id===t);
    g('fe-pb-'+id)?.classList.toggle('hidden-pb',id!==t);
  });
  if(t==='kb')buildKb();
  if(t==='font'){renderFontList();}
  if(t==='profiles')renderProfiles();
  if(t==='layers')renderLayers();
  if(t==='equations')renderEquations();
}

function togglePanel(side){
  if(side==='left'){pLeft=!pLeft;g('panel-left').classList.toggle('hidden',!pLeft);g('tbL').classList.toggle('on',pLeft);g('tbDL').classList.toggle('on',pLeft);}
  else{pRight=!pRight;g('panel-right').classList.toggle('hidden',!pRight);g('tbR').classList.toggle('on',pRight);g('tbDR').classList.toggle('on',pRight);}
}

// ── Doc T tool: mousedown on doc-wrap creates a canvas-textbox block ─────────
// Attached once after DOMContentLoaded (see init patch below).
function _initDocTextTool(){
  const dw=g('doc-wrap');if(!dw)return;
  let _sx=0,_sy=0,_ghost=null,_active=false;

  dw.addEventListener('mousedown',ev=>{
    if(docTool!=='text'||appMode!=='doc')return;
    // Only trigger on the scroll container, not on existing blocks/buttons
    if(ev.target.closest('.doc-pb,.doc-pb-acts,.floating-formula,.f-el-del,.doc-canvas-tb'))return;
    _active=true;_sx=ev.clientX;_sy=ev.clientY;

    _ghost=document.createElement('div');
    _ghost.style.cssText='position:fixed;border:1.5px dashed #7BC800;background:rgba(123,200,0,.07);'+
      'border-radius:2px;pointer-events:none;z-index:9999;'+
      'left:'+ev.clientX+'px;top:'+ev.clientY+'px;width:0;height:0';
    document.body.appendChild(_ghost);
    ev.preventDefault();

    function onMove(e){
      if(!_active)return;
      const x=Math.min(_sx,e.clientX),y=Math.min(_sy,e.clientY);
      _ghost.style.cssText=_ghost.style.cssText.replace(/left:[^;]+;top:[^;]+;width:[^;]+;height:[^;]+/,
        'left:'+x+'px;top:'+y+'px;width:'+Math.abs(e.clientX-_sx)+'px;height:'+Math.abs(e.clientY-_sy)+'px');
      Object.assign(_ghost.style,{left:x+'px',top:y+'px',width:Math.abs(e.clientX-_sx)+'px',height:Math.abs(e.clientY-_sy)+'px'});
    }

    function onUp(e){
      document.removeEventListener('mousemove',onMove);
      document.removeEventListener('mouseup',onUp);
      if(_ghost){_ghost.remove();_ghost=null;}
      if(!_active)return;_active=false;

      const page=g('zoom-wrap')?.querySelector('.doc-page');
      if(!page)return;
      const pr=page.getBoundingClientRect();
      const zm=zoom||1;
      const m=getMargins();
      const mlPx=m.l*MM,mtPx=m.t*MM;
      const rawW=Math.abs(e.clientX-_sx)/zm;
      const rawH=Math.abs(e.clientY-_sy)/zm;
      const finalW=rawW>20?Math.round(rawW):200;
      const finalH=rawH>16?Math.round(rawH):60;
      const fx=Math.max(0,Math.round((Math.min(_sx,e.clientX)-pr.left)/zm));
      const fy=Math.max(0,Math.round((Math.min(_sy,e.clientY)-pr.top)/zm));

      const al=activeLayer();
      const nb={
        id:uid(),type:'canvas-textbox',
        text:'',
        fontSize:al.fontSize||14,font:al.font||MFONT,fvs:al.fvs||'',
        textColor:al.textColor||'#000000',opacity:100,
        w:finalW,h:finalH,
        floating:true,fx:Math.max(0,fx),fy:Math.max(0,fy),
        align:'l',stTop:0,stBot:0,indent:0,
      };
      docBlocks.push(nb);
      docSnap();renderDocList();renderDocPage();selDocBlock(nb.id);
      setDocTool('select');
      // Focus the new textbox
      setTimeout(()=>{
        const ctb=document.querySelector('.floating-formula .doc-canvas-tb[data-id="'+nb.id+'"]');
        if(ctb){ctb.focus();const r=document.createRange();r.selectNodeContents(ctb);r.collapse(false);const s=window.getSelection();s.removeAllRanges();s.addRange(r);}
      },80);
    }

    document.addEventListener('mousemove',onMove);
    document.addEventListener('mouseup',onUp);
  });
}

// ── Doc Font tab — writes ONLY to #doc-font-list, never touches #font-list ───
function _renderDocFontList(){
  const list=g('doc-font-list');if(!list)return;
  list.innerHTML='';
  const al=activeLayer();

  // Size control
  const szSec=document.createElement('div');szSec.className='font-ctrl-sec';
  const szLR=document.createElement('div');szLR.className='axis-lbl-row';
  const szLT=document.createElement('span');szLT.textContent=t('font-default-size');
  const szVT=document.createElement('span');szVT.style.fontFamily='monospace';
  const curSz=al.fontSize||defaultFontSize;szVT.textContent=curSz+'px';
  szLR.append(szLT,szVT);
  const szSl=document.createElement('input');szSl.type='range';szSl.className='font-axis-slider';
  szSl.min=14;szSl.max=120;szSl.step=2;szSl.value=curSz;
  const szN=document.createElement('input');szN.type='number';szN.min=14;szN.max=120;szN.step=2;szN.value=curSz;szN.className='font-sz-num';
  const szRow=document.createElement('div');szRow.className='font-sz-row';szRow.append(szSl,szN);
  const syncSz=(v)=>{
    v=Math.min(120,Math.max(14,+v||50));
    const layer=activeLayer();layer.fontSize=v;defaultFontSize=v;
    szSl.value=v;szN.value=v;szVT.textContent=v+'px';
    localStorage.setItem('limou-default-sz',v);
    feEls.filter(e=>e.layerId===layer.id).forEach(rd=>{rd.size=v;feRenderEl(rd);});
    _syncTextBoxes(layer.id);
  };
  szSl.oninput=()=>syncSz(+szSl.value);szN.oninput=()=>syncSz(+szN.value);
  szSec.append(szLR,szRow);list.appendChild(szSec);

  // Color control
  const clrSec=document.createElement('div');clrSec.className='font-ctrl-sec';
  const clrLR=document.createElement('div');clrLR.className='axis-lbl-row';
  clrLR.appendChild(Object.assign(document.createElement('span'),{textContent:t('font-text-color')}));
  const clrRow=document.createElement('div');clrRow.className='font-color-row';
  const clrP=document.createElement('input');clrP.type='color';clrP.className='font-color-pick';clrP.value=al.textColor||'#000000';
  const clrHx=document.createElement('span');clrHx.className='font-color-hex';clrHx.style.fontFamily='monospace';clrHx.textContent=clrP.value;
  const clrR=document.createElement('button');clrR.className='font-color-reset';clrR.textContent='↺';clrR.title=t('font-color-reset');
  clrP.oninput=()=>{clrHx.textContent=clrP.value;const layer=activeLayer();layer.textColor=clrP.value;feEls.filter(e=>e.layerId===layer.id).forEach(feRenderEl);_syncTextBoxes(layer.id);};
  clrR.onclick=()=>{clrP.value='#000000';clrP.oninput();};
  clrRow.append(clrP,clrHx,clrR);clrSec.append(clrLR,clrRow);list.appendChild(clrSec);

  // Update dz text
  const dzP=g('doc-font-dz-p');if(dzP)dzP.innerHTML=t('font-dz-text').replace('\n','<br>');

  if(!loadedFonts.length){
    list.appendChild(Object.assign(document.createElement('div'),{className:'font-empty-note',textContent:t('font-no-fonts')}));
    return;
  }
  list.appendChild(Object.assign(document.createElement('div'),{className:'font-sec-sep'}));

  loadedFonts.forEach(font=>{
    const item=document.createElement('div');item.className='font-item';
    const nm=document.createElement('div');nm.className='font-name-lbl';nm.textContent=font.label;
    const badge=document.createElement('span');badge.className='font-type-badge';
    badge.textContent=font.axes.length?t('font-badge-variable'):t('font-badge-static');
    badge.classList.toggle('variable',font.axes.length>0);
    const nmRow=document.createElement('div');nmRow.style.cssText='display:flex;align-items:center;justify-content:space-between;margin-bottom:3px';nmRow.append(nm,badge);
    const pv=document.createElement('div');pv.className='font-preview';pv.style.fontFamily=font.css;pv.textContent='f(x) = ∑αᵢ/π';
    if(font.fvs)pv.style.fontVariationSettings=font.fvs;
    item.append(nmRow,pv);
    if(font.axes.length>0){
      const layer=activeLayer();
      if(layer.font===font.css&&layer.fvs)_syncAxesFromFVS(font.axes,layer.fvs);
      font.axes.forEach(ax=>{
        const axRow=document.createElement('div');axRow.style.marginTop='5px';
        const lrow=document.createElement('div');lrow.className='axis-lbl-row';
        const name=_axisDisplayName(ax);
        const ls=document.createElement('span');ls.textContent=name;
        const tagBadge=document.createElement('span');tagBadge.className='axis-tag-badge';tagBadge.textContent=ax.tag;
        const lsW=document.createElement('span');lsW.style.cssText='display:flex;align-items:center;gap:4px';lsW.append(ls,tagBadge);
        const vs=document.createElement('span');vs.style.fontFamily='monospace';vs.textContent=ax.val;
        lrow.append(lsW,vs);
        const sl=document.createElement('input');sl.type='range';sl.className='font-axis-slider';
        sl.min=ax.min;sl.max=ax.max;sl.step=(ax.max-ax.min)<=10?0.1:1;sl.value=ax.val;
        sl.oninput=()=>{
          const v=+sl.value;ax.val=v;vs.textContent=Number.isInteger(v)?v:v.toFixed(1);
          font.fvs=axFVS(font.axes);pv.style.fontVariationSettings=font.fvs;
          const layer=activeLayer();
          if(layer.font===font.css){layer.fvs=font.fvs;feEls.filter(e=>e.layerId===layer.id).forEach(rd=>feRenderEl(rd));buildKb();}
        };
        axRow.append(lrow,sl);item.appendChild(axRow);
      });
    } else {
      const styRow=document.createElement('div');styRow.className='font-style-row';
      const styLbl=document.createElement('div');styLbl.className='axis-lbl-row';
      styLbl.appendChild(Object.assign(document.createElement('span'),{textContent:t('font-styles')}));
      const styGrid=document.createElement('div');styGrid.className='font-style-grid';
      _buildStaticStyleBtns(styGrid,font,pv);
      styRow.append(styLbl,styGrid);item.appendChild(styRow);
    }
    const applyBtn=document.createElement('div');applyBtn.className='font-apply';
    applyBtn.textContent=t('font-apply-text');
    applyBtn.onclick=()=>{
      const layer=activeLayer();layer.font=font.css;layer.fvs=font.axes.length?axFVS(font.axes):'';layer.name=font.label;
      if(font._otf)window._limouOTFont=font._otf;
      if(typeof _clearDelimCaches==='function')_clearDelimCaches();
      buildKb();renderLayers();feEls.filter(e=>e.layerId===activeLayerId).forEach(rd=>feRenderEl(rd));
      _syncTextBoxes(activeLayerId);toast(t('font-applied')+' "'+layer.name+'"');
    };
    item.appendChild(applyBtn);list.appendChild(item);
  });
}

// ── Doc Equations tab — writes ONLY to #doc-eq-list ──────────────────────────
function _renderDocEqList(){
  const list=g('doc-eq-list');if(!list)return;list.innerHTML='';
  if(!_equations.length){
    list.innerHTML='<div class="empty-msg" style="padding:6px">'+t('no-equations')+'</div>';
    return;
  }
  _equations.forEach(eq=>{
    const card=document.createElement('div');card.className='eq-card';
    const head=document.createElement('div');head.className='eq-card-head';
    const nm=document.createElement('span');nm.className='eq-card-name';nm.textContent=eq.name;
    const acts=document.createElement('div');acts.className='eq-card-acts';
    const insBtn=document.createElement('span');insBtn.className='l-ico';insBtn.textContent='↩';
    insBtn.title=t('eq-insert-title');
    insBtn.onclick=ev=>{ev.stopPropagation();_insertEqToDoc(eq);};
    acts.append(insBtn);head.append(nm,acts);
    const prev=document.createElement('div');prev.className='eq-preview';
    _buildEqPreview(prev,eq);
    const badge=document.createElement('div');badge.className='eq-count-badge';badge.textContent=eq.elements.length+' '+t('eq-elements-lbl');
    card.append(head,prev,badge);list.appendChild(card);
  });
}

function _insertEqToDoc(eq){
  if(!eq)return;

  // ── Build a positioned snapshot block ────────────────────────────────────
  // Each element keeps its original _rx/_ry relative coordinates so the
  // document render can place them with absolute positioning, exactly
  // preserving the geometry the user created on the FE canvas.
  const elements = eq.elements.map(src => {
    const elFont  = src._savedLayerFont  || src.font       || MFONT;
    const elFvs   = src._savedLayerFvs   || src.fvs        || '';
    const elColor = src._savedLayerColor || src.textColor  || '#000000';
    return {
      id:      uid(),
      type:    src.type || 'math',        // 'math' | 'textbox'
      node:    src.node ? JSON.parse(JSON.stringify(src.node)) : null,
      // geometry — exact relative position from bounding-box origin
      rx:      src._rx ?? src.x,
      ry:      src._ry ?? src.y,
      // textbox fields
      w:       src.w,
      h:       src.h,
      text:    src.text || '',
      // typography — fully resolved at save time
      size:    src.size || src.fontSize || 22,
      font:    elFont,
      fvs:     elFvs,
      color:   elColor,
      opacity: src.opacity ?? 100,
    };
  });

  const b = {
    id:      uid(),
    type:    'eq-snapshot',
    name:    eq.name,
    elements,
    // Bounding box: used to size the container in the doc
    bboxW:   eq.bboxW || 200,
    bboxH:   eq.bboxH || 80,
    // Block layout
    align:   'c',
    floating: false, fx: 80, fy: 80,
    stTop: 2, stBot: 2, indent: 0,
    // fontSize = global scale factor (1 = original size, inspector can change)
    fontSize: 1,
  };

  if(docSelId){
    const idx = docBlocks.findIndex(x => x.id === docSelId);
    if(idx >= 0){ docBlocks.splice(idx+1, 0, b); } else docBlocks.push(b);
  } else { docBlocks.push(b); }

  docSnap(); renderDocList(); renderDocPage(); selDocBlock(b.id);
  toast(t('eq-inserted')+' "'+eq.name+'"');
}

// ── Doc Display tab — writes ONLY to #doc-display-list ───────────────────────
const _DISP_MODES_FOR={
  'formula':['inline','floating'],'canvas-textbox':['inline','floating'],
  'eq-snapshot':['inline','floating'],
  'text':['inline'],'title':['inline'],'h2':['inline'],
};

function _getBlockDisplayMode(b){
  if((b.type==='formula'||b.type==='canvas-textbox'||b.type==='eq-snapshot')&&b.floating)return'floating';
  return'inline';
}

function _setBlockDisplayMode(b,mode){
  if(b.type==='formula'||b.type==='canvas-textbox'||b.type==='eq-snapshot'){
    b.floating=mode==='floating';
    if(b.floating){b.fx=b.fx||80;b.fy=b.fy||80;}
  }
  docSnap();renderDocPage();_renderDocDisplayList();
}

function _renderDocDisplayList(){
  const list=g('doc-display-list');if(!list)return;list.innerHTML='';
  if(!docBlocks.length){
    list.innerHTML='<div class="empty-msg" style="padding:6px">'+t('no-blocks-display')+'</div>';
    return;
  }
  docBlocks.forEach(b=>{
    const row=document.createElement('div');
    row.className='disp-row'+(docSelId===b.id?' sel':'');
    row.dataset.id=b.id;
    row.onclick=()=>{selDocBlock(b.id);propTab('bloc');};

    const icon=document.createElement('div');icon.className='bl-icon';
    icon.style.background=BLOCK_BG[b.type]||'#eee';icon.style.color=BLOCK_CLR[b.type]||'#aaa';
    icon.textContent=BLOCK_ICON[b.type]||'?';

    const info=document.createElement('div');info.className='disp-info';
    const tp=document.createElement('div');tp.className='bl-tp';tp.textContent=t('block-type-'+b.type)||b.type;
    const pv=document.createElement('div');pv.className='bl-pv';pv.textContent=(b.text||'—').slice(0,20);

    const modes=_DISP_MODES_FOR[b.type]||['inline'];
    const curMode=_getBlockDisplayMode(b);
    const modeRow=document.createElement('div');modeRow.className='disp-mode-row';
    modes.forEach(mode=>{
      const btn=document.createElement('button');
      btn.className='disp-mode-btn'+(curMode===mode?' on':'');
      btn.textContent=t('disp-mode-'+mode);
      btn.disabled=modes.length<=1;
      btn.onclick=ev=>{ev.stopPropagation();_setBlockDisplayMode(b,mode);};
      modeRow.appendChild(btn);
    });

    info.append(tp,pv,modeRow);row.append(icon,info);list.appendChild(row);
  });
}
function toggleMg(){showMg=!showMg;g('tbMg').classList.toggle('on',showMg);renderDocPage();}
function toggleBl(){showBl=!showBl;g('tbBl').classList.toggle('on',showBl);renderDocPage();}

// ── Zoom (document) ──────────────────────────────────────────────────────────
function setZoom(z){
  zoom=Math.max(.15,Math.min(4,Math.round(z*10)/10));
  const wrap=g('zoom-wrap');if(wrap)wrap.style.transform=`scale(${zoom})`;
  const lbl=g('zlbl');if(lbl)lbl.textContent=Math.round(zoom*100)+'%';
}
function fitPage(){
  const cvs=g('cvs');if(!cvs)return;
  const aw=cvs.offsetWidth-60;const pw=getPW()*MM;
  setZoom(Math.min(1.2,aw/pw));
}

document.addEventListener('DOMContentLoaded',()=>{
  const cvs=g('cvs');
  if(cvs)cvs.addEventListener('wheel',ev=>{if(ev.ctrlKey||ev.metaKey){ev.preventDefault();setZoom(zoom+(ev.deltaY<0?.1:-.1));}},{passive:false});
  g('pm')?.addEventListener('click',ev=>{if(ev.target===g('pm'))closePM();});
});

// ── Language system ──────────────────────────────────────────────────────────
// Default is English. User can toggle; choice persists in localStorage.
let _lang = localStorage.getItem('limou-lang') || 'en';

function toggleLang(){
  _lang = _lang === 'en' ? 'fr' : 'en';
  localStorage.setItem('limou-lang', _lang);
  _applyLang();
}

// t(key) — quick translation helper
function t(key){ return (_I18N[key]??{})[_lang] ?? (_I18N[key]??{})['en'] ?? key; }

const _I18N = {
  /* ── Topbar mode tabs ── */
  'mtab-fe':              {en:'∑ Formulas',                 fr:'∑ Formules'},
  'mtab-doc':             {en:'¶ Document',                  fr:'¶ Document'},

  /* ── Topbar title ── */
  'title-placeholder':    {en:'Document name',              fr:'Nom du document'},
  'doc-title-default':    {en:'Untitled',                   fr:'Sans titre'},

  /* ── Topbar buttons / tooltips ── */
  'tb-left-panel':        {en:'Layers / Keyboard',          fr:'Couches / Clavier'},
  'tb-inspector':         {en:'Inspector',                  fr:'Inspecteur'},
  'tb-grid':              {en:'Grid (G)',                   fr:'Grille (G)'},
  'tb-bb':                {en:'Collision zones (B)',        fr:'Zones de collision (B)'},
  'tb-delete':            {en:'Delete (Del)',               fr:'Supprimer (Suppr)'},
  'tb-text-tool':         {en:'Text box (T)',                fr:'Zone de texte (T)'},
  'tb-insert-doc':        {en:'Insert into document',       fr:'Insérer dans le document'},
  'tb-structure':         {en:'Structure',                  fr:'Structure'},
  'tb-properties':        {en:'Properties',                 fr:'Propriétés'},
  'tb-margins':           {en:'Margins',                    fr:'Marges'},
  'tb-bleed':             {en:'Bleed',                      fr:'Bleed'},
  'abtn-prev':            {en:'Preview',                    fr:'Aperçu'},
  'abtn-print':           {en:'Print',                      fr:'Imprimer'},
  'btn-lang':             {en:'FR',                         fr:'EN'},

  /* ── Left panel ── */
  'lpanel-title-fe':      {en:'Edit',                       fr:'Édition'},
  'lpanel-title-doc':     {en:'Structure',                  fr:'Structure'},
  'plt-kb':               {en:'Keyboard',                   fr:'Clavier'},
  'plt-font':             {en:'Fonts',                      fr:'Fonte'},
  'plt-profiles':         {en:'Profiles',                   fr:'Profils'},
  'plt-layers':           {en:'Layers',                     fr:'Couches'},
  'plt-equations':        {en:'Eq.',                        fr:'Éq.'},
  'add-layer-btn-layers':    {en:'+ New layer',             fr:'+ Nouvelle couche'},
  'add-layer-btn-profiles':  {en:'💾 Save current profile', fr:'💾 Sauvegarder profil actuel'},
  'add-layer-btn-equations': {en:'💾 Save current formula', fr:'💾 Sauvegarder la formule'},
  'profiles-export':      {en:'↓ Export JSON',              fr:'↓ Exporter JSON'},

  /* ── Font drop zone ── */
  'font-dz-text':         {en:'Drag .otf/.ttf/.woff2\nor click to choose', fr:'Glisser .otf/.ttf/.woff2\nou cliquer pour choisir'},
  'font-apply-text':      {en:'Apply to active layer',      fr:'Appliquer à la couche active'},
  'font-default-size':    {en:'Default size (new elements)',fr:'Taille par défaut (nouveaux éléments)'},
  'font-text-color':      {en:'Layer text color',           fr:'Couleur de texte (couche)'},
  'font-color-reset':     {en:'Reset to black',             fr:'Réinitialiser au noir'},
  'font-no-fonts':        {en:'No fonts imported yet.',     fr:'Aucune fonte importée.'},
  'font-styles':          {en:'Styles',                     fr:'Styles'},
  'font-axis-weight':     {en:'Weight',                     fr:'Graisse'},
  'font-badge-variable':  {en:'Variable',                   fr:'Variable'},
  'font-badge-static':    {en:'Static',                     fr:'Statique'},

  /* ── Right panel ── */
  'rpanel-title':         {en:'Inspector',                  fr:'Inspecteur'},
  'fit-elem':             {en:'Element',                    fr:'Élément'},
  'fit-math':             {en:'MATH Table',                 fr:'Table MATH'},

  /* ── FE Inspector — Element tab ── */
  'ph-symbol':            {en:'Symbol',                     fr:'Symbole'},
  'ph-position':          {en:'Position',                   fr:'Position'},
  'ph-size':              {en:'Size (Alt+↑↓)',              fr:'Taille (Alt+↑↓)'},
  'ph-freesym':           {en:'Free Symbol',                fr:'Symbole libre'},
  'ph-collision':         {en:'Collision',                  fr:'Collision'},
  'ph-actions':           {en:'Actions',                    fr:'Actions'},
  'lbl-name':             {en:'Name',                       fr:'Nom'},
  'lbl-size':             {en:'Size',                       fr:'Taille'},
  'lbl-opacity':          {en:'Opacity',                    fr:'Opacité'},
  'lbl-stretchx':         {en:'Stretch X',                  fr:'Étirement X'},
  'lbl-stretchy':         {en:'Stretch Y',                  fr:'Étirement Y'},
  'lbl-axis':             {en:'Axis offset',                fr:'Décalage axe'},
  'lbl-italic':           {en:'Italic corr.',               fr:'Corr. italique'},
  'lbl-bbmargin':         {en:'BB margin',                  fr:'Marge BB'},
  'lbl-delete':           {en:'Delete',                     fr:'Supprimer'},

  /* ── FE Inspector — MATH Table tab ── */
  'ph-fraction':          {en:'Fraction',                   fr:'Fraction'},
  'ph-radical':           {en:'Radical',                    fr:'Radical'},
  'ph-delimiter':         {en:'Delimiter — GlyphAssembly',  fr:'Délimiteur — GlyphAssembly'},
  'ph-displayop':         {en:'Display operator',           fr:'Opérateur display'},
  'ph-activeparams':      {en:'Active parameters',          fr:'Paramètres actifs'},
  'lbl-rulethickness':    {en:'RuleThickness',              fr:'Épaisseur trait'},
  'lbl-numshiftup':       {en:'NumeratorShiftUp',           fr:'Décalage numérateur'},
  'lbl-denomshiftdown':   {en:'DenomShiftDown',             fr:'Décalage dénominateur'},
  'lbl-numgapmin':        {en:'NumGapMin',                  fr:'Espace num. min'},
  'lbl-denomgapmin':      {en:'DenomGapMin',                fr:'Espace dén. min'},
  'lbl-verticalgap':      {en:'VerticalGap',                fr:'Espace vertical'},
  'lbl-extraascender':    {en:'ExtraAscender',              fr:'Ascendeur extra'},
  'lbl-minconnector':     {en:'MinConnectorOverlap',        fr:'Chevauchement min'},
  'lbl-displayopminheight':{en:'DisplayOpMinHeight',        fr:'Hauteur min opér.'},
  'lbl-upperlimitgap':    {en:'UpperLimitGapMin',           fr:'Espace limite sup.'},
  'lbl-lowerlimitgap':    {en:'LowerLimitGapMin',           fr:'Espace limite inf.'},

  /* ── DOC Inspector tabs ── */
  'pt-page':              {en:'Page',                       fr:'Page'},
  'pt-bloc':              {en:'Block',                      fr:'Bloc'},
  'pt-imp':               {en:'Print',                      fr:'Impression'},

  /* ── DOC Inspector — Page tab ── */
  'ph-format':            {en:'Format',                     fr:'Format'},
  'ph-margins':           {en:'Margins',                    fr:'Marges'},
  'ph-typo':              {en:'Typography',                 fr:'Typographie'},
  'ph-pagenum':           {en:'Page numbers',               fr:'Numéros de page'},
  'ph-spacing':           {en:'Spacing',                    fr:'Espacement'},
  'ph-formula':           {en:'Formula',                    fr:'Formule'},
  'ph-bleed':             {en:'Bleed & marks',              fr:'Bleed & repères'},
  'ph-csspage':           {en:'Generated CSS @page',        fr:'CSS @page généré'},
  'lbl-preset':           {en:'Preset',                     fr:'Modèle'},
  'lbl-orient':           {en:'Orient.',                    fr:'Orient.'},
  'opt-portrait':         {en:'Portrait',                   fr:'Portrait'},
  'opt-landscape':        {en:'Landscape',                  fr:'Paysage'},
  'opt-custom':           {en:'Custom…',                    fr:'Personnalisé…'},
  'lbl-linked':           {en:'Linked',                     fr:'Liées'},
  'lbl-top':              {en:'Top',                        fr:'Haut'},
  'lbl-bottom':           {en:'Bottom',                     fr:'Bas'},
  'lbl-left':             {en:'Left',                       fr:'Gauche'},
  'lbl-right':            {en:'Right',                      fr:'Droite'},
  'lbl-page':             {en:'Page',                       fr:'Page'},
  'lbl-bodysize':         {en:'Body size',                  fr:'Corps'},
  'lbl-lineh':            {en:'Line height',                fr:'Interligne'},
  'lbl-indent':           {en:'Indent',                     fr:'Indent'},
  'lbl-mode':             {en:'Mode',                       fr:'Mode'},
  'opt-indent-none':      {en:'None',                       fr:'Aucun'},
  'opt-indent-first':     {en:'1st line',                   fr:'1re ligne'},
  'opt-indent-hanging':   {en:'Hanging',                    fr:'Suspendu'},
  'opt-indent-all':       {en:'All',                        fr:'Tous'},
  'lbl-font':             {en:'Font',                       fr:'Fonte'},
  'lbl-show':             {en:'Show',                       fr:'Afficher'},
  'lbl-pos':              {en:'Position',                   fr:'Position'},
  'opt-pn-bc':            {en:'Bottom · center',            fr:'Bas · centre'},
  'opt-pn-br':            {en:'Bottom · right',             fr:'Bas · droite'},
  'opt-pn-bl':            {en:'Bottom · left',              fr:'Bas · gauche'},
  'opt-pn-tc':            {en:'Top · center',               fr:'Haut · centre'},
  'lbl-style':            {en:'Style',                      fr:'Style'},
  'lbl-prefix':           {en:'Prefix',                     fr:'Préfixe'},
  'lbl-start':            {en:'Start',                      fr:'Départ'},
  'lbl-before':           {en:'Before',                     fr:'Avant'},
  'lbl-after':            {en:'After',                      fr:'Après'},
  'lbl-align':            {en:'Align.',                     fr:'Align.'},
  'lbl-floating':         {en:'Floating (draggable)',       fr:'Flottante (déplaçable)'},
  'lbl-cropmarks':        {en:'Crop marks',                 fr:'Traits de coupe'},
  'lbl-crossmarks':       {en:'Registration marks',         fr:'Croix de repérage'},
  'lbl-bleed':            {en:'Bleed',                      fr:'Bleed'},
  'opt-align-c':          {en:'Centered',                   fr:'Centré'},
  'opt-align-l':          {en:'Left',                       fr:'Gauche'},
  'opt-align-r':          {en:'Right',                      fr:'Droite'},
  'click-a-block':        {en:'Click on a block.',          fr:'Cliquez sur un bloc.'},
  'btn-preview-doc':      {en:'👁 Paged.js Preview',         fr:'👁 Aperçu Paged.js'},
  'btn-export-doc':       {en:'↓ Export HTML',              fr:'↓ Exporter HTML'},

  /* ── Print modal ── */
  'pm-title':             {en:'Paged.js Preview',           fr:'Aperçu Paged.js'},
  'pm-print':             {en:'🖨 Print',                   fr:'🖨 Imprimer'},
  'pm-close':             {en:'Close',                      fr:'Fermer'},

  /* ── Canvas hint ── */
  'fe-hint-main':         {en:'Drag a symbol from the keyboard', fr:'Glissez un symbole depuis le clavier'},
  'fe-hint-sub':          {en:'Drag from ruler = custom axis · G = grid', fr:'Tirer depuis la règle = axe personnalisé · G = grille'},

  /* ── Statusbar ── */
  'st-mode-fe':           {en:'∑ Formulas',                 fr:'∑ Formules'},
  'st-mode-doc':          {en:'¶ Document',                 fr:'¶ Document'},
  'st-zero-elements':     {en:'0 element(s)',               fr:'0 élément(s)'},
  'btn-fit':              {en:'Fit',                        fr:'Ajuster'},

  /* ── FE inspector empty state ── */
  'fe-ins-empty':         {en:'Select an element.',         fr:'Sélectionnez un élément.'},

  /* ── Grid bar ── */
  'gc-grid-step':         {en:'Grid step:',                 fr:'Pas grille :'},
  'gc-snap':              {en:'Snap:',                      fr:'Snap :'},
  'snap-strong':          {en:'Strong (1 step)',            fr:'Fort (1 pas)'},
  'snap-soft':            {en:'Soft (½ step)',              fr:'Doux (½ pas)'},
  'snap-free':            {en:'Free (1px)',                 fr:'Libre (1px)'},

  /* ── Keyboard category names ── */
  'kbcat-Letters':              {en:'Letters',              fr:'Lettres'},
  'kbcat-Numbers':              {en:'Numbers',              fr:'Nombres'},
  'kbcat-Operators & Relations':{en:'Operators & Relations',fr:'Opérateurs & Relations'},
  'kbcat-Greek':                {en:'Greek',                fr:'Grec'},
  'kbcat-Structures':           {en:'Structures',           fr:'Structures'},
  'kbcat-Sets & Variables':     {en:'Sets & Variables',     fr:'Ensembles & Variables'},

  /* ── Education level names ── */
  'kb-level-elementary':  {en:'Elementary',                 fr:'Primaire'},
  'kb-level-middle':      {en:'Middle School',              fr:'Collège'},
  'kb-level-high':        {en:'High School',                fr:'Lycée'},
  'kb-level-advanced':    {en:'Advanced',                   fr:'Avancé'},

  /* ── Keyboard search ── */
  'kb-search-ph':         {en:'Search…',                    fr:'Rechercher…'},

  /* ── Missing glyph ── */
  'missing-glyph-tooltip':{en:'Not in selected font',       fr:'Absent de la fonte sélectionnée'},

  /* ── Dynamic JS strings (toast, prompt) ── */
  'locked-layer':         {en:'Layer is locked',            fr:'Couche verrouillée'},
  'canvas-empty':         {en:'Canvas is empty',            fr:'Canvas vide'},
  'select-element':       {en:'Select an element',          fr:'Sélectionnez un élément'},
  'incompatible-node':    {en:'Incompatible node type',     fr:'Type de nœud incompatible'},
  'profile-saved':        {en:'Profile saved',              fr:'Profil sauvegardé'},
  'profile-applied':      {en:'Profile applied',            fr:'Profil appliqué'},
  'profile-name-prompt':  {en:'Profile name:',              fr:'Nom du profil :'},
  'eq-name-prompt':       {en:'Equation name:',             fr:'Nom de l\'équation :'},
  'eq-name-default':      {en:'Equation',                   fr:'Équation'},
  'eq-saved':             {en:'Equation saved',             fr:'Équation sauvegardée'},
  'eq-inserted':          {en:'Equation inserted',          fr:'Équation insérée'},
  'eq-insert-title':      {en:'Insert at center',           fr:'Insérer au centre'},
  'eq-delete-title':      {en:'Delete equation',            fr:'Supprimer l\'équation'},
  'eq-drag-hint':         {en:'Click to insert · Drag to canvas', fr:'Cliquer pour insérer · Glisser sur le canvas'},
  'eq-elements-lbl':      {en:'element(s)',                 fr:'élément(s)'},
  'eq-save-sel-btn':      {en:'💾 Save selection',          fr:'💾 Sauvegarder la sélection'},
  'eq-save-all-btn':      {en:'💾 Save all elements',       fr:'💾 Sauvegarder tous les éléments'},
  'eq-svg-title':         {en:'Export as SVG',              fr:'Exporter en SVG'},
  'eq-svg-exported':      {en:'SVG exported:',              fr:'SVG exporté :'},
  'deleted':              {en:'Deleted',                    fr:'Supprimé'},
  'duplicated':           {en:'Duplicated',                 fr:'Dupliqué'},
  'font-imported':        {en:'Font imported:',             fr:'Fonte importée :'},
  'font-error':           {en:'Font error:',                fr:'Erreur fonte :'},
  'font-applied':         {en:'Font applied to',            fr:'Fonte appliquée à'},
  'profiles-exported':    {en:'Profiles exported',          fr:'Profils exportés'},
  'inserted-to-doc':      {en:'Formula inserted into document', fr:'Formule insérée dans le document'},
  'sync-created':          {en:'Added',                          fr:'Ajouté'},
  'sync-updated':          {en:'Updated',                        fr:'Mis à jour'},
  'sync-no-changes':       {en:'Document already up to date',    fr:'Document déjà à jour'},
  'no-elements-export':   {en:'No elements to export',      fr:'Aucun élément à exporter'},
  'axis-deleted':         {en:'Axis deleted',               fr:'Axe supprimé'},
  'no-elements-canvas':   {en:'No elements on canvas',      fr:'Aucun élément sur le canvas'},
  'no-profile-empty':     {en:'No profiles. Select an element and click Save.', fr:'Aucun profil. Sélectionnez un élément et cliquez Sauvegarder.'},
  'no-equations':         {en:'No saved equations.',        fr:'Aucune équation sauvegardée.'},
  'exported':             {en:'Exported:',                  fr:'Exporté :'},
  'undo':                 {en:'Undo',                       fr:'Annuler'},
  'redo':                 {en:'Redo',                       fr:'Rétablir'},
  'ph-textbox':           {en:'Text Box',                   fr:'Zone de texte'},
  'lbl-tb-w':             {en:'Width',                      fr:'Largeur'},
  'lbl-tb-h':             {en:'Height',                     fr:'Hauteur'},
  'layer-delete-title':   {en:'Delete',                     fr:'Supprimer'},

  /* ── Doc list block type labels ── */
  'block-type-title':     {en:'title',                      fr:'titre'},
  'block-type-h2':        {en:'heading',                    fr:'sous-titre'},
  'block-type-text':      {en:'text',                       fr:'texte'},
  'block-type-formula':   {en:'formula',                    fr:'formule'},
  'block-type-canvas-textbox':{en:'text box',              fr:'zone de texte'},
  'block-type-eq-snapshot':  {en:'equation',               fr:'équation'},
  'block-preview-formula':{en:'Formula…',                   fr:'Formule…'},

  /* ── Doc left tabs ── */
  'dlt-blocks':            {en:'Blocks',                     fr:'Blocs'},
  'dlt-font':              {en:'Fonts',                      fr:'Fontes'},
  'dlt-eq':                {en:'Eq.',                        fr:'Éq.'},
  'dlt-display':           {en:'Display',                    fr:'Affichage'},

  /* ── Display modes ── */
  'disp-mode-inline':      {en:'Inline',                     fr:'En ligne'},
  'disp-mode-floating':    {en:'Float',                      fr:'Flottant'},
  'no-blocks-display':     {en:'No blocks yet.',             fr:'Aucun bloc.'},

  /* ── Multi-selection inspector ── */
  'multi-sel-title':      {en:'Multiple selection',         fr:'Sélection multiple'},
  'multi-sel-count-lbl':  {en:'elements selected',          fr:'éléments sélectionnés'},
  'multi-sz-lbl':         {en:'Size',                       fr:'Taille'},
  'multi-op-lbl-t':       {en:'Opacity',                    fr:'Opacité'},
  'multi-layer-lbl':      {en:'Move to layer',              fr:'Déplacer vers la couche'},
  'multi-mixed':          {en:'(Mixed)',                    fr:'(Mixte)'},
  'multi-del-btn':        {en:'Delete all',                 fr:'Tout supprimer'},
  'multi-dup-btn':        {en:'Duplicate all',              fr:'Tout dupliquer'},

  /* ── Account (sign-in, cloud save) ── */
  'auth-signin-btn':      {en:'Sign in',                    fr:'Se connecter'},
  'auth-title':           {en:'Sign in to Limou',           fr:'Se connecter à Limou'},
  'auth-title-up':        {en:'Create your Limou account',  fr:'Créer votre compte Limou'},
  'auth-sub':             {en:'Your formulas, documents, fonts and profiles are saved in your account.', fr:'Vos formules, documents, fontes et profils sont enregistrés dans votre compte.'},
  'auth-google':          {en:'Continue with Google',       fr:'Continuer avec Google'},
  'auth-or':              {en:'or',                         fr:'ou'},
  'auth-email':           {en:'Email',                      fr:'E-mail'},
  'auth-pass':            {en:'Password (6+ characters)',   fr:'Mot de passe (6 caractères min.)'},
  'auth-submit-in':       {en:'Sign in',                    fr:'Se connecter'},
  'auth-submit-up':       {en:'Create account',             fr:'Créer le compte'},
  'auth-to-up':           {en:'No account yet? Create one', fr:'Pas encore de compte ? En créer un'},
  'auth-to-in':           {en:'Already have an account? Sign in', fr:'Déjà un compte ? Se connecter'},
  'auth-forgot':          {en:'Forgot password?',           fr:'Mot de passe oublié ?'},
  'auth-reset-sent':      {en:'Password reset email sent',  fr:'E-mail de réinitialisation envoyé'},
  'auth-need-email':      {en:'Enter your email first',     fr:'Saisissez d\'abord votre e-mail'},
  'auth-account':         {en:'Your account',               fr:'Votre compte'},
  'auth-signout':         {en:'Sign out',                   fr:'Se déconnecter'},
  'auth-close':           {en:'Close',                      fr:'Fermer'},
  'auth-welcome':         {en:'Signed in',                  fr:'Connecté'},
  'auth-err-invalid':     {en:'Wrong email or password.',   fr:'E-mail ou mot de passe incorrect.'},
  'auth-err-exists':      {en:'An account already exists with this email.', fr:'Un compte existe déjà avec cet e-mail.'},
  'auth-err-weak':        {en:'Password too weak (6 characters minimum).', fr:'Mot de passe trop faible (6 caractères minimum).'},
  'auth-err-email':       {en:'Invalid email address.',     fr:'Adresse e-mail invalide.'},
  'auth-err-popup':       {en:'The sign-in window was blocked. Allow pop-ups for this site.', fr:'La fenêtre de connexion a été bloquée. Autorisez les pop-ups pour ce site.'},
  'auth-err-many':        {en:'Too many attempts. Try again in a few minutes.', fr:'Trop de tentatives. Réessayez dans quelques minutes.'},
  'auth-err-offline':     {en:'Sign-in is unavailable right now (offline?).', fr:'Connexion indisponible pour le moment (hors ligne ?).'},
  'auth-err-generic':     {en:'Something went wrong. Please try again.', fr:'Une erreur est survenue. Veuillez réessayer.'},
  'sync-guest':           {en:'Guest · not saved online',   fr:'Invité · non enregistré en ligne'},
  'sync-loading':         {en:'Loading your account…',      fr:'Chargement du compte…'},
  'sync-saving':          {en:'Saving…',                    fr:'Enregistrement…'},
  'sync-saved':           {en:'Saved to your account',      fr:'Enregistré dans votre compte'},
  'sync-error':           {en:'Not saved yet · retrying',   fr:'Pas encore enregistré · nouvel essai'},
  'sync-offline':         {en:'Offline',                    fr:'Hors ligne'},
  'cloud-load-confirm':   {en:'Your account already contains saved work.\n\nOK: open your saved work (the current canvas and document are replaced).\nCancel: keep the current work and save it to your account.', fr:'Votre compte contient déjà un travail enregistré.\n\nOK : ouvrir le travail enregistré (le canevas et le document actuels sont remplacés).\nAnnuler : garder le travail actuel et l\'enregistrer dans votre compte.'},
  'font-rights-confirm':  {en:'Save this font to your account?\n\nBy continuing, you confirm that you have the right to use this font. It stays private: only you can access it.', fr:'Enregistrer cette fonte dans votre compte ?\n\nEn continuant, vous confirmez avoir le droit d\'utiliser cette fonte. Elle reste privée : vous seul y avez accès.'},
  'font-dup':             {en:'Font already imported',      fr:'Fonte déjà importée'},
  'font-saved-online':    {en:'Font saved to your account:', fr:'Fonte enregistrée dans votre compte :'},
  'font-local-only':      {en:'Font kept on this device only (not saved to your account)', fr:'Fonte gardée sur cet appareil uniquement (non enregistrée dans votre compte)'},
  'font-too-big':         {en:'Font too large to save online (max 4 MB) · kept on this device only', fr:'Fonte trop lourde pour l\'enregistrement en ligne (max 4 Mo) · gardée sur cet appareil'},
  'font-upload-error':    {en:'Could not save the font online · kept on this device only', fr:'Impossible d\'enregistrer la fonte en ligne · gardée sur cet appareil'},
  'font-restore-error':   {en:'A saved font could not be loaded:', fr:'Une fonte enregistrée n\'a pas pu être chargée :'},
  'guest-export':         {en:'Sign in to export your work.',          fr:'Connectez-vous pour exporter votre travail.'},
  'guest-fonts':          {en:'Sign in to import your own fonts.',     fr:'Connectez-vous pour importer vos propres fontes.'},
  'guest-print':          {en:'Sign in to preview and print.',         fr:'Connectez-vous pour l\'aperçu et l\'impression.'},
  'guest-equations':      {en:'Sign in to save equations.',            fr:'Connectez-vous pour enregistrer des équations.'},
  'guest-profiles':       {en:'Sign in to save profiles.',             fr:'Connectez-vous pour enregistrer des profils.'},
  'guest-document':       {en:'Sign in to use Document mode.',         fr:'Connectez-vous pour utiliser le mode Document.'},
};

// ── ID list for simple textContent swap ──────────────────────────────────────
const _ID_MAP = [
  'mtab-fe','mtab-doc','rpanel-title',
  'dlt-blocks','dlt-font','dlt-eq','dlt-display',
  'plt-kb','plt-font','plt-profiles','plt-layers','plt-equations',
  'fit-elem','fit-math',
  'pt-page','pt-bloc','pt-imp',
  'fe-ins-empty',
  'btn-lang',
];

// ── Master _applyLang — called on toggle and on every mode switch ─────────────
function _applyLang(){
  // Simple ID-based swap
  _ID_MAP.forEach(id=>{
    const el=g(id);
    if(el&&_I18N[id])el.textContent=_I18N[id][_lang]||_I18N[id]['en'];
  });

  // btn-lang always shows the OTHER language
  const btnLang=g('btn-lang');if(btnLang)btnLang.textContent=_lang==='en'?'FR':'EN';

  // Left panel title
  const lpt=g('lpanel-title');
  if(lpt)lpt.textContent=t(appMode==='fe'?'lpanel-title-fe':'lpanel-title-doc');

  // Topbar action buttons
  document.querySelectorAll('.abtn-prev').forEach(el=>el.textContent=t('abtn-prev'));
  document.querySelectorAll('.abtn-print').forEach(el=>el.textContent=t('abtn-print'));

  // Topbar title input placeholder (keep value unless it matches the default)
  const titleInp=g('doc-title');
  if(titleInp){
    titleInp.placeholder=t('title-placeholder');
    // Swap default name only if current value IS the other language's default
    const otherDefault=_lang==='en'?t('doc-title-default').replace('fr','en')||'Sans titre':'Untitled';
    if(titleInp.value===otherDefault||titleInp.value===(_lang==='en'?'Sans titre':'Untitled')){
      titleInp.value=t('doc-title-default');
    }
  }

  // Toolbar button titles via data-i18n-title
  document.querySelectorAll('[data-i18n-title]').forEach(el=>{
    const k=el.getAttribute('data-i18n-title');
    if(_I18N[k])el.title=_I18N[k][_lang]||_I18N[k]['en'];
  });

  // Placeholders via data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const k=el.getAttribute('data-i18n-placeholder');
    if(_I18N[k])el.placeholder=_I18N[k][_lang]||_I18N[k]['en'];
  });

  // textContent via data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.getAttribute('data-i18n');
    if(_I18N[k])el.textContent=_I18N[k][_lang]||_I18N[k]['en'];
  });

  // Section headers via data-i18n-ph
  document.querySelectorAll('[data-i18n-ph]').forEach(el=>{
    // Preserve child nodes (e.g. the inline-check inside Margins header)
    const k=el.getAttribute('data-i18n-ph');
    if(!_I18N[k])return;
    // Find first text node and update it; leave child elements intact
    const txt=_I18N[k][_lang]||_I18N[k]['en'];
    let found=false;
    el.childNodes.forEach(n=>{if(!found&&n.nodeType===3&&n.textContent.trim()){n.textContent=txt+' ';found=true;}});
    if(!found)el.prepend(document.createTextNode(txt+' '));
  });

  // Font drop zone text
  const fontDzP=g('font-dz-p');
  if(fontDzP)fontDzP.innerHTML=t('font-dz-text').replace('\n','<br>');
  const docFontDzP=g('doc-font-dz-p');
  if(docFontDzP)docFontDzP.innerHTML=t('font-dz-text').replace('\n','<br>');
  document.querySelectorAll('.font-apply').forEach(el=>el.textContent=t('font-apply-text'));

  // Canvas hint
  const hint=g('fe-hint')?.querySelector('p:first-of-type');
  if(hint)hint.textContent=t('fe-hint-main');
  const hintSub=g('fe-hint')?.querySelector('.hint-sub');
  if(hintSub)hintSub.textContent=t('fe-hint-sub');

  // Statusbar mode
  const stMode=g('st-mode');
  if(stMode)stMode.textContent=t(appMode==='fe'?'st-mode-fe':'st-mode-doc');

  // Fit button
  const fitBtn=g('zfit-btn');if(fitBtn)fitBtn.textContent=t('btn-fit');

  // Print modal
  const pmTitle=g('pm-title');if(pmTitle)pmTitle.textContent=t('pm-title');
  const pmPrint=g('pm-print-btn');if(pmPrint)pmPrint.textContent=t('pm-print');
  const pmClose=g('pm-close-btn');if(pmClose)pmClose.textContent=t('pm-close');

  // Left panel action buttons
  const lyrBtn=g('fe-pb-layers')?.querySelector('.add-layer-btn');
  if(lyrBtn)lyrBtn.textContent=t('add-layer-btn-layers');
  const profBtns=g('fe-pb-profiles')?.querySelectorAll('.add-layer-btn');
  if(profBtns?.[0])profBtns[0].textContent=t('add-layer-btn-profiles');
  if(profBtns?.[1])profBtns[1].textContent=t('profiles-export');
  const eqBtn=g('fe-pb-equations')?.querySelector('.add-layer-btn');
  if(eqBtn)eqBtn.textContent=t('add-layer-btn-equations');

  // DOC inspector — option elements with IDs
  [
    ['opt-custom','opt-custom'],['opt-pn-bc','opt-pn-bc'],['opt-pn-br','opt-pn-br'],
    ['opt-pn-bl','opt-pn-bl'],['opt-pn-tc','opt-pn-tc'],
    ['opt-indent-none','opt-indent-none'],['opt-indent-first','opt-indent-first'],
    ['opt-indent-hanging','opt-indent-hanging'],['opt-indent-all','opt-indent-all'],
    ['opt-align-c','opt-align-c'],['opt-align-l','opt-align-l'],['opt-align-r','opt-align-r'],
  ].forEach(([id,key])=>{const el=g(id);if(el&&_I18N[key])el.textContent=_I18N[key][_lang]||_I18N[key]['en'];});

  // Orient options (no ID, select by value)
  const orient=g('orient');
  if(orient){
    orient.querySelectorAll('option').forEach(op=>{
      if(op.value==='p')op.textContent=t('opt-portrait');
      else if(op.value==='l')op.textContent=t('opt-landscape');
    });
  }

  // DOC print tab buttons (by ID added in HTML)
  const prevDocBtn=g('btn-preview-doc');if(prevDocBtn)prevDocBtn.textContent=t('btn-preview-doc');
  const expDocBtn=g('btn-export-doc');if(expDocBtn)expDocBtn.textContent=t('btn-export-doc');

  // Grid bar
  const gcBar=g('gc-bar');
  if(gcBar){
    gcBar.querySelectorAll('[data-i18n]').forEach(el=>{
      const k=el.getAttribute('data-i18n');
      if(_I18N[k])el.textContent=_I18N[k][_lang]||_I18N[k]['en'];
    });
    const snapSel=g('snap-sel');
    if(snapSel){
      const ops=snapSel.querySelectorAll('option');
      if(ops[0])ops[0].textContent=t('snap-strong');
      if(ops[1])ops[1].textContent=t('snap-soft');
      if(ops[2])ops[2].textContent=t('snap-free');
    }
  }

  // Keyboard search placeholder
  const kbSearch=g('kb-search');
  if(kbSearch)kbSearch.placeholder=t('kb-search-ph');

  // Account button, sign-in dialog, sync status
  _cloudUIUpdate();

  // Rebuild keyboard (translates category names + level labels)
  if(g('kb-root')&&g('kb-root').children.length)buildKb();
}
// Apply language on DOMContentLoaded handled by init.js


/* === print.js === */

'use strict';

/* ════════════════════════════════════════════════════
   PRINT — Aperçu Paged.js & export HTML
   Supporte les deux modes :
     • 'fe'  → éditeur de formules (canvas libre)
     • 'doc' → document paginé
════════════════════════════════════════════════════ */

function openPM(){
  if(!_guestOK('print'))return;
  if(appMode === 'fe') _openFEPreview();
  else                 _openDocPreview();
}

function closePM(){
  g('pm').classList.remove('show');
  g('pframe').src = '';
}
function triggerPrint(){
  g('pframe').contentWindow?.print();
}

/* ── Aperçu mode Document ── */
function _openDocPreview(){
  const css  = genCSS();
  const pw   = getPW(), ph = getPH();
  const html = _buildDocHTML();
  const info = g('pm-info');
  if(info) info.textContent = `${pw}×${ph}mm · ${docBlocks.length} `+(_lang==='fr'?'bloc(s)':'block(s)');
  _loadIframe(pw, ph, css, html);
  g('pm').classList.add('show');
}

/* ── Aperçu mode Formules ── */
function _openFEPreview(){
  if(!feEls.length){ toast(t('no-elements-canvas')); return; }

  const pw = getPW(), ph = getPH();
  const css = genCSS();

  /* Construit le HTML à partir des éléments FE.
     On les trie par position (gauche→droite, haut→bas) et on les
     regroupe par ligne approximative (même zone Y ± 20 % de la taille)
     pour les présenter comme une expression cohérente par ligne. */
  const sorted = [...feEls].sort((a, b) => a.y !== b.y ? a.y - b.y : a.x - b.x);

  /* Regroupement en lignes : deux éléments sont sur la même ligne
     si l'écart vertical entre leurs centres est inférieur à la moitié
     de la plus grande taille. */
  const lines = [];
  sorted.forEach(el => {
    const center = el.y + el.size / 2;
    const last   = lines[lines.length - 1];
    if(last){
      const lastCenter = last[0].y + last[0].size / 2;
      const threshold  = Math.max(last[0].size, el.size) * 0.55;
      if(Math.abs(center - lastCenter) <= threshold){
        last.push(el); return;
      }
    }
    lines.push([el]);
  });

  /* Chaque ligne devient un bloc centré sur la page */
  const html = lines.map(line => {
    const layer = layerById(line[0].layerId);
    /* Les éléments d'une ligne sont triés par X et concaténés
       dans un span inline-flex centré */
    const els = line
      .sort((a, b) => a.x - b.x)
      .map(rd => {
        const l = layerById(rd.layerId);
        const color = l.color || '#111';
        const font  = l.font  || MFONT;
        const fvs   = l.fvs   || '';
        return `<span style="display:inline-flex;align-items:center;` +
               `color:${color};opacity:${rd.opacity/100};` +
               `font-family:${font};` +
               (fvs ? `font-variation-settings:${fvs};` : '') +
               `vertical-align:middle;margin:0 4px">` +
               nodeHTML(rd.node, rd.size) +
               `</span>`;
      }).join('');
    return `<div class="fe-line">${els}</div>\n`;
  }).join('');

  /* CSS spécifique au mode formules :
     pas de mise en page Paged.js complexe, juste une page propre
     avec les formules centrées */
  const feCss = css + `\n
.fe-line {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin: 1.2em 0;
  page-break-inside: avoid;
}`;

  const info = g('pm-info');
  if(info) info.textContent =
    `${pw}×${ph}mm · ${feEls.length} `+(_lang==='fr'?`élément(s) · ${lines.length} ligne(s)`:`element(s) · ${lines.length} line(s)`);

  _loadIframe(pw, ph, feCss, html);
  g('pm').classList.add('show');
}

/* ── Charge le document dans l'iframe Paged.js ── */
function _loadIframe(pw, ph, css, html){
  const fr  = g('pframe');
  fr.style.width  = Math.round(pw * MM * 0.8) + 'px';
  fr.style.height = Math.round(ph * MM * 0.8) + 'px';
  const doc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"><\/script>
  <style>
${css}
    .pagedjs_page {
      background: #fff;
      box-shadow: 0 2px 10px rgba(0,0,0,.15);
      margin: 0 auto 18px;
    }
  </style>
</head>
<body>
${html}
</body>
</html>`;
  fr.src = URL.createObjectURL(new Blob([doc], { type: 'text/html' }));
}

/* ── Export HTML autonome ── */
function exportHTML(){
  if(!_guestOK('export'))return;
  const title = g('doc-title')?.value || 'document';
  let   css, html, suffix;

  if(appMode === 'fe'){
    /* Export du canvas formules */
    if(!feEls.length){ toast(t('no-elements-export')); return; }
    /* On réutilise la même logique que l'aperçu FE */
    css    = genCSS();
    const sorted = [...feEls].sort((a,b) => a.y!==b.y ? a.y-b.y : a.x-b.x);
    const lines  = [];
    sorted.forEach(el=>{
      const center=el.y+el.size/2,last=lines[lines.length-1];
      if(last){const lc=last[0].y+last[0].size/2,th=Math.max(last[0].size,el.size)*.55;if(Math.abs(center-lc)<=th){last.push(el);return;}}
      lines.push([el]);
    });
    html = lines.map(line=>{
      const els=line.sort((a,b)=>a.x-b.x).map(rd=>{
        const l=layerById(rd.layerId);
        return`<span style="display:inline-flex;align-items:center;color:${l.color||'#111'};opacity:${rd.opacity/100};font-family:${l.font||MFONT};vertical-align:middle;margin:0 4px">${nodeHTML(rd.node,rd.size)}</span>`;
      }).join('');
      return`<div class="fe-line">${els}</div>\n`;
    }).join('');
    css += `\n.fe-line{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:8px;margin:1.2em 0;page-break-inside:avoid}`;
    suffix = '-formules';
  } else {
    /* Export du document */
    css    = genCSS();
    html   = _buildDocHTML();
    suffix = '';
  }

  const full = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>${escH(title + suffix)}</title>
  <script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"><\/script>
  <style>
${css}
    .pagedjs_page {
      background: #fff;
      margin: 0 auto 20px;
      box-shadow: 0 2px 12px rgba(0,0,0,.15);
    }
  </style>
</head>
<body>
${html}
</body>
</html>`;

  const a = document.createElement('a');
  a.href     = URL.createObjectURL(new Blob([full], { type: 'text/html' }));
  a.download = title + suffix + '.html';
  a.click();
  toast(t('exported')+' ' + a.download);
}

/* ── Construction HTML du document ── */
function _buildDocHTML(){
  return docBlocks.map(b => {
    if(b.type === 'title')
      return `<h1>${escH(b.text)}</h1>\n`;
    if(b.type === 'h2')
      return `<h2>${escH(b.text)}</h2>\n`;
    if(b.type === 'text')
      return `<p>${escH(b.text)}</p>\n`;
    if(b.type === 'formula'){
      const al  = { c:'center', l:'left', r:'right' }[b.align || 'c'];
      const els = (b.elements || [])
        .map(f => {
          const elFont=f.font||b.font||MFONT,elFvs=f.fvs||b.fvs||'',elColor=f.color||b.color||'#111';
          const elOp=(f.opacity!=null)?f.opacity/100:1;
          const fvsCss=elFvs?`font-variation-settings:${elFvs};`:'';
          return `<span style="display:inline-flex;align-items:center;color:${elColor};`+
            `opacity:${elOp};font-family:${elFont};${fvsCss}vertical-align:middle;margin:0 2px">`+
            nodeHTML(f.node, f.size || b.fontSize || 22)+`</span>`;
        })
        .join('');
      const ph  = `<span style="font-family:${MFONT};font-size:22px;color:#aaa">∑</span>`;
      return `<div class="formula-block" style="text-align:${al}">${els || ph}</div>\n`;
    }
    if(b.type === 'canvas-textbox'){
      const fvsCss=b.fvs?`font-variation-settings:${b.fvs};`:'';
      return `<div style="font-size:${b.fontSize||14}px;font-family:${b.font||MFONT};`+
        `color:${b.textColor||'#000000'};opacity:${(b.opacity??100)/100};`+
        `width:${b.w||'auto'}px;white-space:pre-wrap;word-break:break-word;`+
        `line-height:1.5;padding:2px 4px;margin:.4em 0;${fvsCss}">${escH(b.text||'')}</div>\n`;
    }
    if(b.type === 'eq-snapshot'){
      const scale = b.fontSize || 1;
      const w = Math.ceil((b.bboxW||200)*scale);
      const h = Math.ceil((b.bboxH||80)*scale);
      const alignMap = {c:'center',l:'left',r:'right'};
      const al = alignMap[b.align||'c']||'center';
      const inner = (b.elements||[]).map(fel => {
        const x   = Math.round((fel.rx??0)*scale);
        const y   = Math.round((fel.ry??0)*scale);
        const sz  = Math.round((fel.size||22)*scale);
        const op  = (fel.opacity??100)/100;
        const fvs = fel.fvs ? `font-variation-settings:${escH(fel.fvs)};` : '';
        if(fel.type==='textbox'){
          const tw = Math.round((fel.w||100)*scale);
          return `<div style="position:absolute;left:${x}px;top:${y}px;`+
            `width:${tw}px;font-size:${sz}px;font-family:${escH(fel.font||MFONT)};`+
            `color:${fel.color||'#000'};opacity:${op};${fvs}`+
            `white-space:pre-wrap;word-break:break-word;line-height:1.5">`+
            escH(fel.text||'')+`</div>`;
        }
        return `<div style="position:absolute;left:${x}px;top:${y}px;opacity:${op}">`+
          `<span style="font-size:${sz}px;font-family:${escH(fel.font||MFONT)};`+
          `color:${fel.color||'#000'};${fvs}display:inline-block">`+
          nodeHTML(fel.node,sz)+`</span></div>`;
      }).join('');
      return `<div style="text-align:${al};margin:.8em 0">`+
        `<div style="position:relative;display:inline-block;width:${w}px;height:${h}px">`+
        inner+`</div></div>\n`;
    }
    return '';
  }).join('');
}


/* === profiles.js === */

'use strict';
function saveProfile(){
  if(!_guestOK('profiles'))return;
  if(!feSelId){toast(t('select-element'));return;}
  const rd=feEls.find(e=>e.id===feSelId);if(!rd)return;
  const name=prompt(t('profile-name-prompt'),rd.node.lbl||rd.node.k);
  if(!name)return;
  profiles[name]={size:rd.size,node:JSON.parse(JSON.stringify(rd.node))};
  renderProfiles();toast(t('profile-saved')+' "'+name+'"');
}

function renderProfiles(){
  const list=g('profiles-list');if(!list)return;list.innerHTML='';
  if(!Object.keys(profiles).length){
    list.innerHTML='<div class="empty-msg" style="padding:4px">'+t('no-profile-empty')+'</div>';
    return;
  }
  Object.entries(profiles).forEach(([name,prof])=>{
    const item=document.createElement('div');item.className='profile-item';
    const dot=document.createElement('div');dot.className='l-dot';dot.style.background='var(--accent)';
    const nm=document.createElement('span');nm.textContent=name+' — '+prof.size+'px';
    const del=document.createElement('span');del.className='l-ico';del.textContent='×';
    del.onclick=ev=>{ev.stopPropagation();delete profiles[name];renderProfiles();};
    item.append(dot,nm,del);
    item.onclick=()=>applyProfile(name);
    list.appendChild(item);
  });
}

function applyProfile(name){
  if(!feSelId){toast(t('select-element'));return;}
  const rd=feEls.find(e=>e.id===feSelId);if(!rd)return;
  const prof=profiles[name];if(!prof)return;
  if(rd.node.k!==prof.node.k){toast(t('incompatible-node'));return;}
  rd.size=prof.size;Object.assign(rd.node,JSON.parse(JSON.stringify(prof.node)));
  feRenderEl(rd);feInsUpdate();toast(t('profile-applied')+' "'+name+'"');
}

function exportProfiles(){
  if(!_guestOK('export'))return;
  const data=JSON.stringify({profiles,layers:layers.map(l=>({...l}))},null,2);
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([data],{type:'application/json'}));
  a.download='limou-profiles.json';a.click();
  toast(t('profiles-exported'));
}


/* === shortcuts.js === */

'use strict';
document.addEventListener('keydown',ev=>{
  if(ev.target.contentEditable==='true')return;
  if(['INPUT','TEXTAREA','SELECT'].includes(ev.target.tagName))return;
  const ctrl=ev.ctrlKey||ev.metaKey;
  // Undo/Redo selon le mode
  if(ctrl&&ev.key==='z'&&!ev.shiftKey){ev.preventDefault();appMode==='fe'?feUndo():docUndo();return;}
  if(ctrl&&(ev.key==='y'||(ev.key==='z'&&ev.shiftKey))){ev.preventDefault();appMode==='fe'?feRedo():docRedo();return;}
  // FE shortcuts
  if(appMode==='fe'){
    if(ctrl&&(ev.key==='a'||ev.key==='A')){ev.preventDefault();feSelectAll();return;}
    if(ctrl&&ev.key==='d'){ev.preventDefault();feDup();return;}
    if(ev.key==='g'||ev.key==='G'){ev.preventDefault();toggleGrid();return;}
    if(ev.key==='b'||ev.key==='B'){ev.preventDefault();toggleBB();return;}
    if((ev.key==='Delete'||ev.key==='Backspace')&&feSelIds.size){ev.preventDefault();feSnap();[...feSelIds].forEach(id=>feDelById(id));return;}
    if(ctrl&&(ev.key==='='||ev.key==='+')){ev.preventDefault();setZoom(zoom+.1);return;}
    if(ctrl&&ev.key==='-'){ev.preventDefault();setZoom(zoom-.1);return;}
  }
  // Doc shortcuts
  if(appMode==='doc'){
    if(ctrl&&ev.key==='d'){ev.preventDefault();
      if(docSelId){const b=docBlocks.find(x=>x.id===docSelId);if(b){const cl=JSON.parse(JSON.stringify(b));cl.id=uid();const idx=docBlocks.findIndex(x=>x.id===docSelId);docBlocks.splice(idx+1,0,cl);docSnap();renderDocList();renderDocPage();}}
      return;
    }
    if((ev.key==='Delete'||ev.key==='Backspace')&&docSelId){ev.preventDefault();docSnap();delDocBlock(docSelId);return;}
  }
});


/* === state.js === */

'use strict';
// ── Helpers DOM ──
const g   = id => document.getElementById(id);
const gv  = id => +(g(id)?.value || 0);
const gvc = id => !!(g(id)?.checked);
const gvs = id => g(id)?.value || '';
let idC = 0;
function uid(){ return 'i'+(++idC); }

// ── Mode courant ──
let appMode = 'fe'; // 'fe' | 'doc'

// ── Outil actif FE ──
let feTool = 'select'; // 'select' | 'text'
let docTool = 'select'; // 'select' | 'text'

// ── Formula Editor state ──
let feEls   = [];       // root elements sur le canvas FE
let feSelId = null;     // id de l'élément sélectionné (primary — always inside feSelIds)
let feSelIds = new Set(); // ids de tous les éléments sélectionnés (multi-sélection)
let feLayerHighlight = null; // id du layer dont tous les éléments sont mis en surbrillance
let dragKey = null;     // key en cours de drag depuis le clavier
let ghost   = null;     // élément DOM du ghost de drag

// ── Taille & style par défaut pour les nouveaux éléments ──
// La taille est gérée par couche (layer.fontSize). La valeur globale sert de
// fallback si une couche n'a pas encore de fontSize propre.
let defaultFontSize = +(localStorage.getItem('limou-default-sz') ?? 50); // px

// ── Couches (layers) ──
let layers = [
  {id:'l1',name:'Layer 1',font:MFONT,color:LAYER_COLORS[0],textColor:'#000000',fontSize:defaultFontSize,visible:true,locked:false,fvs:''}
];
let activeLayerId = 'l1';

// ── Fonte variable ──
let loadedFonts = [];   // [{name, label, css, axes:[{tag,min,max,def,val}], fvs}]

// ── Profils MATH ──
let profiles = {};      // {keyId: {size, node}}

// ── Grille & guide ──
let gridSz    = 24;
let showGrid  = false;
let showAxis  = false;
let showBB    = false;
let customAxes = [];    // [{id,type:'h'|'v',pos}]

// ── Zoom ──
let zoom = 1;

// ── Panels ──
let pLeft  = true;
let pRight = true;

// ── Document state ──
let docBlocks  = [];
let docSelId   = null;
let showMg     = true;
let showBl     = false;

// ── Accesseurs page document ──
function _getPageDim(){
  const p=gvs('preset'),o=gvs('orient');
  let w,h;
  if(p==='custom'){w=gv('pw');h=gv('ph2');}
  else{const pr=PRESETS[p]||PRESETS.A4;w=pr.w;h=pr.h;}
  return o==='l'?{w:Math.max(w,h),h:Math.min(w,h)}:{w:Math.min(w,h),h:Math.max(w,h)};
}
function getPW(){return _getPageDim().w;}
function getPH(){return _getPageDim().h;}
function getMargins(){return{t:gv('mt'),r:gv('mr'),b:gv('mb'),l:gv('ml')};}
function getBleed(){return gv('bleed');}
function hasCropMarks(){return gvc('crop-on');}
function hasCrossMarks(){return gvc('cross-on');}
function getBodyPt(){return gv('bsz');}
function getLH(){return gv('lh');}
function getDocFont(){return gvs('dfont');}
function getIndentMm(){return gv('indent-mm');}
function getIndentMode(){return gvs('indent-mode');}
function hasPNum(){return gvc('pn-on');}
function getPNPos(){return gvs('pn-pos');}
function getPNStyle(){return gvs('pn-sty');}
function getPNPrefix(){return gvs('pn-pre');}
function getPNStart(){return gv('pn-st');}

// ── Snap ──
function snapVal(v){
  const m=gvs('snap-sel');
  if(m==='s') return Math.round(v/gridSz)*gridSz;
  if(m==='m') return Math.round(v/(gridSz/2))*(gridSz/2);
  return Math.round(v);
}
function arrowStep(shift){
  const m=gvs('snap-sel');
  let step = m==='s'?gridSz : m==='m'?gridSz/2 : 1;
  return shift ? step*10 : step;
}

// ── Layer helpers ──
function activeLayer(){return layers.find(l=>l.id===activeLayerId)||layers[0];}
function layerById(id){return layers.find(l=>l.id===id)||layers[0];}
function canEdit(layerId){
  const l=layerById(layerId);
  return l.id===activeLayerId && !l.locked;
}

// ── Toast ──
let _toastT=null;
function toast(msg){
  const t=g('toast');if(!t)return;
  t.textContent=msg;t.classList.add('show');
  clearTimeout(_toastT);_toastT=setTimeout(()=>t.classList.remove('show'),1800);
}


/* === cloud.js === */

'use strict';
// ═══════════════════════════════════════════════════════════════════════════
// ACCOUNT — sign-in + per-user cloud save
//   • Firebase Auth      → sign in / sign out (Google or email + password)
//   • Cloud Firestore    → users/<uid>/data/workspace  (canvas, layers, document, page settings)
//                          users/<uid>/data/library    (equations, profiles, font list)
//   • /api/fonts         → font FILES, stored privately per user (Vercel Private Blob)
// Guests keep working exactly as before (localStorage only). Nothing is uploaded
// until the user signs in. Saving is automatic: every 4 s, only if something changed.
// ═══════════════════════════════════════════════════════════════════════════
const _FB_VER='12.18.0';
const _FB_CFG={
  apiKey:'AIzaSyC8aeWYsNQZPiGSEZ6Xxzjq8bNXeXqwhU4',
  authDomain:'limou-5794e.firebaseapp.com',
  projectId:'limou-5794e',
  storageBucket:'limou-5794e.firebasestorage.app',
  messagingSenderId:'279942095225',
  appId:'1:279942095225:web:aed670c6b75f68ff228fa8',
};
const _FONT_MAX=4*1024*1024; // server limit for one font file
// Document-mode page settings live in inputs: saved/restored by id
const _DOC_FIELDS=['doc-title','preset','pw','ph2','orient','linked','mt','ml','mr','mb','bsz','lh','indent-mm','indent-mode','dfont',
  'pn-on','pn-pos','pn-sty','pn-pre','pn-st','crop-on','cross-on','bleed'];
const _AUTH_ERR={
  'auth/invalid-credential':'invalid','auth/invalid-login-credentials':'invalid','auth/wrong-password':'invalid','auth/user-not-found':'invalid',
  'auth/email-already-in-use':'exists','auth/weak-password':'weak','auth/invalid-email':'email','auth/missing-email':'email',
  'auth/popup-blocked':'popup','auth/too-many-requests':'many','auth/network-request-failed':'offline',
};
const _cloud={fbP:null,fb:null,user:null,ready:false,busy:false,mode:'in',status:'guest',reason:'',lastWs:'',lastLib:''};

// ── Firebase SDK — loaded once from the CDN (no build step) ──────────────────
function _fbLoad(){
  if(!_cloud.fbP){
    const base=`https://www.gstatic.com/firebasejs/${_FB_VER}/`;
    _cloud.fbP=Promise.all(['firebase-app','firebase-auth','firebase-firestore-lite'].map(m=>import(base+m+'.js')))
      .then(([app,A,F])=>{const a=app.initializeApp(_FB_CFG);return(_cloud.fb={auth:A.getAuth(a),db:F.getFirestore(a),A,F});})
      .catch(e=>{_cloud.fbP=null;throw e;});
  }
  return _cloud.fbP;
}

// ── What gets saved ──────────────────────────────────────────────────────────
function _wsData(){
  const docSettings={};
  _DOC_FIELDS.forEach(id=>{const el=g(id);if(el)docSettings[id]=el.type==='checkbox'?el.checked:el.value;});
  return{v:1,feEls,layers,activeLayerId,docBlocks,docSettings,customAxes,gridSz,idC};
}
function _libData(){
  return{v:1,equations:_equations,profiles,
    fonts:loadedFonts.filter(f=>f._cloud).map(f=>({hash:f.hash,name:f.name,label:f.label,fvs:f.fvs||'',style:f._activeStyle||null}))};
}

// ── Restore ──────────────────────────────────────────────────────────────────
// Points bIntegral / glyph checks at the active layer's font (same as "Apply to layer")
function _activeOTF(){
  const f=loadedFonts.find(x=>x.css===activeLayer().font);
  if(f?._otf)window._limouOTFont=f._otf;
  _clearDelimCaches();
}
function _wsApply(w){
  if(Array.isArray(w.layers)&&w.layers.length){
    layers=w.layers;
    activeLayerId=layers.some(l=>l.id===w.activeLayerId)?w.activeLayerId:layers[0].id;
  }
  document.querySelectorAll('.fe-el').forEach(e=>e.remove());
  feEls=Array.isArray(w.feEls)?w.feEls:[];
  feSelId=null;feSelIds.clear();feLayerHighlight=null;
  docBlocks=Array.isArray(w.docBlocks)?w.docBlocks:[];docSelId=null;
  customAxes=Array.isArray(w.customAxes)?w.customAxes:[];
  idC=Math.max(idC,+w.idC||0); // new ids never collide with restored ones
  Object.entries(w.docSettings||{}).forEach(([id,v])=>{const el=g(id);if(el){if(el.type==='checkbox')el.checked=!!v;else el.value=v;}});
  if(w.gridSz){const gs=g('gc-sz');if(gs)gs.value=w.gridSz;setGridSz(+w.gridSz);}
  // Rebuild the ⇄ Doc map from ids stored on the blocks → incremental sync keeps working across sessions
  _syncMap=new Map();
  docBlocks.forEach(b=>{(b._feIds||[]).forEach(id=>_syncMap.set(id,b.id));if(b._feId)_syncMap.set(b._feId,b.id);});
  _activeOTF();
  feEls.forEach(feRenderEl);renderCustomAxes();feSyncZOrder();
  g('fe-hint').style.opacity=feEls.length?'0':'1';
  feInsClear();renderLayers();buildKb();
  feHistory=[];feHistIdx=-1;docHistory=[];docHistIdx=-1;feSnap();docSnap();
  applyPreset(gvs('preset')); // custom size row + page render + CSS + status bar
  renderDocList();updDocBlInsp();
  if(appMode==='fe'){const si=g('st-info');if(si)si.textContent=feEls.length+' element(s)';}
}
// Equations and profiles are merged (account version wins for the same item)
function _libApply(lib){
  const idx=new Map(_equations.map((e,i)=>[e.id,i]));
  (lib.equations||[]).forEach(e=>{if(idx.has(e.id))_equations[idx.get(e.id)]=e;else _equations.push(e);});
  Object.assign(profiles,lib.profiles||{});
  _saveEq();renderEquations();renderProfiles();
  if(appMode==='doc')_renderDocEqList();
}
async function _fontsRestore(list){
  const missing=(list||[]).filter(m=>{
    const f=loadedFonts.find(x=>x.hash===m.hash);
    if(f){f._cloud=true;delete f._bytes;}
    return !f;
  });
  if(!missing.length)return;
  const files=await Promise.all(missing.map(m=>_fontApi('GET',m.hash).then(r=>r.ok?r.arrayBuffer():null).catch(()=>null)));
  for(let i=0;i<missing.length;i++){
    const m=missing[i];
    const fd=files[i]&&await processFont(new File([files[i]],m.label||'font'),{name:m.name,label:m.label,silent:true,cloud:true});
    if(!fd){toast(t('font-restore-error')+' '+(m.label||''));continue;}
    if(m.fvs){_syncAxesFromFVS(fd.axes,m.fvs);fd.fvs=m.fvs;}
    if(m.style)fd._activeStyle=m.style;
  }
  _activeOTF();renderFontList();renderEquations();
}

// ── Fonts: private upload through /api/fonts ─────────────────────────────────
function _fontApi(method,hash,body){
  return _cloud.user.getIdToken().then(tok=>fetch('/api/fonts'+(hash?'?hash='+hash:''),{method,body,headers:{Authorization:'Bearer '+tok}}));
}
// Called by processFont for every newly imported font
function _cloudFontAdded(fd,ab){fd._bytes=ab;if(_cloud.ready)_fontUpload(fd);}
async function _fontUpload(fd){
  if(!_cloud.user||fd._cloud||!fd._bytes)return;
  if(fd._bytes.byteLength>_FONT_MAX){toast(t('font-too-big'));return;}
  // The user confirms, for each font, that they have the right to use it
  if(!confirm(t('font-rights-confirm'))){toast(t('font-local-only'));return;}
  try{
    const r=await _fontApi('POST','',fd._bytes);
    if(!r.ok)throw new Error('HTTP '+r.status);
    fd._cloud=true;delete fd._bytes;
    toast(t('font-saved-online')+' '+fd.label);
  }catch(e){console.warn('[Limou] font upload failed',e);toast(t('font-upload-error'));}
}

// ── Autosave (only what changed, only when signed in and loaded) ─────────────
async function _cloudSave(){
  if(!_cloud.ready||_cloud.busy)return;
  const ws=JSON.stringify(_wsData()),lib=JSON.stringify(_libData());
  if(ws===_cloud.lastWs&&lib===_cloud.lastLib)return;
  _cloud.busy=true;_cloudStatus('saving');
  try{
    const {db,F}=_cloud.fb,uid=_cloud.user.uid,at=Date.now();
    const put=(k,json)=>F.setDoc(F.doc(db,'users',uid,'data',k),{json,at});
    await Promise.all([ws!==_cloud.lastWs&&put('workspace',ws),lib!==_cloud.lastLib&&put('library',lib)].filter(Boolean));
    _cloud.lastWs=ws;_cloud.lastLib=lib;_cloudStatus('saved');
  }catch(e){console.warn('[Limou] cloud save failed',e);_cloudStatus(navigator.onLine?'error':'offline');}
  finally{_cloud.busy=false;}
}
function _cloudDirty(){
  return _cloud.ready&&(_cloud.busy||JSON.stringify(_wsData())!==_cloud.lastWs||JSON.stringify(_libData())!==_cloud.lastLib);
}

// ── Session ──────────────────────────────────────────────────────────────────
async function _cloudSignedIn(u){
  if(_cloud.user?.uid===u.uid)return;
  _cloud.user=u;_cloud.ready=false;_cloudStatus('loading');_cloudUIUpdate();authClose();
  try{
    const {db,F}=_cloud.fb;
    const [wsS,libS]=await Promise.all(['workspace','library'].map(k=>F.getDoc(F.doc(db,'users',u.uid,'data',k))));
    const wsJ=wsS.exists()?wsS.data().json:'',libJ=libS.exists()?libS.data().json:'';
    const ws=wsJ?JSON.parse(wsJ):null,lib=libJ?JSON.parse(libJ):null;
    if(lib)_libApply(lib);
    await _fontsRestore(lib?.fonts);
    // Saved work vs. work on screen: ask only when both exist
    const has=w=>!!(w&&((w.feEls||[]).length||(w.docBlocks||[]).length));
    const useCloud=has(ws)&&(!has(_wsData())||confirm(t('cloud-load-confirm')));
    if(useCloud)_wsApply(ws);
    _cloud.lastWs=useCloud?JSON.stringify(_wsData()):'';
    _cloud.lastLib=libJ;
    _cloud.ready=true;
    for(const fd of loadedFonts)if(!fd._cloud&&fd._bytes)await _fontUpload(fd); // fonts imported before signing in
    toast(t('auth-welcome')+' · '+(u.email||u.displayName||''));
    _cloudSave();
  }catch(e){
    // Nothing is saved while the account could not be read → never overwrites saved work
    console.warn('[Limou] account load failed',e);_cloudStatus('error');toast(t('auth-err-generic'));
  }
}
function _cloudSignedOut(){_cloud.user=null;_cloud.ready=false;_cloudStatus('guest');_cloudUIUpdate();}
async function cloudSignOut(){
  while(_cloud.busy)await new Promise(r=>setTimeout(r,100));
  await _cloudSave();
  try{await _cloud.fb.A.signOut(_cloud.fb.auth);}catch(_){}
  try{localStorage.removeItem('limou-eq');}catch(_){} // nothing of this account stays on a shared computer
  location.reload();
}

// ── Guest access (GUEST_ACCESS in config) ────────────────────────────────────
// true → go on. false → the sign-in dialog opens, explaining what the feature needs.
function _guestOK(feature){
  if(_cloud.user||GUEST_ACCESS[feature]!==false)return true;
  authOpen(feature);
  return false;
}

// ── Sign-in dialog ───────────────────────────────────────────────────────────
// reason (optional) = a GUEST_ACCESS feature → shows why signing in is needed
function authOpen(reason){
  _cloud.reason=typeof reason==='string'?reason:'';_cloudUIUpdate();
  g('auth-m')?.classList.add('show');_authErr('');
  if(!_cloud.user)setTimeout(()=>g('auth-email')?.focus(),50);
}
function authClose(){g('auth-m')?.classList.remove('show');const p=g('auth-pass');if(p)p.value='';}
function authToggleMode(){_cloud.mode=_cloud.mode==='up'?'in':'up';_authErr('');_cloudUIUpdate();}
function _authErr(msg){const el=g('auth-err');if(el)el.textContent=msg||'';}
async function _authRun(fn){
  _authErr('');
  const box=g('auth-box');box?.classList.add('busy');
  try{await fn(await _fbLoad());}
  catch(e){
    if(e?.code==='auth/popup-closed-by-user'||e?.code==='auth/cancelled-popup-request')return;
    console.warn('[Limou] auth',e?.code||e);
    _authErr(t('auth-err-'+(_AUTH_ERR[e?.code]||(e?.code?'generic':'offline'))));
  }finally{box?.classList.remove('busy');}
}
function authGoogle(){_authRun(({auth,A})=>A.signInWithPopup(auth,new A.GoogleAuthProvider()));}
function authEmail(ev){
  ev.preventDefault();
  const em=gvs('auth-email').trim(),pw=gvs('auth-pass');
  _authRun(({auth,A})=>(_cloud.mode==='up'?A.createUserWithEmailAndPassword:A.signInWithEmailAndPassword)(auth,em,pw));
}
function authForgot(){
  const em=gvs('auth-email').trim();
  if(!em){_authErr(t('auth-need-email'));g('auth-email')?.focus();return;}
  _authRun(async({auth,A})=>{auth.languageCode=_lang;await A.sendPasswordResetEmail(auth,em);toast(t('auth-reset-sent'));});
}
function _cloudStatus(s){
  _cloud.status=s;
  const txt=t('sync-'+s);
  ['st-sync','auth-sync'].forEach(id=>{const el=g(id);if(el)el.textContent=txt;});
}
// Labels that depend on state or language (called by _applyLang too)
function _cloudUIUpdate(){
  const u=_cloud.user,up=_cloud.mode==='up';
  const btn=g('btn-account');
  if(btn){
    btn.textContent=u?((u.displayName||u.email||'').split(/[\s@]/)[0].slice(0,16)||t('auth-account')):t('auth-signin-btn');
    btn.classList.toggle('on',!!u);btn.title=u?.email||'';
  }
  g('auth-out')?.classList.toggle('hidden-pb',!!u);
  g('auth-in')?.classList.toggle('hidden-pb',!u);
  const who=g('auth-who');if(who)who.textContent=u?(u.email||u.displayName||''):'';
  const set=(id,k)=>{const el=g(id);if(el)el.textContent=t(k);};
  set('auth-title',up?'auth-title-up':'auth-title');
  set('auth-submit',up?'auth-submit-up':'auth-submit-in');
  set('auth-toggle',up?'auth-to-in':'auth-to-up');
  const fg=g('auth-forgot');if(fg)fg.style.display=up?'none':'';
  const rs=g('auth-reason');if(rs)rs.textContent=_cloud.reason?t('guest-'+_cloud.reason):'';
  const pw=g('auth-pass');if(pw)pw.autocomplete=up?'new-password':'current-password';
  // Dim every [data-guest="feature"] control that guests can't use (CSS: body.gl-<feature>)
  Object.keys(GUEST_ACCESS).forEach(f=>document.body.classList.toggle('gl-'+f,!u&&GUEST_ACCESS[f]===false));
  _cloudStatus(_cloud.status);
}

document.addEventListener('DOMContentLoaded',()=>{
  _cloudUIUpdate();
  document.addEventListener('keydown',ev=>{if(ev.key==='Escape'&&g('auth-m')?.classList.contains('show'))authClose();});
  setInterval(_cloudSave,4000);
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')_cloudSave();});
  window.addEventListener('beforeunload',ev=>{if(_cloudDirty()){_cloudSave();ev.preventDefault();ev.returnValue='';}});
  _fbLoad()
    .then(({auth,A})=>A.onAuthStateChanged(auth,u=>u?_cloudSignedIn(u):_cloudSignedOut()))
    .catch(e=>{console.warn('[Limou] account service unavailable',e);_cloudStatus('offline');});
});
