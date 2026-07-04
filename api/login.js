const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const normalizeEmail = (email) => (email || '').toString().trim().toLowerCase();

module.exports = (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed.' });
    }

    const email = normalizeEmail(req.body?.email);
    const password = (req.body?.password || '').toString().trim();

    if (!emailRegex.test(email) || !password) {
        return res.status(400).json({ success: false, message: 'Please provide a valid email and password.' });
    }

    const validUser = email === 'student@example.com' && password === 'housing123';
    if (!validUser) {
        return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    return res.json({ success: true, message: 'Welcome back! You are now signed in.' });
};