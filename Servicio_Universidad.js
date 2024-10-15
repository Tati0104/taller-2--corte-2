class UniversidadAtencion {
    constructor() {
        // Arrays para registrar el número de cédula y tipo de atención
        this.atenciones = {
            telefono: [],
            asesorias: {
                estudiante: [],
                directivo: []
            }
        };
        this.transferencias = 0;  // Contador de transferencias de asesoría a llamada telefónica
    }

    // Método para registrar una atención telefónica
    registrarLlamada(cedula) {
        this.atenciones.telefono.push(cedula);
        console.log(`Usuario con cédula ${cedula} ha sido registrado en atención telefónica.`);
    }

    // Método para registrar una asesoría
    registrarAsesoria(cedula, tipoAsesoria) {
        if (tipoAsesoria === 'estudiante' || tipoAsesoria === 'directivo') {
            this.atenciones.asesorias[tipoAsesoria].push(cedula);
            console.log(`Usuario con cédula ${cedula} ha sido registrado en asesoría para ${tipoAsesoria}.`);
        } else {
            console.log('Tipo de asesoría no válido.');
        }
    }

    // Método para transferir de asesoría a llamada telefónica
    transferirAsesoriaALlamada(cedula, tipoAsesoria) {
        if (this.atenciones.asesorias[tipoAsesoria].includes(cedula)) {
            // Eliminar al usuario de asesoría y agregarlo a llamada telefónica
            this.atenciones.asesorias[tipoAsesoria] = this.atenciones.asesorias[tipoAsesoria].filter(c => c !== cedula);
            this.registrarLlamada(cedula);
            this.transferencias++;
            console.log(`Transferencia de asesoría a llamada telefónica realizada para cédula ${cedula}.`);
        } else {
            console.log('No se encontró al usuario en el tipo de asesoría indicado.');
        }
    }

    // Método para mostrar las estadísticas
    mostrarEstadisticas() {
        const totalAtendidos = this.atenciones.telefono.length +
                               this.atenciones.asesorias.estudiante.length +
                               this.atenciones.asesorias.directivo.length;

        console.log(`Estadísticas de atención:
- Total de usuarios atendidos: ${totalAtendidos}
- Usuarios atendidos en llamada telefónica: ${this.atenciones.telefono.length}
- Usuarios atendidos en asesoría de estudiantes: ${this.atenciones.asesorias.estudiante.length}
- Usuarios atendidos en asesoría de directivos: ${this.atenciones.asesorias.directivo.length}
- Transferencias de asesoría a llamada telefónica: ${this.transferencias}`);
    }
}

// Instancia del sistema de atención de la universidad
const universidad = new UniversidadAtencion();

// Simulación de atenciones
universidad.registrarLlamada('123456789'); // Llamada telefónica
universidad.registrarAsesoria('987654321', 'estudiante'); // Asesoría a estudiante
universidad.registrarAsesoria('123123123', 'directivo'); // Asesoría a directivo

// Transferencia de asesoría a llamada
universidad.transferirAsesoriaALlamada('987654321', 'estudiante');

// Mostrar estadísticas actuales
universidad.mostrarEstadisticas();