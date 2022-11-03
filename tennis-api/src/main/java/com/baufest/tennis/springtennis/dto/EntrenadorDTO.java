package com.baufest.tennis.springtennis.dto;

public class EntrenadorDTO {

    private Long id;

    private String nombre;

    // constructores


    public EntrenadorDTO() {
    }

    public EntrenadorDTO(String nombre) {
        this.nombre = nombre;
    }

    public EntrenadorDTO(Long id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    //getters and setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    // representacion del objeto


    @Override
    public String toString() {
        return "EntrenadorDTO{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                '}';
    }
}
