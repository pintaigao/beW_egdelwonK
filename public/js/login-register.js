function showQuestionBoxForm(){
    $('#QuestionBoxModal').fadeOut('fast',function(){
        $('.QuestionBox').fadeIn('fast');
    });
     $('.error').removeClass('alert alert-danger').html('');
}

function openQuestionBoxModal(){
    showQuestionBoxForm();
    setTimeout(function(){
        $('#QuestionBoxModal').modal('show');
    }, 230);

}
// function openRegisterModal(){
//     showRegisterForm();
//     setTimeout(function(){
//         $('#QuestionBoxModal').modal('show');
//     }, 230);

// }

function loginAjax(){
    /*   Remove this comments when moving to server
    $.post( "/login", function( data ) {
            if(data == 1){
                window.location.replace("/home");
            } else {
                 shakeModal();
            }
        });
    */

/*   Simulate error message from the server   */
     shakeModal();
}

function shakeModal(){
    $('#QuestionBoxModal .modal-dialog').addClass('shake');
             $('.error').addClass('alert alert-danger').html("Invalid email/password combination");
             $('input[type="password"]').val('');
             setTimeout( function(){
                $('#QuestionBoxModal .modal-dialog').removeClass('shake');
    }, 1000 );
}


