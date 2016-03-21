<%-- 
    Document   : login
    Created on : Feb 19, 2016, 12:53:29 PM
    Author     : OLAF
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Web MIPMap Login</title>
    </head>
    <body>
        <p>
            Access allowed to authorized users only.
        </p>
        <p>
            Please enter your credentials:
        </p>
        <form action="j_security_check" method="POST">
          Username: <input type="text" name="j_username"><br>
          Password: <input type="password" name="j_password">
          <input type="submit" value="Login">
       </form>
    </body>
</html>
