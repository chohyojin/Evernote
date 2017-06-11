



/*
function findHashTag() {
  var hashtag = $("#hashtag").val();
  hashtag = "#" + hashtag;
  var ref = firebase.database().ref('memo');
  ref.once('value').then(function(snapshot){
      printList_memo(snapshot.val(), hashtag);
  });
}
function hashtagconfirm(data){
  var hashtag = new Array();
  data.forEach(function(word){
    if(word.indexof('#') == 0){
      hashtag.push(word);
    }
  });
  return hashtag;

}
*/
// Hash Tag 검색 기능 구현 중~
/*
       
            function checkHashTag() {
              var input = document.getElementById("input");

              if(input.value.length == 0 ) {
                var docs = document.getElementsByClassName("collection-item avatar");
                for(var i = 0 ; i <docs.length ; i ++) {
                  docs[i].style.backgroundColor = "white";
                }

                alert("해쉬태그 입력해주세요.");
                return;
              }
              var docs = document.getElementsByClassName("collection-item avatar");
                for(var i = 0; i<docs.length ; i ++) {
                  var text = docs[i].innerHTML;
                  console.log(text);
                  if(text.indexOf(input.value)>=0){
                    docs[i].style.backgroundColor = "blue";
                  }
                  else {
                    docs[i].style.backgroundColor = "white";
                  }
                }
              }

    */


//initalized parameter
var nowkey = null;
var p_img = null;
var p_file = null;
var p_video = null;

//file upload
var fileButton  = document.getElementById('uploadfile');
var imageButton = document.getElementById('uploadimage');
var videoButton =document.getElementById('uploadvideo');


//filebutton listener
fileButton.addEventListener('change', function(e){
  //get fileButton
  var file = e.target.files[0];
  if(file != null) { //null 아닐 때
    
  var storageRefs = firebase.storage().ref('file/' + nowkey + '/' + file.name);
  storageRefs.put(file);



  var filePath = $(this).val().split("\\");
  var p_file = filePath[filePath.length-1];
  
  $("#p_file").show().text(p_file);
  //첨부파일 메시지 보여주기
  
  }
});

//imagebutton listener
imageButton.addEventListener('change', function(e){

  //get imagefile
  var file = e.target.files[0];
   if(file != null) {
    
  var storageRef = firebase.storage().ref('img/' + nowkey + '/' + file.name);
  storageRef.put(file);

  var filePath = $(this).val().split("\\");
  var p_file = filePath[filePath.length-1];
  $("#p_img").show().text(p_file);
  
  }
});

//videobutton listener
videoButton.addEventListener('change', function(e){
  //get videofile
  var file = e.target.files[0];
    if(file != null){
      
      var storageRef = firebase.storage().ref('video/'+ nowkey + file.name);
      storageRef.put(file);
  

  var filePath = $(this).val().split("\\");
  var p_file = filePath[filePath.length-1];
  $("#p_video").show().text(p_file);

  }
});














var database = firebase.database();

function hashtagSplit(data){
  var hash = new Array();
  var tag_split = data.split('\n\n');
  var erase = new Array();
  var tp = new Array();
  var data_split = new Array();


//tag 떼기
  tag_split.forEach(function(i){
    i = i.replace(/(<([^>]+)>)/ig,"");
//var regex_hash = /(#[A-Za-z가-힉-하-_-][A-Za-z가-힣-하-0-9]*/g);
     tp = i.split(' ');
    tp.forEach(function(j){
      erase.push(j);
    });
  });






var data_split = new Array();
//\n 뗴기
  erase.forEach(function(i){
    tp = i.split('\n');
    
    tp.forEach(function(j){
      data_split.push(j);
    });
  });

/*
function hashtagconfirm(data){
  var hashtag = new Array();
  data.forEach(function(word){
    if(word.indexof('#') == 0){
      hashtag.push(word);
    }
  });
  return hashtag;
*/
  data_split.forEach(function(word){
    if(word.indexOf('#') == 0){
      hash.push(word);
    } 
  });

  console.log("hash : " + hash);
  return hash;
}

