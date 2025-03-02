package me.arycer.dam.pizzeria.controller;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;
import me.arycer.dam.pizzeria.models.AuthRequest;
import me.arycer.dam.pizzeria.models.UserInfo;
import me.arycer.dam.pizzeria.repositories.UserInfoRepository;
import me.arycer.dam.pizzeria.services.JwtService;
import me.arycer.dam.pizzeria.services.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

/**
 * Controlador REST que maneja las solicitudes relacionadas con la autenticación y la gestión de usuarios
 */
@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserInfoService service;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * Endpoint público que no requiere autenticación.
     * Devuelve un mensaje de bienvenida.
     * @return Mensaje de bienvenida.
     */
    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome this endpoint is not secure";
    }

    /**
     * Verifica si un nombre de usuario ya está en uso.
     * @param username Nombre de usuario a verificar.
     * @return ResponseEntity con estado HTTP 200 si el nombre de usuario está disponible,
     *         o estado HTTP 400 con un mensaje de error si ya está en uso.
     */
    @GetMapping("/checkUsername")
    public ResponseEntity<?> checkUsername(@RequestParam String username) {
        boolean exists = userInfoRepository.findByUsername(username).isPresent();
        if (exists) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El nombre de usuario ya está en uso.");
        }
        return ResponseEntity.ok().build();
    }

    /**
     * Registra un nuevo usuario en el sistema.
     * @param userInfo Objeto UserInfo con los datos del nuevo usuario.
     * @return ResponseEntity con un mensaje de éxito si el usuario se registra correctamente,
     *         o un mensaje de error con el estado HTTP correspondiente si falla el registro.
     */
    @PostMapping("/addNewUser")
    public ResponseEntity<?> addNewUser(@Valid @RequestBody UserInfo userInfo) {
        try {
            String message = service.addUser(userInfo);
            return ResponseEntity.ok(message);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }

    /**
     * Endpoint accesible solo para usuarios con el rol 'CLIENTE'.
     * Devuelve un mensaje de bienvenida al perfil de cliente.
     * @return Mensaje de bienvenida al perfil de cliente.
     */
    @GetMapping("/user/userProfile")
    @PreAuthorize("hasAuthority('ROLE_CLIENTE')")
    public String userProfile() {
        return "Welcome to Cliente Profile";
    }

    /**
     * Endpoint accesible solo para usuarios con el rol 'ADMIN'.
     * Devuelve un mensaje de bienvenida al perfil de administrador.
     * @return Mensaje de bienvenida al perfil de administrador.
     */
    @GetMapping("/admin/adminProfile")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String adminProfile() {
        return "Welcome to Admin Profile";
    }

    /**
     * Autentica a un usuario y genera un token JWT si las credenciales son válidas.
     * Además, configura una cookie con el token JWT para su uso posterior.
     * @param authRequest Objeto AuthRequest con las credenciales del usuario (username y password).
     * @param response HttpServletResponse para configurar la cookie con el token JWT.
     * @return ResponseEntity con un mensaje de éxito, el token JWT y una URL de redirección
     *         si la autenticación es exitosa, o un mensaje de error con estado HTTP 401 si falla.
     */
    @PostMapping("/generateToken")
    public ResponseEntity<?> authenticateAndGetToken(@RequestBody AuthRequest authRequest, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );

        if (authentication.isAuthenticated()) {
            UserInfo user = userInfoRepository.findByUsername(authRequest.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

            String token = jwtService.generateToken(user.getUsername(), user.getId(), user.getRoles());

            // Configurar cookie con el token
            Cookie jwtCookie = new Cookie("JWT-TOKEN", token);
            jwtCookie.setHttpOnly(true);
            jwtCookie.setSecure(false);
            jwtCookie.setPath("/"); // Disponible para toda la app
            jwtCookie.setMaxAge(24 * 60 * 60); // Expira en 1 día
            response.addCookie(jwtCookie);

            //String redirectUrl = user.getRoles().contains("CLIENTE") ? "/auth/pizzas" : "/dashboard";

            return ResponseEntity.ok(Map.of(
                    "message", "Autenticación exitosa",
                    "token", token,  // Añade el token en la respuesta
                    "redirectUrl", "/dashboard" // Añade la URL de redirección
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }

    /**
     * Endpoint para obtener la información del usuario autenticado.
     * Este endpoint devolverá el nombre de usuario y el rol del usuario autenticado.
     * @param request HttpServletRequest para obtener el token JWT desde la cabecera Authorization.
     * @return ResponseEntity con la información del usuario (username y role) o un error si no está autenticado.
     */
    @GetMapping("/me")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
        // Obtener el token JWT desde la cabecera Authorization
        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token no proporcionado o no válido.");
        }

        // Extraer el token sin la palabra "Bearer "
        token = token.substring(7);

        try {
            // Validar el token y extraer el nombre de usuario
            String username = jwtService.extractUsername(token);

            // Obtener el usuario desde la base de datos usando el nombre de usuario
            UserInfo user = userInfoRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

            // Devolver la información del usuario (username y role)
            return ResponseEntity.ok(new UserResponse(user.getUsername(), user.getRoles()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido o expirado.");
        }
    }

    /**
     * Clase interna para estructurar la respuesta con el nombre de usuario y el rol.
     */
    @Getter
    @Setter
    public static class UserResponse {
        private String username;
        private String role;

        public UserResponse(String username, String role) {
            this.username = username;
            this.role = role;
        }
    }
}