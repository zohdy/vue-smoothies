<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div v-for="(ingredient, index) in ingredients" :key="index" class="field">
        <label for="ingredient">Ingredients:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]">
        <i class="material-icons delete" @click="deleteIngredient(ingredient)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient</label>
        <input type="text" name="ingredient" @keydown.tab.prevent="addIngredient" v-model="newIngredient">
      </div>
      <div class="field center-align">
        <p class="red-text" v-if="feedback">{{ feedback }}</p>
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
  import db from '@/firebase/init'
  import slugify from 'slugify'

  export default {
    name: 'AddSmoothie',
    data(){
      return {
        title: null,
        newIngredient: null,
        ingredients: [],
        feedback: null,
        slug: null
      }
    },
    methods: {
      addSmoothie(){
        if(this.title){
          this.feedback = null;
          // create a slug
          this.slug = slugify(this.title, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          });

          db.collection('smoothies').add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
          }).then(() => {
            this.$router.push({ name: 'Index'})
          }).catch(err => {
            console.log(err);
          });
        } else {
          this.feedback = 'You must enter a smoothie title'
        }
      },
      addIngredient(){
        if(this.newIngredient){ // If not null
          this.ingredients.push(this.newIngredient);
          this.newIngredient = null; // reset textfield
          this.feedback = null;
        } else {
          this.feedback = 'You must enter a value to add an ingredient'
        }
      },
      deleteIngredient(ing){
        this.ingredients = this.ingredients.filter(ingredient => {
          return ingredient !== ing
        });
      }
    }
  }
</script>

<style>
  .add-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
  }

  .add-smoothie h2 {
    font-size: 2em;
    margin: 20px auto;
  }

  .add-smoothie .field {
    margin: 20px auto;
    position: relative;
  }

  .add-smoothie .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
  }

</style>
