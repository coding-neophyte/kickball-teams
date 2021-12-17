import React from 'react'
import { useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { getTeamById } from '../../Services/teams';
import '../../App.css'
import { useHistory } from 'react-router';
import { updateTeamById } from '../../Services/teams';



export default function EditTeam() {
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const [team, setTeam] = useState(null)
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const { id } = useParams();

    useEffect(() => {
        const grabTeam = async () => {

            const response = await getTeamById(id);
            setTeam(response)
            setName(response.name)
            setCity(response.city)
            setState(response.state)
            setIsLoading(false)

        }
        grabTeam();
    }, [id])


    const handleTeamUpdate = async (e) =>{
        e.preventDefault()
        const updateTeam = await updateTeamById (id, {name, city, state} )

        setTeam(updateTeam)
        history.push(`/teams/${id}`)
    }
    if(isLoading) return <h1> Loading... </h1>
    return (
        <div>
            <fieldset>
                <legend>Update Team Info</legend>
                <form onSubmit={handleTeamUpdate}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' name='name' defaultValue={team.name} onChange={(e) => setName(e.target.value)}/>

                    <label htmlFor='city'>City:</label>
                    <input type='text' id='city' name='city' defaultValue={team.city} onChange={(e) => setCity(e.target.value)}/>

                    <label htmlFor='state'>State</label>
                    <input type='text' id='state' name='state' defaultValue={team.state} onChange={(e) => setState(e.target.value)}/>
                    <button type='submit' className='submit-button'>Update</button>
                </form>
            </fieldset>
            </div>
    )
}
