<template>
    <div class="page">
    <header><h1>Vue Fire todo1</h1></header>
    <main>
      <div class="todos">
        <transition name="fade">
          <div class="write add" v-if="writeState === 'add'" key="add"> <!--등록-->
            <input
              ref="writeArea" 
              v-model="addItemText" 
              type="text" 
              @keyup.enter="addItem"/>
            <button class="btn add" @click="addItem">Add</button>
          </div>
          <div class="write edit" v-else key="edit"> <!--수정-->
            <input
              ref="writeArea" 
              v-model="editItemText" 
              type="text" 
              @keyup.enter="editSave"/>
            <button class="btn add" @click="editSave">Save</button>
          </div>
        </transition>
        <ul class="list" ref="list">
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
import {db} from '../firebase/db.js';
console.log(db)
export default {
    data() {
        return {
          addItemText: '',
          editItemText: '',
          crrEditItem: '',
          writeState: 'add',
          todos:[]
        }
        
    },
    methods: {
      addItem() {
        if(this.addItemText === '') return;
        db.collection('todos').add({
          text: this.addItemText, 
          state: 'yet'
        }).then(sn => {
          db.collection('todos').doc(sn.id).update({
            id: sn.id
          })
        });
        // this.todos.push({
        //   text: this.addItemText,
        //   state: 'yet'
        // });
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
        this.$refs.list.children[index].className = 'editing';
      },
      editSave() {
        // this.todos[this.crrEditItem].text = this.editItemText;
        db.collection('todos')
          .doc(this.todos[this.crrEditItem].id)
            .update({
              text: this.editItemText
            })
        this.editItemText='';
        this.writeState = 'add';
        this.$refs.list.children[this.crrEditItem].className = '';
      },
      delItem(i) {
        // this.todos.splice(i,1);
        // this.writeState = 'add';
        db.collection('todos').doc(this.todos[i].id).delete()
      }
    },
    mounted() {
      this.$refs.writeArea.focus();
        db.collection('todos').get().then((result) => {
            result.forEach((doc)=>{
            console.log(doc.data())
            this.todos.push(doc.data());
          })
        });
    },
    firestore: {
      todos: db.collection('todos')
    }
}
</script>

<style>

</style>