const { listings } = require('./data');

const normalize = (value) => (value || '').toString().trim().toLowerCase();

module.exports = (req, res) => {
    const location = normalize(req.query.location);
    const budget = Number(req.query.budget || '');

    let results = listings;
    if (location) {
        results = results.filter((listing) => {
            const searchable = [listing.title, listing.tag, listing.location, listing.type].join(' ').toLowerCase();
            return searchable.includes(location);
        });
    }

    if (!Number.isNaN(budget)) {
        results = results.filter((listing) => listing.price <= budget);
    }

    return res.json({
        query: {
            location: location || null,
            budget: Number.isNaN(budget) ? null : budget
        },
        results,
        count: results.length
    });
};