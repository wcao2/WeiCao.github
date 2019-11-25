<template>
    <div>
        <b-nav tabs>
            <b-nav-item disabled><b>Wei's Fancy Quiz App</b></b-nav-item>
            <b-nav-item disabled>Counter:{{numCorrect}}/{{numTotal}}</b-nav-item>
        </b-nav>
    </div>
</template>

<script>
export default {
    //receive props from parents 
    props:[
        'numCorrect',
        'numTotal'
    ]
}
</script>