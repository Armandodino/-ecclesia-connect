import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "secondary" | "outline" | "gold" | "success" | "destructive"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-primary text-primary-foreground shadow-sm",
    secondary: "bg-secondary/10 text-foreground",
    outline: "border border-border text-foreground",
    gold: "bg-gold/20 text-gold-dark border border-gold/30",
    success: "bg-emerald/10 text-emerald border border-emerald/20",
    destructive: "bg-destructive/10 text-destructive border border-destructive/20",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge }
