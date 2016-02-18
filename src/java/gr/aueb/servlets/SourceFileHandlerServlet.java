package gr.aueb.servlets;

import it.unibas.spicygui.Costanti;
import it.unibas.spicygui.commons.Modello;
import java.io.File;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Part;

//giannisk
@WebServlet(name = "SourceFileHandlerServlet", urlPatterns = {"/SourceFileHandlerServlet"})
@MultipartConfig(location = Costanti.SERVER_MAIN_FOLDER, fileSizeThreshold=1024*1024, 
    maxFileSize=1024*1024*20, maxRequestSize=1024*1024*20*5)
public class SourceFileHandlerServlet extends HttpServlet {

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
            user = "johnny";
        }
        String path = user + "/" + Costanti.SERVER_TEMP_FOLDER + Costanti.SERVER_SOURCE_FOLDER;
        
        String action = request.getParameter("buttonPressed");
        if (action.equalsIgnoreCase("add")){
            Part sourceFilePart = request.getPart("dirSource");           
            sourceFilePart.write(path + sourceFilePart.getSubmittedFileName());
        }
        else if (action.equalsIgnoreCase("remove")){
            String fileNameToDelete = request.getParameter("filesSource");
            
            File deleteFile = new File(Costanti.SERVER_MAIN_FOLDER + path + fileNameToDelete);
            // check if the file  present or not
            if( deleteFile.exists() ){
                deleteFile.delete() ;
            } 
        }
        else if(action.equalsIgnoreCase("upload_file")){
            String type = request.getParameter("inputTypeSource");
            Part sourceFilePart = request.getPart(type+"SchemaSource");           
            sourceFilePart.write(path + sourceFilePart.getSubmittedFileName());
        }
    }
    
    /*private static String getValue(Part part) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(part.getInputStream(), "UTF-8"));
        StringBuilder value = new StringBuilder();
        char[] buffer = new char[1024];
        for (int length = 0; (length = reader.read(buffer)) > 0;) {
            value.append(buffer, 0, length);
        }
        return value.toString();
    }*/

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
        return "Servlet that handles web requests for file upload/removal of the source schema";
    }

}
