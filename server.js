const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const listings = [
    {
        id: 1,
        title: 'Sunny studio near Central Campus',
        tag: 'Alba Lodge',
        badge: '-15% this month',
        price: 85000,
        rating: 4.8,
        mediaClass: 'b1',
        location: 'Central Campus',
        type: 'Studio'
    },
    {
        id: 2,
        title: 'Shared 2-bed close to the library',
        tag: 'Franklina Lodge',
        badge: 'Verified',
        price: 62000,
        rating: 4.6,
        mediaClass: 'b2',
        location: 'Library District',
        type: 'Shared'
    },
    {
        id: 3,
        title: 'Quiet 1-bed with private balcony',
        tag: 'Greenhaven Lodge',
        badge: 'New listing',
        price: 94500,
        rating: 4.9,
        mediaClass: 'b3',
        location: 'West Campus',
        type: 'One Bedroom'
    },
    {
        id: 4,
        title: 'Room 12B, Block C',
        tag: 'Eastside Lodge',
        badge: 'Ensuite',
        price: 58000,
        rating: 4.5,
        mediaClass: 'b4',
        location: 'North Campus',
        type: 'Ensuite'
    },
    {
        id: 5,
        title: 'Private single room',
        tag: 'Maple Court',
        badge: 'Furnished',
        price: 71000,
        rating: 4.7,
        mediaClass: 'b5',
        location: 'East Campus',
        type: 'Single Room'
    },
    {
        id: 6,
        title: '2-in-1 apartment, wifi incl.',
        tag: 'Terracotta Row',
        badge: 'Shared',
        price: 49500,
        rating: 4.4,
        mediaClass: 'b6',
        location: 'Campus Edge',
        type: 'Shared'
    }
];

const subscribers = new Set();

app.get('/api/search', (req, res) => {
    const location = (req.query.location || '').trim().toLowerCase();
    const budget = parseInt(req.query.budget || '', 10);

    let results = listings;

    if (location) {
        results = results.filter((listing) =>
            listing.location.toLowerCase().includes(location) ||
            listing.title.toLowerCase().includes(location) ||
            listing.tag.toLowerCase().includes(location)
        );
    }

    if (!Number.isNaN(budget)) {
        results = results.filter((listing) => listing.price <= budget);
    }

    return res.json({
        query: { location, budget: Number.isNaN(budget) ? null : budget },
        results,
        count: results.length
    });
});

app.post('/api/newsletter', (req, res) => {
    const email = (req.body.email || '').trim().toLowerCase();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!validEmail) {
        return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    if (subscribers.has(email)) {
        return res.json({ success: true, message: 'You are already subscribed to Houdy updates.' });
    }

    subscribers.add(email);
    console.log('New newsletter subscriber:', email);

    return res.json({ success: true, message: 'Thanks for subscribing! You will receive new listing alerts soon.' });
});

app.post('/api/login', (req, res) => {
    const email = (req.body.email || '').trim().toLowerCase();
    const password = (req.body.password || '').trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!validEmail || !password) {
        return res.status(400).json({ success: false, message: 'Please provide a valid email and password.' });
    }

    console.log('User signed in:', email);
    return res.json({ success: true, message: 'Welcome back! You are now signed in.' });
});

app.post('/api/listings', (req, res) => {
    const { title, tag, location, type, price, rating, badge } = req.body;
    const priceValue = Number(price);
    const ratingValue = Number(rating);

    if (!title || !tag || !location || !type || Number.isNaN(priceValue) || Number.isNaN(ratingValue)) {
        return res.status(400).json({ success: false, message: 'Please complete all listing fields with valid values.' });
    }

    const newListing = {
        id: listings.length + 1,
        title,
        tag,
        badge: badge || 'New listing',
        price: priceValue,
        rating: ratingValue,
        mediaClass: 'b7',
        location,
        type
    };

    listings.push(newListing);
    console.log('New listing added:', newListing);
    return res.json({ success: true, message: 'Your property has been listed successfully.', listing: newListing });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Houdy backend running at http://localhost:${PORT}`);
});
