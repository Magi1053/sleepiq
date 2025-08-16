# SleepIQ API SDK

A TypeScript SDK for interacting with the SleepIQ API, allowing you to control SleepNumber beds and access sleep data programmatically.

## Description

This SDK provides a comprehensive interface to the SleepIQ API, enabling you to:
- Control bed settings and foundation features
- Adjust sleep number settings
- Manage bed pause modes
- Control foot warming and other bed features
- Access account and bed information
- Execute BAM key commands for advanced bed control

## Features

- **Full TypeScript Support**: Complete type definitions for all API endpoints
- **Authentication**: Built-in support for SleepIQ login and JWT token management
- **Bed Control**: Comprehensive bed management including sleep numbers, pause modes, and foundation features
- **Foundation Features**: Control actuators, presets, foot warming, and outlet management
- **Error Handling**: Proper error responses and status code handling
- **Configurable**: Customizable timeout and server configuration options

## Installation

The `api` CLI will automatically generate and install the SDK:

### Using npm
```bash
npm install sleepiq
```

### Using Yarn
```bash
yarn add sleepiq
```

### Using pnpm
```bash
pnpm add sleepiq
```

### Code Generation

This SDK is generated using the `api` CLI which:
- Downloads and caches your OpenAPI definition
- Generates a full TypeScript library
- Installs necessary packages
- Creates a `sleepiq` package in your `package.json`

