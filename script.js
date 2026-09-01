const header=document.querySelector('.site-header');
if(header)addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>30));

const menu=document.querySelector('.menu-button'),nav=document.querySelector('.nav');
if(menu&&nav){
  menu.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>nav.classList.remove('open')));
}

const hero=document.querySelector('#heroVisual'),heroSection=document.querySelector('.hero');
if(hero&&heroSection&&matchMedia('(pointer:fine)').matches){
  heroSection.addEventListener('mousemove',event=>{
    const x=(event.clientX/innerWidth-.5)*14,y=(event.clientY/innerHeight-.5)*12;
    hero.style.transform=`translate(${x}px,${y}px)`;
  });
}

const resources=[
  {title:'Troubleshoot BitLocker Compliance in Microsoft Intune',href:'#troubleshoot',terms:'intune bitlocker endpoint encryption compliance device recovery key'},
  {title:'Designing Secure External Document Sharing in SharePoint Online',href:'secure-external-sharing-sharepoint.html',terms:'sharepoint external sharing documents security anonymous access'},
  {title:'Implementing Organization-Wide Email Signature Using Mail Flow Rules',href:'organization-wide-email-signature.html',terms:'exchange email signature mail flow rules outlook'},
  {title:'Deploying Teams and Exchange Online Without Migrating Mailboxes',href:'teams-exchange-coexistence.html',terms:'teams exchange online hybrid coexistence mailboxes migration'}
];
const searchOverlay=document.querySelector('.search-overlay'),overlayInput=document.querySelector('#overlaySearch'),overlayResult=document.querySelector('.overlay-result'),searchTrigger=document.querySelector('.search-trigger'),searchClose=document.querySelector('.search-close');
let searchOrigin;
function closeSearch(){
  if(!searchOverlay)return;
  searchOverlay.classList.remove('visible');
  searchOverlay.setAttribute('aria-hidden','true');
  if(searchOrigin)searchOrigin.focus();
}
function renderMatches(query,target){
  const matches=resources.filter(resource=>`${resource.title} ${resource.terms}`.toLowerCase().includes(query.toLowerCase()));
  if(!query){target.textContent='Start typing to search CloudAid365 resources.';return;}
  target.replaceChildren();
  if(!matches.length){target.textContent=`No resources found for "${query}". Try Intune, SharePoint, Exchange, or Teams.`;return;}
  const list=document.createElement('ul');
  matches.forEach(match=>{
    const item=document.createElement('li'),link=document.createElement('a');
    link.href=match.href;link.textContent=match.title;item.append(link);list.append(item);
  });
  target.append(list);
}
if(searchOverlay&&overlayInput&&overlayResult&&searchTrigger&&searchClose){
  searchTrigger.addEventListener('click',()=>{
    searchOrigin=searchTrigger;searchOverlay.classList.add('visible');searchOverlay.setAttribute('aria-hidden','false');
    setTimeout(()=>overlayInput.focus(),100);
  });
  searchClose.addEventListener('click',closeSearch);
  overlayInput.addEventListener('input',event=>renderMatches(event.target.value.trim(),overlayResult));
  addEventListener('keydown',event=>{if(event.key==='Escape'&&searchOverlay.classList.contains('visible'))closeSearch();});
}

const result=document.querySelector('#searchResult'),resourceInput=document.querySelector('#resourceSearch');
if(result&&resourceInput){
  document.querySelectorAll('.filters button').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('.filters button').forEach(filter=>filter.classList.remove('active'));
    button.classList.add('active');
    resourceInput.value=button.textContent;
    renderMatches(button.textContent,result);
  }));
  resourceInput.addEventListener('keydown',event=>{
    if(event.key==='Enter'){event.preventDefault();renderMatches(resourceInput.value.trim(),result);}
  });
}

const contactForm=document.querySelector('#contactForm');
if(contactForm)contactForm.addEventListener('submit',event=>{
  event.preventDefault();
  const data=new FormData(contactForm);
  const subject=encodeURIComponent(data.get('subject'));
  const body=encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
  contactForm.querySelector('.form-status').textContent='Opening your email app with your message addressed to CloudAid365.';
  location.href=`mailto:info@cloudaid365.com?subject=${subject}&body=${body}`;
});

const mapExpand=document.querySelector('.map-expand'),architectureMap=document.querySelector('.architecture-map');
if(mapExpand&&architectureMap)mapExpand.addEventListener('click',()=>architectureMap.requestFullscreen?.());
const themeButton=document.querySelector('.theme-button');
if(themeButton)themeButton.addEventListener('click',()=>document.body.classList.toggle('bright'));

// Spatial interaction: tilts all major surfaces toward the pointer without affecting keyboard users.
if(matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
  document.querySelectorAll('.tech-card,.delivery-grid article,.article-feature,.diagnostic,.code-window,.architecture-map').forEach(card=>{
    card.classList.add('spatial-card');
    card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.setProperty('--rx',`${-y*7}deg`);card.style.setProperty('--ry',`${x*8}deg`);card.style.setProperty('--gx',`${(x+.5)*100}%`);card.style.setProperty('--gy',`${(y+.5)*100}%`)});
    card.addEventListener('mouseleave',()=>{card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg')});
  });
}

// Lightweight 3D cloud field: no dependency, no WebGL requirement, and reduced automatically on smaller screens.
const canvas=document.querySelector('#worldCanvas');
if(canvas&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
  const ctx=canvas.getContext('2d'),small=innerWidth<700,count=small?32:82;
  const points=Array.from({length:count},()=>({x:(Math.random()-.5)*1000,y:(Math.random()-.5)*700,z:Math.random()*900-150,s:Math.random()*1.8+.4}));
  let w,h,spin=0;
  const size=()=>{w=canvas.width=innerWidth*devicePixelRatio;h=canvas.height=innerHeight*devicePixelRatio;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)};
  size();addEventListener('resize',size);
  function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);spin+=.0018;for(const p of points){const x=p.x*Math.cos(spin)+p.z*Math.sin(spin),z=p.z*Math.cos(spin)-p.x*Math.sin(spin)+650,scale=320/(z+320),px=innerWidth*.68+x*scale,py=innerHeight*.36+p.y*scale,alpha=Math.max(0,Math.min(.36,scale*.55));if(px>-10&&px<innerWidth+10&&py>-10&&py<innerHeight+10){ctx.beginPath();ctx.fillStyle=`rgba(79,211,249,${alpha})`;ctx.arc(px,py,p.s*scale*2.3,0,Math.PI*2);ctx.fill()}}requestAnimationFrame(draw)}draw();
}
