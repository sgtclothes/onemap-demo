<?php
    session_start();
    unset($_SESSION['auth']);
    unset($_SESSION['name']);
    unset($_SESSION['role']);
    setcookie('cd_onmp', '', time()-3600);
    setcookie('ml_onmp', '', time()-3600);
    setcookie('psss_onmp', '', time()-3600);
	if(isset($_SESSION['auth'])) {
        session_destroy();
    }
    if(isset($_SESSION)) {
        header('Location: login.php');
    }
?>
