console.log('JS');

$(document).ready(onReady);

function onReady(){
    console.log('JQ');
    $(document).on ('click', '.deleteButton', deleteTask);
    $(document).on ('click', '.completeButton', updateTask);
    $('#submitTask').on ('click', postTask);

    getTasks();

//     $('#explosion').hide();
//     $(document).on ('click', '.deleteButton', showExplosion);
}

// I tried to have an explosion gif show when the delete button is pressed
// but then I couldn't get it to go away. Or it went away right away and 
// was impossible to see...
//
// function showExplosion(){
//     $('#explosion').show();
//     // $('#explosion').hide();
// } 

const submitButtonAudio = new Audio();
submitButtonAudio.src = './audio/button-30.mp3'

const deleteButtonAudio = new Audio();
deleteButtonAudio.src = './audio/explosion-02.mp3'

const completeButtonAudio = new Audio();
completeButtonAudio.src = './audio/applause-8.mp3'

///////////////////////////////////////////////////////////////////////////////


function deleteTask(){
    console.log('this will delete!');
    let taskIdToDelete = $(this).closest('tr').data('id');
  $.ajax({
    method: 'DELETE',
    url: `/tasks/${taskIdToDelete}`
  }).then(function(response) {
    getTasks();
  }).catch(function(error) {
    console.log(error);
  })
}

///////////////////////////////////////////////////////////////////////////////


function getTasks() {
    // get task data from the server
    $.ajax({
        method: 'GET',
        url: '/tasks'
    })
    .then(function (response) {
        renderTasks(response);
    })
    .catch(function (error) {
        console.log('error in task get', error);
    });
}

///////////////////////////////////////////////////////////////////////////////


function renderTasks(listOfTasks) {
    $('#taskTableBody').empty();
    console.log(listOfTasks);
    for (let task of listOfTasks) {
        $('#taskTableBody').append(`
            <tr id="${task.id}" data-id="${task.id}" data-isDone="${task.complete}">
                <td>${task.task}</td>
                <td>${task.person_responsible}</td>
                <td>${task.description}</td>
                <td>${task.helpful_notes}</td>
                <td id="${task.id}complete">no</td>
                <td><button class="completeButton green-button" onClick="completeButtonAudio.play();">Complete</button></td>
                <td><button class="deleteButton red-button" onClick="deleteButtonAudio.play();" >Delete</button></td>
            </tr>`
            );
        if(task.complete===true){
            $(`#${task.id}`).addClass('isDone');
            $(`#${task.id}complete`).text('✔️');
        }
    }
    $('#taskName').val('');
    $('#personName').val('');
    $('#taskDescription').val('');
    $('#taskHelpfulNotes').val('');
}

///////////////////////////////////////////////////////////////////////////////


function postTask(){
    if($('#taskName').val()==='' ||
    $('#personName').val()==='' ||
    $('#taskDescription').val()==='' ||
    $('#taskHelpfulNotes').val()===''){ 
        alert('please fill out all fields');
        return false;
    }
    let newTask = {
        task: $('#taskName').val(),
        person_responsible: $('#personName').val(),
        description: $('#taskDescription').val(),
        helpful_notes: $('#taskHelpfulNotes').val(),
        complete: false
    }
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    })
    .then(function(response){
        console.log(response);
        getTasks();
    })
    .catch(function(error){
        console.log('error in task post', error);
        alert('error adding task, please try again later');
    })
}

///////////////////////////////////////////////////////////////////////////////


function updateTask(){
    console.log('this will update!');
    let taskIdToUpdate = $(this).closest('tr').data('id');
    let currentCompleteStatus = $(this).closest('tr').data('isDone');
    let newcurrentCompleteStatus = !currentCompleteStatus;
  
    $.ajax({
      method: 'PUT',
      url: `/tasks/${taskIdToUpdate}`,
      data: { newcurrentCompleteStatus: newcurrentCompleteStatus }
    }).then(function(response) {
      getTasks();
      $(this).closest('tr').addClass("isDone");
    }).catch(function(error) {
      console.log(error);
    })
  }









