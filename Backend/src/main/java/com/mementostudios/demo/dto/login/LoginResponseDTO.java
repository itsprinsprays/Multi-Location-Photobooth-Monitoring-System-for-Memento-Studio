package com.mementostudios.demo.dto.login;

import com.mementostudios.demo.entity.Employee.EmployeeRole;

public class LoginResponseDTO {

    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";
    private Integer employeeId;
    private String employeeName;
    private String username;
    private EmployeeRole role;

    public LoginResponseDTO() {
    }

    public LoginResponseDTO(String accessToken, String refreshToken, Integer employeeId, 
                            String employeeName, String username, EmployeeRole role) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.tokenType = "Bearer";
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.username = username;
        this.role = role;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public EmployeeRole getRole() {
        return role;
    }

    public void setRole(EmployeeRole role) {
        this.role = role;
    }
}