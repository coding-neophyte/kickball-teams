import React from 'react'
import { useState } from 'react'
import { createPlayer } from '../../Services/players'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import '../../App.css'
import { useParams } from 'react-router'

export default function AddPlayer() {
    const { teamId } = useParams()
    const history = useHistory()
    const [name, setName] = useState('')
    const [position, setPosition] = useState('')

    const submitPlayer = async (e) => {
        e.preventDefault()

        await createPlayer( { name, position, teamId })
        history.push(`/teams/${teamId}`)


    }


    return (
        <div>
            <Link to={`/teams/${teamId}`}>Back to Team Details</Link>
            <fieldset>
                <legend>Add Player</legend>
                <form onSubmit={submitPlayer}>
                    <label htmlFor='name'>Name:</label>
                    <input type='text' id='name' name='name' value={name} onChange={(e) => setName(e.target.value)}></input>

                    <label htmlFor='position'>Position</label>
                    <input type='type' id='position' name='position' value={position} onChange={(e) => setPosition(e.target.value)}></input>
                    <button type='submit'> Add </button>
                </form>
            </fieldset>

        </div>
    )
}
