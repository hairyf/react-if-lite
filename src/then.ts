import type { IfProps } from './if'
import type { WrapperAs } from './utils'
import { If } from './if'
import { wrapper } from './utils'

export type ThenProps<As> = IfProps<As>

export function Then<As extends WrapperAs>(props: ThenProps<As>) {
  const { children, as, ...rest } = props
  return Object.keys(props).includes('cond')
    ? wrapper(If, props, children)
    : wrapper(as, rest, children)
}
