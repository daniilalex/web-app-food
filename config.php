<?
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'food';

//-- Create connection
$mysql = new mysqli();

$mysql = mysqli_connect($servername, $username, $password, $dbname);
mysqli_select_db($mysql, $dbname);

//-- Check connection
if ($mysql->connect_error) {
    die("Connection failed: " . $mysql->connect_error);
}
