<template>
  <div id="app">
      <Header
        :numCorrect="numCorrect"
        :numTotal="numTotal"
      />
      <b-container class="bv-example-row">
          <b-row>
            <b-col sm="6" offset="3">
              <!-- if array is empty, then questions.length will be 0 which is a false value so the question box will not render -->
              <QuestionBox
                v-if="questions.length"
                :currentQuestion="questions[index]"
                :next="next"
                :increment="increment"
              />
            </b-col>
          </b-row>
      </b-container>     
  </div>
</template>

<script>
import Header from './components/Header.vue'
import QuestionBox from './components/QuestionBox.vue'

export default {
  name: 'app',
  components: {
    Header,
    QuestionBox
  },
  data(){
    //return an object
    return{
      questions:[],
      index:0,
      numCorrect:0,
      numTotal:0
    }
  },
  methods:{
      //need a method to increment my index value
      //key is next and value is a function(shorthand)
      //it will take a current value(index) and add 1 to everytime the next method called
      //then pass to questionbox above
      next(){
        this.index++
      },
      increment(isCorrect){
        if(isCorrect){
          this.numCorrect++
        }
        this.numTotal++
        //then pass these two values to Header
      }
  },
  //lifecycle method
  mounted:function(){
    fetch('https://opentdb.com/api.php?amount=10',{
      method:'get'
    }).then((response)=>{
      return response.json()
    }).then((jData)=>{
      //access the data from my app
      //pass the question from App to QuestionBox
      this.questions=jData.results;
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
