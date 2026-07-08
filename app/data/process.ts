export interface ProcessStep {
  key: string
  icon: string
}

export const processSteps: ProcessStep[] = [
  { key: 'consult', icon: 'lucide:message-square' },
  { key: 'design', icon: 'lucide:pen-tool' },
  { key: 'develop', icon: 'lucide:code-2' },
  { key: 'launch', icon: 'lucide:rocket' },
  { key: 'support', icon: 'lucide:life-buoy' },
]
