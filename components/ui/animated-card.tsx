'use client'

import { motion } from 'motion/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, ArrowRight } from 'lucide-react'

interface AnimatedCardProps {
  title: string
  value: string | number
  badge?: string
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline'
  trend?: number
  delay?: number
  onClick?: () => void
}

export function AnimatedCard({
  title,
  value,
  badge,
  badgeVariant = 'secondary',
  trend,
  delay = 0,
  onClick,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      onClick={onClick}
      className={onClick ? 'cursor-pointer' : ''}
    >
      <Card className="h-full">
        <CardHeader className="flex flex-row items-start justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold">{value}</span>
            {trend !== undefined && (
              <span
                className={`flex items-center gap-1 text-xs ${
                  trend >= 0 ? 'text-green-600' : 'text-destructive'
                }`}
              >
                <TrendingUp className="h-3 w-3" />
                {trend >= 0 ? '+' : ''}
                {trend}%
              </span>
            )}
          </div>
          {onClick && (
            <motion.div
              className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1, x: 2 }}
            >
              查看詳情 <ArrowRight className="h-3 w-3" />
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Stagger container — wraps multiple AnimatedCards
export function AnimatedCardGrid({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {children}
    </motion.div>
  )
}
