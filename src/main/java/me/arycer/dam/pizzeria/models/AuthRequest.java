package me.arycer.dam.pizzeria.models;

import lombok.*;

/**
 * Clase que representa una solicitud de autenticación.
 * Contiene las credenciales del usuario necesarias para la autenticación.
 */
@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {

    // Getters y setters
    // Atributos
    private String username;
    private String password;

}