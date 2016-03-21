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
import it.unibas.spicy.persistence.DAOException;
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
import gr.aueb.mipmapgui.Costanti;
import it.unibas.spicygui.commons.Modello;
import gr.aueb.mipmapgui.controller.Scenario;
import gr.aueb.mipmapgui.controller.file.ActionCleanDirectory;
import gr.aueb.mipmapgui.controller.file.ActionCreateUserDirectory;
import gr.aueb.mipmapgui.controller.file.ActionDeleteMappingTask;
import gr.aueb.mipmapgui.controller.file.ActionInitialize;
import gr.aueb.mipmapgui.controller.file.ActionNewMappingTask;
import gr.aueb.mipmapgui.controller.file.ActionOpenMappingTask;
import gr.aueb.mipmapgui.controller.file.ActionRemoveMappingTask;
import gr.aueb.mipmapgui.controller.file.ActionSaveMappingTask;
import gr.aueb.mipmapgui.controller.mapping.ActionGenerateTransformations;
import gr.aueb.mipmapgui.controller.file.ActionSelectMappingTask;
import gr.aueb.mipmapgui.controller.mapping.ActionViewSql;
import gr.aueb.mipmapgui.controller.mapping.ActionViewTGDs;
import gr.aueb.mipmapgui.controller.mapping.ActionViewTransformations;
import gr.aueb.mipmapgui.controller.mapping.ActionViewXQuery;
import gr.aueb.mipmapgui.view.tree.ActionSelectionCondition;
import java.io.File;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.Arrays;
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
            throws ServletException, IOException {    
        response.setContentType("text/html;charset=UTF-8");
        
        String user = request.getRemoteUser();
        //String user = request.getUserPrincipal().getName();
        if (user==null){
            user = "user";
        }
        
        String action = (request.getParameter("action"));
        PrintWriter out = response.getWriter();
        JSONObject outputObject = new JSONObject();
        boolean send = true;
        try {
            switch(action){            
                case "initialize":
                {
                    initialize();
                    ActionInitialize actionInitialize = new ActionInitialize(modello);
                    actionInitialize.performAction(user);
                    outputObject = actionInitialize.getJSONObject();
                    break;
                }
                case "new_mapping_task":
                {                                         
                    String scenarioNo = request.getParameter("scenarioNo");
                    ActionNewMappingTask actionNewMapTask = new ActionNewMappingTask(modello, Integer.valueOf(scenarioNo), user);
                    actionNewMapTask.performAction(request);
                    outputObject = actionNewMapTask.getSchemaTreesObject();              
                    break;
                }
                case "save_mapping_task":
                {                                       
                    String saveName = request.getParameter("saveName");
                    String scenarioNo = request.getParameter("scenarioNo");
                    ActionSaveMappingTask actionSaveMapTask = new ActionSaveMappingTask(modello, Integer.valueOf(scenarioNo));
                    actionSaveMapTask.performAction(saveName, user);
                    outputObject.put("saveName",saveName);              
                    break; 
                }
                case "open_mapping_task":
                {                                        
                    String scenarioNo = request.getParameter("scenarioNo");
                    ActionOpenMappingTask actionOpenMapTask = new ActionOpenMappingTask(modello, Integer.valueOf(scenarioNo));
                    actionOpenMapTask.performAction(request, user);
                    outputObject = actionOpenMapTask.getSchemaTreesObject();               
                    break;
                }
                case "delete_mapping_task":
                { 
                    String deleteName = request.getParameter("deleteName");
                    ActionDeleteMappingTask actionDeleteMapTask = new ActionDeleteMappingTask(modello);
                    actionDeleteMapTask.performAction(deleteName, user);
                    outputObject.put("deleteName",deleteName);                
                    break; 
                }
                case "established_connection":
                {              
                    String scenarioNo = request.getParameter("scenarioNo");          
                    ActionNewConnection newConnection = new ActionNewConnection(modello,scenarioNo);                    
                    newConnection.performAction(request);                
                    break;
                } 
                case "update_connection":
                {          
                    String scenarioNo = request.getParameter("scenarioNo");         
                    ActionDeleteConnection deleteConnection = new ActionDeleteConnection(modello,scenarioNo);
                    deleteConnection.performAction(request);
                    ActionNewConnection newConnection = new ActionNewConnection(modello,scenarioNo); 
                    newConnection.performAction(request);                           
                    break;
                }
                case "detached_connection":
                {    
                    String scenarioNo = request.getParameter("scenarioNo");                
                    ActionDeleteConnection deleteConnection = new ActionDeleteConnection(modello,scenarioNo);
                    deleteConnection.performAction(request);                
                    break;
                }
                case "delete_all_connections":
                {   
                    String scenarioNo = request.getParameter("scenarioNo");
                    String[] sourcePathArray = request.getParameterValues("sourcePathArray[]");
                    String[] targetPathArray = request.getParameterValues("targetPathArray[]");
                    ActionDeleteConnection deleteConnection = new ActionDeleteConnection(modello,scenarioNo);
                    deleteConnection.performActionAllConnections(sourcePathArray, targetPathArray);                
                    break;
                }
                case "new_join_condition":
                {              
                    String scenarioNo = request.getParameter("scenarioNo");
                    String sourcePath = request.getParameter("sourcePath");
                    String targetPath = request.getParameter("targetPath");
                    boolean isSource = Boolean.parseBoolean(request.getParameter("isSource"));
                    ActionNewJoinCondition newJoin = new ActionNewJoinCondition(modello,scenarioNo);
                    newJoin.performAction(sourcePath,targetPath,isSource);                
                    break; 
                }
                case "join_condition_options":
                {          
                    String scenarioNo = request.getParameter("scenarioNo");
                    String sourcePath = request.getParameter("sourcePath");
                    String targetPath = request.getParameter("targetPath");
                    boolean isSource = Boolean.parseBoolean(request.getParameter("isSource"));
                    String changedOption =(request.getParameter("changedOption"));
                    ActionJoinConditionChangeOptions changeJoin = new ActionJoinConditionChangeOptions(modello,scenarioNo);
                    changeJoin.performAction(changedOption, sourcePath, targetPath, isSource);                          
                    break;
                }
                case "detached_join":
                {   
                    String scenarioNo = request.getParameter("scenarioNo");
                    ActionDeleteJoinCondition deleteJoinCondition = new ActionDeleteJoinCondition(modello,scenarioNo);
                    deleteJoinCondition.performAction(request);                
                    break;  
                }
                case "select_mapping_task":
                {  
                    String scenarioNo = request.getParameter("scenarioNo");
                    ActionSelectMappingTask selectMappingTask = new ActionSelectMappingTask(modello);
                    selectMappingTask.performAction(scenarioNo);
                    outputObject.put("scenarioNo",scenarioNo);                
                    break;
                }
                case "generate":
                {    
                    ActionGenerateTransformations generateTransformations = new ActionGenerateTransformations(modello);
                    generateTransformations.performAction();
                    outputObject = generateTransformations.getTGDs();                
                    break;
                }
                case "show_mapping_task_info":
                {
                    String scenarioNo = request.getParameter("scenarioNo");
                    ActionViewTransformations viewTransformationInfo = new ActionViewTransformations(modello, scenarioNo);
                    outputObject.put("info",viewTransformationInfo.performAction());            
                    break;
                }
                case "sql_output":
                { 
                    String scenarioNo = request.getParameter("scenarioNo");
                    ActionViewSql viewSqlScript = new ActionViewSql(modello, Integer.valueOf(scenarioNo));
                    outputObject.put("sqlScript",viewSqlScript.performAction());              
                    break;
                }
                case "xquery_output":
                {
                    String scenarioNo = request.getParameter("scenarioNo");
                    ActionViewXQuery viewXQueryScript = new ActionViewXQuery(modello, scenarioNo);
                    outputObject.put("xQueryScript",viewXQueryScript.performAction());                
                    break;
                }
                case "edit_selection_condition":
                {
                    String specificAction = request.getParameter("specificAction");
                    String path = request.getParameter("path");
                    String scenarioNo = request.getParameter("scenarioNo");
                    String expression = request.getParameter("expression");
                    ActionSelectionCondition editSelectionCondition = new ActionSelectionCondition(modello, scenarioNo);
                    editSelectionCondition.performAction(specificAction, path, expression);
                    break;
                }
                case "remove_mapping_task":
                { 
                    String scenarioNo = request.getParameter("scenarioNo");
                    ActionRemoveMappingTask removeMappingTask = new ActionRemoveMappingTask(modello);
                    removeMappingTask.performAction(scenarioNo);                
                    break;
                }                 
                case "export_tgds":{
                    response.reset();
                    response.setContentType("text/plain");                    
                    response.setHeader("Content-disposition","attachment; filename=tgd.txt");
                    ActionViewTGDs actionViewTgds = new ActionViewTGDs(modello);
                    actionViewTgds.performAction();        
                    String tgdsString = actionViewTgds.getTGDsString();
                    
                    out.write(tgdsString);
                    send = false;
                    
                    /*try (OutputStream output = response.getOutputStream()) {                        
                        output.write(tgdsString.getBytes());
                        output.close();
                    }*/
                }                
                default: break;
            }
            if (send)
                out.write(outputObject.toJSONString());            
            out.flush();
        }
        catch (NumberFormatException | DAOException ex){
            outputObject.put("exception","Server exception: "+ex.getClass().getName()+": "+ex.getMessage());
            out.write(outputObject.toJSONString());
            out.flush();
        }
        catch (IllegalArgumentException ex){
            //outputObject.put("exception","Server exception: "+ex.getClass().getName()+": "+ex.getMessage());
            outputObject.put("exception","Server exception: "+ex.getClass().getName()+": Problem accessing user files");
            out.write(outputObject.toJSONString());
            out.flush();
        }
        catch(Exception ex){
            outputObject.put("exception","Server exception: "+ex.getClass().getName()+": "+ex.getMessage());
            out.write(outputObject.toJSONString());
            out.flush();
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
        processRequest(request, response);      
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
        processRequest(request, response);   
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
