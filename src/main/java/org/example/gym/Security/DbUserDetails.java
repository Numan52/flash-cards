package org.example.gym.Security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class DbUserDetails implements UserDetails {
    private String email;
    private String password;
    private boolean active;
    private List<GrantedAuthority> authorityList;

    public DbUserDetails() {
    }

    public DbUserDetails(String email, String password, boolean active, List<GrantedAuthority> authorityList) {
        this.email = email;
        this.password = password;
        this.active = active;
        this.authorityList = authorityList;
    }

    @Override
    public List<? extends GrantedAuthority> getAuthorities() {
        return authorityList;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }
}
