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


$(document).ready(async function () {

  var arrSixtyVerse = ['일요일', 'A', 'B', 'C', 'D', 'E', 'A'];
  var day = new Date();
  var thisSeq = arrSixtyVerse[day.getDay()];

  // 날이 바뀌면 localStorage Clear!
  var savedDate = window.localStorage.getItem('savedDate');
  console.log('[log] savedDate : ' + savedDate , 'thisDate : ' + day.getDate());
  if(savedDate != day.getDate()){
    console.log('날이 바뀌었으므로 localStroge Clear됩니다!');
    window.localStorage.clear();
    window.localStorage.setItem('savedDate', day.getDate());
  }

  var result2 = await dbService.collection('60verse').get();
  result2.forEach((doc)=> {
    if(doc.id.indexOf(thisSeq) > -1){
      makeDailySixtyVerse(doc.data());
    }
  });

  var result1 = await dbService.collection('todo').get();

  result1.forEach((doc) => {
    // console.log(doc.data());
    dolist = doc.data().dolist;
    makeList(doc.data().dolist);
  })


  // 여기서 부터 DEP 만들어주는 영역
  makeDEPList();

});

// DEP 242 구절 리스트 만들기
async function makeDEPList() {
  const startDate = new Date('2022-11-14');
  const todayDate = new Date();
  console.log(startDate, todayDate);

  const diffDate = todayDate.getTime() - startDate.getTime();
  const diff = (diffDate / (1000 * 60 * 60 * 24)).toFixed(0);

  const todayPart = diff % 14 + 1;


  const response = await fetch(`/assets/txt/DEP${todayPart}일차.json`);
  const obj = await response.json();

  var title = `<h4 id="DEPtitle"> ${obj.title} </h4>`
  var upperCategory = '';
  var middleCategory = '';
  var miniCategory = '';

  $('#DEPList').append(title);

  obj.content.forEach((item, idx) => { 
    if (upperCategory != item['대제목']) {
      upperCategory = item['대제목'];
      $('#DEPList').append(`<h5 style="text-indent: 10px"> ${upperCategory} </h5>`);
    }

    if (middleCategory != item['중제목']) {
      middleCategory = item['중제목'];
      $('#DEPList').append(`<h6 style="text-indent: 20px"> ${middleCategory} </h6>`);
    }

    if (miniCategory != item['소제목']) {
      miniCategory = item['소제목'];
      $('#DEPList').append(`<h6 style="text-indent: 20px"> ${miniCategory} </h6>`);
    }

    var thisChecked = window.localStorage.getItem(item.verse) ?? 'unchecked';
    var checkBox = `<input type=checkbox class="task-list-item-checkbox" style="transform: scale(2);margin: 2px 11px 0 0;accent-color: cornflowerblue;" onclick="makeDel(this)" ${thisChecked}/>`;

    var thisCategory = '';
    miniCategory != '' ? thisCategory = miniCategory
      : middleCategory != '' ? thisCategory = middleCategory
        : upperCategory != '' ? thisCategory = upperCategory
        : thisCategory = '';

    $('#DEPList').append(`<p id="${item.verse}" style="text-indent: 30px"> ${checkBox} <a onclick="showDEPDetail('${thisCategory}','${item.verse}','${item.text}')"> ${item.verse} </a> </p>`);
  })


}

function showDEPDetail(category, verse, text) {
  var makeStr = `<h4 class="stopFound"> ${category} </h4> <h5> ( ${verse} )</h5> <p> ${text} <p>`;
  $('#verseDetail').css('opacity', 1);
  $('#verseDetail').css('top', '50%');
  $('#vd_body').css('padding', '30px');
  $('#vd_body').html(makeStr);
}