For more information, see the [api.readme.dev documentation](https://api.readme.dev/docs/usage).

## Quick Start

```typescript
import sleepiq from 'sleepiq';

// Login to SleepIQ
const loginResponse = await sleepiq.login({
  login: 'your-email@example.com',
  password: 'your-password'
});

// Set authentication for subsequent requests
sleepiq.auth(loginResponse.data.key);

// Get account information
const accountInfo = await sleepiq.getAccount({});

// Get bed information
const bedInfo = await sleepiq.getBed({
  bedId: 'your-bed-id'
});

// Set sleep number for left side
await sleepiq.setSleepNumber(
  { side: 'L', sleepNumber: 45 },
  { bedId: 'your-bed-id' }
);
```

### JavaScript Usage

You can also use the SDK with CommonJS:

```javascript
const sleepiq = require('sleepiq');

sleepiq.login({
  login: 'your-email@example.com',
  password: 'your-password'
}).then(({ data, status, headers, res }) => {
  console.log('Login successful!');
});
```

### Response Structure

All API calls return a response object with:
- `data` - The response payload
- `status` - HTTP status code
- `headers` - Response headers
- `res` - Full response object

## Authentication

The SDK supports multiple authentication methods:

```typescript
// Basic authentication with email/password
const loginResponse = await sleepiq.login({
  login: 'email@example.com',
  password: 'password'
});

// JWT token authentication
const jwtResponse = await sleepiq.getJwt();

// Set authentication for subsequent requests
sleepiq.auth('your-api-key');
```

### Important Notes

- **API Key Required**: Most endpoints require the API key obtained from the login response to be sent as a Bearer token in the Authorization header
- **Bed ID Required**: Bed-specific operations require a `bedId` parameter
- **Authentication Flow**: First call `login()` to get an API key, then use that key as a Bearer token in subsequent requests
- **Parameter Structure**: Most methods take a metadata object as the second parameter containing `bedId` (no need for `_k` parameter)

## Configuration

```typescript
// Configure timeout (default: 30 seconds)
sleepiq.config({ timeout: 60000 });

// Set custom server URL
sleepiq.server('https://custom-api.example.com');
```

## API Endpoints

### Authentication
- `login()` - Authenticate user with email/password
- `getJwt()` - Retrieve JWT token for cookie-based authentication

### Account Management
- `getAccount()` - Retrieve account details and bed information

### Bed Control
- `getBed()` - Get detailed information about a specific bed
- `getPauseMode()` - Check if bed is in pause mode
- `setPauseMode()` - Enable/disable pause mode
- `stopPump()` - Force bed pump to idle state

### Sleep Number Management
- `setSleepNumber()` - Set sleep number for a specific side
- `getFavorite()` - Get favorite sleep numbers
- `setFavorite()` - Set favorite sleep numbers

### Foundation Features
- `getFoundation()` - Get foundation status including actuators and presets
- `checkOutlet()` - Check outlet status
- `getFootWarming()` - Get foot warming settings
- `calibrate()` - Calibrate bed for a specific sleeper

### Advanced Control
- `executeBam()` - Execute BAM key commands for advanced bed features

## Complete Usage Examples

### Authentication and Setup
```typescript
import sleepiq from 'sleepiq';

// Login to get API key
const loginResponse = await sleepiq.login({
  login: 'your-email@example.com',
  password: 'your-password'
});

const apiKey = loginResponse.data.key;

// Set authentication for subsequent requests
sleepiq.auth(apiKey);
```

### Account and Bed Management
```typescript
// Get account information
const accountInfo = await sleepiq.getAccount({});

// Get information about a specific bed
const bedInfo = await sleepiq.getBed({
  bedId: 'your-bed-id'
});

// Check if bed is in pause mode
const pauseMode = await sleepiq.getPauseMode({
  bedId: 'your-bed-id'
});

// Enable pause mode
await sleepiq.setPauseMode(
  { mode: 'on' },
  { bedId: 'your-bed-id' }
);

// Force pump to idle
await sleepiq.stopPump({
  bedId: 'your-bed-id'
});
```

### Sleep Number Control
```typescript
// Set sleep number for left side
await sleepiq.setSleepNumber(
  { side: 'L', sleepNumber: 45 },
  { bedId: 'your-bed-id' }
);

// Get favorite sleep numbers
const favorites = await sleepiq.getFavorite({
  bedId: 'your-bed-id'
});

// Set favorite sleep number for right side
await sleepiq.setFavorite(
  { side: 'R', sleepNumberFavorite: 65 },
  { bedId: 'your-bed-id' }
);
```

### Foundation Features
```typescript
// Get foundation status
const foundation = await sleepiq.getFoundation({
  bedId: 'your-bed-id'
});

// Check specific outlet status
const outletStatus = await sleepiq.checkOutlet({
  bedId: 'your-bed-id',
  outletId: 1 // Right Night Stand
});

// Get foot warming settings
const footWarming = await sleepiq.getFootWarming({
  bedId: 'your-bed-id'
});

// Calibrate bed for a specific sleeper
await sleepiq.calibrate({
  sleeperId: 'sleeper-id'
});
```

### Advanced BAM Commands
```typescript
// Execute BAM key command
const bamResponse = await sleepiq.executeBam(
  {
    args: 'command arguments',
    key: 'bam-key-identifier',
    sourceApplication: 'MyApp'
  },
  {
    accountId: 'account-id',
    bedId: 'bed-id'
  }
);
```

## Error Handling

The SDK returns typed responses with proper error handling:

```typescript
try {
  const response = await sleepiq.getAccount({});
  if (response.status === 200) {
    console.log('Account info:', response.data);
  }
} catch (error) {
  console.error('API error:', error);
}

// Example with bed-specific operations
try {
  const bedResponse = await sleepiq.getBed({
    bedId: 'bed-id'
  });
  console.log('Bed info:', bedResponse.data);
} catch (error) {
  if (error.status === 404) {
    console.error('Bed not found');
  } else {
    console.error('API error:', error);
  }
}
```

## Types

All API types are exported from the package:

```typescript
import type { 
  GetAccountResponse200,
  LoginBodyParam,
  SetSleepNumberBodyParam 
} from 'sleepiq';
```

## Dependencies

- `api` - Core API client library
- `json-schema-to-ts` - TypeScript type generation from JSON schemas
- `oas` - OpenAPI specification handling

## Development

This project uses:
- TypeScript for type safety
- OpenAPI 3.1.0 specification
- pnpm for package management
- Patched dependencies for compatibility

## License

This project is licensed under the same terms as the SleepIQ API (Proprietary).

## Support

For issues and questions:
- SleepNumber Support: https://www.sleepnumber.com
- API Documentation: Refer to the OpenAPI specification in `openapi.json`

## Contributing

This is a generated SDK based on the SleepIQ OpenAPI specification. To contribute:
1. Update the OpenAPI specification in `openapi.json`
2. Regenerate types and SDK code
3. Test with the SleepIQ API
4. Submit a pull request

## Practical Workflow Example

Here's a complete example showing how to use the SDK in a real application:

```typescript
import sleepiq from 'sleepiq';

async function controlSleepNumberBed() {
  try {
    // 1. Login to get API key
    const loginResponse = await sleepiq.login({
      login: 'your-email@example.com',
      password: 'your-password'
    });
    
    const apiKey = loginResponse.data.key;
    console.log('Login successful, API key obtained');
    
    // 2. Set authentication for subsequent requests
    sleepiq.auth(apiKey);
    
    // 3. Get account information to find bed IDs
    const accountInfo = await sleepiq.getAccount({});
    const bedId = accountInfo.data.beds[0]?.bedId;
    
    if (!bedId) {
      throw new Error('No beds found in account');
    }
    
    console.log(`Found bed: ${bedId}`);
    
    // 4. Get current bed status
    const bedStatus = await sleepiq.getBed({ bedId });
    console.log('Current bed status:', bedStatus.data);
    
    // 5. Check pause mode
    const pauseMode = await sleepiq.getPauseMode({ bedId });
    console.log('Pause mode:', pauseMode.data.pauseMode);
    
    // 6. Set sleep number for left side
    await sleepiq.setSleepNumber(
      { side: 'L', sleepNumber: 45 },
      { bedId }
    );
    console.log('Sleep number set to 45 for left side');
    
    // 7. Get foundation status
    const foundation = await sleepiq.getFoundation({ bedId });
    console.log('Foundation status:', foundation.data);
    
  } catch (error) {
    console.error('Error controlling bed:', error);
  }
}

// Run the workflow
controlSleepNumberBed();
```

## Version

Current version: 1.0.0
