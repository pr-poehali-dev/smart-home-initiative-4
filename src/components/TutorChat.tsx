import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Icon from "@/components/ui/icon"

type Message = {
  id: number
  role: "user" | "assistant"
  text: string
}

const SUGGESTIONS = [
  "Объясни теорему Пифагора",
  "Помоги с сочинением",
  "Что такое фотосинтез?",
  "Как решать уравнения?",
]

type Props = {
  open: boolean
  onClose: () => void
}

export function TutorChat({ open, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: "Привет! Я твой AI-репетитор 👋 Задай любой вопрос по любому предмету — математике, физике, истории, языкам. Я помогу разобраться!",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    const userMsg: Message = { id: Date.now(), role: "user", text }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    await new Promise((r) => setTimeout(r, 1200))

    const replies: Record<string, string> = {
      пифагор: "Теорема Пифагора: в прямоугольном треугольнике квадрат гипотенузы равен сумме квадратов катетов. a² + b² = c². Например, если катеты 3 и 4, то гипотенуза = √(9+16) = 5.",
      уравнени: "Чтобы решить уравнение, нужно изолировать неизвестную переменную. Например: 2x + 4 = 10 → 2x = 6 → x = 3. Хочешь разобрать конкретный пример?",
      фотосинтез: "Фотосинтез — это процесс, при котором растения превращают свет, воду и CO₂ в глюкозу и кислород. Формула: 6CO₂ + 6H₂O + свет → C₆H₁₂O₆ + 6O₂.",
      сочинени: "С удовольствием помогу с сочинением! Расскажи тему — я помогу составить план, подобрать аргументы и написать вступление.",
    }

    const key = Object.keys(replies).find((k) => text.toLowerCase().includes(k))
    const replyText = key
      ? replies[key]
      : "Отличный вопрос! Я уже думаю над ответом... Пока это демо-версия, но скоро здесь будет полноценный AI. Хочешь узнать о тарифах?"

    setMessages((prev) => [...prev, { id: Date.now() + 1, role: "assistant", text: replyText }])
    setLoading(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div
        className={cn(
          "relative z-10 flex flex-col w-full max-w-lg h-[600px] max-h-[90vh]",
          "rounded-2xl border-2 border-white/20 bg-black/80 backdrop-blur-xl shadow-2xl",
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
            <Icon name="GraduationCap" size={18} className="text-white" />
          </div>
          <div>
            <p className="text-white font-semibold font-open-sans-custom text-sm">EduMind AI</p>
            <p className="text-gray-400 text-xs font-open-sans-custom">Репетитор онлайн</p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-white transition-colors"
          >
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 hide-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm font-open-sans-custom leading-relaxed",
                  msg.role === "user"
                    ? "bg-white text-black rounded-br-sm"
                    : "bg-white/10 text-white rounded-bl-sm border border-white/10",
                )}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/10 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs font-open-sans-custom text-gray-300 border border-white/20 rounded-full px-3 py-1 hover:bg-white/10 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-4 py-3 border-t border-white/10 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Задай любой вопрос..."
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 font-open-sans-custom"
          />
          <Button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            size="icon"
            className="bg-white text-black hover:bg-gray-100 shrink-0"
          >
            <Icon name="Send" size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
