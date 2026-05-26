import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import Icon from "@/components/ui/icon"

type Props = {
  open: boolean
  onClose: () => void
}

export function PaymentModal({ open, onClose }: Props) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !name.trim()) return
    setSubmitted(true)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div
        className={cn(
          "relative z-10 w-full max-w-md",
          "rounded-2xl border-2 border-white/20 bg-black/80 backdrop-blur-xl shadow-2xl",
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
            <Icon name="Sparkles" size={18} className="text-white" />
          </div>
          <div>
            <p className="text-white font-semibold font-open-sans-custom text-sm">Тариф «Оптимальный»</p>
            <p className="text-gray-400 text-xs font-open-sans-custom">990 ₽ / месяц</p>
          </div>
          <button onClick={onClose} className="ml-auto text-gray-400 hover:text-white transition-colors">
            <Icon name="X" size={18} />
          </button>
        </div>

        <div className="px-6 py-6">
          {!submitted ? (
            <>
              {/* Features recap */}
              <ul className="mb-6 space-y-2">
                {[
                  "Неограниченные вопросы по всем предметам",
                  "Приоритетные ответы без задержек",
                  "История занятий и прогресс",
                  "Проверка домашних заданий и эссе",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-300 text-xs font-open-sans-custom">
                    <Icon name="Check" size={14} className="text-white flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-white text-sm font-open-sans-custom">Ваше имя</Label>
                  <Input
                    type="text"
                    placeholder="Иван Иванов"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 font-open-sans-custom"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-white text-sm font-open-sans-custom">Email</Label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 font-open-sans-custom"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-gray-100 font-open-sans-custom font-semibold"
                >
                  Оформить подписку за 990 ₽
                </Button>

                <p className="text-center text-xs text-gray-500 font-open-sans-custom">
                  Нажимая кнопку, вы соглашаетесь с условиями использования
                </p>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                <Icon name="CheckCircle" size={36} className="text-white" />
              </div>
              <h3 className="text-white text-xl font-semibold font-open-sans-custom">Заявка принята!</h3>
              <p className="text-gray-300 text-sm font-open-sans-custom leading-relaxed">
                Мы отправим инструкции на <span className="text-white font-medium">{email}</span>.<br />
                Скоро вы сможете начать учиться!
              </p>
              <Button
                onClick={onClose}
                className="mt-2 bg-white text-black hover:bg-gray-100 font-open-sans-custom"
              >
                Отлично!
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
