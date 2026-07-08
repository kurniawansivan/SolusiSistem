export interface Commitment {
  key: string
  icon: string
}

export const commitments: Commitment[] = [
  { key: 'freeConsult', icon: 'lucide:message-circle-heart' },
  { key: 'sourceOwnership', icon: 'lucide:file-code-2' },
  { key: 'revisionGuarantee', icon: 'lucide:shield-check' },
  { key: 'responsiveSupport', icon: 'lucide:headset' },
  { key: 'transparentPricing', icon: 'lucide:receipt-text' },
  { key: 'modernStack', icon: 'lucide:cpu' },
]
