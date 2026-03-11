import type { JSX } from 'react'
import { createElement } from 'react'

export type BooleanLike = any

export type WrapperAs = keyof JSX.IntrinsicElements | React.FC

export type WrapperProps<As extends keyof JSX.IntrinsicElements | React.FC | unknown>
  = { as?: As }
    & (As extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[As] : unknown)
    & (As extends React.FC<infer P> ? P : unknown)

export function wrapper(asChild: any, props: any, children?: React.ReactNode) {
  return asChild ? createElement(asChild, props, children) : children
}
