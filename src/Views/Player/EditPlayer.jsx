import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getPlayerById } from '../../Services/players'
import { useHistory } from 'react-router'
import { updatePlayerById } from '../../Services/players'

export default function EditPlayer() {
    const[name, setName] = useState('')
    const[player, setPlayer] = useState(null)
    const[position, setPosition] = useState('')
    const[isLoading, setIsLoading] = useState(true)
    const history = useHistory()
    const { playerId } = useParams();

    useEffect(() => {
        const playerById = async () => {
            const response = await getPlayerById(playerId)
            setPlayer(response)
            setName(response.name)
            setPosition(response.position)
            setIsLoading(false)

        }
        playerById()
    }, [playerId])

    const handleUpdatePlayer = async(e) => {
        e.preventDefault()
       const updatedPlayer = await updatePlayerById(playerId, { name, position } )
        setPlayer(updatedPlayer)

        history.push(`/players/${playerId}`)
    }

    if(isLoading) return <h1> Loading... </h1>
    return (
        <div>
            <fieldset>
                <legend>Update Player</legend>
                <form onSubmit={handleUpdatePlayer}>
                    <label htmlFor='name'>Name:</label>
                    <input onChange={(e) => setName(e.target.value)} defaultValue={player.name} type='text' id='name' name='name'/>

                    <label htmlFor='position'>Position:</label>
                    <input onChange={(e) => setPosition(e.target.value)} defaultValue={player.position} type='text' id='position' name='position'/>
                    <button type='submit'>Update</button>
                </form>
            </fieldset>

        </div>
    )
}
