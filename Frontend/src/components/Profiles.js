import React, { useEffect, useState } from 'react'
import { getprofiles } from '../api/api'
import { Link } from 'react-router-dom'

export default function Profiles() {
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    getprofiles().then(profiles => setProfiles(profiles.data.users))
  }, [])
  return (
    <ol style={{border: '1px solid black', margin: 10}}>
      {
        profiles.map(profile => {
            return <li><Link to={`/profile/${profile.userId}`}>{profile.name}</Link></li>
        })
      }
    </ol>
  )
}
