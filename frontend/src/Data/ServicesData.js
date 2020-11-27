import React from 'react';
import { FcApproval, FcCustomerSupport, FcPackage, FcShipped } from 'react-icons/fc'

export const ServicesData = [
    {
        id: 1,
        title: 'Free Shipping',
        subtitle: `On order over 500`,
        icon: <FcShipped className='icon' />,
        color: '#e4b2d6'
    },
    {
        id: 2,
        title: 'Always Fresh',
        subtitle: 'Products Well Package',
        icon: <FcPackage className='icon' />,
        color: 'lightgreen'
    },
    {
        id: 3,
        title: 'Superior Quality',
        subtitle: 'Quality products',
        icon: <FcApproval className='icon' />,
        color: '#a2d1e1'
    },
    {
        id: 4,
        title: 'Support',
        subtitle: '24/7 Support',
        icon: <FcCustomerSupport className='icon' />,
        color: '#dcd691'
    },
]