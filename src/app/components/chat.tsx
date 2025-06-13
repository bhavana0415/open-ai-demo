'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useChat } from "ai/react"
import { useRef, useEffect, useState } from 'react'
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function Chat() {

    const [chatno, setChatno] = useState(1)

    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: `api/ex${chatno}`,
        onError: (e) => {
            console.log(e)
        }
    })
    const chatParent = useRef<HTMLUListElement>(null)

    useEffect(() => {
        const domNode = chatParent.current
        if (domNode) {
            domNode.scrollTop = domNode.scrollHeight
        }
    })

    return (
        <main className="flex flex-col w-full h-screen max-h-dvh bg-background">
            <div className="grid grid-cols-5 gap-2">
                <Button className={`${chatno == 1 ? 'bg-rose-600 hover:bg-rose-800' : 'bg-sky-600 hover:bg-sky-800'}`} onClick={() => setChatno(prev => 1)}>Chat</Button>
                <Button className={`${chatno == 2 ? 'bg-rose-600 hover:bg-rose-800' : 'bg-sky-600 hover:bg-sky-800'}`} onClick={() => setChatno(prev => 2)}>Joker</Button>
                <Button className={`${chatno == 3 ? 'bg-rose-600 hover:bg-rose-800' : 'bg-sky-600 hover:bg-sky-800'}`} onClick={() => setChatno(prev => 3)}>Pirate</Button>
                <Button className={`${chatno == 4 ? 'bg-rose-600 hover:bg-rose-800' : 'bg-sky-600 hover:bg-sky-800'}`} onClick={() => setChatno(prev => 4)}>US</Button>
                <Button className={`${chatno == 5 ? 'bg-rose-600 hover:bg-rose-800' : 'bg-sky-600 hover:bg-sky-800'}`} onClick={() => setChatno(prev => 5)}>Memory</Button>
            </div>

            <header className="p-4 border-b w-full max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold">LangChain Chat</h1>
            </header>

            <section className="p-4">
                <form onSubmit={handleSubmit} className="flex w-full max-w-3xl mx-auto items-center">
                    <Input className="flex-1 min-h-[40px]" placeholder="Type your question here..." type="text" value={input} onChange={handleInputChange} />
                    <Button className="ml-2" type="submit">
                        Submit
                    </Button>
                </form>
            </section>

            <section className="container px-0 pb-10 flex flex-col flex-grow gap-4 mx-auto max-w-3xl">
                <ul ref={chatParent} className="h-1 p-4 flex-grow bg-muted/50 rounded-lg overflow-y-auto flex flex-col gap-4">
                    {messages.map((m, index) => (
                        <div key={index}>
                            {m.role === 'user' ? (
                                <li key={m.id} className="flex flex-row">
                                    <div className="rounded-xl p-4 bg-background shadow-md flex">
                                        <pre className="text-primary">{m.content}</pre>
                                    </div>
                                </li>
                            ) : (
                                <li key={m.id} className="flex flex-row-reverse">
                                    <div className="rounded-xl p-4 bg-background shadow-md flex flex-col w-3/4">
                                        <ReactMarkdown
                                        // components={{
                                        //     code({ className, children, ...rest }) {
                                        //         const match = /language-(\w+)/.exec(className || "");
                                        //         return match ? (
                                        //             <SyntaxHighlighter
                                        //                 PreTag="div"
                                        //                 language={match[1]}
                                        //                 style={dark}
                                        //                 {...rest}
                                        //             >
                                        //                 {children}
                                        //             </SyntaxHighlighter>
                                        //         ) : (
                                        //             <code {...rest} className={className}>
                                        //                 {children}
                                        //             </code>
                                        //         );
                                        //     },
                                        // }}
                                        >
                                            {m.content}
                                        </ReactMarkdown>
                                    </div>
                                </li>
                            )}
                        </div>
                    ))}
                </ul >
            </section>
        </main>
    )
}
