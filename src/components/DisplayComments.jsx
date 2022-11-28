
import { formatDistanceToNow, parseISO } from 'date-fns'
import { orderBy } from 'lodash'


const DisplayComments = (props) => {
   const { comments } = props
   const sorted = orderBy(comments, ['date'], ['desc'])

   return (
      <div className="flex flex-col">
         <div className="text-3xl font-mono font-semibold text-gray-800 mb-2">COMMENTS</div>
         <div className="flex flex-col gap-2">
            {sorted.map((comment, index) => {
               return (
                  <div className="flex flex-col bg-gray-200 p-2 gap-2" key={index}>
                     <div className="flex flex-row gap-2 font-sans text-gray-700 items-center">
                        <div className="font-semibold text-lg">{comment.user.username}</div>
                        <div className="font-light text-sm">{formatDistanceToNow(parseISO(comment.date))} ago </div>
                     </div>
                     <div className="text-lg font-sans text-gray-900">
                        {comment.message}
                     </div>
                  </div>
               )
            })}
         </div>
      </div>
   )
}

export default DisplayComments