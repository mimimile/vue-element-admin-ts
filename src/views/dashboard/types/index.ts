export interface ToggleAll {
  done: boolean
}

export interface EditTodo {
  todo: TodoItem,
  value: string,
}

export interface Target {
  value: string,
}

export interface VueEventTarget extends EventTarget {
  target: Target
}

export type TodoListType = 'all' | 'active' | 'completed'

export interface TodoItem {
  text: string
  done: boolean
}

export interface CountData {
  name: string
  title: string
  iconName: string
  startVal: number
  endVal: number
  duration: number
}

export type LineChartName = 'newVisitis' | 'messages' | 'purchases' | 'shoppings'
