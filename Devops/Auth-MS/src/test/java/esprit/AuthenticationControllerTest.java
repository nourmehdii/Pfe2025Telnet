package esprit;

import com.Telnet.AuthService.controller.AuthenticationController;
import com.Telnet.AuthService.model.AuthenticationResponse;
import com.Telnet.AuthService.model.ERole;
import com.Telnet.AuthService.model.Role;
import com.Telnet.AuthService.model.User;
import com.Telnet.AuthService.repository.RoleRepository;
import com.Telnet.AuthService.repository.UserRepository;
import com.Telnet.AuthService.service.AuthenticationService;
import com.Telnet.AuthService.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
public class AuthenticationControllerTest {

    @InjectMocks
    private AuthenticationController authenticationController;

    @Mock
    private AuthenticationService authService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        authenticationController = new AuthenticationController(authService);
    }



    @Test
    void testSayHello() {
        String result = authenticationController.sayHello();
        assertEquals("Bonjour", result);
    }

    @Test
    void testRegister() {
        // Création d'un utilisateur fictif pour l'enregistrement
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setUsername("johndoe");
        user.setEmail("john.doe@example.com");
        user.setPassword("password");

        // Mock du retour de authService.register(user)
        AuthenticationResponse authResponse = new AuthenticationResponse("token", "User registration was successful", "ADMIN", "johndoe", "John", "Doe", "john.doe@example.com", null, 1);
        ResponseEntity<AuthenticationResponse> responseEntity = ResponseEntity.ok(authResponse);
        when(authService.register(user)).thenReturn(responseEntity);

        // Appel de la méthode register dans votre contrôleur
        AuthenticationResponse response = authenticationController.register(user);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(authResponse, response);
    }



    @Test
    void testGetRoles() {
        ResponseEntity<List<String>> response = authenticationController.getRoles();
        List<String> expectedRoles = Arrays.asList(ERole.ADMIN.toString(), ERole.RESPONSABLEQUALITE.toString(), ERole.DIRECTEUR.toString(), ERole.CHEFDEPROJET.toString());

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedRoles, response.getBody());
    }

    @Test
    void testGetRoleByUserId() {
        Integer userId = 1;
        Role role = new Role();
        when(authService.getRoleByUserId(userId)).thenReturn(Optional.of(role));

        ResponseEntity<Role> response = (ResponseEntity<Role>) authenticationController.getRoleByUserId(userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(role, response.getBody());
    }


    @Test
    void testGetUserById() {
        Integer userId = 1;
        User user = new User();
        when(authService.getUserById(userId)).thenReturn(user);

        ResponseEntity<User> response = authenticationController.getUserById(userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
    }

    @Test
    void testLogin() {
        User user = new User();
        AuthenticationResponse authResponse = new AuthenticationResponse("token", null, null, null, null, null, null, null, null);
        when(authService.authenticate(user)).thenReturn(authResponse);

        ResponseEntity<AuthenticationResponse> response = authenticationController.login(user);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(authResponse, response.getBody());
    }

    @Test
    void testUpdateUserById() {
        Integer userId = 1;
        User user = new User();
        AuthenticationResponse authResponse = new AuthenticationResponse("token", null, null, null, null, null, null, null, null);
        when(authService.updateUserById(userId, user)).thenReturn(authResponse);

        ResponseEntity<AuthenticationResponse> response = authenticationController.updateUserById(userId, user);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(authResponse, response.getBody());
    }




    @Test
    void testGetRoleByUserIdNotFound() {
        Integer userId = 1;
        when(authService.getRoleByUserId(userId)).thenReturn(Optional.empty());

        ResponseEntity<Role> response = (ResponseEntity<Role>) authenticationController.getRoleByUserId(userId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }


    @Test
    void testGetUserByIdNotFound() {
        Integer userId = 1;
        when(authService.getUserById(userId)).thenThrow(new ResourceNotFoundException("User not found"));

        ResponseEntity<User> response = authenticationController.getUserById(userId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
