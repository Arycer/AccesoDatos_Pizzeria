package me.arycer.dam.pizzeria.models;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Clase que representa la información de un usuario en la base de datos.
 */
@Setter
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "usuarios")
public class UserInfo {

    // Getters y setters
    // Atributos
    @Id
    private String id;

    @NotBlank(message = "El nombre no puede estar vacío")
    private String username;
    private String email;
    @NotBlank(message = "Debes introducir una contraseña")
    private String password;
    private String roles; // CLIENTE Y ADMIN

}