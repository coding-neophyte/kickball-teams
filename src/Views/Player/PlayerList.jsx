import React from 'react'
import { deletePlayerById, getPlayers } from '../../Services/players'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function PlayerList() {
    const [players, setPlayers] = useState([])

    useEffect(() => {
        getPlayers()
        .then((resp) => setPlayers(resp))
    }, [])

    const handleDelete = async (id) => {
      const confirmDelete = window.confirm('Are you sure you want to delete player')
      if(confirmDelete ){
          await deletePlayerById(id)
      const renderedPlayers = await getPlayers()
      setPlayers(renderedPlayers)
      }

    }
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
                            <Link to={`players/${player.id}`}>
                                <button> View </button></Link>
                            <Link to={`/players/${player.id}/edit`}> <button> Edit </button></Link>
                            <button onClick={() => handleDelete(player.id)}> Delete </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
