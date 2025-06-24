export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: Date
}

export interface ChatRequest {
  sessionId: string
  action: "sendMessage"
  chatInput: {
    message: string
    product?: 'arzt-direkt' | 'tomedo' | 'impfdoc'
  }
}

export interface ChatResponse {
  output?: string
  error?: string
}

export class ChatService {
  private readonly webhookUrl = "https://n8n.scio.tools/webhook/a63dad1f-b020-468d-b357-c4898fd3704e/chat"

  async sendMessage(sessionId: string, message: string): Promise<string> {
    const request: ChatRequest = {
      sessionId,
      action: "sendMessage",
      chatInput: {
        "message": message,
        "product": "arzt-direkt"
      },
    }

    try {
      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ChatResponse = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      return data.output || "No response received"
    } catch (error) {
      console.error("Chat service error:", error)
      throw error
    }
  }

  generateSessionId(): string {
    return crypto.randomUUID()
  }

  getStoredSessionId(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem("chat-session-id")
  }

  storeSessionId(sessionId: string): void {
    if (typeof window === "undefined") return
    localStorage.setItem("chat-session-id", sessionId)
  }

  getOrCreateSessionId(): string {
    let sessionId = this.getStoredSessionId()
    if (!sessionId) {
      sessionId = this.generateSessionId()
      this.storeSessionId(sessionId)
    }
    return sessionId
  }

  getStoredMessages(): ChatMessage[] {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem("chat-messages")
    if (!stored) return []
    try {
      return JSON.parse(stored)
    } catch {
      return []
    }
  }

  storeMessages(messages: ChatMessage[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem("chat-messages", JSON.stringify(messages))
  }

  clearSession(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem("chat-session-id")
    localStorage.removeItem("chat-messages")
  }
}

export const chatService = new ChatService()