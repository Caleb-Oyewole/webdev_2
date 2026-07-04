const { listings } = require('./data');

module.exports = (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed.' });
    }

    const { title, tag, location, type, price, rating, badge } = req.body || {};
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
    return res.json({ success: true, message: 'Your property has been listed successfully.', listing: newListing });
};