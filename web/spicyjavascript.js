var scenarioCounter = 0;
var currentScenario = 0; 
var menucounter = 1;
var tabTemplate;
var tabs;
var tabs2;
var lastAction;
var readyCnt = 0;
var savedTasks;
var openedTasks = new Array();
/* variables for constant/function icons positioning */
var shiftXpixels = 10;
var shiftYpixels = 40;
var maxIconWidth = 150; 

var functionArray = [        
        {"name": "Abs", "hint": "Returns the absolute value of same type for Numbers / returns the Modulus for Complex", "func_name": "abs(x)"},
        {"name": "Append", "hint": "Appends second parameter to first paramenter as string", "func_name": "append(str1, str2)"},
        {"name": "Arc Cosine", "hint": "Inverse Cosine", "func_name": "acos(x)"},
        {"name": "Arc Cosine Hyperbolic", "hint": "Inverse Hyperbolic Cosine", "func_name": "acosh(x)"},
        {"name": "Arc Sine", "hint": "Inverse Sine", "func_name": "asin(x)"},
        {"name": "Arc Sine Hyperbolic", "hint": "Inverse Hyperbolic Sine", "func_name": "asinh(x)"},
        {"name": "Arc Tangent", "hint": "Inverse Tangent", "func_name": "atan(x)"},
        {"name": "Arc Tangent(2 parameters)", "hint": "Inverse Tangent with 2 parameters", "func_name": "atan2(y,x)"},
        {"name": "Arc Tangent Hyperbolic", "hint": "Inverse Hyperbolic Tangent", "func_name": "atanh(x)"},
        {"name": "Argument", "hint": "Argument of a complex number ", "func_name": "arg(c)"},
        {"name": "Binomial", "hint": "Binomial coefficients", "func_name": "binom(n,i)"},
        {"name": "Ceiling", "hint": "The smallest integer above the number", "func_name": "ceil(x)"},
        {"name": "Complex PFMC", "hint": "Converts a pair of real numbers to a complex number", "func_name": "complex(x,y)"},
        {"name": "Complex conjugate", "hint": "The complex conjugate of a number", "func_name": "conj(c)"},
        {"name": "Contains", "hint": "Returns true if str contains the subStr at least once", "func_name": "contains(str, subStr)"},    
        {"name": "ContainCount", "hint": "Returns the number of occurrences of subStr within str", "func_name": "containCount(str, subStr)"},
        {"name": "Cosine", "hint": "Cosine", "func_name": "cos(x)"},
        {"name": "Cosine Hyperbolic", "hint": "Hyperbolic Cosine", "func_name": "cosh(x)"},
        {"name": "Date", "hint": "Returns current date", "func_name": "date()"},
        {"name": "DateTime", "hint": "Returns current date in datetime format", "func_name": "datetime()"},
        {"name": "Exponential", "hint": "The result of the exponential function (e^x)", "func_name": "exp(x)"},
        {"name": "Floor", "hint": "The smallest integer below the number", "func_name": "floor(x)"},
        {"name": "If", "hint": "The if function; trueval will be returned if cond is >0 or True and falseval will be returned if cond is <= 0 or False", "func_name": "if(cond, trueval, falseval)"},
        {"name": "Imaginary", "hint": "Imaginary Component", "func_name": "im(c)"},
        {"name": "Index Of", "hint": " Returns the position of the first occurrence of a specified value in a string", "func_name": "indexof(str, subStr)"},
        {"name": "Is Null", "hint": "Tests if the argument is null", "func_name": "isNull(arg)"},
        {"name": "Is Not Null", "hint": "Tests if the argument is not null", "func_name": "isNotNull(arg)"},    
        {"name": "Length", "hint": "Returns the length of a string", "func_name": "len(str)"},
        {"name": "Log", "hint": "Logarithm base 10", "func_name": "log(x)"},
        {"name": "Ln", "hint": "Natural Logarithm", "func_name": "ln(x)"},
        {"name": "Modulus", "hint": "Calculates the modulus x % y of the arguments", "func_name": "mod(x,y)"},
        {"name": "New Id", "hint": "Gets the next number in a sequence", "func_name": "newId()"},
        {"name": "Null", "hint": "Returns null value", "func_name": "null()"},    
        {"name": "Polar", "hint": "Constructs a complex number from modulus and argument", "func_name": "polar(r, theta)"},
        {"name": "Power", "hint": "Computes the power of an number", "func_name": "pow(x,y)"},
        {"name": "Real", "hint": "Real Component", "func_name": "re(c)"},
        {"name": "Replace", "hint": "In the first argument, find all occurences of the second argument and replace them with the third one ", "func_name": "replace(str, text1, text2)"},    
        {"name": "Round", "hint": "The closest integer to the argument. The second argument is optional and refers to decimal places", "func_name": "round(x,[y])"},
        {"name": "Sine", "hint": "Sine", "func_name": "sin(x)"},
        {"name": "Sine Hyperbolic", "hint": "Hyperbolic Sine", "func_name": "sinh(x)"},
        {"name": "Square Root", "hint": "The square root of the parameter", "func_name": "sqrt(x)"},
        {"name": "Substring", "hint": "Extract substring of first argument. Second argument is starting index, third argument is optional and it is the ending index", "func_name": "substring(str, start, [end])"},
        {"name": "Tangent", "hint": "Tangent", "func_name": "tan(x)"},
        {"name": "Tangent Hyperbolic", "hint": "Hyperbolic Tangent", "func_name": "tanh(x)"},
        {"name": "To Date", "hint": "Converts a string to date format given a specific template pattern, e.g. &quot;MM/DD/YYYY&quot;wiz, for the input data, provided by the user", "func_name": "todate(str, pattern)"},    
        {"name": "To Double", "hint": "Returns the double value of a number", "func_name": "todouble(x)"},
        {"name": "To Integer", "hint": "Returns the integer value of a number", "func_name": "toint(x)"},
        {"name": "To String", "hint": "Returns the string value of the parameter", "func_name": "tostr(x)"},
        {"name": "To Lowercase", "hint": "Converts a string to lowercase letters", "func_name": "tolower(str)"},
        {"name": "To Uppercase", "hint": "Converts a string to uppercase letters", "func_name": "toupper(str)"}
    ];

//common options for source arrow connections
var commonSource = {
    connector:"Straight",
    isSource:true,
    anchor:"Right",
    endpoint:"Blank",
    connectorStyle : { strokeStyle:"black", lineWidth:2 },
    connectorOverlays: [ [ "Arrow", {
      width: 10,
      length: 12,
      foldback: 0,
      location: 1,
      id: "arrow"
    } ] ]
};
//common options for target arrow connections
var commonTarget = {
    isTarget:true, 
    anchor:"Left",
    endpoint:"Blank"
};

//takes a JSON object as input and creates the source and target schema trees
//the existing connections between them and the corresponding visual components
function loadSchemaTrees(taskName, JSONTreesData){
    
    //create a new instance of jPlumb for each tab
    var newplumb = jsPlumb.getInstance();
    
    var sourceTreeArray =[];   
    for (var i=0;i<JSONTreesData.trees[0].data.length;i++){
       sourceTreeArray.push({id: JSONTreesData.trees[0].data[i].id, 
        parent:JSONTreesData.trees[0].data[i].parent, 
        text:JSONTreesData.trees[0].data[i].text, 
        icon:"images/"+JSONTreesData.trees[0].data[i].icon
       });
    }
    var targetTreeArray =[];   
    for (var k=0;k<JSONTreesData.trees[1].data.length;k++){
       targetTreeArray.push({id: JSONTreesData.trees[1].data[k].id, 
        parent:JSONTreesData.trees[1].data[k].parent, 
        text:JSONTreesData.trees[1].data[k].text, 
        icon:"images/"+JSONTreesData.trees[1].data[k].icon
       });
    } 
    scenarioCounter++;
    addTreeTab(taskName);    
    makeTrees(sourceTreeArray, targetTreeArray, "jstreeSource"+ scenarioCounter, "jstreeTarget"+ scenarioCounter, newplumb, JSONTreesData); 
    addProjectTree(scenarioCounter);              
    currentScenario=scenarioCounter;     
}

//adds the Tab with the source and target tree
function addTreeTab(taskName) {
        var label = scenarioCounter+". "+taskName,
        id = "schemaTabs-" + scenarioCounter,
        li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
        tabContentHtml = '<div id="maindivleft'+scenarioCounter+'" class="maindivleft">\
            <div id="jstreeSource'+ scenarioCounter+ '" class="jstreeSource myJsTree">\
            </div>\
        </div>\
        <div id="maindivcenter'+scenarioCounter+'" class="maindivcenter">\
        </div>\
        <div id="maindivright'+scenarioCounter+'" class="maindivright">\
             <div id="jstreeTarget'+ scenarioCounter+ '" class="jstreeTarget myJsTree">\
            </div>\
        </div>';
        tabs.find( ".ui-tabs-nav" ).append( li );
        tabs.append( "<div id='" + id + "' class='treeTab'><p>" + tabContentHtml + "</p></div>" );
        tabs.tabs( "refresh" );
        tabs.tabs({active: -1});    
    }

//adds the tab with Transformations' info
function addViewTransformationsTab(scenarioCnt) {
    $.post("MappingServlet", {action:"show_mapping_task_info", scenarioNo: scenarioCnt
        }, function(responseText){ 
        responseText = responseText.replace(/\r?\n/g, '<br>');
        var label = scenarioCnt+". View Transformations",
        id = "viewTransformationsTabs-" + scenarioCnt,
        li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
        tabContentHtml = responseText;        
        tabs.find( ".ui-tabs-nav" ).append( li );
        tabs.append( "<div id='" + id + "'><p>" + tabContentHtml + "</p></div>" );
        tabs.tabs( "refresh" );
        $("#"+id).addClass("viewTab"); //for css
        ///////$( '#maindiv a[href="#viewTransformationsTabs-'+scenarioCnt+'"]').trigger( "click" ); ///////
    });   
}

function refreshViewTransformationsTab(scenarioCnt){
    $.post("MappingServlet", {action:"show_mapping_task_info", scenarioNo: scenarioCnt
        }, function(responseText){
        responseText = responseText.replace(/\r?\n/g, '<br>');
        var tabContentHtml = responseText;
        var parElement = tabs.find("#viewTransformationsTabs-" + scenarioCnt);
        parElement.html("<p>" + tabContentHtml + "</p>");
        tabs.tabs( "refresh" );
    });
}

//adds the SQL Output tab
function addViewSqlTab(scenarioCnt) {
       $.post("MappingServlet", {action:"sql_output", scenarioNo: scenarioCnt
        }, function(responseText){ 
        responseText = responseText.replace(/\r?\n/g, '<br>');
        var label = scenarioCnt+". View Sql",
        id = "viewSqlTabs-" + scenarioCnt,
        li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
        tabContentHtml = responseText;        
        tabs.find( ".ui-tabs-nav" ).append( li );
        tabs.append( "<div id='" + id + "' class='sqlTab'><p>" + tabContentHtml + "</p></div>" );
        tabs.tabs( "refresh" );
        $("#"+id).addClass("viewTab");
        ///////$( '#maindiv a[href="#viewSqlTabs-'+scenarioCnt+'"]').trigger( "click" ); ///////
    });
}

