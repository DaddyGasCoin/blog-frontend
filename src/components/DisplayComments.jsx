
import { formatDistanceToNow, parseISO } from 'date-fns'
import { orderBy } from 'lodash'
import { Button, Tooltip, message } from 'antd';
import { useEffect, useState } from 'react';
import { Input } from 'antd';
const { TextArea } = Input;
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { CloseOutlined } from '@ant-design/icons';

const DisplayComments = (props) => {
   const params = useParams()
   const postID = params.Id
   const { comments } = props
   const sorted = orderBy(comments, ['date'], ['desc'])
   const [user, setUser] = useState()
   const [value, setValue] = useState('');
   const [messageApi, contextHolder] = message.useMessage()
   const [commentToggle, setCommentToggle] = useState(false)
   const [loadingState, setLoadingState] = useState(false);


   const warning = (type) => {
      let message;
      if (type == 'no_login')
         message = 'Must be logged in to comment'
      else {
         message = 'Comment must not be empty'
      }
      messageApi.open({
         type: 'warning',
         content: message,
      });
      setLoadingState(false)
   };

   const success = () => {
      messageApi.open({
         type: 'success',
         content: 'Success!',
      });
   };

   const error = () => {
      messageApi.open({
         type: 'error',
         content: 'ERROR',
      });
   };
   const submitComment = async () => {
      if (!user) {
         warning('no_login')
      }
      else if (value.length < 1) {
         warning('empty_message')
      }
      else {
         try {
            const resp = await axios.post(`https://blogapi-production-d43c.up.railway.app/comment/${postID}/create`,
               {
                  message: value
               }, {
               headers: {
                  'Authorization': `Bearer ${user.token}`
               }
            })
            if (resp) {
               setLoadingState(false)
               setCommentToggle(false)
               setValue('')
               success()
            }
         } catch (error) {
            setLoadingState(false)
            setCommentToggle(false)
            setValue('')
            error()
         }
      }
   }

   //Check for JWT
   useEffect(() => {
      //Set JWT in user state if exists 
      let token = sessionStorage.getItem('token_info')
      if (!token) {
         token = localStorage.getItem('token_info')
      }
      if (token) {
         setUser(JSON.parse(token))
      }
      else {
         setUser(false)
      }
   }, [])

   //Scroll to show comment-box if visisble
   useEffect(() => {
      if (commentToggle) {
         window.scrollTo(0, document.body.scrollHeight)
      }
   }, [commentToggle])

   return (
      <div className="flex flex-col">
         {contextHolder}
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
            {/* Button to comment;Disabled if not logged in */}
            <div className="">
               {user ?
                  <Button type="primary" size='medium'
                     onClick={() => {
                        setCommentToggle(!commentToggle)
                        window.scrollTo(0, document.body.scrollHeight)
                     }}
                     style={{
                        background: "#6b7280",
                        color: '#f9fafb'
                     }}>Add comment</Button>
                  :
                  <Tooltip title="Login to comment">
                     <Button type="primary" size='medium'
                        disabled style={{
                           background: "#6b7280",
                           color: '#f9fafb'
                        }}>Add comment</Button>
                  </Tooltip>}
            </div>
            {/* Display comment box based on state*/}
            {commentToggle ?
               <div className=" ">
                  <div className="flex flex-row-reverse"
                     onClick={() => setCommentToggle(!commentToggle)}>
                     <Button type="link" size='small'
                        icon={<CloseOutlined />}></Button>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                     <TextArea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter text to comment"
                        autoSize={{
                           minRows: 2,
                           maxRows: 6,
                        }}
                     />
                     <div className="">
                        <Button type="primary" loading={loadingState} onClick={() => {
                           setLoadingState(true)
                           submitComment()
                        }
                        }>Submit</Button>
                     </div>
                  </div>
               </div> :
               null}
         </div>
      </div>
   )
}

export default DisplayComments