import React from 'react'
import { GoHome } from 'react-icons/go'
import { GiSelfLove } from 'react-icons/gi'
import { SiInstacart } from 'react-icons/si'
import { BiCart } from 'react-icons/bi'
import { HiOutlineUserCircle } from 'react-icons/hi'

export const NavLinksData = [{
    id: 1,
    text: 'home',
    path: '/',
    icon: <GoHome className='link-icon' />,
},
{
    id: 2,
    text: 'Shop',
    path: '/shop',
    icon: <SiInstacart className='link-icon' />,
},
{
    id: 3,
    text: 'Wishlist',
    path: '/wishlist',
    icon: <GiSelfLove className='link-icon' />,
},
{
    id: 4,
    text: 'Cart',
    path: '/cart',
    icon: <BiCart className='link-icon' />,
}
]