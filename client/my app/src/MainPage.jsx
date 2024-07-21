import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import './utils'
import { getUserById } from './utils'

export default function MainPage() {
    const {data} = useParams()
    
    const getUser = async()=>{
        const user = await getUserById(data)
        console.log(user.permissions)
    }

    useEffect(getUser,[])

  return (
    <div>MainPage</div>
  )
}
