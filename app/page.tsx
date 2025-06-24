"use client"

import type React from "react"

import { useCustomChat } from "@/hooks/use-custom-chat"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Bot, User, Loader2, Sparkles, Zap, ArrowUp } from "lucide-react"

export default function ZollsoftChatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useCustomChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    setIsTyping(isLoading)
  }, [isLoading])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return
    handleSubmit(e)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-950 animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Zollsoft AI Assistant
                </h1>
                <p className="text-sm text-blue-300/80 font-medium">
                  Powered by advanced AI • tomedo • impfdoc • arzt-direkt
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-white/70 font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-8">
        <Card className="h-[calc(100vh-220px)] bg-black/20 border-white/10 backdrop-blur-xl shadow-2xl">
          {/* Messages Area */}
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {messages.length === 0 && (
                <div className="text-center py-16">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-3xl blur opacity-50"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-3xl flex items-center justify-center mx-auto">
                      <Bot className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
                    Welcome to Zollsoft AI
                  </h3>
                  <p className="text-blue-200/80 text-lg mb-12 max-w-md mx-auto leading-relaxed">
                    Your intelligent assistant for healthcare software solutions. Ask me anything about our products.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                    {[
                      { name: "tomedo", desc: "Practice Management", icon: "🏥" },
                      { name: "impfdoc", desc: "Vaccination Documentation", icon: "💉" },
                      { name: "arzt-direkt", desc: "Doctor Communication", icon: "💬" },
                    ].map((product, index) => (
                      <div key={product.name} className="group cursor-pointer">
                        <div className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                          <div className="text-2xl mb-3">{product.icon}</div>
                          <h4 className="font-bold text-white mb-2 text-lg">{product.name}</h4>
                          <p className="text-sm text-blue-200/70">{product.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-4 duration-500`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {message.role === "assistant" && (
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                      <div className="relative w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}

                  <div
                    className={`max-w-[75%] rounded-3xl px-6 py-4 shadow-lg transition-all duration-300 hover:shadow-xl ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-blue-500/25"
                        : "bg-white/10 text-white border border-white/20 backdrop-blur-sm"
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed font-medium">{message.content}</div>
                  </div>

                  {message.role === "user" && (
                    <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-4 justify-start animate-in slide-in-from-bottom-4 duration-300">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl blur opacity-50"></div>
                    <div className="relative w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-3xl px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span className="text-sm text-white/80 font-medium">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 p-6 bg-black/20 backdrop-blur-sm">
              <form onSubmit={onSubmit} className="flex gap-4">
                <div className="flex-1 relative">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    placeholder="Ask about tomedo, impfdoc, arzt-direkt..."
                    className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl px-6 py-4 text-base font-medium backdrop-blur-sm transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:bg-white/15 ${
                      inputFocused ? "shadow-lg shadow-blue-500/10" : ""
                    }`}
                    disabled={isLoading}
                  />
                  {input && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <Zap className="w-4 h-4 text-blue-400" />
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="relative group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative flex items-center gap-2">
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowUp className="w-5 h-5" />}
                  </div>
                </Button>
              </form>
              <div className="flex items-center justify-center mt-4 gap-2">
                <div className="w-1 h-1 bg-white/30 rounded-full"></div>
                <p className="text-xs text-white/50 font-medium">Powered by Zollsoft AI • Secure & Private</p>
                <div className="w-1 h-1 bg-white/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
