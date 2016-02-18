package it.unibas.spicygui.controllo.mapping;

import it.unibas.spicy.model.mapping.MappingTask;
import it.unibas.spicygui.Costanti;
import it.unibas.spicygui.commons.Modello;
import it.unibas.spicygui.controllo.Scenario;
import java.util.HashMap;


public class ActionViewTransformations {
    private Modello modello;
    private String scenarioNo;
    
    public ActionViewTransformations(Modello modello, String scenarioNo) {        
        this.modello = modello;
        this.scenarioNo = scenarioNo;
    }
    
    public String performAction() {
        HashMap<Integer, Scenario> scenarioMap = (HashMap) modello.getBean(Costanti.SCENARIO_MAPPER);
        Scenario scenario = scenarioMap.get(Integer.valueOf(scenarioNo));
        MappingTask mappingTask = scenario.getMappingTask();
        return mappingTask.getMappingData().toLongString();
    }
}
