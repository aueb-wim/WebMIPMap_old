/*
    Copyright (C) 2007-2011  Database Group - Universita' della Basilicata
    Giansalvatore Mecca - giansalvatore.mecca@unibas.it
    Salvatore Raunich - salrau@gmail.com
    Marcello Buoncristiano - marcello.buoncristiano@yahoo.it

    This file is part of ++Spicy - a Schema Mapping and Data Exchange Tool
    
    ++Spicy is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    ++Spicy is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ++Spicy.  If not, see <http://www.gnu.org/licenses/>.
 */
 
package it.unibas.spicygui.controllo.mapping;


import it.unibas.spicy.model.exceptions.IllegalMappingTaskException;
import it.unibas.spicy.model.mapping.MappingTask;
import it.unibas.spicygui.Costanti;
import it.unibas.spicygui.commons.Modello;
import it.unibas.spicygui.controllo.Scenario;
import org.json.simple.JSONObject;
////import it.unibas.spicygui.vista.TransformationTopComponent;

public class ActionGenerateTransformations {

    //private ActionViewTransformation viewTransformationAction;
    private Modello modello;
    private JSONObject TGDs = new JSONObject();

    public ActionGenerateTransformations(Modello modello) {        
        this.modello=modello;
    }
    
    
    //web
    //Will need it later
    //also un-comment: private ActionViewTransformation viewTransformationAction;
    /*private void openWindows() {
        Scenario scenario = (Scenario) modello.getBean(Costanti.CURRENT_SCENARIO);
        TransformationTopComponent transformationTopComponent = scenario.getTransformationTopComponent();
        if (transformationTopComponent == null) {
            transformationTopComponent = new TransformationTopComponent(scenario);
            scenario.setTransformationTopComponent(transformationTopComponent);
        }
        transformationTopComponent.clear();
        this.viewTransformationAction.performAction();
    }*/
    
    public void performAction() {
        Scenario scenario = (Scenario) modello.getBean(Costanti.CURRENT_SCENARIO);
        //web
        //Will need it later
        /*MappingTask mappingTask = scenario.getMappingTask();
        if (mappingTask.getValueCorrespondences().size() == 0 && mappingTask.getMappingData().getSTTgds().isEmpty()) {
            //web
            System.out.println("WARNING: "+Costanti.EMPTY_CORRESPONDENCES);
            ////NotifyDescriptor nd = new NotifyDescriptor.Message(NbBundle.getMessage(Costanti.class, Costanti.EMPTY_CORRESPONDENCES), DialogDescriptor.WARNING_MESSAGE);
            ////DialogDisplayer.getDefault().notify(nd);
            return;
        }
        try {

        } catch (Exception ex) {
            System.out.println("ERROR: "+ex.getMessage());
            ////DialogDisplayer.getDefault().notify(new NotifyDescriptor.Message(ex.getMessage(), DialogDescriptor.ERROR_MESSAGE));
        }*/
        ActionViewTGDs actionViewTgds = new ActionViewTGDs(modello);
        actionViewTgds.performAction();
        
        TGDs = actionViewTgds.getTGDs();
    }

    public JSONObject getTGDs() {
        return this.TGDs;
    }
   
    public String getName() {
        return Costanti.ACTION_SOLVING_MAPPING;
    }


}
