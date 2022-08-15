var lastScrollTop = 0;
  window.onscroll = function () {
    var st = document.body.scrollTop || document.documentElement.scrollTop;
    if (st > 250) {
      document.getElementById("top").style.display = "block"
      if (st > lastScrollTop) {
        document.getElementById("top").style.opacity = 0
      } else {
        document.getElementById("top").style.opacity = 1
      }
    } else {
      document.getElementById("top").style.opacity = 0
      if (st > lastScrollTop) {
        document.getElementById("top").style.display = "none"
      }
    }
    lastScrollTop = st <= 0 ? 0 : st;
  }
  function moveTop() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  function setToday() {
    var selDate = new Date();
    var day = selDate.toDateString(); // fri sep 9 2011 형식

    $('#today').text(day);
  }

  function progressbarShow(){
    var totalCnt = $('[type=checkbox]').length;
    var completeCnt = $('[type=checkbox]:checked').length;
    var process = (((completeCnt/totalCnt) * 100).toFixed(1));

    $('#progress-bar').css('width', process+'%');
    $('#progress-value').text(process+'%');

  }


  $(document).ready(function() {
    setToday();

    $('[type=checkbox]').each(function(idx, ele){
      $(ele).attr('disabled', false);
      $(ele).attr('id', 'checkbox' + idx);
    })

  });

  window.onload = function(){
    // 실행할 내용
    progressbarShow();
  };