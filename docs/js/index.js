function addNoteList() {
  let developUrl = window.location.href
  let serverURl
  if (developUrl.indexOf('io') !== -1) {
    serverURl = '/document/#/'
  } else {
    serverURl = '/#/'
  }
  $.ajax({
    url: 'js/config/notesConfig.json',
    type: 'GET',
    success: function (data) {
      if (data.length > 0) {
        data.map(value => {
          let $noteCollection = $(`
            <div class="noteCollection">
              <div class="noteType">${value.type}</div>
              <div class="noteList">
              </div>
            </div>
          `)
          value.noteList.map(note => {
            let $note = $(` 
              <a class="note" href="${serverURl + note.path}">
                <div class="imgWrapper">
                  <img src="${note.imgUrl}" alt="">
                </div>
                <div class="noteInfo">${note.noteInfo}</div>
              </a>
            `)
            $noteCollection.find('.noteList').append($note)
          })
          $(".noteCollectionWrapper").append($noteCollection)
        })
      }
    }
  })
}



function pluginsForAddNote(hook, vm) {
  hook.init(function () {
    // 初始化完成后调用，只调用一次，没有参数。
  });

  hook.beforeEach(function (content) {
    // 每次开始解析 Markdown 内容时调用
    // ...
    return content;
  });

  hook.afterEach(function (html, next) {
    // 解析成 html 后调用。
    // beforeEach 和 afterEach 支持处理异步逻辑
    // ...
    // 异步处理完成后调用 next(html) 返回结果
    addNoteList();
    next(html);
  });

  hook.doneEach(function () {
    // 每次路由切换时数据全部加载完成后调用，没有参数。
    // ...
  });

  hook.mounted(function () {
    // 初始化并第一次加载完成数据后调用，只触发一次，没有参数。
  });

  hook.ready(function () {
    // 初始化并第一次加载完成数据后调用，没有参数。
  });
}

window.$docsify.plugins = [].concat(pluginsForAddNote, window.$docsify.plugins)
