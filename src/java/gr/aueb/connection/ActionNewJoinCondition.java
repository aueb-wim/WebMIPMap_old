/* Copyright 2015-2016 by the Athens University of Economics and Business (AUEB).

   This file is part of WebMIPMap.

   WebMIPMap is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    WebMIPMap is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with WebMIPMap.  If not, see <http://www.gnu.org/licenses/>.
 */

package gr.aueb.connection;

//giannisk

import it.unibas.spicy.model.datasource.JoinCondition;
import it.unibas.spicy.model.mapping.IDataSourceProxy;
import it.unibas.spicy.model.mapping.MappingTask;
import it.unibas.spicy.model.paths.PathExpression;
import it.unibas.spicy.model.paths.operators.GeneratePathExpression;
import gr.aueb.mipmapgui.Costanti;
import it.unibas.spicygui.commons.Modello;
import gr.aueb.mipmapgui.controller.Scenario;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ActionNewJoinCondition {
    private Modello modello;
    private GeneratePathExpression pathGenerator = new GeneratePathExpression();
    private String scenarioNo;

    public ActionNewJoinCondition(Modello model,String scenarioNo) {
        this.modello = model;
        this.scenarioNo=scenarioNo;
    }
    
    public void performAction(String fromPath, String toPath, boolean isSource) {       
        HashMap<Integer, Scenario> scenarioMap = (HashMap) modello.getBean(Costanti.SCENARIO_MAPPER);
        Scenario scenario = scenarioMap.get(Integer.valueOf(scenarioNo));
        MappingTask mappingTask = scenario.getMappingTask();
        IDataSourceProxy dataSource;
        if (isSource){
            dataSource=mappingTask.getSourceProxy();
        }
        else{
            dataSource=mappingTask.getTargetProxy();
        }
        List<PathExpression> fromPaths = new ArrayList<PathExpression>();
        List<PathExpression> toPaths = new ArrayList<PathExpression>();        
        PathExpression fromPathExpression = generatePathExpression(fromPath);
        PathExpression toPathExpression = generatePathExpression(toPath);
        fromPaths.add(fromPathExpression);
        toPaths.add(toPathExpression);
        JoinCondition joinCondition = new JoinCondition(fromPaths, toPaths); 
        dataSource.addJoinCondition(joinCondition);
        String key = fromPath+"->"+toPath;
        scenario.addJoinCondition(key, joinCondition); 
    }
    
    private PathExpression generatePathExpression(String sourcePath) {
        return pathGenerator.generatePathFromString(sourcePath);
    }
}
