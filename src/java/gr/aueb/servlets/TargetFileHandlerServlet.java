package gr.aueb.servlets;

import gr.aueb.mipmapgui.Costanti;
import it.unibas.spicygui.commons.Modello;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Part;
import org.json.simple.JSONObject;

//giannisk
@MultipartConfig(location = "FILE_UPLOAD_PATH"+Costanti.SERVER_FILES_FOLDER, fileSizeThreshold=1024*1024, 
    maxFileSize=1024*1024*20, maxRequestSize=1024*1024*20*5)
public class TargetFileHandlerServlet extends HttpServlet {

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
        JSONObject outputObject = new JSONObject(); 
        PrintWriter out = response.getWriter();
        
        String path = user + "/" + Costanti.SERVER_TEMP_FOLDER + Costanti.SERVER_TARGET_FOLDER;       
        String action = request.getParameter("buttonPressed");        
        try{
            if(action.equalsIgnoreCase("upload_file")){
                String type = request.getParameter("inputTypeTarget");
                Part sourceFilePart = request.getPart(type+"SchemaTarget");           
                sourceFilePart.write(path + sourceFilePart.getSubmittedFileName());
            }
            else if (action.equalsIgnoreCase("add")){  

                String fileName = request.getParameter("fileName");
                String firstLine = request.getParameter("firstLine");
                File file = new File(Costanti.SERVER_MAIN_FOLDER + Costanti.SERVER_FILES_FOLDER + path + fileName);
                try(FileWriter writer = new FileWriter(file)) {                                            
                    writer.write(firstLine);
                }
            }
            else if (action.equalsIgnoreCase("remove")){
                String fileNameToDelete = request.getParameter("filesTarget");
                File deleteFile = new File(Costanti.SERVER_MAIN_FOLDER + Costanti.SERVER_FILES_FOLDER + path +  fileNameToDelete);
                // check if the file  present or not
                if( deleteFile.exists() ){
                    deleteFile.delete() ;
                } 
            }
            out.write(outputObject.toJSONString());
            out.flush();
        } catch (Exception ex){            
            outputObject.put("exception","Server exception: "+ex.getClass().getName()+": "+ex.getMessage());
            out.write(outputObject.toJSONString()); 
            out.flush();
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
    public String getServletInfo() {
        return "Servlet that handles web requests for file upload/removal of the target schema";
    }

}