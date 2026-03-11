import type { ReactNode } from 'react'
import type { BooleanLike, WrapperAs, WrapperProps } from './utils'
import { wrapper } from './utils'

export type CaseProps<As> = WrapperProps<As> & {
  cond?: BooleanLike
  children?: ReactNode
}

export function Case<As extends WrapperAs>(props: CaseProps<As>) {
  const { cond, children, as, ...rest } = props
  return wrapper(as, rest, children)
}
