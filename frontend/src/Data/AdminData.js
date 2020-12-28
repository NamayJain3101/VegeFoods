import React from 'react'
import { CgUserList } from 'react-icons/cg'
import { ImList } from 'react-icons/im'
import { IoFastFoodOutline } from 'react-icons/io5'
import { RiCoupon2Line } from 'react-icons/ri'

export const AdminData = [{
    id: 1,
    text: 'View Users',
    path: '/admin/userlist',
    icon: <CgUserList className='link-icon' />,
    background: 'linear-gradient(to bottom right, magenta, violet, magenta)'
},
{
    id: 2,
    text: 'View Products',
    path: '/admin/productlist',
    icon: <IoFastFoodOutline className='link-icon' />,
    background: 'linear-gradient(to bottom right, aqua, #00afff, aqua)'
},
{
    id: 3,
    text: 'View Orders',
    path: '/admin/orderlist',
    icon: <ImList className='link-icon' />,
    background: 'linear-gradient(to bottom right, lightgreen, lime, lightgreen)'
},
{
    id: 4,
    text: 'View Coupons',
    path: '/admin/couponlist',
    icon: <RiCoupon2Line className='link-icon' />,
    background: 'linear-gradient(to bottom right, yellow, orange, yellow)'
}
]