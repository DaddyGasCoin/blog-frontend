import { formatDistanceToNow, parseISO } from 'date-fns'


const DisplayPostData = (props) => {
    const { post } = props

    return (
        <div className="flex flex-col">
            <div className="font-mono text-gray-800 text-3xl font-semibold ">{post.title}</div>
            <div className="flex flex-row-reverse text-base text-gray-700 font-medium font-sans gap-2 mb-10 pt-2 items-center">
                <div className="text-base text-gray-700 font-medium font-sans">
                    {formatDistanceToNow(parseISO(post.date))} ago
                </div>
                <div className="text-lg text-gray-600">{post.user.username}, </div>
            </div>
            <div className="text-lg font-sans font-medium text-gray-600 mb-10"
                dangerouslySetInnerHTML={{ __html: post.message }}></div>
        </div>
    )
}



export default DisplayPostData