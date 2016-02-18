package it.unibas.spicygui.controllo.file;

//giannisk

import it.unibas.spicygui.Costanti;
import it.unibas.spicygui.commons.Modello;
import it.unibas.spicygui.controllo.Scenario;
import java.util.HashMap;

public class ActionSelectMappingTask {
    private Modello modello;    
    
    public ActionSelectMappingTask(Modello modello) {
        this.modello=modello;
    }
    
    public void performAction(String scenarioNo){
        HashMap<Integer, Scenario> scenarioMap = (HashMap) modello.getBean(Costanti.SCENARIO_MAPPER);
        Scenario scenarioNew = scenarioMap.get(Integer.valueOf(scenarioNo));
        modello.putBean(Costanti.CURRENT_SCENARIO, scenarioNew);
    }
    
}
