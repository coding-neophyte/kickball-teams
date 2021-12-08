import React from 'react'
import { useState } from 'react'
import { createTeam } from '../../Services/teams'
import { useHistory } from 'react-router'


export default function AddTeam() {
    const history = useHistory()
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await createTeam({ name, city, state })
        history.push(`/teams/${response[0].id}`)

    }
    return (
        <div>

            <fieldset>
                <legend>Add A Team</legend>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'> Name:</label>
                    <input type='text' id='name' name='name' value={name} onChange={(e) => setName(e.target.value)}></input>

                    <label htmlFor='city'> City: </label>
                    <input type='text' id='city' name='city' value={city} onChange={(e) => setCity(e.target.value)} />

                    <label htmlFor='state'> State: </label>
                    <input type='text' id='state' name='state' value={state} onChange={(e) => setState(e.target.value)}></input>
                    <button type='submit'> Add </button>
                </form>
            </fieldset>

        </div>
    )
}
