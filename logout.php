<?php
    session_start();
    unset($_SESSION['email']);
	if(isset($_SESSION['email'])) {
        session_destroy();
    }
    if(isset($_SESSION)) {
        echo '<script>window.location="login.php"</script>';
    }
?>
