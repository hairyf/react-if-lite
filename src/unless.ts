import type { ReactElement, ReactNode } from 'react'
import type { BooleanLike, WrapperAs, WrapperProps } from './utils'

import { Children } from 'react'
import { Else } from './else'
import { Then } from './then'
import { wrapper } from './utils'

export type UnlessProps<As> = WrapperProps<As> & {
  cond?: BooleanLike
  then?: ReactNode
  else?: ReactNode
  children?: ReactNode
}

export function Unless<As extends WrapperAs>(props: UnlessProps<As>) {
  const { cond, then, else: _else, as, children = props.then, ...rest } = props
  const elements = Children.toArray(children) as ReactElement[]
  const thenChild = elements.find(c => c.type === Then)
  const elseChild = elements.find(c => c.type === Else)
  const child = (thenChild || elseChild)
    ? !cond ? elseChild : thenChild
    : !cond ? children : _else
  return wrapper(as, rest, child)
}