//checks if mapping data has been modified and refreshes the SQL output
function checkSql(tabId){
    var findString = "viewSqlTabs-";
    var scenarioCnt = tabId.substring(tabId.length, tabId.indexOf(findString)+findString.length);
    $.post("MappingServlet", {action:"sql_output", scenarioNo: scenarioCnt
        }, function(responseText){
        responseText = responseText.replace(/\r?\n/g, '<br>');
        var newSql = "<p>" + responseText + "</p>";
        var oldSql = $("#"+tabId).html();
        if(newSql!==oldSql){
           var r = confirm("The SQL Queries Have Been Modified, Refresh ?");
           if (r === true) {
               $("#"+tabId).html(newSql);
               tabs.tabs( "refresh" );
           } 
        }
    });
}

//adds the XQuery Output tab
function addViewXQueryTab(scenarioCnt) {
    $.post("MappingServlet", {action:"xquery_output", scenarioNo: scenarioCnt
        }, function(responseText){ 
        responseText = responseText.replace(/\r?\n/g, '<br>');
        var label = scenarioCnt+". View XQuery",
        id = "viewXQueryTabs-" + scenarioCnt,
        li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
        tabContentHtml = responseText;        
        tabs.find( ".ui-tabs-nav" ).append( li );
        tabs.append( "<div id='" + id + "' class='xqueryTab'><p>" + tabContentHtml + "</p></div>" );
        tabs.tabs( "refresh" );
        $("#"+id).addClass("viewTab");
        ///////$( '#maindiv a[href="#viewXQueryTabs-'+scenarioCnt+'"]').trigger( "click" ); ///////
    });
}

//checks if mapping data has been modified and refreshes the XQuery output
function checkXQuery(tabId){
    var findString = "viewXQueryTabs-";
    var scenarioCnt = tabId.substring(tabId.length, tabId.indexOf(findString)+findString.length);
    $.post("MappingServlet", {action:"xquery_output", scenarioNo: scenarioCnt
        }, function(responseText){
        responseText = responseText.replace(/\r?\n/g, '<br>');
        var newXQuery = "<p>" + responseText + "</p>";
        var oldXQuery = $("#"+tabId).html();
        if(newXQuery!==oldXQuery){
           var r = confirm("The XQuery Queries Have Been Modified, Refresh ?");
           if (r === true) {
               $("#"+tabId).html(newXQuery);
               tabs.tabs( "refresh" );
           } 
        }
    });
}

//creates the TGDs Tabs for the selected scenario
function addTGDsTabs(obj) {
    //find all tabs with the same scenario number as the current one...
    var list = $("#tgd_div .tgdTab");
    list.each(function() {
        var tabId = $(this).attr('id');
        var findString1 = 'gdTabs-';
        var findString2 = 'no';
        var scenarioNo = tabId.substring(tabId.indexOf(findString1)+findString1.length, tabId.indexOf(findString2));
        //do NOT change to "===", they are not of the same type
        if(scenarioNo==currentScenario){
            //...and replace the previous tabs
            $('a[href$="'+tabId+'"]').parent().remove();
            $(this).remove();
            tabs2.tabs( "refresh" );
       }
    });  
    for (var i=0;i<obj.tgds.length;i++){
        addTGDTab(i+1, obj.tgds[i].tgd.replace(/\r?\n/g, '<br>'));
    }
    var onlyConstant = false;
    if(obj.tgds.length===0 && obj.constantTgds.length>0){
        onlyConstant = true;
    }
    for (var i=0;i<obj.constantTgds.length;i++){
        addConstantTGDTab(i+1, obj.constantTgds[i].constantTgd.replace(/\r?\n/g, '<br>'), onlyConstant);
    }
    
    var list2 = $("#maindiv .viewTab");
    var existing = false;
    list2.each(function() {
        if($(this).attr('id')==='viewTransformationsTabs-' + currentScenario){
            existing=true;
        }
    });
    //open the View Transformations Tab if it doesn't exist already
    if (!existing){
        addViewTransformationsTab(currentScenario);
    }
    //or else update the information in it
    else{
        refreshViewTransformationsTab(currentScenario);
    }        
}

//creates a TGD Tab
function addTGDTab(number, content) { 
    //tgd tab configuration
    var label = currentScenario+". TGD"+number,
        id = "tgdTabs-"+currentScenario+"no"+number,
        li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
        tabContentHtml = "<p>"+content+"</p>";
    tabs2.find( ".ui-tabs-nav" ).append( li );
    tabs2.append( "<div id='" + id + "' class='tgdTab'><p>" + tabContentHtml + "</p></div>" );
    tabs2.tabs( "refresh" );
    //activate the first tgd tab of the current scenario
    if (number===1){
        tabs2.tabs({active: -1});
    }            
}

//creates a ConstantTGD Tab
function addConstantTGDTab(number, content, onlyConstant) { 
    //tgd tab configuration
    var label = currentScenario+". Constant TGD"+number,
        id = "constantTgdTabs-"+currentScenario+"no"+number,
        li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
        tabContentHtml = "<p>"+content+"</p>";
    tabs2.find( ".ui-tabs-nav" ).append( li );
    tabs2.append( "<div id='" + id + "' class='tgdTab'><p>" + tabContentHtml + "</p></div>" );
    tabs2.tabs( "refresh" );
    //activate the first tgd tab of the current scenario
    if (number===1 && onlyConstant){
        tabs2.tabs({active: -1});
    }            
}

//function that removes TGD Tabs with the same scenario number as the one removed
function removeTGDTabs(scenarioNo){
    var list = $("#tgd_div .tgdTab");
    list.each(function() {
        var tabId = $(this).attr('id');
        var findString1 = 'gdTabs-';
        var findString2 = 'no';
        var tabScenarioNo = tabId.substring(tabId.indexOf(findString1)+findString1.length, tabId.indexOf(findString2));
        if(tabScenarioNo==scenarioNo){
            $('a[href$="'+tabId+'"]').parent().remove();
            $(this).remove();
       }
    });
}

//function that checks if there are no TGD tabs left in the lower area
function checkTGDTabArea(){
    var tabCount = $('#tgd_div >ul >li').size();
    if(tabCount===0){
        //remove TGD Tab Area
        $("#tgd_div").css("display","none");
        //set the main area to its default size
        $("#maindiv").css("height","100%");
        tabs.tabs( "refresh" );
    }
}

//creates the tree to the left area with links to each tab
function addProjectTree(scenarioCnt){
    $("#leftdiv").append("<div id='leftdiv"+scenarioCnt+"' class='treediv'></div>");

    data_arr=[
     { "id" : "projectTreeRoot"+scenarioCnt, "parent" : "#", "text" : "Scenario "+scenarioCnt },
     { "id" : "schemaProjectTreeNode"+scenarioCnt, "parent" : "projectTreeRoot"+scenarioCnt, "text" : "Schema Tree"},
     { "id" : "viewTransformationsProjectTreeNode"+scenarioCnt, "parent" : "projectTreeRoot"+scenarioCnt, "text" : "View Transformations Window"},
     { "id" : "viewSqlProjectTreeNode"+scenarioCnt, "parent" : "projectTreeRoot"+scenarioCnt, "text" : "View Sql"},
     { "id" : "viewXQueryProjectTreeNode"+scenarioCnt, "parent" : "projectTreeRoot"+scenarioCnt, "text" : "View XQuery"}
    ];        


    $("#leftdiv"+scenarioCnt).bind("ready.jstree", function(){
        var treeSource = $(this);
        treeSource.jstree("open_all");
        //do not show expand/colapse icons
        treeSource.find('.jstree-node').children('.jstree-ocl').css( "display", "none" );
        treeSource.find('#projectTreeRoot'+scenarioCnt).addClass("projectTreeRoot");
        treeSource.find('#schemaProjectTreeNode'+scenarioCnt).addClass("schemaProjectTreeNode");
        treeSource.find('#viewTransformationsProjectTreeNode'+scenarioCnt).addClass("projectTreeNode");
        treeSource.find('#viewSqlProjectTreeNode'+scenarioCnt).addClass("projectTreeNode");
        treeSource.find('#viewXQueryProjectTreeNode'+scenarioCnt).addClass("projectTreeNode");
        
        treeSource.find('#projectTreeRoot'+scenarioCnt).data("scenarioNo",scenarioCnt);
        
        treeSource.find('#viewTransformationsProjectTreeNode'+scenarioCnt).data("type","viewTransformations");
        treeSource.find('#viewSqlProjectTreeNode'+scenarioCnt).data("type","viewSql");
        treeSource.find('#viewXQueryProjectTreeNode'+scenarioCnt).data("type","viewXQuery");        
    });

    //wholerow plugin makes the dots disappear
    $("#leftdiv"+scenarioCnt).jstree({'plugins' : ['themes','wholerow','contextmenu'],contextmenu: {items: customMenu},'core' : {'themes':{'icons': false},'multiple' : false,'check_callback' : true,'data': data_arr}});

    $('#leftdiv').find(".treediv").css("background-color","#E0E0EB");
    $('#leftdiv'+scenarioCnt).css("background-color","#8AB8E6");
}

//on doubleclicking on the constant menu, open options menu for the constant
function createConstantOptionsPopup(item_id){
    var previous_txt = $("#"+item_id).find("span").text();
    var constant_form_text = '<form id="constant-options" class="" action="#" title="Constant options">\
        <input type="radio" name="type" class="constantOption" id="stringOption" value="string" checked>String<br>\
        <input type="radio" name="type" class="constantOption" id="numberOption" value="number">Number<br>\
        <input type="radio" name="type" class="constantOption" id="funcOption" value="function">Function<br><br>\
        <input autofocus id="text_field" type="text" name="constant_value" value='+previous_txt+'><br><br>\
        <select id="func_selection" disabled>\
          <option selected disabled hidden value=""></option>\
          <option value="newId()">newId()</option>\
          <option value="date()">date()</option>\
        </select> \
        </form>';
    
    function checkRegexp( o, regexp) {
        if ( !( regexp.test( o ) ) ) {
        return false;
        } else {
        return true;
        }
    }
    
    $('#dialog_container').append(constant_form_text);
    //Dialog Setup
        var dialog = $("#constant-options").dialog({
          width : 'auto',
          height : 'auto',
          minHeight: 260,
          modal: true,
           buttons: {
            "OK": function(){
                var valid = true;
                var error_msg;                
                var radio_val = $("input:radio[name=type]:checked").val();
                var result_string;
                if(radio_val==="string"){  
                   var txt_val = $("#text_field").val();
                   valid = (txt_val!=="");
                   if (valid){                       
                        txt_val = '"'+txt_val+'"';
                        result_string = txt_val;;
                    }
                    else{
                        $("#text_field").addClass("ui-state-error");
                        error_msg="Please do not enter a blank value";
                    }                   
                }
                else if(radio_val==="number"){
                    var txt_val = $("#text_field").val();
                    valid = valid && checkRegexp(txt_val, /^[0-9]+$/);
                    if (valid){
                        result_string = txt_val;
                    }
                    else{
                        $("#text_field").addClass("ui-state-error");
                        error_msg="Please enter a numeric value";
                    }
                }
                else if (radio_val==="function"){
                   result_string = $("#func_selection").val();
                }
                $("#"+item_id).find("span").html(result_string);
                if(valid){
                    dialog.dialog("close");
                }
                else{
                    alert(error_msg);
                }
            },
            Cancel: function() {
            dialog.dialog("close");
            }
          },
          create: function(event, ui) { 
            var widget = $(this).dialog("widget");
          $(".ui-dialog-titlebar-close span", widget).removeClass("ui-icon-closethick").addClass("ui-icon-mine");
          }
          ,close: function(event, ui) { $(this).remove(); }
        });  
}

