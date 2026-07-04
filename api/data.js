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

module.exports = { listings, subscribers };