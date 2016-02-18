/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gr.aueb.servlets;

import gr.aueb.connection.ActionDeleteConnection;
import gr.aueb.connection.ActionDeleteJoinCondition;
import gr.aueb.connection.ActionJoinConditionChangeOptions;
import gr.aueb.connection.ActionNewConnection;
import gr.aueb.connection.ActionNewJoinCondition;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.HashMap;
import it.unibas.spicygui.Costanti;
import it.unibas.spicygui.commons.Modello;
import it.unibas.spicygui.controllo.Scenario;
import it.unibas.spicygui.controllo.file.ActionDeleteMappingTask;
import it.unibas.spicygui.controllo.file.ActionNewMappingTask;
import it.unibas.spicygui.controllo.file.ActionOpenMappingTask;
import it.unibas.spicygui.controllo.file.ActionRemoveMappingTask;
import it.unibas.spicygui.controllo.file.ActionSaveMappingTask;
import it.unibas.spicygui.controllo.mapping.ActionGenerateTransformations;
import it.unibas.spicygui.controllo.file.ActionSelectMappingTask;
import it.unibas.spicygui.controllo.mapping.ActionViewSql;
import it.unibas.spicygui.controllo.mapping.ActionViewTransformations;
import it.unibas.spicygui.controllo.mapping.ActionViewXQuery;
import it.unibas.spicygui.controllo.tree.ActionSelectionCondition;
import java.io.File;
import org.apache.commons.io.filefilter.DirectoryFileFilter;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
//giannisk
@WebServlet(name = "MappingServlet", urlPatterns = {"/MappingServlet"})
public class MappingServlet extends HttpServlet {
    
