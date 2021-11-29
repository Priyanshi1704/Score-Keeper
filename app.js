

const p1={
    score:0,
    button:document.querySelector('#p1btn'),
    display:document.querySelector('#p1Display')
}
const p2={
    score:0,
    button:document.querySelector('#p2btn'),
    display:document.querySelector('#p2Display')
}



const resetBtn=document.querySelector('#reset');
const winningScoreSelector=document.querySelector('#playto');

let winningScore=5;
let gameOver=false;
function updateScores(player,opponent){
    if(!gameOver){
        if(player.score!=winningScore){
        player.score+=1;
        if(player.score===winningScore)
        {
            gameOver=true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled=true;
            opponent.button.disabled=true;
            
        }
       player.display.textContent=player.score;
       
        }
        
}}
p1.button.addEventListener('click',function(){
   updateScores(p1,p2)
})

p2.button.addEventListener('click',function(){
    updateScores(p2,p1)
})
winningScoreSelector.addEventListener('change',function(){
   winningScore =parseInt(this.value);
   reset();
})
resetBtn.addEventListener('click',reset)
function reset()
{ gameOver=false;
    p1.score=0;
    p2.score=0;
    p1.display.textContent=0;
    p2.display.textContent=0;
    p1.display.classList.remove('has-text-success','has-text-danger');
 p2.display.classList.remove('has-text-danger','has-text-success');
 p1.button.disabled=false;
 p2.button.disabled=false;


}