//on doubleclicking on the function menu, open options menu for the function
function createFunctionOptionsPopup(newplumb, item_id){
    var previous_txt = $("#"+item_id).find(".span_hidden").text();
    var src_attributes="";
    var idSourceConnection;
    var sourcePath;
    var relatedConnections = newplumb.getConnections({target: $('#'+item_id).find('img').attr('id')});
    for(var c=0; c<relatedConnections.length; c++) {
        idSourceConnection = $('#'+relatedConnections[c].sourceId).closest('.myJsTree').attr('id');
        sourcePath = $('#'+idSourceConnection).jstree(true).get_path('#' + relatedConnections[c].sourceId,".");
        if (sourcePath.lastIndexOf(" (")>=0){
            sourcePath = sourcePath.substring(0, sourcePath.lastIndexOf(" ("));
            src_attributes += sourcePath;
        }  
    }

    var constant_form_text1 = '<form id="function-options" class="" action="#" title="Function options">\
        <label for="src_attr_listbox">Source Attributes: </label>\
        <select id="src_attr_listbox" title="Doubleclick on a value on this area to add it to the \'Function Value\'" name="src_attributes" size="4"\
            ondblclick="$(\'#func_val_textarea\').replaceSelectedText($(this).children(\'option:selected\').text());">';
    var constant_form_text2='';
        for(var c=0; c<relatedConnections.length; c++) {
            idSourceConnection = $('#'+relatedConnections[c].sourceId).closest('.myJsTree').attr('id');
            sourcePath = $('#'+idSourceConnection).jstree(true).get_path('#' + relatedConnections[c].sourceId,".");
            if (sourcePath.lastIndexOf(" (")>=0){
                sourcePath = sourcePath.substring(0, sourcePath.lastIndexOf(" ("));
            }
            constant_form_text2+='<option value="'+sourcePath+'">'+sourcePath+'</option>';
        }
    var constant_form_text3='</select><br><br>\
        <label for="func_val_textarea">Insert Function: </label>\
        <select id="func_selection" onchange="$(\'#func_val_textarea\').replaceSelectedText($(this).val());" >\
          <option selected disabled hidden value=""></option>';                  
    var constant_form_text4='';
        for (var i=0;i<functionArray.length;i++){
            constant_form_text4+='<option class="function-selection" value="'+functionArray[i].func_name+'"title="'+functionArray[i].hint+'">'+functionArray[i].name+'</option>';
        }                        
    var constant_form_text5 ='</select><br><br>\
        <label for="func_val_textarea">Function Value: </label>\
        <textarea autofocus id="func_val_textarea" rows="4" name="src_attr" form="function-options">'+previous_txt+'</textarea><br>\
        </form>';
    var constant_form_text1=constant_form_text1+constant_form_text2+constant_form_text3+constant_form_text4+constant_form_text5;

    $('#dialog_container').append(constant_form_text1);
    //Dialog Setup
    var dialog = $( "#function-options" ).dialog({
      width : 'auto',
      height : 'auto',
      minWidth: 300,
      minHeight: 410,
      modal: true,
       buttons: {
        "OK": function(){
            var result_string = $("#func_val_textarea").val();
            var shown_result = result_string;
            if(shown_result.length>15){
                shown_result = shown_result.substring(0,15)+"...";
            }
            $("#"+item_id).find(".span_hidden").html(result_string);
            $("#"+item_id).find(".span_shown").html(shown_result);
            dialog.dialog("close");
        },
        Cancel: function() {
        dialog.dialog("close");
        }
      },
      create: function(event, ui) { 
        var widget = $(this).dialog("widget");
      $(".ui-dialog-titlebar-close span", widget).removeClass("ui-icon-closethick").addClass("ui-icon-mine");
      }
      ,close: function(event, ui) { $(this).remove(); }
    }); 
}

//pop up window with save options
function createSaveMappingTaskPopup(){
    var save_task_text = '<form id="save-task" class="" action="#" title="Save Mapping Task">\
                          <label for="save_name">Please enter the name of the mapping task to save:</label><br><br>\
                          <input autofocus id="save_name" type="text" name="save_name" value=""><br><br>\
                          </form>';
    $('#dialog_container').append(save_task_text);
    var dialog = $( "#save-task" ).dialog({
      width : 500,
      height : 190,
      minWidth: 500,
      minHeight: 190,
      modal: true,
       buttons: {
        "OK": function(){                
            var saveName=$("#save_name").val();
            var valid = (saveName!=="");
               if (valid){
                   //if a mapping task with the same name exists
                   if($.inArray(saveName, savedTasks) !== -1){
                       var r = confirm("Mapping task "+saveName+" already exists. Overwrite?");
                       if (r === true) {
                            saveTask(saveName);
                            dialog.dialog("close");
                       }
                   }
                   else{
                        saveTask(saveName);
                        dialog.dialog("close");
                   }
                }
                else{
                    $("#save_name").addClass( "ui-state-error" );
                    var error_msg="Please do not enter a blank value";
                    alert(error_msg);
                } 
        },
        Cancel: function() {
            dialog.dialog("close");
        }
      },
      create: function(event, ui) { 
        var widget = $(this).dialog("widget");
      $(".ui-dialog-titlebar-close span", widget).removeClass("ui-icon-closethick").addClass("ui-icon-mine");
      }
      ,close: function(event, ui) { $(this).remove(); }
    }); 
}

function saveTask(saveName){
    $.post("MappingServlet", {action:"save_mapping_task", saveName: saveName, scenarioNo : currentScenario
    }, function(){ 
        savedTasks.push(saveName);
        openedTasks.push(saveName);
        $('a[href$="schemaTabs-'+currentScenario+'"]').text(currentScenario + ". "+saveName);
        alert("Mapping task "+currentScenario+ " successfully saved as \"" + saveName + "\""); 
    });
}

//pop up window with open task options
function createOpenMappingTaskPopup(){
    var open_task_text = '<form id="open-task" class="" action="#" title="Open Mapping Task">\
                          <label for="open_name">Please choose which mapping task to open:</label><br><br>\n\
                          <select id="open_name" name="open_name">';
    for(var task = 0; task < savedTasks.length; task++){
        open_task_text +='<option value="'+savedTasks[task]+'">'+savedTasks[task]+'</option>';
    }
    open_task_text +=  '</select><br><br></form>';
    $('#dialog_container').append(open_task_text);
    var dialog = $( "#open-task" ).dialog({
      width : 410,
      height : 190,
      minWidth: 410,
      minHeight: 190,
      modal: true,
       buttons: {
        "OK": function(){                
            var openName=$("#open_name").val();                         
            lastAction = "open";
            $.post("MappingServlet", {action:"open_mapping_task", openName: openName, scenarioNo : scenarioCounter+1
             }, function(responseText){                        
                 var JSONTreeData = $.parseJSON(responseText);
                 loadSchemaTrees(openName, JSONTreeData);
                 openedTasks.push(openName);
             });                
             dialog.dialog("close");                              
        },
        Cancel: function() {
            dialog.dialog("close");
        }
      },
      create: function(event, ui) { 
        var widget = $(this).dialog("widget");
      $(".ui-dialog-titlebar-close span", widget).removeClass("ui-icon-closethick").addClass("ui-icon-mine");
      }
      ,close: function(event, ui) { $(this).remove(); }
    }); 
}

//pop up window with delete task options
function createDeleteMappingTaskPopup(){
    var delete_task_text = '<form id="delete-task" class="" action="#" title="Delete Mapping Task">\
                          <label for="delete_name">Choose which mapping task to delete:</label><br><br>\n\
                          <select id="delete_name" name="delete_name">';
    for(var task = 0; task < savedTasks.length; task++){
        delete_task_text +='<option value="'+savedTasks[task]+'">'+savedTasks[task]+'</option>';
    }
    delete_task_text +=  '</select><br><br></form>';
    $('#dialog_container').append(delete_task_text);
    var dialog = $( "#delete-task" ).dialog({
      width : 410,
      height : 190,
      minWidth: 410,
      minHeight: 190,
      modal: true,
       buttons: {
        "OK": function(){ 
            var deleteName=$("#delete_name").val();
            //if the mapping task that is going to be deleted is among the opened tasks
            if($.inArray(deleteName, openedTasks) !== -1){
                alert("Mapping task \""+deleteName+"\" is open. \nPlease, close the task before deleting it.");
                dialog.dialog("close");
            }
            else{
                var r = confirm("Are you sure you want to delete mapping task \""+deleteName+"\"?");
                if (r === true) {
                    $.post("MappingServlet", {action:"delete_mapping_task", deleteName: deleteName
                     }, function(responseText){ 
                         alert("Mapping task \""+responseText+ "\" was successfully deleted"); 
                     });
                    //remove the mapping task from the array of saved ones
                    var index = savedTasks.indexOf(deleteName);
                    if (index > -1) {
                        savedTasks.splice(index, 1);
                    }
                    dialog.dialog("close");
                }
            }
        },
        Cancel: function() {
            dialog.dialog("close");
        }
      },
      create: function(event, ui) { 
        var widget = $(this).dialog("widget");
      $(".ui-dialog-titlebar-close span", widget).removeClass("ui-icon-closethick").addClass("ui-icon-mine");
      }
      ,close: function(event, ui) { $(this).remove(); }
    }); 
}

//pop up window with selection condition expression
function createSelectionConditionPopup(item_id){
    var previous_txt = $("#"+item_id).data('selection_condition_text');
    var idSource = $("#"+item_id).closest('.myJsTree').attr('id');
    var findString ='jstreeSource';
    var scenarioNo = idSource.substring(idSource.length, idSource.indexOf(findString)+findString.length); 
    var pathTillNode = $('#'+idSource).jstree(true).get_path('#' +item_id,".");
    var selection_condition_text = '<form id="selection-condition" class="" action="#" title="Edit Selection Condition">\
        <input autofocus id="select_cond_expression" type="text" name="expression_value" value='+previous_txt+'><br><br>\
        </form>';
       
    $('#dialog_container').append(selection_condition_text);
    //Dialog Setup
    var dialog = $( "#selection-condition" ).dialog({
      width : 400,
      height : 160,
      minWidth: 400,
      minHeight: 160,
      modal: true,
       buttons: {
        "Delete": function(){
            $.post("MappingServlet", {action:"edit_selection_condition", specificAction:"delete", path:pathTillNode, expression:"", scenarioNo: scenarioNo
                }, function(responseText){ 
                var image = $("#"+item_id).data('original_img');
                var image_tag ="<i class='jstree-icon jstree-themeicon jstree-themeicon-custom' role='presentation' style='background-image: url(\"images/"+image+"\"); background-position: center center; background-size: auto auto;'></i>";
                $("#"+item_id).data('selection_condition_text' ,"");
                $("#"+item_id).html(image_tag+$("#"+item_id).data('original_text'));
                });
            dialog.dialog("close");
        },  
        "OK": function(){                
            var expression=$("#select_cond_expression").val();
            var valid = (expression!=="");
               if (valid){
                   $.post("MappingServlet", {action:"edit_selection_condition", specificAction:"update", path:pathTillNode, expression:expression, scenarioNo: scenarioNo
                    }, function(responseText){              
                    var image_tag ="<i class='jstree-icon jstree-themeicon jstree-themeicon-custom' role='presentation' style='background-image: url(\"images/selection_condition_set.png\"); background-position: center center; background-size: auto auto;'></i>";
                    $("#"+item_id).data('selection_condition_text' ,expression);
                    $("#"+item_id).html(image_tag+$("#"+item_id).data('original_text')+" ["+expression+"]");
                    });
                    dialog.dialog("close");
                }
                else{
                    $("#select_cond_expression").addClass( "ui-state-error" );
                    var error_msg="Please do not enter a blank value";
                    alert(error_msg);
                } 
        },
        Cancel: function() {
            dialog.dialog("close");
        }
      },
      create: function(event, ui) { 
        var widget = $(this).dialog("widget");
      $(".ui-dialog-titlebar-close span", widget).removeClass("ui-icon-closethick").addClass("ui-icon-mine");
      }
      ,close: function(event, ui) { $(this).remove(); }
    }); 
}

