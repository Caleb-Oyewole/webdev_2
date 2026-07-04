const { subscribers } = require('./data');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const normalizeEmail = (email) => (email || '').toString().trim().toLowerCase();

module.exports = (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed.' });
    }

    const email = normalizeEmail(req.body?.email);
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    if (subscribers.has(email)) {
        return res.json({ success: true, message: 'You are already subscribed to Houdy updates.' });
    }

    subscribers.add(email);
    return res.json({ success: true, message: 'Thanks for subscribing! You will receive new listings and offers soon.' });
};