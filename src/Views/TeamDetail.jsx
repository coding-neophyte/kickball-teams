import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { getTeamById } from '../Services/teams'

export default function TeamDetail() {
    const [team, setTeam] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { teamId } = useParams()

    useEffect(() => {
        getTeamById(teamId)
        .then((resp) => setTeam(resp))
        .finally(() => setIsLoading(false))
    }, [teamId])

    if(isLoading) return <h1> Loading...</h1>

    return (
        <div>
            <p>
            <Link to='/teams'> Back to Team List </Link>
            </p>
            <h1>{team.name}</h1>
            <p> {team.city} {team.state}</p>
        </div>
    )
}
