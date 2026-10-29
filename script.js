// Example listings for the LIMLODGE student-room prototype. Replace them with verified rooms before publishing.
const homes = [
  {id:1,name:'Lumley Standard Room',city:'Freetown',area:'Lumley',campus:'FBC • Mount Aureol',type:'Standard',price:1800,period:'month',rating:'Room details',image:'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80',features:['Single bed','Study desk','Shared bathroom'],description:'A simple, furnished room with space for a bed, your books and a small study desk. The kitchen and bathroom are shared with other students.'},
  {id:2,name:'Leicester Road Ensuite',city:'Freetown',area:'Leicester',campus:'FBC • Mount Aureol',type:'Self-contained',price:3200,period:'month',rating:'Room details',image:'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',features:['Private bathroom','Study desk','Wardrobe'],description:'A private room with its own bathroom and a quiet corner for study. Ask the provider what is included in the monthly rent.'},
  {id:3,name:'Mamba Point Shared Room',city:'Freetown',area:'Mamba Point',campus:'IPAM • Tower Hill',type:'Shared',price:1250,period:'month',rating:'Room details',image:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',features:['Shared bedroom','Shared kitchen','Study table'],description:'A lower-cost shared room for students who are comfortable sharing. Confirm how many people share the room and facilities before arranging a visit.'},
  {id:4,name:'Hill Station Single Room',city:'Freetown',area:'Hill Station',campus:'FBC • Mount Aureol',type:'Standard',price:2100,period:'month',rating:'Room details',image:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80',features:['Single bed','Desk and chair','Water storage'],description:'A practical single room with a desk and chair. Ask about water supply, electricity and what you will need to bring.'},
  {id:5,name:'Goderich Tokeh Studio',city:'Freetown',area:'Goderich',campus:'FBC • Mount Aureol',type:'Self-contained',price:3500,period:'month',rating:'Room details',image:'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=900&q=80',features:['Private room','Private bathroom','Small kitchenette'],description:'A self-contained option with room to sleep and study, plus a small kitchenette. Check transport options and utility costs with the provider.'},
  {id:6,name:'Kissy Student Room',city:'Freetown',area:'Kissy',campus:'IPAM • Tower Hill',type:'Standard',price:1650,period:'month',rating:'Room details',image:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80',features:['Furnished room','Shared bathroom','Shared cooking area'],description:'A furnished room with shared facilities. It may suit a student who wants a straightforward place to sleep and keep their things.'},
  {id:7,name:'Bo Kambui Single Room',city:'Bo',area:'Bo Town',campus:'Njala University • Bo',type:'Standard',price:1500,period:'month',rating:'Room details',image:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',features:['Single bed','Study space','Shared bathroom'],description:'A basic room in Bo with a little space for reading after class. Check the exact location and transport with the accommodation provider.'},
  {id:8,name:'Makeni Wusum Ensuite',city:'Makeni',area:'Makeni',campus:'University of Makeni',type:'Self-contained',price:2800,period:'month',rating:'Room details',image:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80',features:['Private bathroom','Desk','Wardrobe'],description:'A private room with a bathroom and a place to study. Ask whether water, electricity and other services are part of the rent.'},
  {id:9,name:'Kenema Tongo Shared Room',city:'Kenema',area:'Kenema',campus:'Eastern Technical University',type:'Shared',price:1100,period:'month',rating:'Room details',image:'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',features:['Shared room','Shared cooking area','Storage space'],description:'A shared room for students looking to keep rent lower. Before you agree, ask about the other occupants and how bills are divided.'},
  {id:10,name:'Njala Moyamba Standard Room',city:'Moyamba',area:'Moyamba',campus:'Njala University • Njala',type:'Standard',price:1400,period:'month',rating:'Room details',image:'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80',features:['Single bed','Study desk','Shared facilities'],description:'A simple student room with shared facilities. Confirm the route to your campus and the current rent directly with the provider.'},
  {id:11,name:'Waterloo Mende House Room',city:'Waterloo',area:'Waterloo',campus:'Freetown campuses',type:'Standard',price:1700,period:'month',rating:'Room details',image:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80',features:['Furnished room','Desk and chair','Shared kitchen'],description:'A furnished room with a desk and access to a shared kitchen. Ask about travel time to your campus before making plans.'},
  {id:12,name:'Bonthe Self-contained Room',city:'Bonthe',area:'Bonthe',campus:'Ask about local campuses',type:'Self-contained',price:2600,period:'month',rating:'Room details',image:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',features:['Private bathroom','Bed','Study corner'],description:'A private room with a bathroom and a small study corner. Contact the provider to confirm the address and the details.'}
];

const grid = document.querySelector('#listing-grid');
const toast = document.querySelector('#toast');
const dialog = document.querySelector('#home-dialog');
let selectedFilter = 'All';
let searchTerm = '';
let showAll = false;
let sortPrice = false;
const saved = new Set(JSON.parse(localStorage.getItem('limlodge-saved') || '[]'));

function visibleHomes() {
  let list = homes.filter(home => (selectedFilter === 'All' || home.type === selectedFilter) &&
    (!searchTerm || `${home.city} ${home.area} ${home.name} ${home.campus}`.toLowerCase().includes(searchTerm.toLowerCase())));
  if (sortPrice) list = [...list].sort((a,b) => a.price - b.price);
  return showAll ? list : list.slice(0,6);
}

function card(home) {
  return `<article class="listing-card" data-home="${home.id}" tabindex="0" aria-label="View ${home.name} details">
    <div class="listing-photo"><img src="${home.image}" alt="Example room for ${home.name}" loading="lazy"><span class="listing-tag">${home.type.toUpperCase()} ROOM</span>
      <button class="save-button ${saved.has(home.id)?'saved':''}" data-save="${home.id}" aria-label="${saved.has(home.id)?'Remove':'Save'} ${home.name}" aria-pressed="${saved.has(home.id)}">${saved.has(home.id)?'♥':'♡'}</button></div>
    <div class="listing-info"><div class="listing-topline"><span class="listing-name">${home.name}</span><span class="listing-rating">${home.rating}</span></div><div class="listing-location">${home.area}, ${home.city}</div>
      <div class="listing-meta"><span>${home.campus}</span><span>Ask about availability</span></div><div class="listing-price"><b>Le ${home.price.toLocaleString()}</b> / ${home.period}<span>Example rent</span></div></div></article>`;
}

function renderHomes() {
  const list = visibleHomes();
  grid.innerHTML = list.length ? list.map(card).join('') : '<div class="empty-state">No rooms match that search yet.<br>Try another town or room type.</div>';
  document.querySelector('#shown-count').textContent = list.length;
  document.querySelector('#load-more').style.display = (showAll || list.length < 6) ? 'none' : 'inline-flex';
}

grid.addEventListener('click', event => {
  const saveButton = event.target.closest('[data-save]');
  if (saveButton) {
    event.stopPropagation();
    const id = Number(saveButton.dataset.save);
    saved.has(id) ? saved.delete(id) : saved.add(id);
    localStorage.setItem('limlodge-saved', JSON.stringify([...saved]));
    renderHomes();
    showToast(saved.has(id) ? 'Room saved to your list.' : 'Room removed from your list.');
    return;
  }
  const item = event.target.closest('[data-home]');
  if (item) openHome(Number(item.dataset.home));
});
grid.addEventListener('keydown', event => { if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-home]')) { event.preventDefault(); openHome(Number(event.target.dataset.home)); } });

function openHome(id) {
  const home = homes.find(item => item.id === id);
  document.querySelector('#dialog-content').innerHTML = `<div class="dialog-layout"><img class="dialog-image" src="${home.image}" alt="Example room interior"><div class="dialog-details"><div class="eyebrow"><span class="eyebrow-line"></span> ${home.type.toUpperCase()} · ${home.city.toUpperCase()}</div><h2 class="listing-name">${home.name}</h2><p>${home.description}</p><ul>${home.features.map(feature=>`<li>${feature}</li>`).join('')}</ul><p><b>Example rent: Le ${home.price.toLocaleString()} / month</b></p><p class="sample-note">This is sample listing information. Confirm the actual rent, availability, facilities and address with the provider.</p><button class="dialog-contact">Ask about this room ↗</button></div></div>`;
  dialog.showModal();
}

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('click', event => { if (event.target.matches('.dialog-contact')) { dialog.close(); showToast('Add the provider’s contact details here before publishing.'); } });

document.querySelectorAll('.filter-button').forEach(button => button.addEventListener('click', () => {
  selectedFilter = button.dataset.filter;
  document.querySelectorAll('.filter-button').forEach(item => item.classList.toggle('selected', item === button));
  showAll = false; renderHomes();
}));

document.querySelector('#search-form').addEventListener('submit', event => {
  event.preventDefault();
  searchTerm = document.querySelector('#location').value.trim();
  const selectedType = document.querySelector('#type').value;
  selectedFilter = selectedType || 'All';
  document.querySelectorAll('.filter-button').forEach(button => button.classList.toggle('selected', button.dataset.filter === selectedFilter));
  showAll = true; renderHomes();
  document.querySelector('#rooms').scrollIntoView({behavior:'smooth'});
  if (document.querySelector('#movein').value) showToast(`Rooms for ${document.querySelector('#movein').value} are shown as a sample.`);
});

document.querySelector('#sort-button').addEventListener('click', event => {
  sortPrice = !sortPrice;
  event.currentTarget.querySelector('span').textContent = sortPrice ? 'Example rent: low to high⌄' : 'Recommended⌄';
  renderHomes();
});
document.querySelector('#load-more').addEventListener('click', () => { showAll = true; renderHomes(); });

document.querySelector('.menu-toggle').addEventListener('click', event => {
  const nav = document.querySelector('.main-nav');
  const open = nav.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => {
  document.querySelector('.main-nav').classList.remove('open');
  document.querySelector('.menu-toggle').setAttribute('aria-expanded','false');
}));

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

document.querySelector('#newsletter-form').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('#newsletter-message').textContent = 'Thanks! This demo form does not send or store your email yet.';
  event.currentTarget.reset();
});

renderHomes();
