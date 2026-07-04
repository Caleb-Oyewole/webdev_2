const api = {
    search: '/api/search',
    newsletter: '/api/newsletter',
    login: '/api/login',
    listings: '/api/listings'
};

function showStatus(element, message, isError = false) {
    if (!element) return;
    element.textContent = message;
    element.style.color = isError ? '#C1502E' : '#2E7D32';
}

async function postJson(url, body) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return response.json();
}

function createResultCard(listing) {
    const card = document.createElement('article');
    card.className = 'result-card';
    card.innerHTML = `
    <div class="card-media ${listing.mediaClass}"></div>
    <div class="card-body">
      <span class="tag">${listing.tag}</span>
      <h3>${listing.title}</h3>
      <div class="price">₦${listing.price.toLocaleString()}<span>/mo</span></div>
      <div class="details">${listing.location} · ${listing.type} · ★ ${listing.rating}</div>
    </div>
  `;
    return card;
}

async function loadListings(query = {}) {
    const params = new URLSearchParams();
    if (query.location) params.set('location', query.location);
    if (query.budget) params.set('budget', query.budget);

    const response = await fetch(`${api.search}?${params.toString()}`);
    const data = await response.json();
    const results = document.querySelector('#search-results');
    const count = document.querySelector('#results-count');

    if (!results || !count) return;
    results.innerHTML = '';
    count.textContent = `${data.count} listings found`;

    if (!data.results.length) {
        results.innerHTML = '<p style="color: var(--ink-soft);">No listings match your search. Try broadening your criteria.</p>';
        return;
    }

    data.results.forEach((listing) => results.appendChild(createResultCard(listing)));
}

function attachNewsletter() {
    const form = document.querySelector('#newsletter-form');
    const status = document.querySelector('#newsletter-status') || document.querySelector('#newsletter-message');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = form.querySelector('input[type="email"]').value.trim();
        const { message, success } = await postJson(api.newsletter, { email });
        showStatus(status, message, !success);
        if (success) form.reset();
    });
}

function attachSignIn() {
    const form = document.querySelector('#signin-form');
    const status = document.querySelector('#signin-status');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = form.querySelector('input[type="email"]').value.trim();
        const password = form.querySelector('input[type="password"]').value.trim();
        const { message, success } = await postJson(api.login, { email, password });
        showStatus(status, message, !success);
        if (success) form.reset();
    });
}

function attachPropertyForm() {
    const form = document.querySelector('#property-form');
    const status = document.querySelector('#property-status');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const body = Object.fromEntries(formData.entries());
        body.price = Number(body.price);
        const { message, success } = await postJson(api.listings, body);
        showStatus(status, message, !success);
        if (success) form.reset();
    });
}

function getQueryParams() {
    return Object.fromEntries(new URLSearchParams(window.location.search));
}

function applyQueryToForm(params) {
    const form = document.querySelector('#listings-search-form');
    if (!form) return;
    if (params.location) form.querySelector('input[name="location"]').value = params.location;
    if (params.budget) form.querySelector('input[name="budget"]').value = params.budget;
}

function attachListingsSearch() {
    const form = document.querySelector('#listings-search-form');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const location = form.querySelector('input[name="location"]').value.trim();
        const budget = form.querySelector('input[name="budget"]').value.trim();
        await loadListings({ location, budget });
    });
}

window.addEventListener('DOMContentLoaded', () => {
    attachNewsletter();
    attachSignIn();
    attachPropertyForm();
    attachListingsSearch();
    if (document.querySelector('#search-results')) {
        const params = getQueryParams();
        if (params.location || params.budget) {
            applyQueryToForm(params);
            loadListings({ location: params.location, budget: params.budget });
        } else {
            loadListings();
        }
    }
});
