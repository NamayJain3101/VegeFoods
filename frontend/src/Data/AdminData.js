import React from 'react'
import { CgUserList } from 'react-icons/cg'
import { ImList } from 'react-icons/im'
import { IoFastFoodOutline } from 'react-icons/io5'

export const AdminData = [{
    id: 1,
    text: 'View Users',
    path: '/admin/users',
    icon: <CgUserList className='link-icon' />,
    background: 'linear-gradient(to bottom right, magenta, violet, magenta)'
},
{
    id: 2,
    text: 'View Products',
    path: '/admin/products',
    icon: <IoFastFoodOutline className='link-icon' />,
    background: 'linear-gradient(to bottom right, aqua, #00afff, aqua)'
},
{
    id: 3,
    text: 'View Orders',
    path: '/admin/orders',
    icon: <ImList className='link-icon' />,
    background: 'linear-gradient(to bottom right, lightgreen, lime, lightgreen)'
}
]