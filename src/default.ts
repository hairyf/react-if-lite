import type { ReactNode } from 'react'
import type { WrapperAs, WrapperProps } from './utils'
import { wrapper } from './utils'

export type DefaultProps<As> = WrapperProps<As> & {
  children?: ReactNode
}
export function Default<As extends WrapperAs>(props: DefaultProps<As>) {
  const { children, as, ...rest } = props
  return wrapper(as, rest, children)
}
