$(document).ready(function(){
    $("#form-change-password").submit(function(e){
        e.preventDefault();
        let user_id = $('.user_id').val()
        let current_password = $('#current_password').val()
        let confirm_new_password = $('#confirm_new_password').val()
        let new_password = $('#new_password').val()
        $.ajax({
            url: "content/template/current_password.php",
            type: "POST",
            data: {user_id:user_id},
            success: function(data) {
                if (md5(current_password) !== data) {
                    $('#must-match').hide()
                    $('#invalid-current-password').show()
                    $('#password-updated').hide()
                }
                else if (new_password !== confirm_new_password) {
                    $('#password-updated').hide()
                    $('#must-match').show()
                    $('#invalid-current-password').hide()
                }
                else {
                    $.ajax({
                        url: "content/template/update_password.php",
                        type: "POST",
                        data: {user_id:user_id,new_password:new_password},
                        success: function() {
                            $('#invalid-current-password').hide()
                            $('#must-match').hide()
                            $('#password-updated').show()
                            $('#current_password').val('')
                            $('#confirm_new_password').val('')
                            $('#new_password').val('')
                        }
                    });
                }
            }
        });
    })
    $('#reset-and-close').on('click',function(){
        $('#modal_my_profile').modal('toggle')
        $('#password-updated').hide()
        $('#invalid-current-password').hide()
        $('#must-match').hide()
    })
})