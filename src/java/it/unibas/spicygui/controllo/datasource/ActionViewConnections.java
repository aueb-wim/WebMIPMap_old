package it.unibas.spicygui.controllo.datasource;

//giannisk

import it.unibas.spicy.model.correspondence.ValueCorrespondence;
import it.unibas.spicy.model.datasource.INode;
import it.unibas.spicy.model.datasource.operators.FindNode;
import it.unibas.spicy.model.mapping.MappingTask;
import it.unibas.spicy.model.paths.PathExpression;
import it.unibas.spicygui.Costanti;
import it.unibas.spicygui.commons.Modello;
import it.unibas.spicygui.controllo.Scenario;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class ActionViewConnections {
        
    private Modello modello;
    private JSONObject connectionsObject = new JSONObject();
    
    public ActionViewConnections(Modello model) {
        this.modello = model;
    }
    
    public void performAction() {
        Scenario scenario = (Scenario) this.modello.getBean(Costanti.CURRENT_SCENARIO);
        if (scenario != null) {
            JSONArray connectionsArray = new JSONArray();

            FindNode finder = new FindNode();

            MappingTask mappingTask = scenario.getMappingTask();
            if (mappingTask.getValueCorrespondences().size() > 0) {
                 for (ValueCorrespondence valueCorrespondence: mappingTask.getValueCorrespondences()){
                     JSONObject connectionObject = new JSONObject();
                     //constant
                     if (valueCorrespondence.getSourceValue() != null) {
                         connectionObject.put("connectionType","constant");
                         connectionObject.put("sourceValue",valueCorrespondence.getSourceValue().toString());
                         connectionObject.put("transformationFunction",null);
                         connectionObject.put("sourceNode",null);
                         INode iNodeTarget = finder.findNodeInSchema(valueCorrespondence.getTargetPath(), mappingTask.getTargetProxy());
                         connectionObject.put("targetNode","sch_node" + iNodeTarget.getValue());
                     }
                     else{
                         //function
                         if (verificaFunzioneDiTrasformazione(valueCorrespondence)) {
                             connectionObject.put("connectionType","function");
                             connectionObject.put("sourceValue",null);
                             connectionObject.put("transformationFunction",valueCorrespondence.getTransformationFunction().toString());
                             JSONArray sourcePathsArray = new JSONArray();
                             for (PathExpression sourcePath : valueCorrespondence.getSourcePaths()){
                                 INode iNodeSource = finder.findNodeInSchema(sourcePath, mappingTask.getSourceProxy());
                                 sourcePathsArray.add("sch_node" + iNodeSource.getValue());
                             }
                             connectionObject.put("sourceNodes",sourcePathsArray);
                             INode iNodeTarget = finder.findNodeInSchema(valueCorrespondence.getTargetPath(), mappingTask.getTargetProxy());
                             connectionObject.put("targetNode","sch_node" + iNodeTarget.getValue());
                         }
                         //simple 1:1 correspondence
                         else{
                             connectionObject.put("connectionType","simple");
                             connectionObject.put("sourceValue",null);
                             connectionObject.put("transformationFunction",null);
                             JSONArray sourcePathsArray = new JSONArray();
                             for (PathExpression sourcePath : valueCorrespondence.getSourcePaths()){
                                 INode iNodeSource = finder.findNodeInSchema(sourcePath, mappingTask.getSourceProxy());
                                 sourcePathsArray.add("sch_node" + iNodeSource.getValue());
                             }
                             connectionObject.put("sourceNodes",sourcePathsArray);
                             INode iNodeTarget = finder.findNodeInSchema(valueCorrespondence.getTargetPath(), mappingTask.getTargetProxy());                                        
                             connectionObject.put("targetNode","sch_node" + iNodeTarget.getValue());
                         }
                     }
                     connectionsArray.add(connectionObject);
                     
                     String key = valueCorrespondence.getTargetPath().toString();
                     scenario.addCorrespondence(key, valueCorrespondence);
                 }                           
            }
            connectionsObject.put("connections",connectionsArray);
        }                 
    }
    
    private boolean verificaFunzioneDiTrasformazione(ValueCorrespondence valueCorrespondence) {
        if (valueCorrespondence.getSourcePaths().size() > 1) {
            return true;
        }
        String transformationFunctionString = valueCorrespondence.getTransformationFunction().toString();
        String sourcePathString = valueCorrespondence.getSourcePaths().get(0).toString();
        return (!transformationFunctionString.equals(sourcePathString));
    }
    
    public JSONObject getConnectionsObject(){
        return this.connectionsObject;
    }
    
    public String getName() {
        return Costanti.ACTION_SHOW_SCHEMA;
    }
}
