import { formatDistanceToNow, parseISO } from 'date-fns'
import { orderBy } from 'lodash'
import { Button } from 'antd'


const DisplayPostsMain = (props) => {
   const { posts } = props
   const sorted = orderBy(posts, ['date'], ['desc'])
   return (

      //Display all post is consised format for home page
      <>
         {
            sorted.map((post) => {
               return (
                  <div className="flex flex-col my-2" key={post._id}>
                     <div className="flex flex-row justify-between mb-1">
                        <div className="text-base font-medium text-gray-600">{post.user.username}</div>
                        <div className="text-sm font-mono font-normal text-gray-600">
                           {formatDistanceToNow(parseISO(post.date))} ago</div>
                     </div>
                     <div className="flex flex-row justify-between">
                        <div className="text-lg font-mono font-semibold text-gray-700">{post.title}</div>
                        <Button type="primary" size='middle' href={`posts/${post._id}`}
                           style={{
                              background: "#6b7280"
                           }}>
                           View Post
                        </Button>
                     </div>
                  </div>
               )
            })}
      </>
   );

}

export default DisplayPostsMain