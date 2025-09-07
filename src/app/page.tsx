'use client';

import { useChat } from '@ai-sdk/react';
import Image from 'next/image';
import { useState } from 'react';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { User, Send, Square, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/spinner';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status, stop, setMessages } = useChat();
  return (
    <div className="flex flex-col justify-between w-full max-w-3xl pt-12 pb-4 px-5 mx-auto stretch min-h-screen">
      <div>
        <h1 className='text-2xl font-semibold mb-5'>ASI1 x NextJS x Vercel AI SDK</h1>

        <div className='w-full max-h-[calc(100vh-200px)] overflow-y-auto'>
          <div className="whitespace-pre-wrap flex w-full justify-start items-start gap-3 mb-5">
            <Image
              src={'/images/logos/asi-logo.png'}
              alt='ASI Logo'
              title='ASI Logo'
              width={225}
              height={255}
              className='rounded-md w-9 h-auto'
            />

            <p>Hello, I am an ASI:One Assistant. How may I assist you today?</p>
          </div>

          <div className='flex flex-col justify-start items-center gap-7 w-full'>
            {messages.map(({ id, parts, role }) => (
              <div key={id} className={cn("whitespace-pre-wrap flex w-full justify-start items-start gap-3", role === 'user' ? 'flex-row-reverse' : '')}>
                {
                  role === 'user' ? (
                    <User />
                  ) : (
                    <Image
                      src={'/images/logos/asi-logo.png'}
                      alt='ASI Logo'
                      title='ASI Logo'
                      width={225}
                      height={255}
                      className='rounded-md w-9 h-auto'
                    />
                  )
                }

                <div>
                  {parts.map((part, i) => {
                    switch (part.type) {
                      case 'text':
                        return <Markdown remarkPlugins={[remarkGfm]} components={{
                          p(props) {
                            return <p className="block" {...props} />
                          },
                          a(props) {
                            return <a target="_blank" rel="noopener noreferrer" className="font-semibold cursor-pointer text-blue-600 underline" {...props} />
                          },
                          ul(props) {
                            return <ul className="flex flex-col justify-center items-start gap-4" {...props} />
                          },
                          ol(props) {
                            return <ol className="flex flex-col justify-center items-start gap-4" {...props} />
                          },
                        }} key={`${id}-${i}`}>{part.text}</Markdown>;
                    }
                  })}
                </div>
              </div>
            ))}
          </div>

          {
            status === 'submitted' ? (
              <div className="whitespace-pre-wrap flex w-full justify-start items-center gap-3 mb-5">
                <Image
                  src={'/images/logos/asi-logo.png'}
                  alt='ASI Logo'
                  title='ASI Logo'
                  width={225}
                  height={255}
                  className='rounded-md w-9 h-auto'
                />

                <div className="flex justify-start items-center gap-3">
                  <Spinner />
                  <p>Loading...</p>
                </div>
              </div>
            ) : ""
          }

        </div>
      </div>

      <form
        onSubmit={e => {
          e.preventDefault();
          if (status === 'streaming' || status === 'submitted') {
            stop();
          } else {
            if (!input.trim()) return;

            sendMessage({ text: input });
            setInput('');
          }
        }}
        className='mt-6 flex gap-3 items-center w-full'
      >
        <input
          className="w-full max-w-3xl p-2 border rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={e => setInput(e.currentTarget.value)}
          disabled={status === 'submitted' || status === 'streaming'}
        />
        <button
          className='bg-[#111111] hover:opacity-80 transition-all cursor-pointer text-white font-semibold px-4 py-2 rounded shadow-lg flex items-center' type='submit'
        >
          {
            status === 'submitted' || status === 'streaming' ? (
              <Square fill='currentColor' />
            ) : (
              <Send />
            )
          }
        </button>
        <button
          disabled={status === 'submitted' || status === 'streaming'}
          className='bg-[#111111] hover:opacity-80 transition-all cursor-pointer text-white font-semibold px-4 py-2 rounded shadow-lg flex items-center' type='button'
        >
          <Trash onClick={() => {
            setInput('')
            setMessages([])
          }} />
        </button>
      </form>
    </div>
  );
}