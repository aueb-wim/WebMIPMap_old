package it.unibas.spicygui.controllo.datasource.operators;

//giannisk

import it.unibas.spicygui.commons.Modello;
import it.unibas.spicygui.controllo.datasource.ActionViewConnections;
import it.unibas.spicygui.controllo.datasource.ActionViewJoinConditions;
import it.unibas.spicygui.controllo.datasource.ActionViewSchema;
import org.json.simple.JSONObject;

public class JSONTreeCreator {
    
    private Modello modello;
    
    
    public JSONTreeCreator(Modello modello) {
        this.modello=modello;
    }
    
    public JSONObject createSchemaTrees(){
        
        ActionViewSchema actionViewSchema = new ActionViewSchema(modello);
        actionViewSchema.performAction();        
        JSONObject treeObject = actionViewSchema.getSchemaTreesObject();
        
        ActionViewJoinConditions actionViewJoinConditions = new ActionViewJoinConditions(modello);
        actionViewJoinConditions.performAction();        
        JSONObject joinsObject = actionViewJoinConditions.getJoinConditionsObject();
        treeObject.putAll(joinsObject);
        
        ActionViewConnections actionViewConnections = new ActionViewConnections(modello);
        actionViewConnections.performAction();        
        JSONObject connectionsObject = actionViewConnections.getConnectionsObject();
        treeObject.putAll(connectionsObject);
        
        return(treeObject);
    }
}