//새 메모 버튼 눌렀을 때! 제목, 태그, 내용, 첨부파일 초기화
function init(){
  $("#title").val("");
  CKEDITOR.instances.editor.setData("");
    nowkey = null;
    var p_img = null;
    var p_file = null;
    var p_video = null;

}
/* db 변했을 때!
  function on_child_added(data) {

          var key = data.key;
          var memoData = data.val();
          var txt = memoData.txt;
          var title = txt.substr(0, 15);
          var firstTxt = txt.substr(0, 1);
          var updateDate = new Date(memoData.updateDate).format("yyyy-MM-dd hh:mm:ss E");
          var summary = "";
          var html = "<li id='" + key + "' class=\"collection-item avatar\" onclick=\"fn_get_data_one(this.id);\">" +
                    "<i class=\"material-icons circle purple\">" + firstTxt + "</i>" +
                    "<span class=\"txt_createDate\">" + updateDate + "</span>" +
                    "<p class='title'>" + title + "<br>" + "</p>" + "<p class='txt'>" + txt + "<br>" +
                    "</p>" + 
                    "<a href=\"#!\" onclick=\"fn_delete_data('" + key +"')\" class=\"secondary-content\"><i class=\"material-icons\">delete</i></a>"
                    "</li>";
                    
 
                    $("#button2").click(function(){
                      if(selectedKey){
                     
                      initMemo();
                    }
                    else {
                       $(".collection").prepend(html);
                    }
                    });
                    
                    $(".collection").prepend(html);
          
        }

*/
//savebutton 클릭시
function saveclick(){
  var ref = database.ref('memo');
  var text = CKEDITOR.instances.editor.getData();
  var title = $('#title').val();
  var hash = hashtagSplit(text);
  //var hashtag = hashtag + "#";
  if(title ==""){
    alert("제목 입력이 필요해요 ~");
    return;
  }
  
 //get time, date!!
  var t = new Date(); //time function 
  //var now = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds());
 
  
  //처음 저장시 넣을 html
  if(nowkey == null){
    now = -(t.getTime());
    var html = {
    title : title,
    content : text,
    date : now,
    file : p_file,
    image : p_img,
    video : p_video,
    hash : hash,
  };

  
}
  //수정시 넣을 html
  else {
      var html = {
    title : title,
    content : text,
    file : p_file,
    image : p_img,
    video : p_video,
    hash : hash,
  };
}
//처음 저장시 키값 받아오고 저장
  if(nowkey == null){
  var key = ref.push().key;
  nowkey = key;
}


//처음 저장시 html 넣기
  if(nowkey == null) {
    ref.child(key).update(html);
    
  }
  //수정시 해당 키값에 해당하는 메모에 html 넣어서 수정
  else{
   
    ref.child(nowkey).update(html);





  }



}

function findHashTags(){
  //hashtag 검색창에 입력값 받아오기
  var hash = $("#input").val();
 
 //
  dbs.once('value').then(function(snapshot){
    printList_memo(snapshot.val(), hash);
  });
}
/*
  function fn_get_data_one(key) {
          selectedKey = key;
          var memoRef = database.ref('memos/' + userInfo.uid + "/" + key).once('value').then(function(snapshot) {
            $(".textarea").val(snapshot.val().txt);
            $("#modifyDate").html(new Date(snapshot.val().updateDate).format("yyyy-MM-dd hh:mm:ss E"));
          });
        }

        function save_data() {
          var memoRef = database.ref('memos/' + userInfo.uid);
          var txt = $(".textarea").val();

          if (txt == '') {
            return;
          }

          if (selectedKey) {
            memoRef = database.ref('memos/' + userInfo.uid + "/" + selectedKey);
            memoRef.update({
              txt: txt,
              updateDate: new Date().getTime()
            });
          }else {
            //push
            memoRef.push({
              txt: txt,
              createDate: new Date().getTime(),
              updateDate: new Date().getTime()
            });  
          }
        }





*/


//height 구하기
var L_height = window.innerHeight-150;
$("#List_memo").height(L_height);

//resize
$(window).resize(function(){
  $("#List_memo").height(L_height);
});

//auto scroll 구현하기, 수업시간 스크롤 응용하기
var count = 15; //보여지는 리스트 수
var dbs = firebase.database().ref('memo');
//scroll 함수 
$("#List_memo").scroll(
  function(){
    var Max_h = $("#List_memo").prop("scrollHeight");
    //scrollTop()과 아까 구한 높이를 더하여 현재 스크롤  구하기
    var Now_scroll = $("#List_memo").scrollTop() + L_height;
    //높이와 현재 스크롤 높이 비교하기
    if(Now_scroll >= Max_h) {
        count += 3;
         dbs.once('value').then(function(snapshot){
          //snapshot 하여 list 출력 함수로 넘기기 
          printList_memo(snapshot.val() , null);
        });
    }
    else {
      console.log("");
    }
  });

 dbs.on('value',function(data){
  var a = data.val();
  printList_memo(a, null);
});








