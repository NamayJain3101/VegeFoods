import React from 'react'
import { CgUserList } from 'react-icons/cg'
import { ImList } from 'react-icons/im'
import { FiHeart } from 'react-icons/fi'
import { GiMoneyStack } from 'react-icons/gi'
import { RiCoupon2Line } from 'react-icons/ri'

export const AccountData = [{
    id: 1,
    text: 'View/Edit Profile',
    path: '/my-account/profile',
    icon: <CgUserList className='link-icon' />,
    background: 'linear-gradient(to bottom right, #c100d3, #ff92ff, #c100d3)'
},
{
    id: 2,
    text: 'My Wallet',
    path: 'my-wallet',
    icon: <GiMoneyStack className='link-icon' />,
    background: 'linear-gradient(to bottom right, yellow, #ff8800, yellow)'
},
{
    id: 3,
    text: 'My Orders',
    path: '/my-account/myOrders',
    icon: <ImList className='link-icon' />,
    background: 'linear-gradient(to bottom right, yellowgreen, #b3ffb3, yellowgreen)'
},
{
    id: 4,
    text: 'My Wishlist',
    path: '/wishlist',
    icon: <FiHeart className='link-icon' />,
    background: 'linear-gradient(to bottom right, aqua, #0099ff, aqua)'
},
{
    id: 5,
    text: 'My Coupons',
    path: '/my-account/myCoupons',
    icon: <RiCoupon2Line className='link-icon' />,
    background: 'linear-gradient(to bottom right, grey, white, grey)'
},
]