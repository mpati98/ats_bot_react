"use client";

import { useChat } from "ai/react"
import { useEffect, useRef } from "react";
import Textarea from "react-textarea-autosize"

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api"
  });

  const messageEndRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({behavior: 'smooth'})
  }

  useEffect(()=>{
    scrollToBottom();
  }, [messages])

  return (
    <div className="min-h-screen bg-neutral-800">
      {messages.length !== 0 ? (
        <div className="pb-32 pt-5 space-y-5 w-[75%] mx-auto relative">
          {
            messages.map((message) => (
              <div key={message.id} className="w-full">
                {message.role === "user" ? (
                  <div className="flex gap-x-2">
                    <div className="bg-gray-500 h-12 w-12 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                      </svg>

                    </div>
                    <p className="rounded-lg p-3 w-full border-gray-500 border-2 text-sm">{message.content}</p>
                  </div>
                ) : (
                  <div className="flex gap-x-2">
                    <div className="bg-steal-500 h-12 w-12 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
                        <path d="M16.5 7.5h-9v9h9v-9z" />
                        <path fillRule="evenodd" d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z" clipRule="evenodd" />
                      </svg>


                    </div>
                    <p className="rounded-lg p-3 w-full border-steal-500 border-2 text-sm">{message.content}</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      ) : (
        <div className="w-full flex justify-center pt-32">
          <h1 className="font-bold text-3xl">
            You can type input below
          </h1>
        </div>
      )}
      <div ref={messageEndRef}></div>
      <form onSubmit={handleSubmit} className="p-5 fixed bottom-0 left-0 w-[75%] mx-auto right-0 bg-neutral-800">
        <div className="relative flex items-center">
          <Textarea
            tabIndex={0}
            required
            rows={1}
            value={input}
            onChange={handleInputChange}
            autoFocus
            placeholder="Send message ..."
            spellCheck={false}
            className="w-full focus:outline-none shadow-teal-700 shadow-xl placeholder:text-gray-200 text-sm text-white p-5 pr-16 rounded-xl bg-neutral-600"
          />
          <button type="submit" className="absolute bg-teal-500 p-2 rounded-lg right-0 mr-5">
            <svg xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>

          </button>
        </div>
      </form>
    </div>
  )
}