    private Modello modello;
    

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, ParseException {    
        response.setContentType("text/html;charset=UTF-8");
        
        String user = request.getRemoteUser();
        //String user = request.getUserPrincipal().getName();
        if (user==null){
            user = "johnny";
        }
        
        String action = (request.getParameter("action"));
        switch(action){
            case "initialize":
                try (PrintWriter out = response.getWriter()) {
                    initialize();
                    /*********************************************/
                    JSONObject userFiles = new JSONObject();
                    JSONArray fileArr = new JSONArray();
            
                    File dir = new File(Costanti.SERVER_MAIN_FOLDER + user + "/");
                    String[] files = dir.list(DirectoryFileFilter.INSTANCE );
                    for (String file : files) {
                        if (!file.equalsIgnoreCase("temp")){
                            fileArr.add(file);
                        }
                    }                    
                    userFiles.put("savedTasks", fileArr);
                    out.write(userFiles.toJSONString());
                    /*********************************************/
                }
                break;
            case "new_mapping_task":
                try (PrintWriter out = response.getWriter()) {                                      
                   String scenarioNo = request.getParameter("scenarioNo");
                   ActionNewMappingTask actionNewMapTask = new ActionNewMappingTask(modello,Integer.valueOf(scenarioNo),user);
                   actionNewMapTask.performAction(request);
                   JSONObject trees = actionNewMapTask.getSchemaTreesObject();
                   out.write(trees.toJSONString());
                }
                break;
            case "save_mapping_task":
                try (PrintWriter out = response.getWriter()) {                                      
                   String saveName = request.getParameter("saveName");
                   String scenarioNo = request.getParameter("scenarioNo");
                   ActionSaveMappingTask actionSaveMapTask = new ActionSaveMappingTask(modello, Integer.valueOf(scenarioNo));
                   actionSaveMapTask.performAction(saveName, user);
                   out.write(saveName);
                }
                break; 
            case "open_mapping_task":
                try (PrintWriter out = response.getWriter()) {                                      
                   String scenarioNo = request.getParameter("scenarioNo");
                   ActionOpenMappingTask actionOpenMapTask = new ActionOpenMappingTask(modello, Integer.valueOf(scenarioNo));
                   actionOpenMapTask.performAction(request, user);
                   JSONObject treesWithConnections = actionOpenMapTask.getSchemaTreesObject();
                   out.write(treesWithConnections.toJSONString());
                }
                break;
            case "delete_mapping_task":
                try (PrintWriter out = response.getWriter()) {
                   String deleteName = request.getParameter("deleteName");
                   ActionDeleteMappingTask actionDeleteMapTask = new ActionDeleteMappingTask(modello);
                   actionDeleteMapTask.performAction(deleteName, user);
                   out.write(deleteName);
                }
                break; 
            case "established_connection":
                try (PrintWriter out = response.getWriter()) {            
                    String scenarioNo = request.getParameter("scenarioNo");          
                    ActionNewConnection newConnection = new ActionNewConnection(modello,scenarioNo);                    
                    newConnection.performAction(request);
                }
                break;
            case "new_join_condition":
                try (PrintWriter out = response.getWriter()) {            
                    String scenarioNo = request.getParameter("scenarioNo");
                    String sourcePath = request.getParameter("sourcePath");
                    String targetPath = request.getParameter("targetPath");
                    boolean isSource = Boolean.parseBoolean(request.getParameter("isSource"));
                    ActionNewJoinCondition newJoin = new ActionNewJoinCondition(modello,scenarioNo);
                    newJoin.performAction(sourcePath,targetPath,isSource);
                }
                break;  
            case "join_condition_options":
                try (PrintWriter out = response.getWriter()) {            
                    String scenarioNo = request.getParameter("scenarioNo");
                    String sourcePath = request.getParameter("sourcePath");
                    String targetPath = request.getParameter("targetPath");
                    boolean isSource = Boolean.parseBoolean(request.getParameter("isSource"));
                    String changedOption =(request.getParameter("changedOption"));
                    ActionJoinConditionChangeOptions changeJoin = new ActionJoinConditionChangeOptions(modello,scenarioNo);
                    changeJoin.performAction(changedOption, sourcePath, targetPath, isSource);                    
                }
                break;
            case "detached_connection":
                try (PrintWriter out = response.getWriter()) { 
                    String scenarioNo = request.getParameter("scenarioNo");                
                    ActionDeleteConnection deleteConnection = new ActionDeleteConnection(modello,scenarioNo);
                    deleteConnection.performAction(request);
                }
                break;
            case "delete_all_connections":
                try (PrintWriter out = response.getWriter()) { 
                    String scenarioNo = request.getParameter("scenarioNo");
                    String[] targetPathArray = request.getParameterValues("targetPathArray[]");
                    ActionDeleteConnection deleteConnection = new ActionDeleteConnection(modello,scenarioNo);
                    deleteConnection.performActionAllConnections(targetPathArray);
                }
                break;
            case "detached_join":
                try (PrintWriter out = response.getWriter()) { 
                    String scenarioNo = request.getParameter("scenarioNo");
                    ActionDeleteJoinCondition deleteJoinCondition = new ActionDeleteJoinCondition(modello,scenarioNo);
                    deleteJoinCondition.performAction(request);
                }
                break;                
            case "select_mapping_task":
                try (PrintWriter out = response.getWriter()) {
                    String scenarioNo = request.getParameter("scenarioNo");
                    ActionSelectMappingTask selectMappingTask = new ActionSelectMappingTask(modello);
                    selectMappingTask.performAction(scenarioNo);
                    out.write(scenarioNo);
                }
                break;
            case "generate":
                try (PrintWriter out = response.getWriter()) {
                    ActionGenerateTransformations generateTransformations = new ActionGenerateTransformations(modello);
                    generateTransformations.performAction();
                    JSONObject tgds = generateTransformations.getTGDs();
                    out.write(tgds.toJSONString());
                }
                break;
            case "show_mapping_task_info":
                try (PrintWriter out = response.getWriter()) {
                    String scenarioNo = request.getParameter("scenarioNo");
                    ActionViewTransformations viewTransformationInfo = new ActionViewTransformations(modello, scenarioNo);
                    out.write(viewTransformationInfo.performAction());
                }
                break;
            case "sql_output":
                try (PrintWriter out = response.getWriter()) {
                    String scenarioNo = request.getParameter("scenarioNo");
                    ActionViewSql viewSqlScript = new ActionViewSql(modello, Integer.valueOf(scenarioNo));
                    out.write(viewSqlScript.performAction());
                }
                break;
            case "xquery_output":
                try (PrintWriter out = response.getWriter()) {
                    String scenarioNo = request.getParameter("scenarioNo");
                    ActionViewXQuery viewXQueryScript = new ActionViewXQuery(modello, scenarioNo);
                    out.write(viewXQueryScript.performAction());
                }
                break;
            case "edit_selection_condition":
                try (PrintWriter out = response.getWriter()) {
                    String specificAction = request.getParameter("specificAction");
                    String path = request.getParameter("path");
                    String scenarioNo = request.getParameter("scenarioNo");
                    String expression = request.getParameter("expression");
                    ActionSelectionCondition editSelectionCondition = new ActionSelectionCondition(modello, scenarioNo);
                    editSelectionCondition.performAction(specificAction, path, expression);
                }
                break;
            case "remove_mapping_task":
                try (PrintWriter out = response.getWriter()) { 
                    String scenarioNo = request.getParameter("scenarioNo");
                    ActionRemoveMappingTask removeMappingTask = new ActionRemoveMappingTask(modello);
                    removeMappingTask.performAction(scenarioNo);
                }
                break;
            default: break;
        }
        
    }
    
    private void initialize(){
        if (this.modello == null) {
            modello = new Modello();
        }
        if (this.modello.getBean(Costanti.SCENARIO_MAPPER)==null){
            this.modello.putBean(Costanti.SCENARIO_MAPPER, new HashMap<Integer, Scenario>());
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (ParseException ex) {
            Logger.getLogger(MappingServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (ParseException ex) {
            Logger.getLogger(MappingServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
