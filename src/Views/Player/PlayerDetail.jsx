import React from 'react'
import { getPlayerById } from '../../Services/players'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'

export default function PlayerDetail() {
    const [player, setPlayer] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { playerId } = useParams()

    useEffect(() => {
        getPlayerById(playerId)
        .then((resp) => setPlayer(resp))
        .finally(() => setIsLoading(false))
    }, [playerId])

    if(isLoading) return <h1> Loading... </h1>
    return (

        <div>
            <p>
                <Link to='/players'>Back to Player List</Link>
            </p>
            <h1> Name: {player.name}</h1>
            <p> Position: {player.position}</p>
            <Link to={`/players/${playerId}/edit`}> Edit Player </Link>

        </div>
    )
}
