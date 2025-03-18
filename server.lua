
-- Handle emergency alerts
RegisterServerEvent('dispatch:emergency')
AddEventHandler('dispatch:emergency', function(data)
    local source = source
    local player = GetPlayerPed(source)
    local coords = GetEntityCoords(player)
    
    -- Add caller info
    data.callerPhone = '555-' .. math.random(1000, 9999)
    data.id = tostring(math.random(100, 999))
    data.time = os.date('%H:%M:%S')
    
    -- Broadcast to all players
    TriggerClientEvent('dispatch:receiveCall', -1, data)
end)

-- Handle duress signals
RegisterServerEvent('dispatch:duress')
AddEventHandler('dispatch:duress', function(data)
    local source = source
    -- Similar implementation as emergency
    TriggerClientEvent('dispatch:receiveCall', -1, data)
end)

-- Handle backup requests
RegisterServerEvent('dispatch:requestBackup')
AddEventHandler('dispatch:requestBackup', function(data)
    local source = source
    -- Similar implementation as emergency
    TriggerClientEvent('dispatch:receiveCall', -1, data)
end)

-- Handle location sharing
RegisterServerEvent('dispatch:shareLoc')
AddEventHandler('dispatch:shareLoc', function(data)
    local source = source
    -- Similar implementation as emergency
    TriggerClientEvent('dispatch:receiveCall', -1, data)
end)
