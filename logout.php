<?php
    session_start();
    unset($_SESSION['auth']);
	if(isset($_SESSION['auth'])) {
        session_destroy();
    }
    if(isset($_SESSION)) {
        header('Location: login.php');
    }
?>
