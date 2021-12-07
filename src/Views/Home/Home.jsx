import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'


export default function Home() {
    return (
        <div>
            <h1 style={{ textAlign: 'center' }} className='title'> Kickball Team Directory </h1>
            <div className='image-container'>
            <img src='./kickball2.png' alt='kickball' height='500' style={{ display: 'flex', justifyContent: 'center' }} />
            </div>

            <div className='button-container'>
            <Link to='/teams'><button className='enter-button'>Enter</button></Link>
            </div>
        </div>
    )
}
