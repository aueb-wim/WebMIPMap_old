package gr.aueb.connection;

//giannisk

import it.unibas.spicy.model.correspondence.ConstantValue;
import it.unibas.spicy.model.correspondence.DateFunction;
import it.unibas.spicy.model.correspondence.ISourceValue;
import it.unibas.spicy.model.correspondence.NewIdFunction;
import it.unibas.spicy.model.correspondence.ValueCorrespondence;
import it.unibas.spicy.model.expressions.Expression;
import it.unibas.spicy.model.mapping.MappingTask;
import it.unibas.spicy.model.paths.PathExpression;
import it.unibas.spicy.model.paths.operators.GeneratePathExpression;
import it.unibas.spicy.persistence.xml.DAOXmlUtility;
import it.unibas.spicy.utility.SpicyEngineConstants;
import it.unibas.spicygui.Costanti;
import it.unibas.spicygui.commons.Modello;
import it.unibas.spicygui.controllo.Scenario;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

public class ActionNewConnection {
    private Modello modello;
    private GeneratePathExpression pathGenerator = new GeneratePathExpression();
    private String scenarioNo;

    public ActionNewConnection(Modello model,String scenarioNo) {
        this.modello = model;
        this.scenarioNo=scenarioNo;
    }
    
    public void performAction(HttpServletRequest request) {
        String[] sourcePathArray = request.getParameterValues("sourcePathArray[]");
        String sourceValueText = request.getParameter("sourceValue");
        String targetPath = request.getParameter("targetPath");
        String transformationText = request.getParameter("expression");
        
        HashMap<Integer, Scenario> scenarioMap = (HashMap) modello.getBean(Costanti.SCENARIO_MAPPER);
        Scenario scenario = scenarioMap.get(Integer.valueOf(scenarioNo));
        MappingTask mappingTask = scenario.getMappingTask();
        
        List<PathExpression> sourcePaths = null;
        if(sourcePathArray!=null){
            sourcePaths = new ArrayList<PathExpression>();
            for(String sourcePathString : sourcePathArray){
                PathExpression pathExpression = generatePathExpression(sourcePathString);
                sourcePaths.add(pathExpression);
            }
        }
        ISourceValue sourceValue = null;
        if (!sourceValueText.equals(null)&&!sourceValueText.equals("")){
            if (sourceValueText.equalsIgnoreCase(SpicyEngineConstants.SOURCEVALUE_DATE_FUNCTION)) {
                sourceValue = new DateFunction();
            } else if (sourceValueText.equalsIgnoreCase(SpicyEngineConstants.SOURCEVALUE_NEWID_FUNCTION)) {
                sourceValue = new NewIdFunction();
            } else {
                sourceValue = new ConstantValue(sourceValueText);
            }
        }
        PathExpression targetPathExpression = generatePathExpression(targetPath);
        
        Expression transformationFunctionExpression = null;
        if(transformationText != null&&!transformationText.equals("")){
            transformationFunctionExpression = new Expression(DAOXmlUtility.cleanXmlString(transformationText));
        }
        double confidence = 1.0;
        ValueCorrespondence vc = new ValueCorrespondence(sourcePaths,sourceValue,targetPathExpression,transformationFunctionExpression,confidence);
        
        mappingTask.addCorrespondence(vc);
        
        String key = targetPath;
        scenario.addCorrespondence(key, vc);   

        
        //DUMMY CONFIG
        /*mappingTask.getConfig().setRewriteSubsumptions(true);
        mappingTask.getConfig().setRewriteCoverages(true);
        mappingTask.getConfig().setRewriteSelfJoins(true);
        mappingTask.getConfig().setRewriteEGDs(false);
        mappingTask.getConfig().setSortStrategy(-1);
        mappingTask.getConfig().setSkolemTableStrategy(-1);
        mappingTask.getConfig().setUseLocalSkolem(false);*/
        

    }
    
    private PathExpression generatePathExpression(String sourcePath) {
        return pathGenerator.generatePathFromString(sourcePath);
    }

}
