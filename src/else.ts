import type { IfProps } from './if'
import type { WrapperAs } from './utils'
import { If } from './if'
import { wrapper } from './utils'

export type ElseProps<As> = IfProps<As>

export function Else<As extends WrapperAs>(props: ElseProps<As>) {
  const { children, as, ...rest } = props
  return Object.keys(props).includes('cond')
    ? wrapper(If, props, children)
    : wrapper(as, rest, children)
}