//left area context menu
function customMenu(node) {
    var nodeId = ($(node).attr('id'));
    var scenarioNo;
    if($('#'+nodeId).hasClass("projectTreeRoot")){
        scenarioNo = $('#'+nodeId).data("scenarioNo");
    }
    else{
        scenarioNo = $('#'+nodeId).closest(".projectTreeRoot").data("scenarioNo");
    }
    var items = {
        selectItem: {
            label: "Select Scenario",
            action: function () {
                currentScenario = scenarioNo;
                $.post("MappingServlet", {action:"select_mapping_task", scenarioNo:scenarioNo}, function(){              
                    $('#leftdiv').find(".treediv").css("background-color","#E0E0EB");               
                    $('#'+nodeId).closest(".treediv").css("background-color","#8AB8E6");
                    $( "#schemaProjectTreeNode"+scenarioNo ).trigger( "click" );
                });                
            }
        },
        removeItem: {
            label: "Remove Scenario",
            action: function () {
                var r = confirm("Do you want to close mapping task "+scenarioNo+"?");
                if (r===true){
                    removeMappingTask(scenarioNo);
                }
            }
        }
    };
    return items;
}    

//function that creates the source and target tree given their data
function makeTrees (sourceTreeArray, targetTreeArray, sourceId, targetId, newplumb, JSONData){
  var findString ='jstreeSource';
  var idNo = sourceId.substring(sourceId.length, sourceId.indexOf(findString)+findString.length);    
  //set the current tab as container
  var container = $("#schemaTabs-"+idNo);
  newplumb.setContainer(container);

  //connection restrictions
  newplumb.bind('connection',function(info){
    var con=info.connection;
    var idSourceConnection;
    var idTargetConnection;      
    var sourcePath;
    var targetPath;
    con.setParameter("connection",true);
    con.setParameter("join_condition",false);
    con.setParameter("constant",false);
    con.setParameter("fromFunction",false);
    con.setParameter("toFunction",false);
    //do not allow duplicate connections (arr1)
    //neither reverse connections (arr2)
    var arr1 = newplumb.select({source:con.sourceId,target:con.targetId});
    var arr2 = newplumb.select({source: con.targetId, target: con.sourceId});
    var arr3 = newplumb.select({target:con.targetId});
    var existingConnections = newplumb.getConnections({target:con.targetId});

    if (arr1.length + arr2.length > 1){
      con.setParameter("connection",false);
      newplumb.detach(con);
    }        
    //also do not allow the connection if there is already one
    //on this target element and is not from target tree (join condition)
    else if((!($('#' + con.sourceId).parents('.jstreeTarget').length===1))&&($('#' + con.targetId).parents('.jstreeTarget').length===1)&&(arr3.length  > 1)){
        var sourceCounter=0;
        for(var c=0; c<existingConnections.length; c++) {
            sourceCounter += $('#'+existingConnections[c].sourceId).parents(".jstreeSource").length
                    + $('#'+existingConnections[c].sourceId).parents(".constant-menu").length
                    + $('#'+existingConnections[c].sourceId).parents(".function-menu").length;
        }
        if (sourceCounter > 1){
          con.setParameter("connection",false);
          newplumb.detach(con);
        }
    }        
    //also if the source is on the Target Tree
    //and the target on the Source Tree
    //do not allow the connection
    else if ($('#' + con.targetId).parents(".jstreeSource").length===1
      && $('#' + con.sourceId).parents(".jstreeTarget").length===1){
        con.setParameter("connection",false);
        newplumb.detach(con);
    }
    //if the target is Function
    else if ($('#' + con.targetId).parents(".function-menu").length===1){
        con.setParameter("toFunction",true);
        //allow only connections from source tree
        if(!($('#' + con.sourceId).parents('.jstreeSource').length===1)){
           newplumb.detach(con); 
        }
    }
    //if the source is Function
    else if ($('#' + con.sourceId).parents(".function-menu").length===1){
        con.setParameter("fromFunction",true);
        var arr4 = newplumb.select({ target: $("#"+con.sourceId).siblings('img').attr('id') });
        //if the target is the Source Tree do not allow the connection
        if($('#' + con.targetId).parents(".jstreeSource").length===1){
          con.setParameter("connection",false);
          newplumb.detach(con);
        }
        //if no connection from source tree to this function hasn't been established yet
        //do not allow the connection
        else if(arr4.length  === 0){
            alert('You must provide a source value to the \'Function menu\' first');
            con.setParameter("connection",false);
            newplumb.detach(con);
        }
    }
    //if the source is Constant        
    else if ($('#' + con.sourceId).parents(".constant-menu").length===1){
        con.setParameter("constant",true);
        //if the target is the Source Tree do not allow the connection
        if($('#' + con.targetId).parents(".jstreeSource").length===1){
          con.setParameter("connection",false);
          newplumb.detach(con);
        }
    }    
    //if connection is on the same tree  
    else if (($('#' + con.sourceId).parents(".jstreeSource").length===1 
            && $('#' + con.targetId).parents(".jstreeSource").length===1)
    || ($('#' + con.sourceId).parents(".jstreeTarget").length===1 
            && $('#' + con.targetId).parents(".jstreeTarget").length===1)){
        //make the lines grey and dotted
        con.setPaintStyle({strokeStyle: 'grey', dashstyle:"2 2", lineWidth: 2});
        //change the connection's curviness
        con.setConnector("Flowchart");
        
        /*if ($('#' + con.sourceId).parents(".jstreeSource").length===1){ 
            con.endpoints[0].setAnchor("Left");                        
        }    else{ con.endpoints[1].setAnchor("Right");}*/ 
        //and the position of the anchor
        con.endpoints[1].setAnchor("Right");     
        con.setParameter("connection",false);
        con.setParameter("join_condition",true);
    }

    //send connection data to server whenever a connection is establised
    if (con.getParameter("connection")){
             
        if(!(con.getParameter("toFunction"))){              
            idTargetConnection = $('#'+con.targetId).closest('.myJsTree').attr('id');
            targetPath = $('#'+idTargetConnection).jstree(true).get_path('#' + con.targetId,".");
            if (targetPath.lastIndexOf(" (")>=0){
                targetPath = targetPath.substring(0, targetPath.lastIndexOf(" ("));
            }
            var sourcePathArray = new Array();
            var sourceValue = null;
            var expression = null;
            //constant
            if(con.getParameter("constant")){
                sourceValue = $("#"+con.sourceId).text();
                expression = sourceValue;
            }
            //function
            else if(con.getParameter("fromFunction")){
                var relatedConnections = newplumb.getConnections({target: $('#'+con.sourceId).siblings('img').attr('id')});
                for(var c=0; c<relatedConnections.length; c++) {
                    idSourceConnection = $('#'+relatedConnections[c].sourceId).closest('.myJsTree').attr('id');
                    var sourcePath = $('#'+idSourceConnection).jstree(true).get_path('#' + relatedConnections[c].sourceId,".");
                    if (sourcePath.lastIndexOf(" (")>=0){
                        sourcePath = sourcePath.substring(0, sourcePath.lastIndexOf(" ("));
                    } 
                    sourcePathArray.push(sourcePath);
                }
                expression = $("#"+con.sourceId).siblings( ".span_hidden" ).text();                    
            }
            //simple connection from tree node to tree node
            else{
                idSourceConnection = $('#'+con.sourceId).closest('.myJsTree').attr('id');   
                var sourcePath = $('#'+idSourceConnection).jstree(true).get_path('#' + con.sourceId,".");
                if (sourcePath.lastIndexOf(" (")>=0){
                    sourcePath = sourcePath.substring(0, sourcePath.lastIndexOf(" ("));
                }
                sourcePathArray.push(sourcePath);
                expression = sourcePath;                    
            }
            con.setParameter("sourcePath",sourcePath);
            con.setParameter("targetPath",targetPath);
            
            if(lastAction!=="open"){            
                $.post("MappingServlet", {action:"established_connection", sourcePathArray:sourcePathArray, targetPath:targetPath, 
                    sourceValue: sourceValue, expression: expression, scenarioNo: idNo
                }, function(responseText){ });
            }
        }
    }
    //send join condition data to the server
    else if (con.getParameter("join_condition")){
        idSourceConnection = $('#'+con.sourceId).closest('.myJsTree').attr('id');
        idTargetConnection = $('#'+con.targetId).closest('.myJsTree').attr('id');      
        sourcePath = $('#'+idSourceConnection).jstree(true).get_path('#' + con.sourceId,".");
        targetPath = $('#'+idTargetConnection).jstree(true).get_path('#' + con.targetId,".");
        if (sourcePath.lastIndexOf(" (")>=0){
            sourcePath = sourcePath.substring(0, sourcePath.lastIndexOf(" ("));
        }                        
        if (targetPath.lastIndexOf(" (")>=0){
            targetPath = targetPath.substring(0, targetPath.lastIndexOf(" ("));
        }
        var isSource;
        if ($('#' + con.sourceId).parents(".jstreeSource").length===1){
            isSource=true;
        }
        else{
            isSource=false;
        }
        con.setParameter("sourcePath",sourcePath);
        con.setParameter("targetPath",targetPath);
        con.setParameter("isSource",isSource);
        con.setParameter("scenarioNo",idNo);
        $.post("MappingServlet", {action:"new_join_condition", sourcePath:sourcePath, targetPath:targetPath, scenarioNo: idNo, isSource: isSource});
    }
    
    //right clicking on a connection makes the 'delete connection' context menu appear
    con.bind("contextmenu", function (connection, e) {
        e.preventDefault();
        if(con.getParameter("join_condition")){
            createContextMenu1(newplumb,con,e);
          }
        else if(con.getParameter("connection")){
            createContextMenu2(newplumb,con,e);
          }      
    });
  }); 
  
  //connection detached
  newplumb.bind('connectionDetached',function(info){
    var con=info.connection;
    var arr1 = newplumb.select({source:con.sourceId,target:con.targetId});       
    ///if it is a join condition
    if(con.getParameter("join_condition")){
        $.post("MappingServlet", {action:"detached_join", sourcePath : con.getParameter("sourcePath"), targetPath: con.getParameter("targetPath"), 
            scenarioNo: idNo, isSource: con.getParameter("isSource")});
    }
    //if it is a detach event due to a duplicate connection 
    //do not delete the existing connection from the server
    else if ((arr1.length===1)
      //or if the "Delete All Connections" button was pressed
      //another request has already been sent to the server to handle it
      ||(con.getParameter("already_deleted"))){
        return;
    }      
    else{
        $.post("MappingServlet", {action: "detached_connection",targetPath: con.getParameter("targetPath"), scenarioNo: idNo});
        ///ALSO CHECK IF IT IS A DETACHMENT CONSTANT / FUNCTION///
    }
    
  });

   //bind right-clicking on Yellow area
   //so that the 'constant' and 'function' context menus can be created
   var yellow_area = $("#"+container.find(".maindivcenter").attr('id'));
   $(yellow_area).bind('contextmenu',function (e) {
      e.preventDefault();
      createContextMenu3(newplumb,$(this).attr('id'),e);
   });

   //bind right-clicking on the two Grey areas
   //so that the 'Delete-all-connections' context menu can be created
   var grey_area1 = $("#"+container.find(".maindivleft").attr('id'));
   var grey_area2 = $("#"+container.find(".maindivright").attr('id'));
   $(grey_area1).bind('contextmenu',function (e) {
      e.preventDefault();
      createContextMenu5(newplumb,idNo,e);
   });
   $(grey_area2).bind('contextmenu',function (e) {
      e.preventDefault();
      createContextMenu5(newplumb,idNo,e);
   });
     
   var tree1 = $('#'+sourceId);
   tree1. bind("ready.jstree", function(){
    var treeSource = jQuery(this);
    treeSource.jstree("open_all");
    //do not show expand/collapse icons
    treeSource.find('.jstree-node').children('.jstree-ocl').css( "display", "none" );     
    //make the leaf nodes source/targets for arrow connections
    makeLeafNodesSourceTarget(treeSource ,newplumb, JSONData, createExistingConnections);
    //give to all second nodes the class selectionConditionNode
    makeSelectionConditionNodes(treeSource);
   }); 
   //load data to the tree
   tree1.jstree({'core' : {'data': sourceTreeArray}});  
   
    //add an event handler so that clicking on a tree node makes the corresponding 
    //connection highlighted while all other connections return to their default colour
    $('#'+sourceId).on("click", ".jstree-anchor" ,function () {
        //first set all connections' color back to their default (black/grey)...
        setConnectionsDefaultColor(newplumb);
        //...then highlight the selected connection
        var selectedId = $(this).attr('id');
        highlightSelectedconnectonsSource(newplumb, selectedId);        
    });
    
    $('#'+targetId).on("click", ".jstree-anchor" ,function () {
        //first set all connections' color back to their default (black/grey)...
        setConnectionsDefaultColor(newplumb);
        //...then highlight the selected connection
        var selectedId = $(this).attr('id');
        highlightSelectedconnectonsTarget(newplumb, selectedId);
    });

   var tree2 = $('#'+targetId);

   tree2.bind("ready.jstree", function(){
    var treeTarget = jQuery(this);    
    treeTarget.jstree("open_all");
    //do not show expand/collapse icons
    treeTarget.find('.jstree-node').children('.jstree-ocl').css( "display", "none" );
    //make the leaf nodes source/targets for arrow connections
    makeLeafNodesSourceTarget(treeTarget, newplumb, JSONData, createExistingConnections);
   }); 
   //load data to the tree
   tree2.jstree({'core' : {'data': targetTreeArray}});       
};

