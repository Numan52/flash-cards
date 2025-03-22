package org.example.gym.Service;

import jakarta.transaction.Transactional;
import org.example.gym.Entities.User;
import org.example.gym.Exception.UserException;
import org.example.gym.Repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private UserRepository userRepository;
    private PasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    @Transactional
    public void saveUser(User user) throws UserException {
        User userByUsername = userRepository.findByUsername(user.getUsername()).orElse(null);
        User userByEmail = userRepository.findByEmail(user.getEmail()).orElse(null);

        if (userByUsername != null) {
            log.error("user {} is already taken", user.getUsername());
            throw new UserException("Username \"" + user.getUsername() + "\" is already taken");
        }
        if (userByEmail != null) {
            throw new UserException("User with email address \"" + user.getEmail() + "\" already exists");
        }

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }


}
