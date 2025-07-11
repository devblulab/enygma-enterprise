import Image from "next/image"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  className?: string
}

export function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} relative logo-shimmer group cursor-pointer`}>
        <Image
          src="/images/logo.png"
          alt="Gustavo Martins Logo"
          width={80}
          height={80}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold text-brand-white leading-tight font-charis`}>
            Gustavo Martins
          </span>
          <span className="text-xs text-brand-gray font-medium tracking-wide font-sora">Transforme seu Tempo</span>
        </div>
      )}
    </div>
  )
}
