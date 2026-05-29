import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cross } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 cross-pattern">
      <div className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-royal-blue/10 flex items-center justify-center mx-auto mb-6">
          <Cross className="w-10 h-10 text-gold" />
        </div>
        <h1 className="font-cathedral text-4xl font-bold mb-2">404</h1>
        <h2 className="font-cathedral text-xl mb-4">Page introuvable</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link href="/">
          <Button className="cathedral">
            Retour à l&apos;accueil
          </Button>
        </Link>
      </div>
    </div>
  )
}
