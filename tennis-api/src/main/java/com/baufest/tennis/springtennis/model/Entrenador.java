package com.baufest.tennis.springtennis.model;

import javax.persistence.*;


@Entity
@Table(name = "Entrenador")
public class Entrenador {

    @Id /* Sera el index de nuestra tabla */
    @GeneratedValue(strategy = GenerationType.IDENTITY) /* Valor Auto-generado con la estategia: GenerationType.IDENTITY */
    private Long id;

    @Column(nullable = false) /* No podemos recibir este valor como nulo "null" */
    private String nombre;


    // constructores
    public Entrenador() {
    }

    public Entrenador(String nombre) {
        this.nombre = nombre;
    }

    public Entrenador(Long id, String nombre) {
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

    //metodo toString para representacion del objeto

    @Override
    public String toString() {
        return "Entrenador{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                '}';
    }
}
