class SistemaTurnosBanco {
    constructor() {
        this.colaDeEspera = []; // Cola de turnos (FIFO)
        this.contadorDeTurnos = 0; // Contador total de turnos
    }

    // Método para que un cliente tome un turno
    tomarTurno() {
        this.contadorDeTurnos++; // Aumentar el contador
        const nuevoTurno = this.contadorDeTurnos; // El nuevo turno es el número del contador
        this.colaDeEspera.push(nuevoTurno); // Añadir el turno a la cola de espera
        console.log(`Cliente con turno número ${nuevoTurno} ha sido añadido a la cola.`);
    }

    // Método para que un empleado llame al siguiente cliente en la cola
    llamarCliente() {
        if (this.colaDeEspera.length === 0) {
            console.log('No hay clientes en la cola de espera.');
        } else {
            const turnoLlamado = this.colaDeEspera.shift(); // Remover el primer turno de la cola
            console.log(`Cliente con turno número ${turnoLlamado}, por favor diríjase a la ventanilla.`);
        }
    }

    // Método para mostrar la cola de espera actual
    mostrarColaDeEspera() {
        if (this.colaDeEspera.length === 0) {
            console.log('La cola de espera está vacía.');
        } else {
            console.log(`Cola de espera actual: ${this.colaDeEspera.join(', ')}`);
        }
    }

    // Método para mostrar cuántos turnos se han tomado hasta ahora
    mostrarContadorDeTurnos() {
        console.log(`Hasta ahora se han tomado ${this.contadorDeTurnos} turnos en total.`);
    }
}

// Crear una instancia del sistema de turnos
const sistemaBanco = new SistemaTurnosBanco();

// Simulación de turnos tomados por los clientes
sistemaBanco.tomarTurno(); // Cliente toma turno 1
sistemaBanco.tomarTurno(); // Cliente toma turno 2
sistemaBanco.tomarTurno(); // Cliente toma turno 3

// Mostrar la cola de espera
sistemaBanco.mostrarColaDeEspera(); // Muestra la cola [1, 2, 3]

// Llamar a los clientes
sistemaBanco.llamarCliente(); // Llama al cliente con turno 1
sistemaBanco.llamarCliente(); // Llama al cliente con turno 2

// Mostrar la cola después de llamadas
sistemaBanco.mostrarColaDeEspera(); // Muestra la cola [3]

// Mostrar el contador de turnos
sistemaBanco.mostrarContadorDeTurnos(); // Muestra que se han tomado 3 turnos en total