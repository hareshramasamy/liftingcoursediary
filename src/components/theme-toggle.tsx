"use client"

import { SunIcon, MoonIcon, MonitorIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Select value={theme} onValueChange={(v) => setTheme(v as "light" | "dark" | "system")}>
      <SelectTrigger className="w-auto" aria-label="Select theme">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="light">
          <SunIcon className="size-4" />
          Light
        </SelectItem>
        <SelectItem value="dark">
          <MoonIcon className="size-4" />
          Dark
        </SelectItem>
        <SelectItem value="system">
          <MonitorIcon className="size-4" />
          System
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
