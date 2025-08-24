import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeftIcon, ImageIcon, InfoIcon, SendHorizonal } from 'lucide-react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '@clerk/clerk-react';
import api from '../api/axios';
import { addMessage, resetMessages, setMessages } from '../features/messages/messagesSlice';
import toast from 'react-hot-toast';

const ChatBox = () => {
  const setSidebarOpen = useOutletContext();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const messageEndRef = useRef(null);
  
  const { messages } = useSelector((state) => state.messages);
  const connections = useSelector((state) => state.connections.connections);
  const { user: currentUser } = useAuth(); // Use Clerk's user instead of Redux auth state

  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  const fetchUserMessages = async () => {
    try {
      const token = await getToken();
      const { data } = await api.post('/api/message/get', 
        { to_user_id: userId },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      if (data.success) {
        dispatch(setMessages(data.messages));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const sendMessage = async () => {
    try {
      if (!text && !image) return;

      const token = await getToken();
      const formData = new FormData();

      formData.append('to_user_id', userId);
      formData.append('text', text);
      if (image) formData.append('image', image);

      const { data } = await api.post('/api/message/send', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
        }
      });

      if (data.success) {
        setText('');
        setImage(null);
        dispatch(addMessage(data.message));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserMessages();
    }
    return () => {
      dispatch(resetMessages());
    };
  }, [userId]);

  useEffect(() => {
    if (connections?.length > 0) {
      const chatUser = connections.find(connection => connection._id === userId);
      if (chatUser) {
        setUser(chatUser);
      }
    }
  }, [connections, userId]);

  useEffect(() => {
    if (messages?.length > 0) {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return user && (
    <div className='flex flex-col h-screen'>
      {/* message top info bar */}
      <div className='flex justify-between items-center md:px-10 xl:px-42 py-2 lg:rounded-none md:rounded-none sticky shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-lg bg-white backdrop-blur-2xl border-gray-300'>
        <div className='flex items-center gap-2 p-2'>
          <ArrowLeftIcon onClick={() => navigate(-1)} size={28} className='ml-1 lg:hidden md:hidden text-slate-500' />
          <img src={user.profile_picture} className='ml-1 size-8 rounded-full' alt={user.username} />
          <div className=''>
            <p className='font-medium'>{user.full_name}</p>
            <p className='text-sm text-gray-500 -mt-1.5'>@{user.username}</p>
          </div>
        </div>
        <InfoIcon onClick={() => navigate(`/profile/${user._id}`)} size={30} className='mr-4' />
      </div>

      {/* message area */}
      <div className='p-5 md:px-10 h-full overflow-y-scroll'>
        <div className='space-y-4 max-w-4xl mx-auto'>
          {messages?.map((message, i) => {
            const isMyMessage = message.from_user_id?._id === currentUser?.id; // Clerk uses 'id' instead of '_id'
            
            return (
              <div 
                key={message._id || i} 
                className={`flex flex-col ${isMyMessage ? 'items-end' : 'items-start'}`}
              >
                <div className={`p-2 text-sm max-w-sm text-slate-700 rounded-lg shadow ${
                  isMyMessage 
                    ? 'rounded-br-none bg-indigo-50' 
                    : 'rounded-bl-none bg-white'
                }`}>
                  {message.message_type === 'image' && (
                    <img 
                      src={message.media_url} 
                      alt="Message attachment"
                      className='w-full max-w-sm rounded-lg mb-1'
                      onLoad={() => messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    />
                  )}
                  <p>{message.text}</p>
                </div>
              </div>
            );
          })}
          <div ref={messageEndRef} />
        </div>
      </div>

      {/* input area */}
      <div className='px-4'>
        <div className='flex items-center gap-3 pl-5 p-1.5 bg-white w-full max-w-xl mx-auto border border-gray-200 shadow rounded-full mb-5'>
          <input
            type="text"
            className='flex-1 outline-none text-slate-700'
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder='Type a message...'
          />

          <label htmlFor="image">
            {image ? (
              <img src={URL.createObjectURL(image)} className='h-8 rounded' alt="Selected" />
            ) : (
              <ImageIcon size={30} className='text-gray-400 cursor-pointer' />
            )}
            <input 
              type="file" 
              accept='image/*' 
              hidden 
              onChange={(e) => setImage(e.target.files[0])} 
              id="image" 
            />
          </label>

          <button 
            onClick={sendMessage} 
            className='shadow shadow-indigo-600 bg-indigo-500 p-2 rounded-full text-white active:scale-95 cursor-pointer hover:bg-indigo-700 duration-200'
          >
            <SendHorizonal size={24} className='ml-0.5 text-center' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;