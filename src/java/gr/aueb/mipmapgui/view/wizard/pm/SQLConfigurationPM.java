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

package gr.aueb.mipmapgui.view.wizard.pm;

public class SQLConfigurationPM {
    private String dbName;
    private String schemaPath;
    
    public String getDBName() {
        return this.dbName;
    }

    public void setDBName(String dbName) {
        this.dbName = dbName;
    }
    
    public String getSchemaPath() {
        return this.schemaPath;
    }

    public void setSchemaPath(String schemaPath) {
        this.schemaPath = schemaPath;
    }       
}
