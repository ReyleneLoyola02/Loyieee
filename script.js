let bluetoothDevice;
let buzzerCharacteristic;

const connectButton = document.getElementById('connectButton');
const disconnectButton = document.getElementById('disconnectButton');
const activateButton = document.getElementById('activateButton');
const deactivateButton = document.getElementById('deactivateButton');

connectButton.addEventListener('click', connectToDevice);
disconnectButton.addEventListener('click', disconnectFromDevice);
activateButton.addEventListener('click', activateBuzzer);
deactivateButton.addEventListener('click', deactivateBuzzer);

async function connectToDevice() {
  try {
    bluetoothDevice = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['serial_port'] }]
    });
  
    const server = await bluetoothDevice.gatt.connect();
    const service = await server.getPrimaryService('serial_port');
    buzzerCharacteristic = await service.getCharacteristic('serial_port');

    console.log('Connected to Bluetooth device:', bluetoothDevice);
  } catch (error) {
    console.error('Error connecting to Bluetooth device:', error);
  }
}

function disconnectFromDevice() {
  if (bluetoothDevice && bluetoothDevice.gatt.connected) {
    bluetoothDevice.gatt.disconnect();
    console.log('Disconnected from Bluetooth device');
  }
}

function activateBuzzer() {
  if (buzzerCharacteristic && buzzerCharacteristic.writeValue) {
    const data = new Uint8Array([1]); // Send '1' to activate buzzer
    buzzerCharacteristic.writeValue(data)
      .then(() => console.log('Buzzer activated'))
      .catch(error => console.error('Error activating buzzer:', error));
  }
}

function deactivateBuzzer() {
  if (buzzerCharacteristic && buzzerCharacteristic.writeValue) {
    const data = new Uint8Array([0]); // Send '0' to deactivate buzzer
    buzzerCharacteristic.writeValue(data)
      .then(() => console.log('Buzzer deactivated'))
      .catch(error => console.error('Error deactivating buzzer:', error));
  }
}
