//data
var data = {
    poetry: Poetry, 
    sentenceArray: '',
    current: 0,
    history:[],
    questionArray:[],
    chosenIndex:0,
    order:[],
    currentLevel:0,
    timerid:null
}
//control
var startButton = document.querySelector('.startButton'),
    startPage = document.querySelector('.startPage'),
    gamePage = document.querySelector('.gamePage'),
    gamePool = document.querySelector('.gamePool'),
    question = document.querySelector('.question'),
    result = document.querySelector('.result'),
    resetButton = document.querySelector('.reset'),
    homeButton = document.querySelector('.home'),
    lang = document.querySelector('.lang'),
    nextQ = document.querySelector('.nextQ'),
    time = document.querySelector('.time'),
    next = document.querySelector('.next'),
    ulChildren = gamePool.children;

//start game
startButton.addEventListener('click',startHander)

//随机算法
function shuffle(arr) { 
var i = arr.length, t, j; 
    while (i) { 
    j = Math.floor(Math.random() * i--); 
    t = arr[i]; 
    arr[i] = arr[j]; 
    arr[j] = t; 
    } 
}

//startButton handler
function startHander(){
    hide(startPage);
    show(gamePage);
    start()
}

function hide (el){
    el.style.display = 'none';
}
function show(el){
    el.style.display = 'block'
}

//make a question
//
function makeQ(){

//大于第二关，用新的方法选句子
    //
    if((data.current!==0)&&((data.current)%3 === 0)&&data.current<9){
        data.currentLevel>2?chooseSen3():chooseSen2()
        question.innerHTML = '<div>第'+(data.current+1)+'题 "' + data.questionArray[3] + '"的作者是：</div>';
    }else if((data.current!==0)&&((data.current)%2 === 0)){
        chooseSen4()
        question.innerHTML = '<div>第'+(data.current+1)+'题 "'+ data.questionArray[3] + '"的上一句是：</div>';
    }else if(data.current===9){
        chooseSen5()
        question.innerHTML = '<div>第'+(data.current+1)+'题 "'+ data.questionArray[3] + '"出自：</div>';
    }else{
        data.currentLevel>2?chooseSen3():chooseSen()
        question.innerHTML = '<div>第'+(data.current+1)+'题 "'+ data.questionArray[3] + '"的下一句是：</div>';
    }
                
    ulChildren[0].innerHTML = data.questionArray[0]
    ulChildren[1].innerHTML = data.questionArray[1]
    ulChildren[2].innerHTML = data.questionArray[2]
    
    time.textContent =  10
    alltime = 10
    data.timerid = setInterval(function(){
        if(alltime>=0){
            time.textContent =  alltime--
        }else{
            showfResult()
        }
    },1000) 
         
}

//start 
function start(){
    for(var i=0;i<data.poetry[data.currentLevel].length;i++){
        data.order[i]=i
    }
    shuffle(data.order)
    makeQ()
}

//
function chooseSen(){
    //xuanti
    data.sentenceArray = data.poetry[data.currentLevel][(data.order[data.current])].content.split('，')
    var a=[0,2]

    data.chosenIndex = a[parseInt(Math.random(0,1)*2)]
    var wrong1Index = data.chosenIndex===0?3:1
    var wrong2Index = data.current===0?data.order[data.current+1]:data.order[data.current-1]

    var wrong1 = data.sentenceArray[wrong1Index]
    var wrong2 = data.poetry[data.currentLevel][wrong2Index].content.split('，')[parseInt(Math.random(0,1)*4)]
    
    var arr = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]]
    var shunxu = arr[(Math.floor(Math.random(0,1)*3))]
    data.questionArray[shunxu[0]] = wrong1
    data.questionArray[shunxu[1]] = wrong2
    data.questionArray[shunxu[2]] = data.sentenceArray[(data.chosenIndex + 1)]
    data.questionArray[3] = data.sentenceArray[data.chosenIndex]
}
//选author
function chooseSen2(){
    var arr = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]]
    var shunxu = arr[(Math.floor(Math.random(0,1)*3))]
    //？data。current是第几题
    data.questionArray[3] = data.poetry[data.currentLevel][data.order[data.current]].title
    data.questionArray[shunxu[0]] = data.poetry[data.currentLevel][(data.order[data.current+ 1])].author
    data.questionArray[shunxu[1]] = data.poetry[data.currentLevel][(data.order[data.current- 1])].author
    data.questionArray[shunxu[2]] = data.poetry[data.currentLevel][data.order[data.current]].author
}

//律诗
function chooseSen3(){
    //正则    
    data.sentenceArray = data.poetry[data.currentLevel][(data.order[data.current])].content.split('，')
    var a = [0,2,4,6]
    data.chosenIndex = a[parseInt(Math.random(0,1)*4)]
    var wrong1Index = data.chosenIndex - 1;
    //选一首不同的诗
    var b = data.order.filter(function(item){
        return item!==data.chosenIndex
    })
    
    var wrong2Index = b[Math.floor(Math.random(0,1)*9)]
    //
    var wrong1 = data.sentenceArray[wrong1Index]
    //正则
    var wrong2 = data.poetry[data.currentLevel][wrong2Index].content.split('，')[parseInt(Math.random(0,1)*8)]

    //right answer
    var rightA = data.sentenceArray[(data.chosenIndex + 1)]
    
    var arr = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]]
    var shunxu = arr[(Math.floor(Math.random(0,1)*3))]
    data.questionArray[shunxu[0]] = wrong1
    data.questionArray[shunxu[1]] = wrong2
    data.questionArray[shunxu[2]] = rightA
    data.questionArray[3] = data.sentenceArray[data.chosenIndex]
}

