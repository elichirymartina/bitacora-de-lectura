package com.bitacora.libros;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.TimeZone; // <-- Asegurate de que se agregue esta importación

@SpringBootApplication
public class LibrosApplication {

    public static void main(String[] args) {
        // Forzamos a la JVM a usar UTC antes de que Spring intente conectarse a la base de datos
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
        
        SpringApplication.run(LibrosApplication.class, args);
    }

}