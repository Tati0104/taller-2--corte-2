class SistemaCitasMedicas {
    constructor() {
        this.citas = []; // Array para almacenar las citas
    }

    // Método para programar una nueva cita
    programarCita(nombrePaciente, fecha, hora, medicoAsignado) {
        const nuevaCita = {
            nombrePaciente,
            fecha,
            hora,
            medicoAsignado
        };
        this.citas.push(nuevaCita);
        console.log(`Cita programada exitosamente para ${nombrePaciente} con el Dr./Dra. ${medicoAsignado} el ${fecha} a las ${hora}.`);
    }

    // Método para ver todas las citas programadas en orden de fecha y hora
    verCitasProgramadas() {
        if (this.citas.length === 0) {
            console.log('No hay citas programadas.');
            return;
        }

        // Ordenar citas por fecha y hora
        this.citas.sort((a, b) => {
            const fechaHoraA = new Date(`${a.fecha} ${a.hora}`);
            const fechaHoraB = new Date(`${b.fecha} ${b.hora}`);
            return fechaHoraA - fechaHoraB;
        });

        console.log('Citas programadas:');
        this.citas.forEach((cita, index) => {
            console.log(`${index + 1}. ${cita.nombrePaciente} - ${cita.fecha} ${cita.hora} con ${cita.medicoAsignado}`);
        });
    }

    // Método para cancelar una cita
    cancelarCita(nombrePaciente, fecha, hora) {
        const citaIndex = this.citas.findIndex(cita => cita.nombrePaciente === nombrePaciente && cita.fecha === fecha && cita.hora === hora);

        if (citaIndex !== -1) {
            this.citas.splice(citaIndex, 1); // Eliminar la cita del array
            console.log(`Cita de ${nombrePaciente} el ${fecha} a las ${hora} ha sido cancelada.`);
        } else {
            console.log(`No se encontró una cita para ${nombrePaciente} el ${fecha} a las ${hora}.`);
        }
    }
}

// Crear una instancia del sistema de citas médicas
const sistemaCitas = new SistemaCitasMedicas();

// Simulación de interacción en la consola

// Programar citas
sistemaCitas.programarCita('Juan Pérez', '2024-10-05', '10:00', 'Dr. García');
sistemaCitas.programarCita('María Gómez', '2024-10-06', '14:30', 'Dra. Martínez');
sistemaCitas.programarCita('Ana López', '2024-10-05', '09:30', 'Dr. Rodríguez');

// Ver todas las citas programadas
sistemaCitas.verCitasProgramadas();

// Cancelar una cita
sistemaCitas.cancelarCita('Juan Pérez', '2024-10-05', '10:00');

// Ver todas las citas programadas después de la cancelación
sistemaCitas.verCitasProgramadas();