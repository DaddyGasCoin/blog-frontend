import { useEffect, useState } from "react"
import axios from "axios"
import { Skeleton } from 'antd';
import DisplayPostsMain from './DisplayPostsMain'

const DisplayPostList = () => {

    const [posts, setPosts] = useState()
    useEffect(() => {
        async function getAllPosts() {
            const response = await axios.get('https://blooming-cliffs-25018.herokuapp.com/posts')
            setPosts(response.data.posts)
        }

        getAllPosts()
    }, [])

    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex flex-col w-[max(45ch,_50%)] bg-gray-50 p-5 ">
                {posts ? <DisplayPostsMain posts={posts} /> : <Skeleton active />}
            </div>
        </div>
    )
}

export default DisplayPostList