<%-- 
    Document   : index
    Created on : Dec 16, 2014, 12:16:23 PM
    Author     : OLAF
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>WebMIPMap</title>
        <!--JQuery-->
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script type="text/javascript" src="https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
        <script type="text/javascript" src="jMenu.jquery.min.js"></script>
        <script type="text/javascript" src="jquery.steps.min.js"></script>
        <script type="text/javascript" src="jquery.validate.min.js"></script>
        <script type="text/javascript" src="jstree.min.js"></script>
        <script type="text/javascript" src="dom.jsPlumb-1.7.2-min.js"></script>
        <!--javascript for textarea-->
        <script type="text/javascript" src="rangyinputs-jquery.js"></script>
        <!--javascript for this page-->
        <script src="functions.js"></script>
        <script src="mipmapjavascript.js"></script>
        
        <link rel="stylesheet" href="mipmaplook.css" />
        <!--css for tabs, dialogs etc-->
        <link rel="stylesheet" href="jquery.ui.css">
        <!--css for wizard-->
        <link rel="stylesheet" href="jquery.steps.css">
        <!--css for main menu-->
        <link rel="stylesheet" href="sm-clean.css" />
        <!--css for jstree-->
        <link rel="stylesheet" href="themes/default/style.css" />
        <!--css for jsplumb(arrows)-->
        <link rel="stylesheet" href="jsplumb.css" />
    </head>
    <body>
        <div id="navMenu">
        <ul id="jMenu">
            <li>
                <a>Mapping Task</a>
                <ul>
                    <li><a id="newTask">New</a></li>
                    <li><a id="openTask">Open</a></li>
                    <li><a id="saveTask">Save</a></li>
                    <li><a id="deleteTask">Delete</a></li>
                </ul>
            </li>           
            <li>
                <a>Map</a>
                <ul>
                    <li><a id="generate">Generate Transformations</a></li>
                    <li><a id="export">Export TGDs</a></li>
                </ul>
            </li>
             <!--li>
                <a>Preprocessing</a>
            </li>
            <li>
                <a id="logout">Logout</a>
            </li-->
        </ul>
        </div>
               
    <div id="dialog_container"></div>
        
    <div id="leftdiv">
    </div>
    <div id="rightdiv">
        <div id="maindiv">
            <!--keep the list element for the tabs-->
            <ul>
            </ul>
        </div>

        <div id="tgd_div">
            <ul>
            </ul>
        </div>
    </div>
    </body>
</html>