const DeviceInfo = {
    getUniqueId: jest.fn(() => 'mocked-unique-id'),
    getSystemName: jest.fn(() => 'mocked-system-name'),
    getVersion: jest.fn(() => '1.0.0'),
  };
  
  export default DeviceInfo;