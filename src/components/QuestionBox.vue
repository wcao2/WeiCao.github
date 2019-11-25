<template>
    <div class="question-box-container">
        <b-jumbotron>
            <template v-slot:lead>
                <!-- currentQuestion comes from parents -->
                {{currentQuestion.question}}
            </template>

            <hr class="my-4">

            <!-- also want selected class appeared when the question not answered yet -->
            <b-list-group>
                <b-list-group-item
                    v-for="(answer,index) in answers" 
                    :key="index"
                    @click="selectAnswer(index)"
                    :class="answerClass(index)"
                >
                    {{answer}}
                </b-list-group-item>
            </b-list-group>

            <!-- v-on:click="submitAnswer" below is a shortcut -->
            <b-button 
                variant="primary"
                @click="submitAnswer"   
                :disabled="selectIndex===null || answered" 
            >
                Submit
            </b-button>
            <!-- next:2   receive the next in here from App.vue-->
            <b-button @click="next" variant="success" href="#">Next</b-button>
        </b-jumbotron>
    </div>
</template>

<script>
import _ from 'lodash';

    export default{
        props:{           
            //any variable passed from another component, wnat to show in HTML
            //need to reference in props to show receive this particular variable from parent
            currentQuestion:Object,

            //next:1 increment the value by 1 by calling next function in app.vue
            next:Function,
            increment:Function//add this func in parent
        },
        //save selected index on the component
        data(){
            return{
                selectIndex:null,
                correctIndex:null,//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!cc1 for show the correct answer when I choose the wrong answer
                shutffledAnswers:[],
                answered:false//1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            }
        },
        computed:{
            //anytime want to access a prop or data variable in another function(method or computed)
            //I need to do this.(name of the variable)
            answers(){
                //put correct or incorrect answer together
                let answers=[...this.currentQuestion.incorrect_answers]
                answers.push(this.currentQuestion.correct_answer)
                return answers
            }
        },
        //To shuffling the answer every single time,I need to use watch method here
        //like computed and methods,it takes an object of functions
        //in this object,can watch for changes to my props
        watch:{
            //when the currentQuestion change from parent, it will run this function
            currentQuestion: {
                immediate:true,
                handler(){
                    this.selectIndex=null
                    this.answered=false//2!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! set this to false for every question
                    this.shuffleAnswers()
                }
            }
        },
        methods:{  
            selectAnswer(index){
                this.selectIndex=index//1:18
            },
            submitAnswer(){
                let isCorrect=false
                if(this.selectIndex===this.correctIndex){
                    isCorrect=true
                }
                this.answered=true//2!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                this.increment(isCorrect)
            },
            shuffleAnswers(){
                let answers=[...this.currentQuestion.incorrect_answers,this.currentQuestion.correct_answer]
                this.shutffledAnswers=_.shuffle(answers)//what aray I want to shuffled
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!cc2
                this.correctIndex=this.shutffledAnswers.indexOf(this.currentQuestion.correct_answer)
            },
            answerClass(index){
                let anClass=''
                if(!this.answered&&this.selectIndex===index){
                    anClass='selected'
                }else if(this.answered && this.correctIndex===index){
                    anClass='correct'
                }else if(this.answered && this.selectIndex===index && this.correctIndex!==index){
                    anClass='incorrect'
                }

                return anClass
                // [    only can be used in template
                //     !answered && selectIndex===index ? 'selected':
                //     answered && correctIndex===index ? 'correct':
                //     answered && selectIndex===index &&  correctIndex!==index ? 'incorrect':''
                // ]
            }
        }
    }
</script>

<style scoped>
    .list-group{
        margin-bottom:15px;
    }
    .btn{
        margin:0 5px
    }
    .list-group-item:hover{
        background: #EEE;
        cursor:pointer;
    }
    .selected{
        background-color:lightblue;
    }
    .correct{
        background-color: lightgreen;
    }
    .incorrect{
        background-color:red;
    }
</style>