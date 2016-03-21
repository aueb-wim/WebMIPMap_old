<%-- 
    Document   : newjsplogout
    Created on : Mar 14, 2016, 1:03:49 AM
    Author     : johnny
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ page session="true"%>

User '<%=request.getRemoteUser()%>' has been logged out.

<% session.invalidate(); %>