function makeDailySixtyVerse(verses) {
  $("#showList").append(`<h4 id="60verseHeader">오늘의 60구절</h4>`);

  // 무작위로 가져와버려서 한번 정렬해줘야 함.
  sortedVerse = Object.entries(verses).sort(function(a, b){
    return  b[0].split('-')[1] - a[0].split('-')[1];
  });
  

  for(index in sortedVerse){
    var verse = sortedVerse[index];
    var thisChecked = window.localStorage.getItem(verse[0]) ?? 'unchecked';
    var checkBox = `<input type=checkbox class="task-list-item-checkbox" style="transform: scale(2);margin: 2px 11px 0 0;accent-color: cornflowerblue;" onclick="makeDel(this)" ${thisChecked}/>`;
    var isOpenDel = thisChecked == 'checked' ? '<del>' : '';
    var isCloseDel = thisChecked == 'checked' ? '</del>' : '';
    var thisContent = ` <a onclick="showDetail('${verse}')"> ${verse[1].split('/',2)} </a> `
    var strHtml = `<div id='${verse[0]}'> ${isOpenDel} ${checkBox} <b>${verse[0]}</b> ${thisContent} ${isCloseDel} </div>`;
    $('#60verseHeader').after(strHtml);
  }
}

function showDetail(verseDetail) {
  var thisVerse = verseDetail.split('/');
  var makeStr = `<h4 class="stopFound"> ${thisVerse[0]} </h4> <h5> ( ${thisVerse[1]} )</h5> <p> ${thisVerse[2]} <p>`;
  $('#verseDetail').css('opacity', 1);
  $('#verseDetail').css('top', '50%');
  $('#vd_body').css('padding', '30px');
  $('#vd_body').html(makeStr);
}

function closeDetail() {
  $('#verseDetail').css('top', '-50%');
  $('#verseDetail').css('opacity', 0);
}

function makeDel(thisEle){
  var thisChecked = $(thisEle).prop("checked");
  if (thisChecked) {
    var thisIndex = $(thisEle).parent().attr('id');
    window.localStorage.setItem(thisIndex, 'checked');
    var thisHtml = $(thisEle).parent().html().replace("unchecked", "checked");
    thisHtml = `<del>${thisHtml}</del>`;
    $(thisEle).parent().html(thisHtml);
  } else {
    var thisIndex = $(thisEle).parent().parent().attr('id');
    window.localStorage.setItem(thisIndex, 'unchecked');
    var thisHtml = $(thisEle).parent().parent().html();
    thisHtml = thisHtml
      .replace("<del>", "")
      .replace("</del>", "")
      .replace("checked", "unchecked");
    $(thisEle).parent().parent().html(thisHtml);
  }
}

async function clickEvent(thisEle) {
  var thisChecked = $(thisEle).prop("checked");
  if (thisChecked) {
    var thisHtml = $(thisEle).parent().html().replace("unchecked", "checked");
    thisHtml = `<del>${thisHtml}</del>`;
    $(thisEle).parent().html(thisHtml);
  } else {
    var thisHtml = $(thisEle).parent().parent().html();
    thisHtml = thisHtml
      .replace("<del>", "")
      .replace("</del>", "")
      .replace("checked", "unchecked");
    $(thisEle).parent().parent().html(thisHtml);
  }

  applyData();
  console.log(dolist);
  await dbService.collection("todo").doc("dolist1").set({
    dolist,
  });
}

function makeList(fireDolist) {
  // 먼저 category 정렬
  var newObj = {};
  Object.keys(fireDolist)
    .sort()
    .forEach(function (key) {
      newObj[key] = fireDolist[key];
    });

  $("#showList").append(`<section class="dolist-content">`);
  var idcnt = 0;

  for (var idx in newObj) {
    if (!isEmptyObj(newObj[idx])) {
      $("#showList").append(`<h4 id="${idx}">${idx}</h4>`);
    }
    // list 정렬
    var newnewObj = {};
    Object.keys(newObj[idx])
      .sort()
      .forEach(function (key) {
        newnewObj[key] = newObj[idx][key];
      });
    var checkboxStyle =
      "transform: scale(2);margin: 2px 11px 0 0;accent-color: cornflowerblue;";

    for (var list in newnewObj) {
      var checkedValue = newnewObj[list];
      console.log(list);
      $("#showList").append(`
        <li id="${idcnt}" class="task-list-item">
          ${checkedValue == "checked" ? "<del>" : ""}
          <input ${checkedValue} type="checkbox" class="task-list-item-checkbox" onclick='clickEvent(this)' style="${checkboxStyle}"/> <a onclick="searchWord('${list}')"> ${list} </a>
          ${checkedValue == "checked" ? "</del>" : ""}
        </li>`);
      $("#" + idcnt).append(
        `<a name="delete${idcnt}" href="#" class="delete" id="modal" onclick="deletelist(${idcnt})">삭제</a>`
      );
      idcnt++;
    }
  }
}

