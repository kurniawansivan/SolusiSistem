export type ServiceId = 'web' | 'mobile' | 'ai' | 'automation'

export interface ServiceItem {
  id: ServiceId
  icon: string
}

export const services: ServiceItem[] = [
  { id: 'web', icon: 'lucide:layout-dashboard' },
  { id: 'mobile', icon: 'lucide:smartphone' },
  { id: 'ai', icon: 'lucide:bot' },
  { id: 'automation', icon: 'lucide:workflow' },
]