function printList_memo(data, hash){
  $("#List_memo").html(null);
  var i = 1;
  var diaryDate = null;
  var hashString = null;
  if(data == null){
    return;
  }
  if(hash == null){
    for(var temp in data){
      if(i > count){
        break;
      }
      diaryDate = new Date(-data[temp].date);
      hashString = "";
      /*
        if (selectedKey) {
            memoRef = database.ref('memos/' + userInfo.uid + "/" + selectedKey);
            memoRef.update({
              txt: txt,
              updateDate: new Date().getTime()
            });
          }else {
            //push
            memoRef.push({
              txt: txt,
              createDate: new Date().getTime(),
              updateDate: new Date().getTime()
            });  
          }
        }
*/


      if(data[temp].hash != null){
        data[temp].hash.forEach(function(i){
          hashString += i + " ";
        }); 
      }
      /*
       var html = "<li id='" + key + "' class=\"collection-item avatar\" onclick=\"fn_get_data_one(this.id);\">" +
                    "<i class=\"material-icons circle purple\">" + firstTxt + "</i>" +
                    "<span class=\"txt_createDate\">" + updateDate + "</span>" +
                    "<p class='title'>" + title + "<br>" + "</p>" + "<p class='txt'>" + txt + "<br>" +
                    "</p>" + 
                    "<a href=\"#!\" onclick=\"fn_delete_data('" + key +"')\" class=\"secondary-content\"><i class=\"material-icons\">delete</i></a>"
                    "</li>";
                    */

      $("#List_memo").prepend('<li class="collection-item"><a onClick="loadDiary(&quot;' + temp + '&quot;);"><h3>' + data[temp].title + "<small>&nbsp;&nbsp;&nbsp;" + hashString + "&nbsp;&nbsp;" + diaryDate.toLocaleString() + "</small></h3></a></li>");  
      i++;
    }
  }
  else {
  for(var temp in data){
      if(i > count){
        break;
      }

      /*
        if (selectedKey) {
            memoRef = database.ref('memos/' + userInfo.uid + "/" + selectedKey);
            memoRef.update({
              txt: txt,
              updateDate: new Date().getTime()
            });
          }else {
            //push
            memoRef.push({
              txt: txt,
              createDate: new Date().getTime(),
              updateDate: new Date().getTime()
            });  
          }
        }
*/
      if(data[temp].hash != null){
        data[temp].hash.forEach(function(i){
          if(i == hash){
            hashString = "";
            data[temp].hash.forEach(function(i){
              hashString += i + " ";
            }); 

            diaryDate = new Date(-data[temp].date);

            /*
       var html = "<li id='" + key + "' class=\"collection-item avatar\" onclick=\"fn_get_data_one(this.id);\">" +
                    "<i class=\"material-icons circle purple\">" + firstTxt + "</i>" +
                    "<span class=\"txt_createDate\">" + updateDate + "</span>" +
                    "<p class='title'>" + title + "<br>" + "</p>" + "<p class='txt'>" + txt + "<br>" +
                    "</p>" + 
                    "<a href=\"#!\" onclick=\"fn_delete_data('" + key +"')\" class=\"secondary-content\"><i class=\"material-icons\">delete</i></a>"
                    "</li>";
                    */
            $("#List_memo").prepend('<li class="collection-item"><a onClick="loadDiary(&quot;' + temp + '&quot;);"><h3>' + data[temp].title + "<small>&nbsp;&nbsp;&nbsp;" + hashString + "&nbsp;&nbsp;" + diaryDate.toLocaleString() + "</small></h3></a></li>");  
            i++;
            return;
          }
        }); 
      }
    }
}





  /*
  for(var temp in data){
    if(i > count){
      break;
    }
    $("#List_memo").prepend('<li class="list-group-item"><a onClick="loadDiary(&quot;' + temp + '&quot;);"><h3>' + data[temp].title + data[temp].hashtag +"<small>&nbsp;&nbsp;&nbsp;" + data[temp].date + "</small></h3></a></li>"); 
    i++;
  }
  */
}



//when db is added, 'child_added' event occur

/* dbs.on('child_added', function(data) {
  var a = data.val();
  
  
    $("#List_memo").prepend('<li class="list-group-item"><a onClick="loadDiary(&quot;' + data.key + '&quot;);"><h4>' + a.title + "<small>&nbsp;&nbsp;&nbsp;" + a.date + "</small></h4></a></li>");  
  
});

*/
//load diary part
function loadDiary(key){
  firebase.database().ref('memo/' + key).once('value').then(function(snapshot) {
    var data = snapshot.val();
    $("#title").val(data.title);
    CKEDITOR.instances.editor.setData(data.content);
    nowkey = key;
    //storage 접근하여 img파일 ㅇ 가져오기
    firebase.storage().ref().child('img/'+nowkey+'/'+data.img).getDownloadUrl().then(function(url){
      var x = new XMLHttpRequest();
      x.responseType = 'blob';
      x.onload = function(event){
        var blob = x.response;
      };
      x.open('GET', url);
      x.send();


    }).catch(function(error){
      console.log(error);
    
   });
    
});

   dbs.once('value').then(function(snapshot){
    var data = snapshot.val();
    nowkey = key;
    
  });
}



/*function reviseclick() {
var  dbs = firebase.database().ref('diary');

//when db is added, 'child_added' event occur
 dbs.on('child_changed', function(data) {
  var key = data.key;
  var txt = CKEDITOR.instances.editor.getData();
  var title = $('#title').val();
  var a = data.val();
  
  
});


}
*/

//delete diary part
function removeclick() {

  if(!confirm('메모를 삭제하시겠습니까?'))
  {
    return;
  }
  //memo가 없을 때
  if(nowkey == null) 
  {
    console.log("");
  }
  //memo가 있으면 해당 키값에 해당하는 메모 삭제
  else {
    var refs = firebase.database().ref('memo');
    refs.child(nowkey).remove();
    //remove 후 initialized
    init();
  
  } 

}