//function that creates existing connections and join conditions when loading a mapping task
function createExistingConnections(connections, joins, newplumb){
    readyCnt++;
    //the readyCnt counter is equal to "2" when both trees (source & target) have been loaded
    //and have made their leaf nodes connection sources & targets
    if (readyCnt === 2){
        var constantValues = new Array();
        var constantMap = new Object();
        var functionValues = new Array();
        var functionMap = new Object();
        //variables for positioning the possible constant and function icons
        //the "+5" is for giving a 5px margin from the yellow div
        var position = $("#maindivcenter"+currentScenario).position();
        var positionX = position.left + 5;
        var positionY = position.top + 5;
        var shift;
        //the maximum number of icons that fit in the X axis of the yellow area
        var maxIcons = 1 + Math.floor(($("#maindivcenter"+currentScenario).width()-maxIconWidth-5)/shiftXpixels);
        //the iconsNo variable counts the number of constant and function icons on the CURRENT tab
        //so that the next icon will not be positioned on top of another
        var iconsNo = 0;
        var currentmenucounter;
        for (var i=0; i < connections.length ;i++){
            //simple 1:1 connection
            if (connections[i].connectionType === "simple"){
                newplumb.connect({ source: connections[i].sourceNodes[0]+"_anchor", 
                                   target: connections[i].targetNode+"_anchor",
                                   overlays: [ [ "Arrow", {width: 10, length: 12, foldback: 0, location: 1, id: "arrow"} ] ]
                                });
            }
            else if (connections[i].connectionType === "constant"){
                //check if a constant icon with the same value has already been created, if not create one
                if($.inArray(connections[i].sourceValue, constantValues) === -1){
                    if ((iconsNo%maxIcons)===maxIcons){
                        shift = maxIcons;
                    }
                    else{
                        shift = iconsNo%maxIcons;
                    }
                    //the icon's position depends on the number of icons already on the current tab
                    createConstant("maindivcenter"+currentScenario, positionX+shift*shiftXpixels, positionY+iconsNo*shiftYpixels, newplumb); 
                    iconsNo++;
                    //menucounter has already been increased, so the current one is 1 less
                    currentmenucounter = menucounter-1;
                    $("#constant-menu-span"+currentmenucounter).html(connections[i].sourceValue);
                    constantValues.push(connections[i].sourceValue);
                    constantMap[connections[i].sourceValue] = currentmenucounter;
                }
                //if a constant icon with the same value has already been created find the corresponding one
                else{
                    currentmenucounter = constantMap[connections[i].sourceValue];
                }
                newplumb.connect({ source: "constant-menu-span"+currentmenucounter, 
                                    target: connections[i].targetNode+"_anchor",
                                    overlays: [ [ "Arrow", {width: 10, length: 12, foldback: 0, location: 1, id: "arrow"} ] ]
                                });
            }
            else if (connections[i].connectionType === "function"){
                //check if a function icon with the same value has already been created, if not create one
                if($.inArray(connections[i].transformationFunction, functionValues) === -1){
                    if ((iconsNo%maxIcons)===maxIcons){
                        shift = maxIcons;
                    }
                    else{
                        shift = iconsNo%maxIcons;
                    }
                    createFunction("maindivcenter"+currentScenario, positionX+shift*shiftXpixels, positionY+iconsNo*shiftYpixels, newplumb); 
                    iconsNo++;
                    currentmenucounter = menucounter-1;
                    var functionValueShown = connections[i].transformationFunction;
                    if(functionValueShown.length>15){
                        functionValueShown = functionValueShown.substring(0,15)+"...";
                    }
                    $("#function-menu-span"+currentmenucounter).html(functionValueShown);
                    $("#function-menu-span_hidden"+currentmenucounter).html(connections[i].transformationFunction);
                    functionValues.push(connections[i].transformationFunction);
                    functionMap[connections[i].transformationFunction] = currentmenucounter;
                }
                //if a function icon with the same value has already been created find the corresponding one
                else{
                    currentmenucounter = functionMap[connections[i].transformationFunction];
                }
                for (var j=0; j < connections[i].sourceNodes.length; j++){
                    newplumb.connect({ source: connections[i].sourceNodes[j]+"_anchor", 
                                        target: "function-menu-img"+currentmenucounter,
                                      overlays: [ [ "Arrow", {width: 10, length: 12, foldback: 0, location: 1, id: "arrow"} ] ]
                                     });
                }
                newplumb.connect({ source: "function-menu-span"+currentmenucounter, 
                                    target: connections[i].targetNode+"_anchor",
                                    overlays: [ [ "Arrow", {width: 10, length: 12, foldback: 0, location: 1, id: "arrow"} ] ]
                                });
            }
        }
        for (var i=0; i < joins.length ;i++){
            var con = newplumb.connect({ source: joins[i].sourceNode+"_anchor", target: joins[i].targetNode+"_anchor"});
            if (joins[i].mandatory === true){
                con.setPaintStyle({strokeStyle: 'grey', dashstyle:"2 2", lineWidth: 4});
            }
            else{
                con.setPaintStyle({strokeStyle: 'grey', dashstyle:"2 2", lineWidth: 2});
            }
            if(joins[i].fk === true){
                con.addOverlay([ "Arrow", { foldback:0, location:1, width:10,length: 12, id:"myArrowLabel"+con.id } ]);
            }
            con.setParameter("mandatory",joins[i].mandatory);
            con.setParameter("fk",joins[i].fk);
        }
        lastAction = "";
        readyCnt=0;
    }
}

//creates Constant draggable icon, makes it source for connections
//and binds it with click and doubleclick events
function createConstant(id, relativeX, relativeY, newplumb){
    $("#"+id).append("<div id='constant-menu"+menucounter+"' class='constant-menu ui-widget-content'>\
                        <img src='images/constant.jpg' alt='constant_symbol' height='30' width='30'>\
                        <span id='constant-menu-span"+menucounter+"' class='wrapword'></span></div>");
    $("#constant-menu"+menucounter).css("left", relativeX + "px");
    $("#constant-menu"+menucounter).css("top", relativeY + "px");
    var outerwidth= $("#constant-menu"+menucounter).parent(".maindivcenter").css("width");
    $("#constant-menu-span"+menucounter).css("max-width", "calc("+outerwidth+" - 35px)");
    var spanId = $( "#constant-menu"+menucounter).find("span").attr('id');
    newplumb.makeSource($("#"+spanId),commonSource);
    newplumb.draggable($( "#constant-menu"+menucounter));//,{ constrain: true });
    $( "#constant-menu"+menucounter).draggable({ containment: "parent" });

    //when right-clicking on the constant menu open context menu 4
    $("#constant-menu"+menucounter).bind("contextmenu",function (e) {
        e.preventDefault();
        //so that the Yellow page (parent) context menu doesn't appear
        e.stopPropagation();
        createContextMenu4(newplumb,$(this).attr('id'),e);
    });
    $("#constant-menu"+menucounter).bind("dblclick",function (e) {
        createConstantOptionsPopup($(this).attr('id'));
    });
    menucounter++; 
}

//creates Function draggable icon, makes it source and target for connections
//and binds it with click and doubleclick events
function createFunction(id, relativeX, relativeY, newplumb){
    $("#"+id).append("<div id='function-menu"+menucounter+"' class='function-menu ui-widget-content'>\
                   <img id='function-menu-img"+menucounter+"' src='images/function-2.jpg' alt='function_symbol' height='30' width='30'>\
                   <span id='function-menu-span"+menucounter+"'class='span_shown'></span>\
                   <span id='function-menu-span_hidden"+menucounter+"' class='span_hidden'></span></div>");
    $("#function-menu"+menucounter).css("left", relativeX + "px");
    $("#function-menu"+menucounter).css("top", relativeY + "px");
    var outerwidth= $("#function-menu"+menucounter).parent(".maindivcenter").css("width");
    $("#function-menu-span"+menucounter).css("max-width", "calc("+outerwidth+" - 35px)");

    var spanId = $( "#function-menu"+menucounter).find("span").attr('id');
    var imgId = $( "#function-menu"+menucounter).find("img").attr('id');
    newplumb.makeSource($("#"+spanId),commonSource);
    newplumb.makeTarget($("#"+imgId), {allowLoopback:false, maxConnections: 100} ,commonTarget);
    newplumb.draggable($( "#function-menu"+menucounter));//,{ constrain: true });
    $( "#function-menu"+menucounter).draggable({ containment: "parent" });

    //when right-clicking on the function menu open context menu 4
    $("#function-menu"+menucounter).bind("contextmenu",function (e) {
    e.preventDefault();
    //so that the Yellow page (parent) context menu doesn't appear
    e.stopPropagation();
    createContextMenu4(newplumb,$(this).attr('id'),e);
    });

    //when double-clicking on the function menu open function options
    $("#function-menu"+menucounter).bind("dblclick",function (e) {
    //open options menu only if there is at least one connection to this function menu
    var arr4 = newplumb.select({ target: $(this).find('img').attr('id') });
    if(arr4.length  === 0){
       alert('You must provide a source value to the \'Function menu\' first');
    }
    else{
       createFunctionOptionsPopup(newplumb, $(this).attr('id'));                     
    }
    });

    menucounter++;
}

