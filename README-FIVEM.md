
# FiveM Dispatch System Integration Guide

This guide will help you integrate the dispatch system into your FiveM server.

## Installation Steps

1. Copy the `dispatch-system` folder into your FiveM server's `resources` directory
2. Add `ensure dispatch-system` to your `server.cfg`
3. Configure the key bindings in the `config.lua` file (optional)
4. Restart your FiveM server

## File Structure
```
dispatch-system/
├── fxmanifest.lua
├── config.lua
├── client.lua
├── server.lua
└── ui/
    └── (all web files will be here)
```

## Events

### Client -> Server
- `dispatch:requestBackup`: Sends backup request
- `dispatch:shareLoc`: Shares officer location
- `dispatch:emergency`: Sends emergency alert
- `dispatch:duress`: Sends duress signal

### Server -> Client
- `dispatch:receiveCall`: Receives new dispatch call
- `dispatch:receiveBackup`: Receives backup request
- `dispatch:receiveLoc`: Receives location share
- `dispatch:receiveEmergency`: Receives emergency alert

## Usage
- Press configured keys to trigger different alerts (default: E for emergency, D for duress, B for backup)
- Use the dispatch interface to manage and respond to calls
- Share location during pursuits using the End key
