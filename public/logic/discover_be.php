<?php
    require_once __DIR__ .'/../connections/conexion.php';
    // include(__DIR__ .'/../inc/security.php');

    // The login logic //
    if ((isset($_POST["MM_insert"])) && ($_POST["MM_insert"] == "formsignin")) {
        if (!isset($_SESSION)) {
            session_start();
        }

        $loginFormAction = $_SERVER['PHP_SELF'];
        if (isset($_GET['accesscheck'])) {
            $_SESSION['PrevUrl'] = $_GET['accesscheck'];
        }

        $email                      = $_POST['email'];
        $password                   = $_POST['password'];
        $MM_redirectLoginSuccess    = "discover.php";
        $MM_redirectLoginFailed     = "discover.php?error=1";

        $query = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
        $sql = pg_query($query);
        $totalRow_query = pg_num_rows($sql);

        if($totalRow_query > 0)
        {
            $row_query = pg_fetch_assoc($sql);
 
            $_SESSION['mp_UserId'] = $row_query['user_id'];
            $_SESSION['mp_Mail'] = $row_query['email'];
            $_SESSION['mp_Nivel'] = $row_query['rank'];

            if (isset($_SESSION['PrevUrl']) && false) {
                $MM_redirectLoginSuccess = $_SESSION['PrevUrl'];	
            }
            header("Location: " . $MM_redirectLoginSuccess );
        }
        else
        {
            header("Location: " . $MM_redirectLoginFailed );
        }
    }
    // End to the login logic //


    $requestData['user_id'] = $_SESSION['mp_UserId'];
    isset($_GET['list']) ? $requestData['lid'] = $_GET['list'] : !isset($requestData['lid']);

    $current_user = u_all_info('*', $requestData);
    $my_lists = listings('*', $requestData);
    $my_songs = list_details('*', $requestData);
    // var_dump($my_songs);

    // $requestSongData = $my_songs['songId'];
    // $song_list = song_list('*', $requestSongData);
?>