//function that makes all leaf nodes sources and targets of arrow connectors
function makeLeafNodesSourceTarget (tree, newplumb, JSONData, callback) {
  newplumb.makeSource(tree.find(".jstree-leaf").find( "a" ),commonSource);
  newplumb.makeTarget(tree.find(".jstree-leaf").find( "a" ), {allowLoopback:false, maxConnections: 100} ,commonTarget);
  //call function for creating existing connections and join conditions if there are any
  if((JSONData.connections.length+JSONData.joins.length) > 0){
    callback(JSONData.connections,JSONData.joins,newplumb);
  }
};

//function that sets the connection colors to their default value
function setConnectionsDefaultColor(newplumb){
    var allConnections = newplumb.getConnections();        
    for(var c=0; c<allConnections.length; c++) {
        if(allConnections[c].getParameter("connection")){ 
            allConnections[c].setPaintStyle({strokeStyle: 'black'});
        } 
        else if (allConnections[c].getParameter("join_condition")){
            allConnections[c].setPaintStyle({strokeStyle: 'grey'});
        }
    } 
}

//function that highlights with a different colour selected connection for Source tree
function highlightSelectedconnectonsSource(newplumb, selectedId){
    newplumb.select({source: selectedId}).each(function(selConnection) {
        selConnection.setPaintStyle({strokeStyle: '#3399FF'});
        if(selConnection.getParameter("toFunction")){
            var spanId = $( "#"+selConnection.targetId).parent(".function-menu").find(".span_shown").attr('id');
            newplumb.select({source: spanId}).each(function(relConnection) {
                relConnection.setPaintStyle({strokeStyle: '#3399CC'});        
            });                                                                    
        } 
    }); 
    newplumb.select({target: selectedId}).each(function(selConnection) {
        if ((selConnection.getParameter("join_condition")) && (!selConnection.getParameter("fk"))){
            selConnection.setPaintStyle({strokeStyle: '#3399FF'});
        }
    });
}

//function that highlights with a different colour selected connection for Target tree
function highlightSelectedconnectonsTarget(newplumb, selectedId){
    newplumb.select({target: selectedId}).each(function(selConnection) { 
        if (!selConnection.getParameter("fk")){
            selConnection.setPaintStyle({strokeStyle: '#3399FF'});
            if(selConnection.getParameter("fromFunction")){
                var functionImgId = $( "#"+selConnection.sourceId).parent(".function-menu").find("img").attr('id');
                newplumb.select({target: functionImgId}).each(function(relConnection) {
                    relConnection.setPaintStyle({strokeStyle: '#3399CC'});        
                });                                                                    
            } 
        }           
    });
    newplumb.select({source: selectedId}).each(function(selConnection) {
        if(selConnection.getParameter("join_condition")){
            selConnection.setPaintStyle({strokeStyle: '#3399FF'});
        }
    });
}
//function that gives the class selectionConditionNode on all second tree nodes
function makeSelectionConditionNodes(tree){
    //find all nodes that are second in hierarchy (Set Nodes)
    tree.find(".jstree-children .jstree-children .jstree-anchor:not(.jstree-children .jstree-children .jstree-children .jstree-anchor)").each(function() {
        //add to them the class selectionConditionNode
        $(this).addClass("selectionConditionNode");
        //store their original text and image        
        $(this).data('original_text',$(this).text());
        $(this).data('original_img', $(this).find('i').css('background-image').split('/').pop().slice(0, -2));
        $(this).data('selection_condition_text', '');
    });
    
    $(".selectionConditionNode").bind("contextmenu",function (e) {
        e.preventDefault();        
        //so that the 'Delete All Connections' context menu doesn't appear
        e.stopPropagation();
        createContextMenu6($(this).attr('id'),e);
    });
}

//function that removes a mapping task and also deletes the corresponding tabs
function removeMappingTask(scenarioNo){
    $.post("MappingServlet", {action:"remove_mapping_task", scenarioNo:scenarioNo}, function(){ 
        
        //get mapping task name before removing the tab
        var taskName = $('a[href$="schemaTabs-'+scenarioNo+'"]').text();
        taskName = taskName.substring(taskName.indexOf(scenarioNo+". ")+(scenarioNo+". ").length, taskName.length);
        
        //remove left tree
        $("#leftdiv"+scenarioNo).remove();
        //remove tabs from main menu
        $('a[href$="schemaTabs-'+scenarioNo+'"]').parent().remove();
        $('#schemaTabs-'+scenarioNo).remove();
        $('a[href$="viewTransformationsTabs-'+scenarioNo+'"]').parent().remove();
        $('#viewTransformationsTabs-'+scenarioNo).remove();
        $('#viewSqlTabs-'+scenarioNo).remove();
        $('a[href$="viewSqlTabs-'+scenarioNo+'"]').parent().remove();
        $('#viewXQueryTabs-'+scenarioNo).remove();
        $('a[href$="viewXQueryTabs-'+scenarioNo+'"]').parent().remove();
        tabs.tabs( "refresh" );
        //also remove TGD tabs
        removeTGDTabs(scenarioNo);
        tabs2.tabs( "refresh" );
        
        //if none of the TGDs tabs are left remove the TGD tab area
        checkTGDTabArea();
        //if the current scenario is the one removed, set no scenario as the current one
        //(leave it as "==", not "===")
        if (scenarioNo==currentScenario){
            currentScenario = 0;
        }      
        
        //remove the mapping task from the array of saved ones
        var index = openedTasks.indexOf(taskName);
        if (index > -1) {
            openedTasks.splice(index, 1);
        }
    }); 
}

//context menu for join conditions
function createContextMenu1(newplumb,con,event){
    var mandatoryText="Mandatory";
    var fktext="Foreign Key";
    if (con.getParameter("mandatory")){
        mandatoryText="&#10004 "+mandatoryText;
    }
    if (con.getParameter("fk")){
        fktext="&#10004 "+fktext;
    }
    $("#maindiv").append("<ul id='contextmenu"+con.id+"' class='custom-menu'>\
                            <li data-action ='delete'>Delete</li>\
                            <li data-action ='mandatory'>"+mandatoryText+"</li>\
                            <li data-action ='fk'>"+fktext+"</li>\
                         </ul>");
    var offset = $("#maindiv").offset();
    var relativeX = (event.pageX - offset.left);
    var relativeY = (event.pageY - offset.top);
    $(".custom-menu").css("left", relativeX + "px");
    $(".custom-menu").css("top", relativeY + "px");
    if (con.getParameter("mandatory")){
        $(".custom-menu li:nth-child(2)").css("padding", "0 1em 0 1em");
    }
    if (con.getParameter("fk")){
        $(".custom-menu li:nth-child(3)").css("padding", "0 1em 0 1em");
    }
    $( "#contextmenu"+con.id+" li").bind( "click", function() {
        switch($(this).attr("data-action")) {
            case "delete":
                $(".custom-menu").remove();
                con.setPaintStyle({strokeStyle: 'red'});
                var r = confirm("Do you want to delete this connection?");
                if (r===true){
                  newplumb.detach(con);
                }
                else{
                  con.setPaintStyle({strokeStyle: 'grey'});
                }
                break;
            case "mandatory":                     
                if (!con.getParameter("mandatory")){
                    con.setPaintStyle({strokeStyle: 'grey', dashstyle:"2 2", lineWidth: 4});
                    con.setParameter("mandatory",true);
                }
                else{
                    con.setPaintStyle({strokeStyle: 'grey', dashstyle:"2 2", lineWidth: 2});
                    con.setParameter("mandatory",false);
                }
                $.post("MappingServlet", {action:"join_condition_options", sourcePath:con.getParameter("sourcePath"), targetPath:con.getParameter("targetPath"), 
                    scenarioNo: con.getParameter("scenarioNo"), isSource: con.getParameter("isSource"), changedOption:"mandatory"});
                $(".custom-menu").remove();
                break;
            case "fk":
                if (!con.getParameter("fk")){
                    con.addOverlay([ "Arrow", { foldback:0, location:1, width:10,length: 12, id:"myArrowLabel"+con.id } ]);
                    con.setParameter("fk",true);
                }
                else{
                    con.removeOverlay("myArrowLabel"+con.id);
                    con.setParameter("fk",false);
                }
                $.post("MappingServlet", {action:"join_condition_options", sourcePath:con.getParameter("sourcePath"), targetPath:con.getParameter("targetPath"), 
                    scenarioNo: con.getParameter("scenarioNo"), isSource: con.getParameter("isSource"), changedOption:"fk"});
                $(".custom-menu").remove();
                break;
            default :
                $(".custom-menu").remove();
                break;
        }
    });
}

//context menu for connections
function createContextMenu2(newplumb,con,event){
    $("#maindiv").append("<ul id='contextmenu"+con.id+"' class='custom-menu'>\
                            <li data-action ='delete'>Delete Connection</li>\
                         </ul>");
    var offset = $("#maindiv").offset();
    var relativeX = (event.pageX - offset.left);
    var relativeY = (event.pageY - offset.top);
    $(".custom-menu").css("left", relativeX + "px");
    $(".custom-menu").css("top", relativeY + "px");
    $( "#contextmenu"+con.id+" li").bind( "click", function() {
        $(".custom-menu").remove();
        con.setPaintStyle({strokeStyle: 'red'}); 
        if (!(con.getParameter("toFunction"))){            
            var r = confirm("Do you want to delete this connection?");
            if (r===true){
              newplumb.detach(con);
            }
            else{
              con.setPaintStyle({strokeStyle: 'black'});
            } 
        }
        else{
            var r = confirm("Do you want to delete this connection?\n\nDeleting this one will also delete all connections\nrelated to its function");
            if (r===true){
                var spanId = $( "#"+con.targetId).parent(".function-menu").find(".span_shown").attr('id');
                var hiddenspanId = $( "#"+con.targetId).parent(".function-menu").find(".span_hidden").attr('id');
        
                newplumb.select({source: spanId}).each(function(relConnection) {
                    newplumb.detach(relConnection);
                });
                newplumb.select({target: con.targetId}).each(function(relConnection) {
                    newplumb.detach(relConnection);
                });
                                
                //also delete the function info
                $("#"+spanId).html("");
                $("#"+hiddenspanId).html("");
            }
            else{
              con.setPaintStyle({strokeStyle: 'black'});
            } 
        }
    });
}

