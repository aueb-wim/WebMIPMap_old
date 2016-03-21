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
 
package gr.aueb.mipmapgui.view.tree;

import it.unibas.spicy.model.datasource.SelectionCondition;

public class SelectionConditionInfo {

    private SelectionCondition selectionCondition;
    private String expressionString = "";

    public SelectionConditionInfo(SelectionCondition selectionCondition, String expressionString) {
        this.selectionCondition = selectionCondition;
        this.expressionString = expressionString;
    }

    public SelectionConditionInfo() {
    }
    
    public String getExpressionString() {
        return expressionString;
    }

    public void setExpressionString(String expressionString) {
        this.expressionString = expressionString;
    }

    public SelectionCondition getSelectionCondition() {
        return selectionCondition;
    }

    public void setSelectionCondition(SelectionCondition selectionCondition) {
        this.selectionCondition = selectionCondition;
    }
    
}
