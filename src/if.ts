import type { ReactElement, ReactNode } from 'react'
import type { BooleanLike, WrapperAs, WrapperProps } from './utils'
import { Children } from 'react'
import { Else } from './else'
import { Then } from './then'
import { wrapper } from './utils'

export type IfProps<As> = WrapperProps<As> & {
  cond?: BooleanLike
  then?: ReactNode
  else?: ReactNode
  children?: ReactNode
}

export function If<As extends WrapperAs>(props: IfProps<As>) {
  const { then, cond, else: _else, children = props.then, as, ...rest } = props
  const elements = Children.toArray(children) as ReactElement[]
  const thenChild = elements.find(c => c.type === Then)
  const elseChild = elements.find(c => c.type === Else)
  const child = (thenChild || elseChild)
    ? cond ? thenChild : elseChild
    : cond ? children : _else
  return wrapper(as, rest, child)
}