//上一句
function chooseSen4(){
    data.sentenceArray = data.poetry[data.currentLevel][(data.order[data.current])].content.split('，')
    var a=[1,3]

    data.chosenIndex = a[parseInt(Math.random(0,1)*2)]
    var wrong1Index = data.chosenIndex===1?2:0
    var wrong2Index = data.current===0?data.order[data.current+1]:data.order[data.current-1]

    var wrong1 = data.sentenceArray[wrong1Index]
    var wrong2 = data.poetry[data.currentLevel][wrong2Index].content.split('，')[parseInt(Math.random(0,1)*4)]
    
    var arr = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]]
    var shunxu = arr[(Math.floor(Math.random(0,1)*3))]
    data.questionArray[shunxu[0]] = wrong1
    data.questionArray[shunxu[1]] = wrong2
    data.questionArray[shunxu[2]] = data.sentenceArray[(data.chosenIndex - 1)]
    data.questionArray[3] = data.sentenceArray[data.chosenIndex]
}

//出自
function chooseSen5(){
    data.sentenceArray = data.poetry[data.currentLevel][(data.order[data.current])].content.split('，')
    var a=[0,2]
    var index = a[Math.floor(0,1)*2]
    var arr = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]]
    var shunxu = arr[(Math.floor(Math.random(0,1)*3))]

    data.questionArray[3] = data.sentenceArray[index] +'，'+ data.sentenceArray[index+1]
    data.questionArray[shunxu[0]] = data.poetry[data.currentLevel][(data.order[data.current])].title
    data.questionArray[shunxu[1]] = data.poetry[data.currentLevel][(data.order[data.current-1])].title
    data.questionArray[shunxu[2]] = data.poetry[data.currentLevel][(data.order[data.current-2])].title
}

function checkAnswer(e){

    if((data.current!==0)&&((data.current)%3 === 0)&&data.current<9){
        if(e.target.innerHTML === data.poetry[data.currentLevel][data.order[data.current]].author){
            if(data.current<data.order.length-1){
                clearInterval(data.timerid)
                data.current++
                show(nextQ)
                setTimeout(function(){
                    hide(nextQ);makeQ();
                },1500)
            }else{
                showsResult()
            }
        }else{
            showfResult()
        }
    }else if(data.current!==0 && data.current%2 ===0){
        if(e.target.innerHTML === data.sentenceArray[(data.chosenIndex-1)]){
            console.log(e.target.innerHTML,data.sentenceArray[data.chosenIndex-1])
            console.log(data.current,data.order.length-1)
            if(data.current<data.order.length-1){
                clearInterval(data.timerid)
                data.current++
                show(nextQ)
                setTimeout(function(){
                    hide(nextQ);makeQ();
                },1500)
            }else{
                showsResult()
            }
        }else{
            showfResult()
            console.log(e.target.innerHTML,data.sentenceArray[data.chosenIndex-1])
        }
    }else if(data.current===9){
        if(e.target.innerHTML === data.poetry[data.currentLevel][data.order[data.current]].title){
            console.log(e.target.innerHTML,data.poetry[data.currentLevel][data.order[data.current]].title)
            console.log(data.current,data.order.length-1)
            if(data.current<data.order.length-1){
                clearInterval(data.timerid)
                data.current++
                show(nextQ)
                setTimeout(function(){
                    hide(nextQ);makeQ();
                },1500)
            }else{
                showsResult()
            }
        }else{
            showfResult()
            console.log(e.target.innerHTML,data.sentenceArray[data.chosenIndex-1])
        }
    }else{
        if(e.target.innerHTML === data.sentenceArray[(data.chosenIndex+1)]){
            console.log(e.target.innerHTML,data.sentenceArray[data.chosenIndex+1])
            console.log(data.current,data.order.length-1)
            if(data.current<data.order.length-1){
                clearInterval(data.timerid)
                data.current++
                show(nextQ)
                setTimeout(function(){
                    hide(nextQ);makeQ();
                },1500)
            }else{
                showsResult()
            }
        }else{
            showfResult()
            console.log(e.target.innerHTML,data.sentenceArray[data.chosenIndex+1])
        }               
    }
}

function ulhandler(event) {
    console.log(event.target.nodeName)
    if(event.target.nodeName === 'LI'){
        checkAnswer(event)
        event.stopPropagation()
    }
}

gamePool.addEventListener('click',ulhandler)

function showfResult(){
    clearInterval(data.timerid)
    lang.textContent ='太弱了，重来吧'
    show(result)  
}

function showsResult(){
    lang.textContent ='通关，快去下一关'
    show(result)
}

//reset
function reset (){
    data.current =  0;
    data.history = [];
    data.questionArray = [];
    data.chosenIndex = 0;
    data.order = [];
}

function nextLevel(){
    data.currentLevel++
}

resetButton.addEventListener('click',function(){
    hide(result)
    reset();
    start();
})

homeButton.addEventListener('click',function(){
    hide(result)
    show(startPage);
    hide(gamePage);
    reset();
})

next.addEventListener('click',function(){
    nextLevel();
    reset();
    hide(result);
    start();
})