package gr.aueb.connection;

//giannisk
import it.unibas.spicy.model.correspondence.ValueCorrespondence;
import it.unibas.spicy.model.mapping.MappingTask;
import it.unibas.spicygui.Costanti;
import it.unibas.spicygui.commons.Modello;
import it.unibas.spicygui.controllo.Scenario;
import java.util.HashMap;
import javax.servlet.http.HttpServletRequest;

public class ActionDeleteConnection {
    private Modello modello;
    private String scenarioNo;        
        
    public ActionDeleteConnection(Modello model,String scenarioNo) {
        this.modello = model;
        this.scenarioNo=scenarioNo;
    }
    
    public void performAction(HttpServletRequest request) {
        String targetPath = request.getParameter("targetPath");
        HashMap<Integer, Scenario> scenarioMap = (HashMap) modello.getBean(Costanti.SCENARIO_MAPPER);
        Scenario scenario = scenarioMap.get(Integer.valueOf(scenarioNo));
        MappingTask mappingTask = scenario.getMappingTask();
        if(targetPath!=null&&!targetPath.equals("")){
            ValueCorrespondence vcToDelete = scenario.getCorrespondence(targetPath);
            mappingTask.removeCorrespondence(vcToDelete);
            ////mappingTask.removeCandidateCorrespondence(vcToDelete);
            scenario.removeCorrespondence(targetPath);
        }
    }
    
    public void performActionAllConnections(String[] targetPathArray) { 
        HashMap<Integer, Scenario> scenarioMap = (HashMap) modello.getBean(Costanti.SCENARIO_MAPPER);
        Scenario scenario = scenarioMap.get(Integer.valueOf(scenarioNo));
        MappingTask mappingTask = scenario.getMappingTask();
        if (targetPathArray!=null){
            for (String targetPath : targetPathArray){
                if(targetPath!=null&&!targetPath.equals("")){
                    ValueCorrespondence vcToDelete = scenario.getCorrespondence(targetPath);
                    mappingTask.removeCorrespondence(vcToDelete);
                    scenario.removeCorrespondence(targetPath);
                }
            }
        }
    }

}
