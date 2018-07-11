<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <input class="new-todo" autocomplete="off" placeholder="Todo List" @keyup.enter="addTodo">
    </header>
    <!-- main section -->
    <section class="main">
      <input class="toggle-all" id="toggle-all" type="checkbox" :checked="allChecked" @change="toggleAll({ done: !allChecked })">
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <todo @toggleTodo='toggleTodo' @editTodo='editTodo' @deleteTodo='deleteTodo' v-for="(todo, index) in filteredTodos" :key="index"
          :todo="todo"></todo>
      </ul>
    </section>
    <!-- footer -->
    <footer class="footer" v-show="todos.length">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('item') }} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{ key | capitalize }}</a>
        </li>
      </ul>
    </footer>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Todo from './Todo.vue'
import { TodoListType, TodoItem, VueEventTarget, EditTodo, ToggleAll } from '../../types'

const STORAGE_KEY = 'todos'
const filters = {
  all: (todos: TodoItem[]) => todos,
  active: (todos: TodoItem[]) => todos.filter((todo: TodoItem) => !todo.done),
  completed: (todos: TodoItem[]) => todos.filter((todo: TodoItem) => todo.done),
}
const defaultList: TodoItem[] = [
  { text: 'star this repository', done: false },
  { text: 'fork this repository', done: false },
  { text: 'follow author', done: false },
  { text: 'vue-element-admin', done: true },
  { text: 'vue', done: true },
  { text: 'element-ui', done: true },
  { text: 'axios', done: true },
  { text: 'webpack', done: true }
]

@Component({
  components: {
    Todo,
  },
  filters: {
    pluralize: (n: any, w: any) => n === 1 ? w : w + 's',
    capitalize: (s: any) => s.charAt(0).toUpperCase() + s.slice(1)
  },
})
export default class TodoList extends Vue {
  private visibility: TodoListType = 'all'
  private filters: any = filters
  private todos: any = defaultList

  get allChecked(): boolean {
    return this.todos.every((todo: TodoItem) => todo.done)
  }
  get filteredTodos(): TodoItem[] {
    return filters[this.visibility](this.todos)
  }
  get remaining(): number {
    return this.todos.filter((todo: TodoItem) => !todo.done).length
  }

  private setLocalStorage(): void {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
  }
  private addTodo(e: VueEventTarget): void {
    const text = e.target.value
    if (text.trim()) {
      this.todos.push({
        text,
        done: false
      })
    }
    e.target.value = ''
  }
  private toggleTodo(val: TodoItem): void {
    val.done = !val.done
    this.setLocalStorage()
  }
  private deleteTodo(todo: TodoItem): void {
    this.todos.splice(this.todos.indexOf(todo), 1)
    this.setLocalStorage()
  }
  private editTodo({ todo, value }: EditTodo): void {
    todo.text = value
    this.setLocalStorage()
  }
  private clearCompleted(): void {
    this.todos = this.todos.filter((todo: TodoItem) => !todo.done)
    this.setLocalStorage()
  }
  private toggleAll({ done }: ToggleAll): void {
    this.todos.forEach((todo: TodoItem) => {
      todo.done = done
      this.setLocalStorage()
    })
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
