import React from 'react'
import { CgUserList } from 'react-icons/cg'
import { ImList } from 'react-icons/im'
import { FiHeart } from 'react-icons/fi'
import { GiMoneyStack } from 'react-icons/gi'

export const AccountData = [{
    id: 1,
    text: 'View/Edit Profile',
    path: '/my-account/profile',
    icon: <CgUserList className='link-icon' />,
    background: 'linear-gradient(to bottom right, magenta, violet, magenta)'
},
{
    id: 2,
    text: 'My Wallet',
    path: 'my-wallet',
    icon: <GiMoneyStack className='link-icon' />,
    background: 'linear-gradient(to bottom right, yellow, orange, yellow)'
},
{
    id: 3,
    text: 'My Orders',
    path: '/my-account/myOrders',
    icon: <ImList className='link-icon' />,
    background: 'linear-gradient(to bottom right, lightgreen, lime, lightgreen)'
},
{
    id: 4,
    text: 'My Wishlist',
    path: '/wishlist',
    icon: <FiHeart className='link-icon' />,
    background: 'linear-gradient(to bottom right, aqua, #00afff, aqua)'
},
]