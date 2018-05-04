<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit {{ smoothie.title }} Smoothie</h2>
    <form @submit.prevent="editSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="smoothie.title">
      </div>
      <div v-for="(ingredient, index) in smoothie.ingredients" :key="index" class="field">
        <label for="ingredient">Ingredients:</label>
        <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
        <i class="material-icons delete" @click="deleteIngredient(ingredient)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient</label>
        <input type="text" name="ingredient" @keydown.tab.prevent="addIngredient" v-model="newIngredient">
      </div>
      <div class="field center-align">
        <p class="red-text" v-if="feedback">{{ feedback }}</p>
        <button class="btn pink">Update Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
  import db from '@/firebase/init'

  export default {
    name: 'EditSmoothie',
    data(){
      return {
        smoothie: null,
        newIngredient: null,
        feedback: null
      }
    },
    methods: {
      editSmoothie(){
        console.log(this.smoothie.title, this.smoothie.ingredients);
      },

      addIngredient(){
        if(this.newIngredient){ // If not null
          this.smoothie.ingredients.push(this.newIngredient);
          this.newIngredient = null; // reset textfield
          this.feedback = null;
        } else {
          this.feedback = 'You must enter a value to add an ingredient'
        }
      },
      deleteIngredient(ing){
        this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
          return ingredient !== ing
        });
      }
    },
    created(){
      let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug);
      ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          this.smoothie = doc.data();
          this.smoothie.id = doc.id;
        });
      });
    }
  }
</script>

<style>
  .edit-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
  }

  .edit-smoothie h2 {
    font-size: 2em;
    margin: 20px auto;
  }

  .edit-smoothie .field {
    margin: 20px auto;
    position: relative;
  }

  .edit-smoothie .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
  }

</style>
