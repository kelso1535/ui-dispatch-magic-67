
# FiveM Dispatch System Integration Guide

This guide will help you integrate the dispatch system into your FiveM server.

## Installation Steps

1. Copy the `dispatch-system` folder into your FiveM server's `resources` directory
2. Add `ensure dispatch-system` to your `server.cfg`
3. Add the sound files to the `html/sounds/` directory:
   - Place `emergency.mp3` for emergency alerts
   - Place `duress.mp3` for duress signals  
   - Place `backup.mp3` for backup requests
   - Place `location.mp3` for location sharing
4. Restart your FiveM server

## Troubleshooting

If you encounter the Node.js version error:
```
error react-hook-form@7.54.2: The engine "node" is incompatible with this module. Expected version ">=18.0.0". Got "16.9.1"
```

This resource is now set up without Node.js dependencies, so you shouldn't encounter this error anymore.

## Customizing Key Bindings

You can customize the key bindings in the `config.lua` file:

```lua
Config.Keys = {
    Emergency = 38, -- Default: E key
    Duress = 44,    -- Default: D key
    Backup = 29,    -- Default: B key
    Location = 177  -- Default: END key
}
```

For key codes, refer to: https://docs.fivem.net/docs/game-references/controls/

## Features

- **Emergency Alert (E key):** Sends an urgent emergency alert to all officers
- **Duress Signal (D key):** Sends a duress signal for dangerous situations
- **Backup Request (B key):** Requests backup from other officers
- **Location Sharing (END key):** Shares your current location during pursuits
- **Dispatch Interface:** Press DELETE to open the dispatch management interface

## Commands

- `/dispatch` - Toggle the dispatch interface

## Events

### Client -> Server
- `dispatch:emergency`: Sends emergency alert
- `dispatch:duress`: Sends duress signal
- `dispatch:requestBackup`: Sends backup request
- `dispatch:shareLoc`: Shares officer location

### Server -> Client
- `dispatch:receiveCall`: Receives new dispatch call

## File Structure
```
dispatch-system/
├── fxmanifest.lua      # Resource manifest
├── config.lua          # Configuration options
├── client.lua          # Client-side logic
├── server.lua          # Server-side logic
└── html/               # UI files
    ├── index.html      # Main HTML
    ├── style.css       # Styling
    ├── script.js       # UI logic
    └── sounds/         # Sound files
        ├── emergency.mp3
        ├── duress.mp3
        ├── backup.mp3
        └── location.mp3
```

## Required Sound Files

Make sure to add these sound files to the `html/sounds/` directory:
1. `emergency.mp3` - Played for emergency alerts
2. `duress.mp3` - Played for duress signals
3. `backup.mp3` - Played for backup requests
4. `location.mp3` - Played for location sharing

These sound files are not included and must be added separately.
