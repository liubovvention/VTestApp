const DeviceInfo = {
    getUniqueId: jest.fn(() => 'mocked-unique-id'),
    getSystemName: jest.fn(() => 'mocked-system-name'),
    getVersion: jest.fn(() => '1.0.0'),
    getgetBuildNumber: jest.fn(() => '0001'),
  };
  
  export default DeviceInfo;