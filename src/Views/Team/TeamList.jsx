import React from 'react'
import {useState, useEffect } from 'react'
import { getTeams } from '../../Services/teams'
import { Link } from 'react-router-dom'

export default function TeamList() {
    const [teams, setTeams] = useState([])

    useEffect(() => {
        getTeams().then((resp) => setTeams(resp))
    }, [])

    return (
        <div>
            <h1> Teams </h1>
            <ul>
            {teams.map((team) => {
                return (
                    <li key={team.id}>
                        <Link to={`/teams/${team.id}`}>
                            {team.name}

                        </Link>
                    </li>
                );
            })}
            </ul>
        </div>
    )
}
