import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Skeleton } from 'antd';
import DisplayPostData from './DisplaPostData';
import DisplayComments from './DisplayComments';

const DisplayPost = () => {
    const params = useParams()
    const postID = params.Id
    const [postData, setPostData] = useState()

    useEffect(() => {
        async function getPostData() {
            try {
                const response = await axios.get(`https://blog-backend-4u64.onrender.com/post/${postID}`)
                setPostData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getPostData()
    }, [])
    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex flex-col w-[max(45ch,_50%)] bg-gray-50 p-5 mb-12">
                {postData ? <DisplayPostData post={postData.post} /> : <Skeleton active />}
            </div>
            <div className="flex flex-col w-[max(45ch,_50%)] p-5 ">
                {postData ? <DisplayComments comments={postData.commets} /> : <Skeleton active />}
            </div>
        </div>
    )
}

export default DisplayPost