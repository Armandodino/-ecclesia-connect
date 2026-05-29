"use client"

import { ErrorBoundary } from "@/components/ui/error-boundary"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="font-cathedral text-2xl font-bold mb-4">
            Oups! Une erreur
          </h2>
          <p className="text-muted-foreground mb-4">
            {error.message || "Une erreur inattendue s'est produite."}
          </p>
          <button
            onClick={reset}
            className="px-4 py-2 bg-royal-blue text-white rounded-lg hover:bg-royal-blue-light transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    </ErrorBoundary>
  )
}
