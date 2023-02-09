<template>
    <div class="page">
    <header><h1>Vue Fire todo1</h1></header>
    <main>
      <div class="todos">
        <div class="write" v-if="writeState === 'add'"> <!--등록-->
          <input
            ref="writeArea" 
            v-model="addItemText" 
            type="text" 
            @keyup.enter="addItem"/>
          <button class="btn add" @click="addItem">Add</button>
        </div>
        <div class="write" v-else> <!--수정-->
          <input
            ref="writeArea" 
            v-model="editItemText" 
            type="text" 
            @keyup.enter="editSave"/>
          <button class="btn add" @click="editSave">Save</button>
        </div>
        <ul class="list">
          <li v-for="(list, i) in todos" :key="i">
            <i 
              @click="checkItem(i)"
              :class="[list.state === 'yet' ? 'far' : 'fas', 'fa-check-square']">
            </i>
            <span>
              {{ list.text }}
              <b>
                <a href="" @click.prevent="editShow(i)">Edit</a>
                <a href="" @click.prevent="delItem(i)">Del</a>
              </b>
            </span>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
export default {
    data() {
        return {
          addItemText: '',
          editItemText: '',
          crrEditItem: '',
          writeState: 'add',
          todos:[
          {text: '공부하기', state: 'yet'},
          {text: '운동하기', state: 'done'},
          {text: '글쓰기', state: 'done'},
          ]
        }
        
    },
    methods: {
      addItem() {
        if(this.addItemText === '') return;
        this.todos.push({
          text: this.addItemText,
          state: 'yet'
        });
        this.addItemText='';
      },
      checkItem(i) {
        if(this.todos[i].state === 'yet') {
          this.todos[i].state = 'done'
        } else {
          this.todos[i].state = 'yet'
        }
      },
      editShow(index) {
        this.crrEditItem = index;
        this.writeState = 'edit';
        this.editItemText = this.todos[index].text
      },
      editSave() {
        this.todos[this.crrEditItem].text = this.editItemText;
        this.editItemText='';
        this.writeState = 'add';
      },
      delItem(i) {
        this.todos.splice(i,1)
      }
    },
    mounted() {
      this.$refs.writeArea.focus();
    }
}
</script>

<style>

</style>