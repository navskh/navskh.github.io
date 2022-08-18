const firebaseConfig = {
  apiKey: "AIzaSyBH6gPu3RBxu_wjveJ4x2KTajQOhV3MDDc",
  authDomain: "dolist-53baa.firebaseapp.com",
  projectId: "dolist-53baa",
  storageBucket: "dolist-53baa.appspot.com",
  messagingSenderId: "1082198060275",
  appId: "1:1082198060275:web:9460ec4a31e776fc5fdb86"
};

// Firebase 초기화
// 인자로 위의 key들을 넣어주면 해당 프로젝트와 연결됨
firebase.initializeApp(firebaseConfig);

// firestore를 불러와서 dbService에 넣어줌
// dbService를 통해 firestore를 동작(수정/추가/삭제)할 수 있음
const dbService = firebase.firestore();

var dolist = {};


$(document).ready(function() {
  dbService.collection('todo').get().then((result)=>{
    result.forEach((doc)=>{
      dolist = doc.data().dolist;
      makeList(doc.data().dolist);
    })
  })

})

async function clickEvent() {
  applyData();
  await dbService.collection("todo").doc("dolist1").set({
    dolist
  });
}

function makeList(fireDolist){
  // 먼저 category 정렬
  var newObj = {};
  Object.keys(fireDolist).sort().forEach(function(key) {
    newObj[key] = fireDolist[key];
  });
  
  $('#showList').append(`<section class="dolist-content">`);
  var idcnt = 0;

  
  for(var idx in newObj){
    if(!isEmptyObj(newObj[idx])){
      $('#showList').append(`<h4 id="${idx}">${idx}</h4>`);
    }
    // list 정렬
    var newnewObj = {};
    Object.keys(newObj[idx]).sort().forEach(function(key) {
      newnewObj[key] = newObj[idx][key];
    });
    for (var list in newnewObj){
      var checkedValue = newnewObj[list];
      $('#showList').append(`
        <li id="${idcnt}" class="task-list-item">
          ${checkedValue == 'checked' ? '<del>' : ''}
          <input ${checkedValue} type="checkbox" class="task-list-item-checkbox" onclick='clickEvent()' />${list} 
          ${checkedValue == 'checked' ? '</del>' : ''}
        </li>`);
      $('#'+idcnt).append(`<a name="delete${idcnt}" href="#" class="delete" id="modal" onclick="deletelist(${idcnt})">삭제</a>`)
      idcnt++;
    }
  }
}
function isEmptyObj(obj)  {
  if(obj.constructor === Object && Object.keys(obj).length === 0)  {
    return true;
  }
  return false;
}


function applyData() {
  clearDolist();
  // dolist 적용
  $('h4').not('.modal-title').each((idx, ele)=> {
    var categoryName = $(ele).text();
    var listItem = {};

    $(ele).nextUntil('h4').each((idx, list) => {
      var checkedFlag = $(list).find('input').prop('checked') == true ? 'checked' : 'unchecked';
      listItem[$(list).text().replaceAll(' 삭제', '')] = checkedFlag;
    });
    dolist[categoryName] = listItem;
  })

  console.log(dolist);
}

function clearDolist() {
  for(var idx in dolist){
    if(isEmptyObj(dolist[idx])){
      delete dolist[idx];
    }
  }
}



async function deletelist(idx) {
  $('#'+idx).remove();

  applyData();

  await dbService.collection("todo").doc("dolist1").set({
    dolist
  }).then(()=>{
    AlertFire('삭제되었습니다.', 'warning');
  });


}


/**
   * ToDolist를 Json Data로 만들거야
   * dolist = {
   *     categoryname (ex Study) = {
   *     'dolist1' : 'checked',
   *     'dolist2' : 'unchecked',
   *    }
   * }
   */
async function addToDo() {
  
  var dolistItem = $('#dolist-item').val()
  var addDolist = {};
  addDolist[dolistItem] = 'unchecked';
  var addCategory = $('#category-item').val();

  applyData();
  console.log(dolist[addCategory]);
  if(dolist[addCategory]==undefined) {
    dolist[addCategory] = addDolist;
  } else {
    dolist[addCategory][dolistItem] = 'unchecked';
  }
  
  await dbService.collection("todo").doc("dolist1").set({
    dolist
  }).then(()=>{
    AlertFire('추가가 완료되었습니다.', 'success');
  });


}

function AlertFire(title, icon){
  Swal.fire({
      title: title,
      icon: icon,
      confirmButtonColor: '#3085d6',
      confirmButtonText: '확인',
      onClose: () => {
        location.reload();
      }
  });
}