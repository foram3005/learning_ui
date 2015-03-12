var quizData = [
{
  "questions": "1. question 1",
  "answers" :["ans1","ans2","ans3","ans4"]
},
{
  "questions": "2. question 2",
  "answers" :["ans1","ans2","ans3","ans4"]
},
{
  "questions": "3. question 3",
  "answers" :["ans1","ans2","ans3","ans4"]
},
{
  "questions": "4. question 4",
  "answers" :["ans1","ans2","ans3","ans4"]
},
{
  "questions": "5. question 5",
  "answers" :["ans1","ans2","ans3","ans4"]
}
];

var xmlhttp = new XMLHttpRequest();
var url = "script.txt";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var quizData = JSON.parse(xmlhttp.responseText);
        myFunction(quizData);
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
    var out = "";
    var i;
    for(i = 0; i < arr.length; i++) {
        out += '<a href="' + arr[i].url + '">' + 
        arr[i].display + '</a><br>';
    }
    document.getElementById("id01").innerHTML = out;
}


var counter=0;
var score=0;
var set_q="";
var set_ans= new Array();
var ans = ['a','b','c','d','a'];
var user_result=[];
// var x = new Array();
var curr_q = document.getElementsByClassName('question-container');
var btn= document.getElementsByClassName('btnContainer');
var progress = document.getElementById('progress'); 
var temp = document.getElementsByClassName('xyz');
var err = document.getElementsByClassName('alert');

function startquiz (arr)
{
  var intro = document.getElementsByClassName("intro-page");
  intro[0].style.display="none";
  curr_q[0].style.display="block";
  progress.innerHTML=counter+1 + "/" + ans.length;
  set_q=arr[counter].questions;
  document.getElementById('questn').innerHTML=set_q;
  for (i=0; i<4; i++)
  {
    set_ans[i]=arr[counter].answers[i];
    temp[i].innerHTML = set_ans[i];
  }
  // counter++;
  btn[0].style.display="block"; 
}

function nextQuestn(arr_next)
{ 

  document.getElementById('prev').style.display="block";
  if (!document.querySelector('input[name="options0"]:checked'))
    {
      err[0].style.display="block";
    }
  else
    {
      err[0].style.display="none";
      if(counter==arr_next.length-1)
      {
        
          user_result[counter]=document.querySelector('input[name="options0"]:checked').value;
          // console.log(user_result[counter]);
          counter++;
          for (i = 0; i < ans.length; i++) 
          {
            
            if(user_result[i]==ans[i])
            {
              score++;
            }
             
          }
          curr_q[0].style.display="none";
          btn[0].style.display="none";
          document.getElementById('result_view').style.display="block";
          progress.innerHTML="Finished";
          if (score >= 3)
          {
            document.getElementById('msg').innerHTML="Congratulations!! You scored :" + score + " out of " + ans.length;
          }
          else 
          {
            document.getElementById('msg').innerHTML="Ohh!! You scored :" + score + " out of " + ans.length;
          }
      }


      else
      {
        if(counter==arr_next.length-2)
        {
          document.getElementById('next').innerHTML="Result";
        }
        user_result[counter]=document.querySelector('input[name="options0"]:checked').value;
        // console.log(user_result[counter]);
        set_q=arr_next[counter+1].questions;
        document.getElementById('questn').innerHTML=set_q;
        for (i=0; i<4; i++)
        {
          set_ans[i]=arr_next[counter+1].answers[i];
          temp[i].innerHTML = set_ans[i];
        }
        counter ++;
        progress.innerHTML=counter+1 + "/" + ans.length;
        
      }
    }

  if (user_result[counter]==undefined)
  {
    // alert("in");
    var unchck = document.getElementsByTagName('input')
    for (i=0; i<4; i++)
    { 
      unchck[i].checked=false;
    }
  }
  else
  {
    document.getElementById(user_result[counter]).checked=true;
  }

}

function prevQuestn(arr_prev)
{
  if (!document.querySelector('input[name="options0"]:checked'))
    {
      err[0].style.display="block";
    }
  else
    {
      err[0].style.display="none";
      user_result[counter]=document.querySelector('input[name="options0"]:checked').value;
      console.log(user_result[counter]);
      document.getElementById(user_result[counter-1]).checked=true;

      document.getElementById('next').innerHTML="Next";
      if(counter==1)
      {
        document.getElementById('prev').style.display="none";
        
      }
      
      set_q=arr_prev[counter-1].questions;
      document.getElementById('questn').innerHTML=set_q;
      for (i=0; i<4; i++)
      {
        set_ans[i]=arr_prev[counter-1].answers[i];
        temp[i].innerHTML = set_ans[i];
      }
      progress.innerHTML=counter + "/" + ans.length;
      counter --;
    }
}
