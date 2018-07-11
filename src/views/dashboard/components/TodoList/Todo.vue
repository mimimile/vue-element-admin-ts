<template>
  <li class="todo" :class="{ completed: todo.done, editing: editing }">
    <div class="view">
      <input class="toggle"
        type="checkbox"
        :checked="todo.done"
        @change="toggleTodo( todo)">
      <label v-text="todo.text" @dblclick="editing = true"></label>
      <button class="destroy" @click="deleteTodo( todo )"></button>
    </div>
    <input class="edit"
      v-show="editing"
      v-focus="editing"
      :value="todo.text"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit">
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { TodoItem, EditTodo, VueEventTarget } from '../../types'

@Component({
  directives: {
    focus(el, { value }, { context }) {
      if (value && context) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  }
})
export default class Todo extends Vue {
  @Prop(Object) todo!: TodoItem

  private editing: boolean = false

  @Emit('deleteTodo')
  deleteTodo(todo: TodoItem) {}

  @Emit('editTodo')
  editTodo({ todo, value }: EditTodo) {}

  @Emit('toggleTodo')
  toggleTodo(todo: TodoItem) {}

  private doneEdit(e: VueEventTarget) {
    const value = e.target.value.trim()
    const { todo } = this
    if (!value) {
      this.deleteTodo(todo)
    } else if (this.editing) {
      this.editTodo({ todo, value })
      this.editing = false
    }
  }

  private cancelEdit(e: VueEventTarget) {
    e.target.value = this.todo.text
    this.editing = false
  }
}
</script>
