import React from 'react'
import { getPlayers } from '../../Services/players'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function PlayerList() {
    const [players, setPlayers] = useState([])

    useEffect(() => {
        getPlayers()
        .then((resp) => setPlayers(resp))
    }, [])
    return (
        <div>
            <h1> Players </h1>
            <ul>
                {players.map((player) =>{
                    return(
                        <li key={player.id}>
                            <Link to={`/players/${player.id}`}>
                                {player.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