function searchWord(word) {
  var thisKeyword = word.replace('(','').replace(')', '');


  var thisContent = bible[thisKeyword];

  exp = /,|-|~/;

  if(exp.test(thisKeyword)){
    var thisJang = thisKeyword.split(':')[0];
    if( thisKeyword.split(',').length >= 2 ){
      var thisVerse = [thisKeyword.split(',')[0] , thisJang + ':' + thisKeyword.split(',')[1] ];
      thisContent = bible[thisVerse[0]] + ' ' + bible[thisVerse[1]];
    }
    else if(thisKeyword.split('~').length >= 2){
      var thisVerse = [thisKeyword.split('~')[0] , thisJang + ':' + thisKeyword.split('~')[1] ];
      thisContent = bible[thisVerse[0]]  + ' ' + bible[thisVerse[1]];
    }
    else if(thisKeyword.split('-').length >= 2) {
      var thisVerse = [thisKeyword.split('-')[0] , thisJang + ':' + thisKeyword.split('-')[1] ];
      thisContent = bible[thisVerse[0]]  + ' ' + bible[thisVerse[1]];
    }
  }
  


  var makeStr = `<h5> ${thisKeyword} </h5> <p> ${thisContent} </p> `;
  $('#verseDetail').css('opacity', 1);
  $('#verseDetail').css('top', '50%');
  $('#vd_body').css('padding', '30px');
  $('#vd_body').html(makeStr);
}
function isEmptyObj(obj) {
  if (obj.constructor === Object && Object.keys(obj).length === 0) {
    return true;
  }
  return false;
}

function applyData() {
  clearDolist();
  // dolist 적용
  $("h4")
    .not(".modal-title")
    .not("#60verseHeader")
    .not("#DEPtitle")
    .not(".stopFound")
    .each((idx, ele) => {
      var categoryName = $(ele).text();
      var listItem = {};

      $(ele)
        .nextUntil("h4")
        .each((idx, list) => {
          var checkedFlag =
            $(list).find("input").prop("checked") == true
              ? "checked"
              : "unchecked";
          listItem[
            $(list).text().replaceAll(" 삭제", "").replaceAll(/\n/g, "").trim()
          ] = checkedFlag;
        });
      console.log(listItem);
      dolist[categoryName] = listItem;
    });
}

function clearDolist() {
  for (var idx in dolist) {
    if (isEmptyObj(dolist[idx])) {
      delete dolist[idx];
    }
  }
}

async function deletelist(idx) {
  var thisEle = $("#" + idx);
  var thisDolist = thisEle
    .text()
    .replaceAll(" 삭제", "")
    .replaceAll(/\n/g, "")
    .trim();

  var originalData = await dbService.collection("completed").get();
  var originalItem = {};

  originalData.forEach((doc) => {
    originalItem = doc.data();
  });
  var maxkey = Object.keys(originalItem["InsertData"]).length;
  originalItem["InsertData"][maxkey + 1] = thisDolist;
  var InsertData = originalItem["InsertData"];
  await dbService.collection("completed").doc("finish").set({
    InsertData,
  });

  $("#" + idx).remove();

  applyData();

  console.log(dolist);

  await dbService
    .collection("todo")
    .doc("dolist1")
    .set({
      dolist,
    })
    .then(() => {
      AlertFire("삭제되었습니다.", "warning");
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

  console.log(dolist);
  
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