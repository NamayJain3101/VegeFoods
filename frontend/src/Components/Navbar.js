import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { IoMdArrowDropright } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import styled from 'styled-components'
import { logout } from '../Actions/userActions'
import { NavLinksData } from '../Data/NavLinksData'

const Navbar = ({ history }) => {

    const closeNavbar = () => {
        document.querySelector('.toggler').checked = false;
    }

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <NavWrapper>
            <nav id="main-nav">
                <Link to='/'>
                    <h1><span>VEGEFOODS</span></h1>
                </Link>
                <ul>
                    {
                        NavLinksData.map(link => {
                            return (
                                <li key={link.id}>
                                    <Link to={link.path}>
                                        {link.icon}
                                        {link.text.toUpperCase()}
                                    </Link>
                                </li>
                            )
                        })
                    }
                    <li>
                        {userInfo ? (
                            <div className='userInfo'>
                                <HiOutlineUserCircle className='link-icon' />
                                <NavDropdown drop='down' alignRight title={userInfo.name.split(' ')[0]} id='username'>
                                    <LinkContainer to='/my-account'>
                                        <NavDropdown.Item>My Account</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        ) : (
                                <Link to='/login'>
                                    <HiOutlineUserCircle className='link-icon' />
                                    {'Login'.toUpperCase()}
                                </Link>
                            )}
                    </li>
                </ul>
            </nav>
            <Link to='/'>
                <h1 className="logo">VEGEFOODS</h1>
            </Link>
            <div className="menu-wrap">
                <input type="checkbox" className="toggler" />
                <div className="hamburger"><div></div></div>
                <div className="menu">
                    <div>
                        <div>
                            <ul>
                                {
                                    NavLinksData.map(link => {
                                        return (
                                            <li key={link.id} onClick={closeNavbar}>
                                                <Link to={link.path}>
                                                    {link.icon}
                                                    {link.text.toUpperCase()}
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                                <li>
                                    {userInfo ? (
                                        <Link to='/my-account' onClick={closeNavbar}>
                                            <HiOutlineUserCircle className='link-icon' />
                                            {userInfo.name.split(' ')[0].toUpperCase()}
                                            <IoMdArrowDropright className='link-icon' />
                                        </Link>
                                    ) : (
                                            <Link to='/login' onClick={closeNavbar}>
                                                <HiOutlineUserCircle className='link-icon' />
                                                {'Login'.toUpperCase()}
                                            </Link>
                                        )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grass-border" />
        </NavWrapper>
    )
}

const NavWrapper = styled.header`
    position: relative;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    .logo {
        padding: 0.5rem;
        position: fixed;
        right: 0;
        top: 29.5px;
        line-height: 1;
        z-index: 99999;
        padding-right: 1rem;
        color: black;
        margin: 0;
        font-size: 25px;
        font-weight: bold;

    }
    a {
        color: black !important;
    }
    a:hover {
        color: black !important;
    }

    .userInfo * {
        padding: 0 !important;
    }
    .dropdown-menu & .show {
        padding: 0.5rem 0;
    }
    .dropdown-item.active, .dropdown-item:active {
        background: #f8f9fa;
    }

    #main-nav {
        color: #000000;
        position: fixed;
        top: 0;
        width: 100%;
        background: white;
        z-index: 9999;
        display: flex;
        justify-content: space-around;
        align-items: center;
        box-shadow: 0 1px 10px -2px black;
        padding: 1rem;
    }

    #main-nav h1 {
        display: flex;
        align-items: center;
        margin: 0;
        font-size: 1.5em;
        padding-left: 1rem;
        color: black;
        font-weight: bold;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    #main-nav ul{
        list-style: none;
        display: flex;
        align-items: center;
        margin-bottom: 0;
        padding-right: 1rem;
    }

    #main-nav ul li {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #main-nav ul li:hover {
        transform: scale(1.2);
    }

    #main-nav ul li a:link,
    #main-nav ul li a:visited{
        text-decoration: none;
        color: #000000;
        padding: 1rem 0.6rem;
        margin: 0 0.50rem;
        line-height: 2;
        transition: border-bottom 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
    }

    #main-nav ul li div{
        text-decoration: none;
        color: #000000;
        padding: 1rem 0rem;
        margin: 0rem;
        line-height: 2;
        transition: border-bottom 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
    }

    #main-nav ul li a .link-icon, #main-nav ul li div .link-icon {
        font-size: 1.8em;
    }

    .menu-wrap{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        width: 100%;
        height: 100px;
        background:  white;
        box-shadow: 0 1px 10px -2px black;
        display: flex;
        align-items: center;
    }

    .menu-wrap .toggler{
        position: absolute;
        top: 14px;
        left: 1rem;
        z-index: 2;
        cursor: pointer;
        width: 72px;
        height: 72px;
        opacity: 0;
    }

    .menu-wrap .hamburger{ 
        position: absolute;
        top: 14px;
        left: 1rem;
        z-index: 1;
        width: 40px;
        height: 40px;
        margin: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* Hamburger Line */
    .menu-wrap .hamburger > div{
        position: relative;
        flex: none;
        width: 100%;
        height: 3px;
        background: black;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.4s ease;
    }

    /* Hamburger Lines - Top & Bottom */
    .menu-wrap .hamburger > div::before,
    .menu-wrap .hamburger > div::after{
        content:'';
        border-radius: 10px;
        position: absolute;
        z-index: 1;
        top: -10px;
        width: 100%;
        height: 3px;
        background: inherit;
    }

    /* Moves Line down */
    .menu-wrap .hamburger > div::after{
        top: 10px;
    }

    /* Toggler Animation */

    .menu-wrap .toggler:checked + .hamburger > div{
        transform: rotate(135deg);
    }

    /* Turns Lines Into X */
    .menu-wrap .toggler:checked + .hamburger > div:before,
    .menu-wrap .toggler:checked + .hamburger > div:after{
        top: 0;
        transform: rotate(90deg);
    }

    /* Rotate on hover when Checked */
    .menu-wrap .toggler:checked:hover + .hamburger > div{
        transform: rotate(225deg);
    }

    /* Show Menu */
    .menu-wrap .toggler:checked ~ .menu{
        visibility: visible;
    }

    .menu-wrap .toggler:checked ~ .menu > div{
        transform: scale(1);
        transition-duration: 1s;
    }

    .menu-wrap .toggler:checked ~ .menu > div > div{
        opacity: 1;
        transition: opacity 0.4s ease 0.4s;
    }

    .menu-wrap .menu{
        position: fixed;
        top: 100px;
        left: 0;
        width: 100%;
        height: calc(100% - 100px);
        visibility: hidden;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .menu-wrap .menu > div{
        background: white;
        border-radius: 50%;
        width: 200vw;
        height: 220vw;
        display: flex;
        flex: none;
        align-items: center;
        justify-content: center;
        transform: scale(0);
        transition: all 0.4s ease;
    }

    .menu-wrap .menu > div > div{
        text-align: center;
        max-width: 100vw;
        max-height: min(340px, 80vh);
        overflow: auto;
        opacity: 0;
        transition: opacity 0.4s ease;
    }

    .menu-wrap .menu > div > div::-webkit-scrollbar {
        display: none;
    }

    .menu-wrap .menu > div > div > ul {
        padding: 0;
    }

    .menu-wrap .menu > div > div > ul > li{
        list-style: none;
        font-size: 1.5rem;
        padding: 1rem;
    }

    .menu-wrap .menu > div > div > ul > li > a{
        color: inherit;
        text-decoration: none;
        transition: color 0.4s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .menu-wrap .menu > div > div > ul > li > a > .link-icon {
        margin-right: 0.6rem;
    }

    .menu-wrap .menu > div > div > ul > li > a:hover {
        transform: scale(1.2);
    }

    @media(min-width: 701px) {
        .menu-wrap {
            display: none;
        }
        .logo {
            display: none;
        }
    }

    @media(max-width: 700px) {
        #main-nav {
            display: none;
        }
        #main-nav ul li a .link-icon {
            margin-right: 0.6rem;
        }
    }

    @media screen and (orientation:landscape) {
        .menu-wrap .menu > div > div > ul > li:first-child {
            padding-top: 2rem;
        }
        
        .menu-wrap .menu > div > div > ul > li:last-child {
            padding-bottom: 2rem;
        }
    }
`

export default (withRouter)(Navbar)
