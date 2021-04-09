$(() => {
  let executionTodos = [];
  let count = 0;
  let takeIdForCheck;
  let lengthOfSolved = 0;
  let lengthOfUnsolved = 0;
  let lengthOfAll = 0;
  let takeIdDelBut;
  let countTap = 0;
  let countpage = 0;
  let copyExecuteArray = [];
  let filterArray;
  let checkedFilterArray;
  let idNewElem;
  let indexCheck;
  let trueString = false;
  let arrayOfStrings;
  let numDifference;
  const numNow = 1;
  let counter = 0;
  let numForDel;
  let newPageTab;
  let tabnum = 1;
  const dataPage = [];
  let pageNumber = 1;
  let letsPage;

  $('.todo-string').on('keydown', () => {

  });

  function counters() {
    lengthOfAll = executionTodos.length;
    lengthOfUnsolved = lengthOfAll - lengthOfSolved;
  }

  function render() {
    const l = copyExecuteArray.length;
    let str = '';
    let pageStr = '';

    dataPage.forEach((item, index) => {
      pageStr += `<li><button class = "${item.classPage}" id="${item.idPage}" >${index + 1}</button></li>`;
    });

    copyExecuteArray.forEach((item) => {
      str += `<li><input type = "checkbox" class = "lists" id ="${item.check_but}" ${item.checkbox_position}
  > <span type = "text" class="input-text" 
  id = "${item.labelId}" >
  ${item.text_string}
  </span>
  <button class = "del-button" id ="${item.del_obj_but} ">Удалить</button></li>`;
    });

    $('.todo-list').html(str);
    $('.tabs-list').html(pageStr);

    counters();
    const str1 = `Выполненные задачи: <output name="count_done"> ${lengthOfSolved} </output>
  Невыполненные задачи: <output name="count_unsolved"> ${lengthOfUnsolved}</output>`;

    $('p1').html(str1);

    copyExecuteArray.splice(0, l);
  }

  function deleteEmptyPages() {
    let pageNow;
    let checkArray = [];
    dataPage.forEach((item, index) => {
      pageNow = index;
      const end = 5 * (pageNow + 1);
      const start = end - 5;
      checkArray = executionTodos.slice(start, end);
      const lengthCheckArray = checkArray.length;
      if (lengthCheckArray === 0) {
        dataPage.splice(pageNow, 1);
      }
    });
  // render();
  // return pageNumber;
  }

  $(document).on('click', '.input-text', function () {
    idNewElem = $(this).attr('id');
    $(this).replaceWith(`<input class="label-tag" " id = "${idNewElem}" type = "text" value="${$(this).text()}"/>`);

    $('.label-tag').focus();
  });

  $(document).on('blur', '.label-tag', () => {
    render();
  });
  $(document).on('keyup', '.label-tag', function () {
    $('.label-tag').focus();
    executionTodos.find((item) => {
      if (item.labelId === idNewElem) {
        item.text_string = $(this).val();
      }
      copyExecuteArray = executionTodos.slice();
    });
    $('.labelTlabel-tagag').focus();
  });

  $('#add-new-button').on('click', () => {
    let valString = $('.todo-string').val();
    valString = valString.trim();
    arrayOfStrings = valString.split('');
    valString = valString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    trueString = arrayOfStrings.every((elem) => elem === ' ');
    const newStringList = {
      checkbox_position: ' ', check_but: '0', text_string: ' ', del_obj_but: ' ', labelId: '0',
    };
    const newPageList = {
      idPage: '', classPage: 'label-button',
    };
    if (trueString !== true) {
      newStringList.check_but += count;
      newStringList.text_string = valString;
      newStringList.del_obj_but = `1000000${count}`;
      newStringList.labelId = `2000000${count}`;
      let i = newStringList;
      executionTodos.push(i);
      count += 1;
      counter += 1;
      countpage += 1;
      const checkCountPage = countpage - 1;
      if ((counter % 5) === 0) {
        tabnum += 1;
      }
      pageNumber = tabnum;
      const activId = `page-id-${pageNumber}`;
      newPageList.idPage = activId;
      if (countpage === 0) { newPageList.classPage = 'label-button active'; }

      if (((countpage % 5) === 0) || (checkCountPage === 0)) {
        dataPage.push(newPageList);
      }
      i = ' ';
      const lengthExecute = executionTodos.length;
      if (lengthExecute < 5) {
        copyExecuteArray = executionTodos.slice(0, count);
      } else {
        copyExecuteArray = executionTodos.slice(0, 5);
      }
      render();
      // deleteEmptyPage();
    } else {
      copyExecuteArray = executionTodos.slice(0, 5);
      render();
    }
  });
  // Function of adding tasks by button "Enter"
  $('.todo-string').on('keydown', (enter) => {
    if (enter.key === 'Enter') {
      let valString = $('.todo-string').val();
      valString = valString.trim();
      arrayOfStrings = valString.split('');
      valString = valString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      trueString = arrayOfStrings.some((elem) => elem === ' ');
      const newStringList = {
        checkbox_position: ' ', check_but: '0', text_string: ' ', del_obj_but: ' ', labelId: '0',
      };
      const newPageList = {
        idPage: '', classPage: 'label-button',
      };
      if (trueString !== true) {
        newStringList.check_but = count;
        newStringList.text_string = valString;
        newStringList.del_obj_but = `1000000${count}`;
        newStringList.labelId = `2000000${count}`;
        let i = newStringList;
        executionTodos.push(i);
        count += 1;
        counter += 1;
        countpage += 1;
        const checkCountPage = countpage - 1;
        if ((counter % 5) === 0) {
          tabnum += 1;
        }
        pageNumber = tabnum;
        const activId = `page-id-${pageNumber}`;
        newPageList.idPage = activId;
        const a = checkCountPage;
        if (a === 0) {
          newPageList.classPage = 'label-button active';
        }
        console.log('checkCountPage', checkCountPage);
        if (((countpage % 5) === 0) || (checkCountPage === 0)) {
          dataPage.push(newPageList);
        }

        i = ' ';
        const lengthExecute = executionTodos.length;
        if (lengthExecute < 5) {
          copyExecuteArray = executionTodos.slice(0, lengthExecute);
        } else {
          copyExecuteArray = executionTodos.slice(0, 5);
        }
        render();
      } else {
        copyExecuteArray = executionTodos.slice(0, 5);
        render();
      }
    }
  });

  $(document).on('click', '#delete-done-button', () => {
    filterArray = executionTodos.filter((item) => item.checkbox_position === 'checked');
    const lengthA = filterArray.length;
    lengthOfSolved -= lengthA;
    executionTodos = executionTodos.filter((item) => item.checkbox_position !== 'checked');
    const lengthExecute = executionTodos.length;

    deleteEmptyPages();

    if (lengthExecute < 5) {
      copyExecuteArray = executionTodos.slice(0, lengthExecute);
    } else {
      copyExecuteArray = executionTodos.slice(0, 5);
    }
    render();
  });

  $(document).on('click', '#only-done-button', () => {
    const someUsers = executionTodos.filter((item) => item.checkbox_position === 'checked');

    copyExecuteArray = someUsers.slice();
    pageNumNow = dataPage.findIndex((item) => item.classPage === 'label-button active');
    const end = 5 * (pageNumNow + 1);
    const start = end - 5;
    copyExecuteArray = executionTodos.slice(start, end);
    render();
  });

  $('#only-unsolved-button').on('click', () => {
    const someUsers = executionTodos.filter((item) => item.checkbox_position !== 'checked');
    copyExecuteArray = someUsers.slice();
    render();
  });

  $('#all-button').on('click', () => {
    copyExecuteArray = executionTodos.slice();
    render();
  });

  function filterDel() {
    executionTodos.forEach((item, index) => {
      if (item.del_obj_but.trim() === takeIdDelBut.trim()) {
        numForDel = index;
      }
    });
  }

  $(document).on('click', '.del-button', function clickForDelete() {
    takeIdDelBut = $(this).attr('id');
    filterDel();
    executionTodos.splice(numForDel, 1);
    const lengthExecute = executionTodos.length;
    deleteEmptyPages();

    if (lengthExecute < 5) {
      copyExecuteArray = executionTodos.slice(0, lengthExecute);
    } else {
      copyExecuteArray = executionTodos.slice(0, 5);
    }
    render();
  });

  $('#check-all-tasks').on('click', () => {
    if (countTap % 2 === 0) {
      executionTodos.forEach((item) => {
        item.checkbox_position = 'checked';
      });
    } else {
      executionTodos.forEach((item) => {
        item.checkbox_position = ' ';
      });
    }
    pageNumNow = dataPage.findIndex((item) => item.classPage === 'label-button active');
    const end = 5 * (pageNumNow + 1);
    const start = end - 5;
    copyExecuteArray = executionTodos.slice(start, end);
    render();
  });

  $(document).on('click', '.lists', function f() {
    takeIdForCheck = $(this).attr('id');
    indexCheck = executionTodos.findIndex((item) => item.check_but === takeIdForCheck);
    executionTodos.find((item, index) => {
      if (index === indexCheck) {
        if (item.checkbox_position === 'checked') {
          item.checkbox_position = ' ';
        } else {
          item.checkbox_position = 'checked';
        }
      }
    });

    checkedFilterArray = executionTodos.filter((item) => item.checkbox_position === 'checked');
    lengthOfSolved = checkedFilterArray.length;
    const lengthExecute = executionTodos.length;
    if (lengthExecute < 5) {
      copyExecuteArray = executionTodos.slice(0, count);
    } else {
      copyExecuteArray = executionTodos.slice(0, 5);
    }
    render();
  });

  $(document).on('click', '.label-button', function () {
    let pageNumNow;

    const pageId = $(this).attr('id');

    console.log('pageId', pageId);

    pageNumNow = dataPage.findIndex((item) => item.idPage === pageId);
    dataPage.forEach((item) => {
      if (item.idPage === pageId) {
        item.classPage = 'label-button active';
      } else {
        item.classPage = 'label-button';
      }
    });

    console.log('pageNumNow', pageNumNow);
    const end = 5 * (pageNumNow + 1);
    console.log('end', end);
    const start = end - 5;
    console.log('start', start);
    copyExecuteArray = executionTodos.slice(start, end);
    console.log('letsPage', letsPage);

    render();
  // render();
  });

  // конец
});