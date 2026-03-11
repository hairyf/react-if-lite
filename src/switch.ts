import type { ReactElement, ReactNode } from 'react'
import type { BooleanLike, WrapperAs, WrapperProps } from './utils'
import { Children, isValidElement } from 'react'
import { Case } from './case'
import { Default } from './default'
import { wrapper } from './utils'

export type SwitchProps<As> = WrapperProps<As> & {
  value?: BooleanLike
  children?: ReactNode
}

export function Switch<As extends WrapperAs>(props: SwitchProps<As>) {
  const { as, value, children, ...rest } = props
  const isUseValue = props.value !== undefined
  let matchingCase: ReactElement | undefined
  let defaultCase: ReactElement | undefined

  Children.forEach(children, (child) => {
    if (!isValidElement(child) || matchingCase)
      return
    if (child.type === Case) {
      // @ts-expect-error - Case component has a cond prop
      const cond = child?.props?.cond
      if (isUseValue ? value === cond : cond) {
        matchingCase = child
        return
      }
    }
    if (!defaultCase && child.type === Default)
      defaultCase = child
  })

  return wrapper(as, rest, matchingCase ?? defaultCase ?? null)
}
