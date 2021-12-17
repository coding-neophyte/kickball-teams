import React from 'react'
import { useState, useEffect } from 'react'
import { deleteTeamById, getTeams } from '../../Services/teams'
import { Link } from 'react-router-dom'


export default function TeamList() {
    const [teams, setTeams] = useState([])

    useEffect(() => {
        getTeams().then((resp) => setTeams(resp))
    }, [])

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete?')
        if(confirmDelete){
            await deleteTeamById(id)
           const renderedTeams = await getTeams()
            setTeams(renderedTeams)

        }
    }

    return (
        <div>
            <h1> Teams </h1>
            <Link to='/teams/new'>Add a Team</Link>
            <ul>
            {teams.map((team) => {
                return (
                    <li key={team.id}>
                        <Link to={`/teams/${team.id}`}>
                            {team.name}
                        </Link>
                            <Link to={`/teams/${team.id}`}><button>View</button> </Link>
                            <Link to={`/teams/${team.id}/edit`}>
                            <button>Update Team</button>
                            </Link>
                            <button aria-label='button' onClick={() => handleDelete(team.id)}>Delete</button>

                    </li>
                );
            })}
            </ul>
        </div>
    )
}
