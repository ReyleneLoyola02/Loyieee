let bluetoothDevice;
let serialCharacteristic;

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
      filters: [{ services: ['00001101-0000-1000-8000-00805F9B34FB'] }]
    });

    const server = await bluetoothDevice.gatt.connect();
    const service = await server.getPrimaryService('00001101-0000-1000-8000-00805F9B34FB');
    serialCharacteristic = await service.getCharacteristic('00001101-0000-1000-8000-00805F9B34FB');

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
  if (serialCharacteristic && serialCharacteristic.writeValue) {
    const data = new Uint8Array([1]); // Send '1' to activate buzzer
    serialCharacteristic.writeValue(data)
      .then(() => console.log('Buzzer activated'))
      .catch(error => console.error('Error activating buzzer:', error));
  }
}

function deactivateBuzzer() {
  if (serialCharacteristic && serialCharacteristic.writeValue) {
    const data = new Uint8Array([0]); // Send '0' to deactivate buzzer
    serialCharacteristic.writeValue(data)
      .then(() => console.log('Buzzer deactivated'))
      .catch(error => console.error('Error deactivating buzzer:', error));
  }
}
