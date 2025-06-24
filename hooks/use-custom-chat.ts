"use client"

import { useState, useCallback, useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { chatService, ChatMessage } from "@/lib/chat-service"

export function useCustomChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [sessionId, setSessionId] = useState<string>("")

  useEffect(() => {
    const id = chatService.getOrCreateSessionId()
    setSessionId(id)
    
    const storedMessages = chatService.getStoredMessages()
    if (storedMessages.length > 0) {
      setMessages(storedMessages)
    }
  }, [])

  useEffect(() => {
    chatService.storeMessages(messages)
  }, [messages])

  const sendMessageMutation = useMutation({
    mutationFn: async (userMessage: string) => {
      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: userMessage,
        createdAt: new Date(),
      }

      setMessages((prev) => [...prev, userMsg])

      const response = await chatService.sendMessage(sessionId, userMessage)
      
      return {
        id: crypto.randomUUID(),
        role: "assistant" as const,
        content: response,
        createdAt: new Date(),
      }
    },
    onSuccess: (assistantMessage) => {
      setMessages((prev) => [...prev, assistantMessage])
    },
    onError: (error) => {
      console.error("Failed to send message:", error)
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        createdAt: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    },
  })

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!input.trim() || sendMessageMutation.isPending) return

      const userInput = input
      setInput("")
      sendMessageMutation.mutate(userInput)
    },
    [input, sendMessageMutation]
  )

  const clearChat = useCallback(() => {
    setMessages([])
    chatService.clearSession()
    const newId = chatService.getOrCreateSessionId()
    setSessionId(newId)
  }, [])

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading: sendMessageMutation.isPending,
    error: sendMessageMutation.error,
    clearChat,
  }
}