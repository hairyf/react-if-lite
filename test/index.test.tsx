/**
 * @vitest-environment happy-dom
 */
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { Case, Default, Else, If, Switch, Then, Unless } from '../src'
import '@testing-library/jest-dom/vitest'

afterEach(cleanup)

it('if renders then when cond is true', () => {
  render(
    <If cond>
      <Then>visible</Then>
      <Else>hidden</Else>
    </If>,
  )
  expect(screen.getByText('visible')).toBeInTheDocument()
})

it('if renders else when cond is false', () => {
  render(
    <If cond={false}>
      <Then>hidden</Then>
      <Else>visible</Else>
    </If>,
  )
  expect(screen.getByText('visible')).toBeInTheDocument()
})

it('if with then/else props renders then when cond is true', () => {
  render(<If cond then="yes" else="no" />)
  expect(screen.getByText('yes')).toBeInTheDocument()
})

it('if with then/else props renders else when cond is false', () => {
  render(<If cond={false} then="yes" else="no" />)
  expect(screen.getByText('no')).toBeInTheDocument()
})

it('unless renders else when cond is true', () => {
  render(
    <Unless cond>
      <Then>hidden</Then>
      <Else>visible</Else>
    </Unless>,
  )
  expect(screen.getByText('visible')).toBeInTheDocument()
})

it('unless renders then when cond is false', () => {
  render(
    <Unless cond={false}>
      <Then>visible</Then>
      <Else>hidden</Else>
    </Unless>,
  )
  expect(screen.getByText('visible')).toBeInTheDocument()
})

it('switch renders matching Case by value', () => {
  render(
    <Switch value="b">
      <Case cond="a">A</Case>
      <Case cond="b">B</Case>
      <Case cond="c">C</Case>
      <Default>default</Default>
    </Switch>,
  )
  expect(screen.getByText('B')).toBeInTheDocument()
})

it('switch renders Default when no Case matches', () => {
  render(
    <Switch value="z">
      <Case cond="a">A</Case>
      <Case cond="b">B</Case>
      <Default>default</Default>
    </Switch>,
  )
  expect(screen.getByText('default')).toBeInTheDocument()
})

it('switch with boolean conditions renders first matching Case', () => {
  render(
    <Switch>
      <Case cond={false}>first</Case>
      <Case cond>second</Case>
      <Case cond>third</Case>
      <Default>default</Default>
    </Switch>,
  )
  expect(screen.getByText('second')).toBeInTheDocument()
})

it('if with as wrapper renders wrapper element', () => {
  const { container } = render(
    <If cond as="div">
      <span>wrapped</span>
    </If>,
  )
  const div = container.querySelector<HTMLDivElement>('div')
  expect(div).toBeInTheDocument()
  expect(div).toHaveTextContent('wrapped')
})

it('unless with then/else props (no Then/Else children) renders then when cond is false', () => {
  render(<Unless cond={false} then="show" else="hide" />)
  expect(screen.getByText('show')).toBeInTheDocument()
})

it('unless with then/else props renders else when cond is true', () => {
  render(<Unless cond then="hide" else="show" />)
  expect(screen.getByText('show')).toBeInTheDocument()
})

it('then with cond prop delegates to If', () => {
  render(
    <Then cond={false}>
      <Else>delegated</Else>
    </Then>,
  )
  expect(screen.getByText('delegated')).toBeInTheDocument()
})

it('else with cond prop delegates to If', () => {
  render(
    <Else cond>
      <Then>delegated-else</Then>
    </Else>,
  )
  expect(screen.getByText('delegated-else')).toBeInTheDocument()
})

it('switch with no matching Case and no Default renders nothing', () => {
  render(
    <Switch value="x">
      <Case cond="a">A</Case>
      <Case cond="b">B</Case>
    </Switch>,
  )
  expect(screen.queryByText('A')).not.toBeInTheDocument()
  expect(screen.queryByText('B')).not.toBeInTheDocument()
})

it('switch with value undefined uses condition truthiness', () => {
  render(
    <Switch>
      <Case cond={false}>no</Case>
      <Case cond>yes</Case>
    </Switch>,
  )
  expect(screen.getByText('yes')).toBeInTheDocument()
})
