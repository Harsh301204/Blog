import React from 'react'
import service from '../appWrite/config'
import {Link} from 'react-router'

function PostCard({$id , tittle , imageId}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='p-4 rounded-xl w-full bg-gray-100'>
            <div className='justify-center mb-4 w-full'>
                <img src={service.getFilePreview(imageId)} alt={tittle} 
                className='rounded-xl '/>
            </div>

            <h2 className='text-2xl font-bold'>{tittle}</h2>
        </div>
    </Link>
  )
}

export default PostCard