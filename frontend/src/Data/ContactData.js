import React from 'react';
import { FiPhoneCall, FiMap, FiSend, FiGlobe } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const ContactData = [
    {
        id: 1,
        icon: <FiPhoneCall className='icon' />,
        link: <a href="tel:+23923929210">+2 392 3929 210</a>,
        subtitle: "You can call us anytime"
    },
    {
        id: 2,
        icon: <FiSend className='icon' />,
        link: <a href="mailto:info@yourdomain.com">info@yourdomain.com</a>,
        subtitle: "Feel free to email us your questions"
    },
    {
        id: 3,
        icon: <FiMap className='icon' />,
        link: "51 Francis Street, San Diego, CA 91702 United States",
        subtitle: ""
    },
    {
        id: 4,
        icon: <FiGlobe className='icon' />,
        link: <Link to='/'>Website</Link>,
        subtitle: "See our products"
    },
]