//Yellow area context menu    
function createContextMenu3(newplumb,id,event){
    $("#maindiv").append("<ul id='contextmenu"+id+"' class='custom-menu'>\
                            <li data-action ='constant'>Create Constant</li>\
                            <li data-action ='function'>Create Function</li>\
                            <li data-action ='dependency'>Create Functional Dependency</li>\
                         </ul>");
    var offset = $("#maindiv").offset();
    var relativeX = (event.pageX - offset.left);
    var relativeY = (event.pageY - offset.top);
    $(".custom-menu").css("left", relativeX + "px");
    $(".custom-menu").css("top", relativeY + "px");
    $( "#contextmenu"+id+" li").bind( "click", function() {
        switch($(this).attr("data-action")) {
            case "constant":
                $(".custom-menu").remove();
                createConstant(id,relativeX,relativeY,newplumb);
                break;
            case "function":
                $(".custom-menu").remove();
                createFunction(id,relativeX,relativeY,newplumb);
                break;
            case "dependency":
                break;
            default :
                $(".custom-menu").remove();
                break;
        }        
    });
}

//Constant/Function deletion context menu    
function createContextMenu4(newplumb,id,event){
    $("#maindiv").append("<ul id='contextmenu"+id+"' class='custom-menu'>\
                            <li data-action ='delete'>Delete</li>\
                         </ul>");
    var offset = $("#maindiv").offset();
    var relativeX = (event.pageX - offset.left);
    var relativeY = (event.pageY - offset.top);
    $(".custom-menu").css("left", relativeX + "px");
    $(".custom-menu").css("top", relativeY + "px");
    $( "#contextmenu"+id+" li").bind( "click", function() {
        var r = confirm("Are you sure you want to delete this?");
        if (r===true){
            var spanId = $("#"+id).find("span").attr('id');                     
            newplumb.select({source: spanId}).each(function(relConnection) {
                newplumb.detach(relConnection);
            });
            
            if($("#"+id).hasClass("function-menu")){
                var imgId = $("#"+id).find("img").attr('id');                      
                newplumb.select({target: imgId}).each(function(relConnection) {
                    newplumb.detach(relConnection);
                });
            }
            
            $("#"+id).remove();
        }
        $(".custom-menu").remove();      
    });
}

//Delete all connections context menu    
function createContextMenu5(newplumb,idNo,event){
    $("#maindiv").append("<ul id='contextmenu"+idNo+"' class='custom-menu'>\
                            <li data-action ='delete'>Delete All Connections</li>\
                         </ul>");
    var offset = $("#maindiv").offset();
    var relativeX = (event.pageX - offset.left);
    var relativeY = (event.pageY - offset.top);
    $(".custom-menu").css("left", relativeX + "px");
    $(".custom-menu").css("top", relativeY + "px");
    $( "#contextmenu"+idNo+" li").bind( "click", function() {
        var r = confirm("Are you sure you want to delete ALL connections?");
        if (r===true){
            var existingConnections = newplumb.getConnections();
            var connectionsToDelete = new Array();
            for(var c=0; c<existingConnections.length; c++) {
                if(existingConnections[c].getParameter("connection")){
                    connectionsToDelete.push(existingConnections[c].getParameter("targetPath"));
                    existingConnections[c].setParameter("already_deleted",true);
                    newplumb.detach(existingConnections[c]);
                }
            }
            $.post("MappingServlet", {action: "delete_all_connections", targetPathArray: connectionsToDelete, scenarioNo: idNo});
            $("#maindivcenter"+idNo+" .constant-menu").remove();
            $("#maindivcenter"+idNo+" .function-menu").remove();
        }
        $(".custom-menu").remove();      
    });
}

//Selection Condition context menu
function createContextMenu6(idNo,event){
     $("#maindiv").append("<ul id='contextmenu"+idNo+"' class='custom-menu'>\
                              <li>Edit Selection Condition</li>\
                           </ul>");
    var offset = $("#maindiv").offset();
    var relativeX = (event.pageX - offset.left);
    var relativeY = (event.pageY - offset.top);
    $(".custom-menu").css("left", relativeX + "px");
    $(".custom-menu").css("top", relativeY + "px");
        $( "#contextmenu"+idNo+" li").bind( "click", function() {
        $(".custom-menu").remove();
        createSelectionConditionPopup(idNo);
    });    
}

//adds option items and their values to a listbox if they do not exist already
function addToList(id){
    $("#buttonPressed").val("add");    
    //either 'Source' or 'Target'
    var type = id.substring(3,9);
    var option_value = $('#'+'dir'+type).val();
    var list_id = type+'FilesListbox';
    //delete the "C:\fakepath\" that some browsers (IE/Chrome) put in front of the file name
    option_value = option_value.replace(/C:\\fakepath\\/i, '');
    //if there is a file selected on the filechooser
    if (option_value!=='') {
        //..and if it is a csv file
        if(option_value.substr(option_value.lastIndexOf(".") + 1).toLowerCase()==="csv"){
            //...that hasn't been added already
            if($('#'+list_id+' option[value="'+option_value+'"]').length === 0){
                var servlet;
                //six first letters of list_id are either 'source' or 'target'
                if (type==="Source"){
                    servlet = 'SourceFileHandlerServlet';
                }
                else if (type==="Target"){
                    servlet = 'TargetFileHandlerServlet';
                }
                //call the appropriate servlet
                $.ajax( {
                    url: servlet,
                    type: 'POST',
                    data: new FormData($("#wizard1")[0]),
                    processData: false,
                    contentType: false
                  } );                
                $('#'+list_id).append('<option value="'+option_value+'">'+option_value+'</option>');
                //select the option because the field is mandatory to move on
                $('#'+list_id+' option[value="'+option_value+'"]').prop('selected', true);
            }
        }
        else{
            alert('Please select a .csv file');
        }
    }
    else{
        alert('Please select a file to add');
    }
}

//removes selected item from a listbox
function removeFromList(id){
    $("#buttonPressed").val("remove");
    //either 'Source' or 'Target'
    var type = id.substring(6,12);
    var list_id = type+'FilesListbox';
    var servlet;
    if (type==="Source"){
        servlet = 'SourceFileHandlerServlet';
    }
    else if (type==="Target"){
        servlet = 'TargetFileHandlerServlet';
    }
    //call the appropriate servlet
    $.ajax( {
        url: servlet,
        type: 'POST',
        data: new FormData($("#wizard1")[0]),
        processData: false,
        contentType: false
      } );          
    $("#"+list_id+" option:selected").remove();
    //select at least one option -the first one- if there is one left, because the field is mandatory to move on
    $("#"+list_id+" option:first").prop('selected', true);
}

//uploads xml file to the server
function uploadFile(id){
    $("#buttonPressed").val("upload_file");
    var servlet;
    var fileType = id.substring(0,3);  
    var sourceType = id.substring(9,15);    
    var extension = $("#"+fileType+"Schema"+sourceType).val().substr(($("#"+fileType+"Schema"+sourceType).val().lastIndexOf('.') +1));
    if ((fileType==="xml" && extension.toLowerCase()==="xsd") || (fileType==="sql" && extension.toLowerCase()==="sql")){
        if (sourceType==="Source"){
            servlet = 'SourceFileHandlerServlet';
        }
        else if (sourceType==="Target"){
            servlet = 'TargetFileHandlerServlet';
        }
            //call the appropriate servlet
        $.ajax( {
            url: servlet,
            type: 'POST',
            data: new FormData($("#wizard1")[0]),
            processData: false,
            contentType: false
          } ); 
    }
}

//changes the input menu for source/Target according to type (XML/CSV/Relational)
function changeInputMenu(selection){
    //id is either 'typeSource' or 'typeTarget'
    var type = selection.attr('id').substring(4,10);
    //hide the current input menu
    $(".inputMenu"+type).css("display", "none");
    //show the selected menu
    $("#"+selection.val()+type).css("display", "block");
}

//set Uri text according to Driver selection for Relational input
function setUri(selection){
    //id is either 'driverSource' or 'driverTarget'
    var type = selection.attr('id').substring(6,12);
    var uri = "";
    if (selection.val()==="org.postgresql.Driver"){
       uri = "jdbc:postgresql://host/database";
    }
    else if(selection.val()==="com.mysql.jdbc.Driver"){
       uri = "jdbc:mysql://host/database";
    }
    else if(selection.val()==="org.apache.derby.jdbc.ClientDriver"){
       uri = "jdbc:derby:net://host/database";
    }
    $("#uri"+type).val(uri);
}
//creates the menu of input dialog for new mapping task
function createNewMapTaskDialog(type){
    //type is either 'Source' or 'Target'
    var out = '<h3>'+type+'</h3>\
        <section>\
         <label for="type'+type+'">Choose Datasource Type : </label>\
         <select id="type'+type+'" name="inputType'+type+'" onchange="changeInputMenu($(this))">\
            <option value="csv">CSV</option>\
            <option value="xml">XML</option>\
            <option value="sql">SQL</option>\
            <option value="Relational">Relational</option>\
         </select><br\><br\><br\>\
         <div id="csv'+type+'" class="inputMenu'+type+'">\
            <label for="dbName'+type+'">Enter Database Name (*Mandatory)</label>\
            <input id="dbName'+type+'" name="dbName'+type+'" type="text" value="'+type+'DB" size="50" class="required" ><br\>\
            <label for="dir'+type+'">Choose '+type+' Files:</label>\
            <input type="file" name="dir'+type+'" id="dir'+type+'" accept=".csv"/><br\>\
            <input type="button" id="add'+type+'" class="addButton" value="Add">\
            <input type="button" id="remove'+type+'" class="removeButton" value="Remove"><br\><br\>\
            <label for="'+type+'FilesListbox">'+type+' Files (*Mandatory)</label>\
            <select id="'+type+'FilesListbox" name="files'+type+'" size="5" class="required"></select>\
         </div>\
         <div id="xml'+type+'" class="inputMenu'+type+'">\
            <label for="xmlSchema'+type+'">Schema File (*Mandatory)</label>\
            <input type="file" name="xmlSchema'+type+'" id="xmlSchema'+type+'" accept=".xsd" class="required fileSchema"/><br\>\
         </div>\
         <div id="sql'+type+'" class="inputMenu'+type+'">\
            <label for="sqlDbName'+type+'">Enter Database Name (*Mandatory)</label>\
            <input id="sqlDbName'+type+'" name="sqlDbName'+type+'" type="text" value="SQL'+type+'DB" size="50" class="required" ><br\>\
            <label for="sqlSchema'+type+'">Schema File (*Mandatory)</label>\
            <input type="file" name="sqlSchema'+type+'" id="sqlSchema'+type+'" accept=".sql" class="required fileSchema"/><br\>\
         </div>\
         <div id="Relational'+type+'" class="inputMenu'+type+'">\
            <label for="driver'+type+'">Driver: </label>\
            <select id="driver'+type+'" name="driver'+type+'"  onchange="setUri($(this))">\\n\
                   <option value="" class="hidden_text"></option>\
                   <option value="org.postgresql.Driver">PostgreSQL driver</option>\
                   <option value="com.mysql.jdbc.Driver">MySQL driver</option>\
                   <option value="org.apache.derby.jdbc.ClientDriver">Apache Derby driver</option>\
            </select><br\><br\>\
            <label for="uri'+type+'">Uri (*Mandatory)</label>\
            <input type="text" id="uri'+type+'" name="uri'+type+'" class="required"><br\>\
            <label for="username'+type+'">Username (*Mandatory)</label>\
            <input type="text" id="username'+type+'" name="username'+type+'" class="required"><br\>\
            <label for="password'+type+'">Password</label>\
            <input type="password" id="password'+type+'" name="password'+type+'"><br\>\
         </div>\
        </section>';
    return out;
}
    
