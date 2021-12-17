import React from 'react'
import { useState } from 'react'
import { createTeam } from '../../Services/teams'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import '../../App.css'

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
            <div className='form-container'>
            <fieldset>
                <legend>Add A Team</legend>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'> Name:</label>
                    <input type='text' id='name' name='name' value={name} onChange={(e) => setName(e.target.value)}/>

                    <label htmlFor='city'> City: </label>
                    <input type='text' id='city' name='city' value={city} onChange={(e) => setCity(e.target.value)} />

                    <label htmlFor='state'> State: </label>
                    <input type='text' id='state' name='state' value={state} onChange={(e) => setState(e.target.value)}/>
                    <button type='submit' className='submit-button'> Add </button>
                </form>
            </fieldset>
            </div>
            <Link to='/teams'> Back to Team List </Link>

        </div>
    )
}
