import useAuth from 'hooks/useAuth'
import useOwner from 'hooks/useOwner'
import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { UserAPI } from 'services/api'

const Recipe = () => {
    const recipe = useLoaderData() as Recipe
    const [owner, setOwner] = useState<Omit<User, '_auth_id' | 'created_at'>>()
    const {isOwner} = useOwner(recipe.owner_id)

    useEffect(() => {
        UserAPI.getAnonUser(recipe.owner_id)
            .then(({data}) => setOwner(data))
    }, [])
        
    console.log(isOwner)
    return (
        <section className='container mt-8'>
            <img src={recipe.image_url} alt="recipe" className="w-full h-full object-cover aspect-video" />
            <h1 className='text-5xl font-medium'>{recipe.title}</h1>
            <p className='text-xl font-normal text-pretty'>{recipe.description}</p>
            <p className='text-xl font-normal text-pretty'>{owner?.username}</p>
        </section>
    )
}

export default Recipe