$(document).ready(function(){
    tabTemplate = "<li><a href='#{href}'>#{label}</a><span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
    tabs = $("#maindiv").tabs({
        heightStyle: "fill",
        //when the tab is activated -if it is a View tab- check for changes
        activate: function (event, ui) {
            //ui.newPanel is the selected tab
            if(ui.newPanel.hasClass("sqlTab")){
                checkSql(ui.newPanel.attr("id"));
            }
            else if(ui.newPanel.hasClass("xqueryTab")){
                checkXQuery(ui.newPanel.attr("id"));
            }            
        }
    });
    tabs2 = $("#tgd_div").tabs({
        heightStyle: "fill"
    });

    //sortable tabs
    tabs.find( ".ui-tabs-nav" ).sortable({
        axis: "x",
        stop: function() {
        tabs.tabs( "refresh" );
        }
    });
    
    //tabs: close icon behavior
    tabs.delegate( "span.ui-icon-close", "click", function() {
        //if the close icon on the main tab is clicked
        //close the whole mapping task, after asking for confirmation
        var tabIdentity = $(this).siblings("a").attr("href");
        if(tabIdentity.substr(1, 11) === "schemaTabs-"){
            var tabScenarioNo = tabIdentity.substr(12, tabIdentity.length);
            var r = confirm("Do you want to close mapping task "+tabScenarioNo+"?");
            if (r===true){
                removeMappingTask(tabScenarioNo);
            }
        }
        //deafult behavior: removing the tab on click
        else{
            var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
            $( "#" + panelId ).remove();
        }
        tabs.tabs( "refresh" );
    });
    
    //tabs2: close icon behavior
    tabs2.delegate( "span.ui-icon-close", "click", function() {
        //if the close icon on the main tab is clicked
        //close the whole mapping task, after asking for confirmation
        var tabId = $(this).siblings("a").attr("href");
        var findString1 = "tgdTabs-";
        var findString2 = "no";
        var tabScenarioNo = tabId.substring(tabId.indexOf(findString1)+findString1.length, tabId.indexOf(findString2));
        //if the number of elements that their id starts with 'tgdTabs- plus the tab scenario no is more than one
        var noOfScenarioTabs = $("#tgd_div > div[id^='tgdTabs-"+tabScenarioNo+"']").length + $("#tgd_div > div[id^='constantTgdTabs-"+tabScenarioNo+"']").length;
        if(noOfScenarioTabs > 1){
            var r = confirm("If you close this tab, all TGD tabs for mapping task "+tabScenarioNo+" will be closed too.\nAre you sure?");
            if (r===true){
                removeTGDTabs(tabScenarioNo);
            }
        }
        //deafult bevavior: removing the tab on click
        else{
            var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
            $( "#" + panelId ).remove();
        }
        tabs2.tabs( "refresh" );
        //if none of the TGDs tabs are left remove the TGD tab area
        checkTGDTabArea();
    });  
    
    //when the document is ready, send initialize request to server
    //and get the saved mapping tasks of the specific user
    $.post("MappingServlet", {action:"initialize"}, function(responseText){                        
        var JSONData = $.parseJSON(responseText);    
        savedTasks = JSONData.savedTasks;
    });    

    //on clicking "New Mapping Task" :
    $( "#newTask" ).click(function() {
        //1.Append the html of the wizard panels
        //that appear as a dialog box
        var mytext = '<div>'+createNewMapTaskDialog('Source')+createNewMapTaskDialog('Target')+'<input id="buttonPressed" name="buttonPressed" type="text" class="hidden_text"></div>';
        
        $('<form id="wizard1" action="#" title="New Mapping Task - Choose input" enctype="multipart/form-data">'+mytext+'</form>').appendTo('#dialog_container');
        
        var form = $("#wizard1");
        
        //form validation options
        form.validate({
          errorPlacement: function errorPlacement(error, element) { element.before(error); }
          ,rules: {
            xmlSchemaSource: {
               extension: "xsd"
            },
            xmlSchemaTarget: {
               extension: "xsd"
            },
            sqlSchemaSource: {
               extension: "sql"
            },
            sqlSchemaTarget: {
               extension: "sql"
            }
          }
        });
        
        //2.Wizard Setup
        form.children("div").steps({
          headerTag: "h3",
          bodyTag: "section",
          transitionEffect: "slideLeft",
          stepsOrientation: "vertical",
          //on changing steps or clicking the finish button validate form
          onStepChanging: function (event, currentIndex, newIndex)
          {
            // Allways allow previous action even if the current form is not valid!
            if (currentIndex > newIndex)
            {
              return true;
            }
            // Needed in some cases if the user went back (clean up)
            if (currentIndex < newIndex)
            {
              // To remove error styles
              form.find(".body:eq(" + newIndex + ") label.error").remove();
              form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
            }
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
           },
          onFinishing: function (event, currentIndex)
          {
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
          },
          //when "Finished" button is clicked, send POST request to Servlet 'MappingServlet'
          onFinished: function () {
              var filesSource = [];
              var filesTarget = [];
              //add each option in the source/Target listbox to an array that is going to be sent to the server 
              $("#SourceFilesListbox > option").each(function()
                {
                    filesSource.push($(this).val());
                });
               $("#TargetFilesListbox > option").each(function()
                {
                    filesTarget.push($(this).val());
                });                
            $.post("MappingServlet", {action:"new_mapping_task", scenarioNo: scenarioCounter+1, typeSource : $("#typeSource").val(), typeTarget : $("#typeTarget").val(),
                dbnameSource : $("#dbNameSource").val(), filesSource: filesSource, xmlSource : $("#xmlSchemaSource").val(),
                sqlDbNameSource: $("#sqlDbNameSource").val(), sqlSource : $("#sqlSchemaSource").val(),
                driverSource : $("#driverSource").val(), uriSource: $("#uriSource").val(), 
                usernameSource: $("#usernameSource").val(), passwordSource: $("#passwordSource").val(),
                dbnameTarget : $("#dbNameTarget").val(), filesTarget : filesTarget, xmlTarget: $("#xmlSchemaTarget").val(),
                sqlDbNameTarget: $("#sqlDbNameTarget").val(), sqlTarget : $("#sqlSchemaTarget").val(),
                driverTarget : $("#driverTarget").val(), uriTarget: $("#uriTarget").val(), 
                usernameTarget: $("#usernameTarget").val(), passwordTarget: $("#passwordTarget").val()                
                /*querystring : JSON.stringify($("#wizard1").serializeArray()), filesSource: filesSource, filesTarget : filesTarget*/
              }, function(responseText){            
              
              var JSONTreeData = $.parseJSON(responseText);
              var tempTaskName = "Mapping Task "+(scenarioCounter+1);
              loadSchemaTrees(tempTaskName, JSONTreeData);              
               });        
               $( "#wizard1" ).dialog("close");
            }
        
        });
        
        //3.Dialog Setup
        $( "#wizard1" ).dialog({
          width : 845,
          height : 680,
          modal: true,
          minWidth: 845,
          minHeight: 400,
          create: function(event, ui) { 
            var widget = $(this).dialog("widget");
          $(".ui-dialog-titlebar-close span", widget).removeClass("ui-icon-closethick").addClass("ui-icon-mine");
          }
          ,close: function(event, ui) { $(this).remove(); }
        });        
    });
    
    //on clicking "Save Task"
    $( "#saveTask" ).click(function() {
        if (currentScenario!==0){
            createSaveMappingTaskPopup();
        }
        else{
            alert('No mapping task has been selected');
        }
    });
    
    //on clicking "Open Task"
    $( "#openTask" ).click(function() {
        createOpenMappingTaskPopup();
    });
    
    //on clicking "Delete Task"
    $( "#deleteTask" ).click(function() {
        createDeleteMappingTaskPopup();
    });
    
    //on clicking Generate Transformations
    $( "#generate" ).click(function() {
       if (currentScenario!==0){
            $.post("MappingServlet", {action:"generate"}, function(responseText){ 
                if (responseText!==""&&responseText!==null){
                    var obj = $.parseJSON(responseText); 
                    if(obj.tgds.length>0 || obj.constantTgds.length>0){
                     $("#maindiv").css("height","70%");
                     $("#tgd_div").css("display","block");
                     tabs.tabs("refresh");                          
                     addTGDsTabs(obj); 
                     }
                     else{
                         alert('No lines have been drawn'); 
                     }
                }
             });
        }
        else{
            alert("No mapping task has been selected");
        }
    });   
     
    //Main menu options
    $("#jMenu").jMenu({
      ulWidth : 'auto',
      effects : {
        effectSpeedOpen : 300,
        effectTypeClose : 'slide'
      },
      animatedText : false
    });              

});


// on clicking the add button, upload the selected csv file to the server
$(document).on('click','.addButton',function() { 
     addToList($(this).attr('id')); 
 }); 
 
// on clicking the remove button, delete the selected csv file from the server
$(document).on('click','.removeButton',function() { 
     removeFromList($(this).attr('id')); 
 }); 
 
 // on changing the file input value, upload the selected xml file to the server
 $(document).on('change','.fileSchema' , function(){ 
     uploadFile($(this).attr('id')); 
 });
 
 // on clicking a constant option
 $(document).on('click','.constantOption' , function(){ 
     if ($(this).attr('id')==="stringOption" || $(this).attr('id')==="numberOption"){
        $('#func_selection').attr('disabled', true); 
        $('#text_field').attr('disabled', false);        
     } 
     else if($(this).attr('id')==="funcOption"){
        $('#func_selection').attr('disabled', false); 
        $('#text_field').attr('disabled', true);
     }
     $('#text_field').removeClass( 'ui-state-error' );
 });

// bind click event to link for Schema Tree Window
$(document).on('click','.schemaProjectTreeNode',function() {
    var ptreeId = $(this).attr('id');
    var findString ='schemaProjectTreeNode';
    var activeTabNo = ptreeId.substring(ptreeId.length, ptreeId.indexOf(findString)+findString.length);
    $( '#maindiv a[href="#schemaTabs-'+activeTabNo+'"]').trigger( "click" );
});

// bind click event to link for View Windows
$(document).on('click','.projectTreeNode',function() { 
    var type = $(this).data("type");
    var activeTabNo =  $(this).closest(".projectTreeRoot").data("scenarioNo");
    //$( "#maindiv" ).tabs({ active: 2*(activeTabNo-1)+1 });
    $( '#maindiv a[href="#'+type+'Tabs-'+activeTabNo+'"]').trigger( "click" );
});

// bind double-click event to link for View Windows
$(document).on('dblclick','.projectTreeNode',function() { 
    var type = $(this).data("type");
    var activeTabNo =  $(this).closest(".projectTreeRoot").data("scenarioNo");
    //if the tab doesn't exist, create it
    var list = $("#maindiv .viewTab");
    var existing = false;
    list.each(function() {
        if($(this).attr('id')=== type+'Tabs-' + activeTabNo){
            existing=true;
        }
    });
    if (!existing){
        switch (type){
            case "viewTransformations":
                addViewTransformationsTab(activeTabNo);
                break;
            case "viewSql":
                addViewSqlTab(activeTabNo);
                break;
            case "viewXQuery":
                addViewXQueryTab(activeTabNo);
                break;
            default:
                break;
        }
    }
});

// If the document is clicked somewhere
//remove the context menu
$(document).on("mousedown", function (e) {
    // If the clicked element is not the menu
    if (!$(e.target).parents(".custom-menu").length > 0) {
        $(".custom-menu").remove();
    }
});

//prevent submit on forms (in context menus for example) when user hits enter
$(document).on("keypress", "form", function(event) { 
    return event.keyCode !== 13;
});