class Hotel {
    constructor() {
        this.habitaciones = {
            individual: [],
            doble: [],
            familiar: []
        };
        this.maxPersonas = {
            individual: 2,
            doble: 4,
            familiar: 6
        };
    }
//Validar reserva
    esReservaValida(tipoHabitacion, numPersonas, mascota) {
        if (numPersonas > this.maxPersonas[tipoHabitacion]) {
            console.log(`Error: El número de personas excede el límite para una habitación ${tipoHabitacion}.`);
            return false;
        }

        if (mascota && tipoHabitacion !== 'familiar') {
            console.log(`Error: Solo se permiten mascotas en habitaciones familiares.`);
            return false;
        }

        return true;
    }

    //Hacer una reserva
    reservar(nombre, pais, numPersonas, tipoHabitacion, fumador, mascota, periodo) {
        if (!this.esReservaValida(tipoHabitacion, numPersonas, mascota)) {
            return;
        }

        // Crear un objeto de reserva
        const reserva = {
            nombre,
            pais,
            numPersonas,
            fumador,
            mascota,
            periodo
        };

        // tipo de habitación correspondiente
        this.habitaciones[tipoHabitacion].push(reserva);
        console.log(`Reserva exitosa para ${nombre}. Habitación ${tipoHabitacion} reservada.`);
    }

    // Método para contar cuántas habitaciones están reservadas
    contarHabitacionesReservadas() {
        const totalIndividual = this.habitaciones.individual.length;
        const totalDobles = this.habitaciones.doble.length;
        const totalFamiliares = this.habitaciones.familiar.length;
        const total = totalIndividual + totalDobles + totalFamiliares;
        console.log(`El hotel tiene ${total} habitaciones reservadas: 
        ${totalIndividual} individuales, 
        ${totalDobles} dobles, 
        ${totalFamiliares} familiares.`);
    }

    // Método para mostrar todas las reservas del hotel
    mostrarReservas() {
        console.log("Reservas actuales en el hotel:");

        Object.keys(this.habitaciones).forEach(tipo => {
            if (this.habitaciones[tipo].length > 0) {
                console.log(`\nHabitaciones ${tipo}:`);
                this.habitaciones[tipo].forEach((reserva, index) => {
                    console.log(
                        `Reserva ${index + 1}: ${reserva.nombre} (${reserva.pais}), ${reserva.numPersonas} personas, 
                        Fumador: ${reserva.fumador}, Mascota: ${reserva.mascota}, Periodo: ${reserva.periodo} días`
                    );
                });
            }
        });
    }
}

// Crear una instancia del hotel
const hotel = new Hotel();

// Realizar algunas reservas
hotel.reservar('Carlos', 'Colombia', 2, 'individual', false, false, 3); // Reserva válida
hotel.reservar('Ana', 'España', 5, 'doble', true, false, 4); // Error: Exceso de personas
hotel.reservar('Luis', 'Argentina', 3, 'doble', false, false, 2); // Reserva válida
hotel.reservar('Marta', 'Chile', 6, 'familiar', false, true, 7); // Reserva válida
hotel.reservar('Pedro', 'Perú', 4, 'familiar', true, false, 5); // Reserva válida

hotel.mostrarReservas();

hotel.contarHabitacionesReservadas();