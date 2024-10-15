const prompt = require('prompt-sync')();//se importa prompt-sync para ingreso de datos del usuario por consola

const banco = {
    clientes: [
        {
            documento: '1233897217',
            pin: '2209',
            cuentas: [
                { tipo: 'Ahorros', saldo: 4400000 },
                { tipo: 'Corriente', saldo: 14000000 }
            ]
        },
        {
            documento: '1030561926',
            pin: '0922',
            cuentas: [
                { tipo: 'Ahorros', saldo: 22000000 },
                { tipo: 'Corriente', saldo: 50000000 }
            ]
        }
    ],
    
    validarPin: function(documento, pin) {
        const cliente = this.clientes.find(c => c.documento === documento);
        if (cliente && cliente.pin === pin) {
            return cliente;
        }
        return null;
    },
    
    retirar: function(cliente, tipoCuenta, monto) {
        const cuenta = cliente.cuentas.find(c => c.tipo === tipoCuenta);
        if (cuenta && cuenta.saldo >= monto && monto % 50000 === 0) {
            cuenta.saldo -= monto;
            return `Retiro exitoso, puede tomar ${monto} de la bandeja principal`;
        }
        return 'Retiro fallido: saldo insuficiente o monto no válido';
    },
    
    depositar: function(cliente, tipoCuenta, monto) {
        const cuenta = cliente.cuentas.find(c => c.tipo === tipoCuenta);
        if (cuenta) {
            cuenta.saldo += monto;
            return `Depósito exitoso: ${monto} depositados en la cuenta de ${tipoCuenta}`;
        }
        return 'Depósito fallido: cuenta no encontrada';
    },
    
    transferir: function(cliente, cuentaOrigen, cuentaDestino, monto) {
        const origen = cliente.cuentas.find(c => c.tipo === cuentaOrigen);
        const destino = cliente.cuentas.find(c => c.tipo === cuentaDestino);
        if (origen && destino && origen.saldo >= monto) {
            origen.saldo -= monto;
            destino.saldo += monto;
            return `Transferencia de ${monto} de ${cuentaOrigen} a ${cuentaDestino} exitosa`;
        }
        return 'Transferencia fallida: saldo insuficiente o cuentas no válidas';
    },
    
    consultarSaldo: function(cliente) {
        cliente.cuentas.forEach(cuenta => {
            console.log(`Cuenta ${cuenta.tipo}: ${cuenta.saldo}`);
        });
    }
};

// Función menu del cajero
function cajero() {
    let intentos = 0;
    let clienteActual = null;

    // Pedir documento y pin
    while (intentos < 3 && !clienteActual) {
        const documento = prompt('Ingrese su documento de identidad: ');
        const pin = prompt('Ingrese su pin de 4 dígitos: ');

        clienteActual = banco.validarPin(documento, pin);
        
        if (!clienteActual) {
            intentos++;
            console.log('PIN o documento incorrecto. Intente nuevamente.');
        }
    }

    if (!clienteActual) {
        console.log('Demasiados intentos fallidos. Salida del sistema.');
        return;
    }

    let continuar = true;

    while (continuar) {
        const opcion = prompt(`
Seleccione una opción:
1. Retirar efectivo
2. Depositar dinero
3. Transferir entre cuentas
4. Consultar saldo
5. Salir
Opción: `);

        switch (opcion) {
            case '1':
                const cuentaRetiro = prompt('Ingrese la cuenta (Ahorros/Corriente) de donde retirar: ');
                const montoRetiro = parseFloat(prompt('Ingrese el monto a retirar (en múltiplos de $50000): '));
                console.log(banco.retirar(clienteActual, cuentaRetiro, montoRetiro));
                break;

            case '2':
                const cuentaDeposito = prompt('Ingrese la cuenta (Ahorros/Corriente) donde desea depositar: ');
                const montoDeposito = parseFloat(prompt('Ingrese el monto a depositar: '));
                console.log(banco.depositar(clienteActual, cuentaDeposito, montoDeposito));
                break;

            case '3':
                const origen = prompt('Ingrese la cuenta origen (Ahorros/Corriente): ');
                const destino = prompt('Ingrese la cuenta destino (Ahorros/Corriente): ');
                const montoTransferencia = parseFloat(prompt('Ingrese el monto a transferir: '));
                console.log(banco.transferir(clienteActual, origen, destino, montoTransferencia));
                break;

            case '4':
                banco.consultarSaldo(clienteActual);
                break;

            case '5':
                continuar = false;
                console.log('Gracias por usar el cajero automático. ¡Hasta luego!');
                break;

            default:
                console.log('Opción no válida. Intente nuevamente.');
        }
    }
}
cajero();